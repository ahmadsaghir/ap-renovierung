#!/usr/bin/env node

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error("ERROR: PEXELS_API_KEY environment variable is not set.");
  process.exit(1);
}

const OUTPUT_DIR = path.resolve(__dirname, "../public/services");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const SERVICES = [
  { slug: "car-washing",                    query: "car washing service" },
  { slug: "auto-detailing",                 query: "auto detailing car" },
  { slug: "waxing-polishing",               query: "car waxing polishing" },
  { slug: "scratch-removal",                query: "car scratch removal paint" },
  { slug: "interior-cleaning",              query: "car interior cleaning" },
  { slug: "wheel-cleaning",                 query: "car wheel rim cleaning" },
  { slug: "tire-service",                   query: "tire service garage" },
  { slug: "car-wrapping",                   query: "car vinyl wrap" },
  { slug: "vehicle-inspection",             query: "vehicle inspection mechanic" },
  { slug: "car-sales",                      query: "luxury car showroom" },
  { slug: "starlight-headliner",            query: "car starlight headliner roof" },
  { slug: "ambient-lighting",               query: "car ambient interior lighting" },
  { slug: "display-carplay",               query: "car display carplay screen" },
  { slug: "digital-cluster",               query: "car digital dashboard cluster" },
  { slug: "body-kit",                       query: "car body kit modification" },
];

function pexelsSearch(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
    const options = {
      headers: { Authorization: API_KEY },
    };
    https.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const svc of SERVICES) {
    const dest = path.join(OUTPUT_DIR, `${svc.slug}.jpg`);
    if (fs.existsSync(dest)) {
      console.log(`SKIP  ${svc.slug}.jpg (already exists)`);
      continue;
    }
    try {
      console.log(`FETCH ${svc.slug} — searching: "${svc.query}"`);
      const result = await pexelsSearch(svc.query);
      if (!result.photos || result.photos.length === 0) {
        console.warn(`  WARN: no results for "${svc.query}"`);
        continue;
      }
      const photo = result.photos[0];
      const imgUrl = photo.src.large || photo.src.original;
      await downloadFile(imgUrl, dest);
      console.log(`  OK   saved ${svc.slug}.jpg`);
    } catch (err) {
      console.error(`  ERR  ${svc.slug}: ${err.message}`);
    }
  }
  console.log("Done.");
}

main();
