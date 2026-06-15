#!/usr/bin/env node

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { compressImage } from "./compress-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.REPLICATE_API_KEY;
if (!API_KEY) {
  console.error("ERROR: REPLICATE_API_KEY environment variable is not set.");
  process.exit(1);
}

const OUTPUT_DIR = path.resolve(__dirname, "../public/services");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const SERVICES = [
  {
    slug: "car-washing",
    prompt:
      "A bright yellow BMW M4 being washed at a professional car wash, water cascading over the hood, soap foam, dramatic lighting, photorealistic, 4K",
  },
  {
    slug: "auto-detailing",
    prompt:
      "A gleaming yellow BMW M4 receiving professional auto detailing, worker applying paint correction with orbital polisher, garage setting, photorealistic, 4K",
  },
  {
    slug: "waxing-polishing",
    prompt:
      "A yellow BMW M4 being waxed and polished to a mirror shine, reflection of workshop lights visible in the paint, professional detailing, photorealistic, 4K",
  },
  {
    slug: "scratch-removal",
    prompt:
      "Close-up of a yellow BMW M4 hood being repaired for paint scratches, professional technician using compound and polisher, before-after transformation, photorealistic, 4K",
  },
  {
    slug: "interior-cleaning",
    prompt:
      "Inside a yellow BMW M4 being professionally cleaned, leather seats being wiped, dashboard detailing, premium car interior, photorealistic, 4K",
  },
  {
    slug: "wheel-cleaning",
    prompt:
      "Close up of yellow BMW M4 alloy wheels being cleaned, brake dust removal, shiny rims with professional detailing tools, photorealistic, 4K",
  },
  {
    slug: "tire-service",
    prompt:
      "Yellow BMW M4 on a lift in a professional garage, technician performing tire rotation and balancing, modern workshop, photorealistic, 4K",
  },
  {
    slug: "car-wrapping",
    prompt:
      "Yellow BMW M4 being wrapped in premium vinyl, technician applying wrap film to the body panel, transformation in progress, photorealistic, 4K",
  },
  {
    slug: "vehicle-inspection",
    prompt:
      "Yellow BMW M4 undergoing a professional multi-point vehicle inspection, technician with clipboard checking the car, bright workshop, photorealistic, 4K",
  },
  {
    slug: "car-sales",
    prompt:
      "Yellow BMW M4 displayed in a luxury car showroom, spotlights, pristine showroom floor, premium automotive dealership, photorealistic, 4K",
  },
  {
    slug: "starlight-headliner",
    prompt:
      "Interior view of a yellow BMW M4 featuring a beautiful starlight headliner, hundreds of tiny LED fibre optic lights glowing like stars on the roof lining, dark ambiance, photorealistic, 4K",
  },
  {
    slug: "ambient-lighting",
    prompt:
      "Interior of a yellow BMW M4 with stunning RGB ambient lighting glowing in blue and purple hues along the dashboard and door panels, night scene, photorealistic, 4K",
  },
  {
    slug: "display-carplay",
    prompt:
      "Yellow BMW M4 interior featuring a large aftermarket touchscreen display showing Apple CarPlay, modern infotainment system, photorealistic, 4K",
  },
  {
    slug: "digital-cluster",
    prompt:
      "Yellow BMW M4 interior with a full digital instrument cluster upgrade, vivid digital dashboard showing speed and navigation, modern cockpit, photorealistic, 4K",
  },
  {
    slug: "body-kit",
    prompt:
      "Yellow BMW M4 with an aggressive aftermarket body kit installed, wide body fenders, front splitter, rear diffuser, low stance, photorealistic, 4K",
  },
];

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpsGet(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ statusCode: res.statusCode, body: Buffer.concat(chunks).toString() }));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ statusCode: res.statusCode, body: Buffer.concat(chunks).toString() }));
      res.on("error", reject);
    });
    req.on("error", reject);
    if (body != null) req.write(body);
    req.end();
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadBinary(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
      file.on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function createPrediction(prompt) {
  const body = JSON.stringify({
    version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    input: {
      prompt,
      width: 1024,
      height: 768,
      num_outputs: 1,
      guidance_scale: 7.5,
      num_inference_steps: 30,
    },
  });

  const res = await httpsRequest(
    {
      hostname: "api.replicate.com",
      path: "/v1/predictions",
      method: "POST",
      headers: {
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    },
    body
  );

  if (res.statusCode !== 201) {
    throw new Error(`Replicate API error ${res.statusCode}: ${res.body}`);
  }

  return JSON.parse(res.body);
}

async function pollPrediction(id, maxWaitMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 3000));

    const res = await httpsRequest(
      {
        hostname: "api.replicate.com",
        path: `/v1/predictions/${id}`,
        method: "GET",
        headers: {
          Authorization: `Token ${API_KEY}`,
        },
      },
      null
    );

    if (res.statusCode !== 200) {
      throw new Error(`Poll error ${res.statusCode}: ${res.body}`);
    }

    const data = JSON.parse(res.body);

    if (data.status === "succeeded") {
      const output = data.output;
      if (Array.isArray(output) && output.length > 0) return output[0];
      if (typeof output === "string") return output;
      throw new Error("Unexpected output format: " + JSON.stringify(output));
    }

    if (data.status === "failed" || data.status === "canceled") {
      throw new Error(`Prediction ${data.status}: ${data.error || "unknown error"}`);
    }

    process.stdout.write(".");
  }
  throw new Error("Timed out waiting for prediction");
}

async function main() {
  console.log(`Generating ${SERVICES.length} service images via Replicate...\n`);

  for (const svc of SERVICES) {
    const dest = path.join(OUTPUT_DIR, `${svc.slug}.jpg`);

    try {
      console.log(`[${svc.slug}] Starting generation...`);
      const prediction = await createPrediction(svc.prompt);
      process.stdout.write(`[${svc.slug}] Waiting `);
      const imageUrl = await pollPrediction(prediction.id);
      process.stdout.write("\n");
      console.log(`[${svc.slug}] Downloading from ${imageUrl}`);
      const tmpDest = dest + ".tmp";
      await downloadBinary(imageUrl, tmpDest);
      // Convert to proper JPEG regardless of source format (PNG, WebP, etc.)
      execSync(`magick "${tmpDest}" -quality 90 "${dest}"`, { stdio: "pipe" });
      fs.unlinkSync(tmpDest);
      // Compress the JPEG via Tinify, fall back to original on failure
      const originalBuffer = fs.readFileSync(dest);
      try {
        const compressedBuffer = await compressImage(originalBuffer);
        fs.writeFileSync(dest, compressedBuffer);
        const savings = (((originalBuffer.length - compressedBuffer.length) / originalBuffer.length) * 100).toFixed(1);
        console.log(`[${svc.slug}] Compressed: ${(originalBuffer.length / 1024).toFixed(1)} KB → ${(compressedBuffer.length / 1024).toFixed(1)} KB (saved ${savings}%)`);
      } catch (compressErr) {
        console.warn(`[${svc.slug}] WARN: Tinify compression failed — ${compressErr.message} — saving original`);
      }
      console.log(`[${svc.slug}] Saved to ${dest}\n`);
    } catch (err) {
      process.stdout.write("\n");
      const tmpDest = dest + ".tmp";
      if (fs.existsSync(tmpDest)) fs.unlinkSync(tmpDest);
      console.warn(`[${svc.slug}] WARN: ${err.message} — skipping\n`);
    }
  }

  console.log("Done.");
}

main();
