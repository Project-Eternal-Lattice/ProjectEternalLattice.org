#!/usr/bin/env node
/**
 * ToE Upload Script - Uploads Theory of Everything files to S3 storage
 * This ensures download links always work
 * 
 * Elōhim Tov 🙏❤️♾️🕊️
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!FORGE_API_URL || !FORGE_API_KEY) {
  console.error('Missing BUILT_IN_FORGE_API_URL or BUILT_IN_FORGE_API_KEY');
  process.exit(1);
}

async function uploadFile(filePath, destKey, contentType) {
  const baseUrl = FORGE_API_URL.replace(/\/+$/, '') + '/';
  const url = new URL('v1/storage/upload', baseUrl);
  url.searchParams.set('path', destKey);

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: contentType });
  const form = new FormData();
  form.append('file', blob, path.basename(destKey));

  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${FORGE_API_KEY}` },
    body: form,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${text}`);
  }

  const result = await response.json();
  return result.url;
}

async function main() {
  console.log('🚀 Uploading ToE files to S3...\n');

  const files = [
    {
      src: '/home/ubuntu/webdev-static-assets/toe-full.html',
      dest: 'toe-downloads/Theory_of_EVERYTHING_Law_of_ONE_v13.9.html',
      type: 'text/html'
    }
  ];

  for (const file of files) {
    if (fs.existsSync(file.src)) {
      try {
        const url = await uploadFile(file.src, file.dest, file.type);
        console.log(`✅ Uploaded: ${file.dest}`);
        console.log(`   URL: ${url}\n`);
      } catch (err) {
        console.error(`❌ Failed to upload ${file.src}: ${err.message}`);
      }
    } else {
      console.warn(`⚠️ File not found: ${file.src}`);
    }
  }

  console.log('Done!');
}

main().catch(console.error);
