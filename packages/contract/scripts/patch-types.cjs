#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const distIndex = path.join(root, "dist", "index.d.ts");
const candidates = [
  path.join(root, "dist", "managed", "midnight-setup", "contract", "index.d.ts"),
  path.join(root, "dist", "managed", "midnight-setup", "contract", "index.d.cts"),
  path.join(root, "src", "managed", "midnight-setup", "contract", "index.d.ts"),
  path.join(root, "src", "managed", "midnight-setup", "contract", "index.d.cts")
];

const managedDts = candidates.find((p) => fs.existsSync(p));
if (!managedDts) {
  console.error("[patch-types] Missing generated types. Searched:");
  for (const p of candidates) console.error(`- ${p}`);
  process.exit(1);
}

const content = fs.readFileSync(managedDts, "utf8");
fs.mkdirSync(path.dirname(distIndex), { recursive: true });
fs.writeFileSync(distIndex, content, "utf8");
