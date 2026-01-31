#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const distIndex = path.join(root, "dist", "index.d.ts");
const managedDts = "./managed/midnight-setup/contract/index";

const content = [
  `export * from "${managedDts}";`,
  `export type * from "${managedDts}";`,
  ""
].join("\n");

fs.mkdirSync(path.dirname(distIndex), { recursive: true });
fs.writeFileSync(distIndex, content, "utf8");
