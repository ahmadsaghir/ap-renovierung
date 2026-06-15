#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { compressImage } from "./compress-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVICES_DIR = path.resolve(__dirname, "../public/services");

async function main() {
  const files = fs.readdirSync(SERVICES_DIR).filter((f) => f.endsWith(".jpg"));

  if (files.length === 0) {
    console.log("No .jpg files found in public/services/");
    return;
  }

  console.log(`Compressing ${files.length} images in ${SERVICES_DIR}\n`);

  for (const file of files) {
    const filePath = path.join(SERVICES_DIR, file);
    const originalBuffer = fs.readFileSync(filePath);
    const originalSize = originalBuffer.length;

    try {
      const compressedBuffer = await compressImage(originalBuffer);
      fs.writeFileSync(filePath, compressedBuffer);
      const compressedSize = compressedBuffer.length;
      const savings = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
      console.log(
        `[${file}] ${(originalSize / 1024).toFixed(1)} KB → ${(compressedSize / 1024).toFixed(1)} KB (saved ${savings}%)`
      );
    } catch (err) {
      console.warn(`[${file}] WARN: Compression failed — ${err.message} — skipping`);
    }
  }

  console.log("\nDone.");
}

main();
