#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const distIndex = path.join(root, "dist", "index.d.ts");
const managedDts = path.join(
  root,
  "dist",
  "managed",
  "midnight-setup",
  "contract",
  "index.d.ts"
);

if (!fs.existsSync(managedDts)) {
  console.error(`[patch-types] Missing generated types: ${managedDts}`);
  process.exit(1);
}

const content = fs.readFileSync(managedDts, "utf8");
fs.mkdirSync(path.dirname(distIndex), { recursive: true });
fs.writeFileSync(distIndex, content, "utf8");
