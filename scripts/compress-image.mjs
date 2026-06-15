#!/usr/bin/env node

import tinify from "tinify";

export async function compressImage(buffer) {
  const apiKey = process.env.TINIFY_API_KEY;
  if (!apiKey) {
    throw new Error("TINIFY_API_KEY environment variable is not set");
  }
  tinify.key = apiKey;
  const compressed = await tinify.fromBuffer(buffer).toBuffer();
  return Buffer.from(compressed);
}
