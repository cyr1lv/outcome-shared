#!/usr/bin/env node
/**
 * Build script to create CommonJS version from TypeScript source.
 * Converts ES modules to CommonJS for Mandate service compatibility.
 */

const fs = require("fs");
const path = require("path");

const srcFile = path.join(__dirname, "../src/governanceReasonCodes.ts");
const distFile = path.join(__dirname, "../dist/governanceReasonCodes.cjs");

// Read TypeScript source
const tsContent = fs.readFileSync(srcFile, "utf-8");

// Convert ES module exports to CommonJS
let cjsContent = tsContent
  // Remove TypeScript-specific syntax
  .replace(/ as const/g, "")
  .replace(/export type .*$/gm, "")
  .replace(/export function .*$/gm, "")
  .replace(/function .*$/gm, "")
  // Convert export const to const + module.exports
  .replace(/export const /g, "const ");

// Extract all exports
const exportNames = [];
const exportMatches = cjsContent.matchAll(/const ([A-Z_]+) =/g);
for (const match of exportMatches) {
  exportNames.push(match[1]);
}

// Also extract arrays and sets
const arrayMatches = cjsContent.matchAll(/const ([A-Z_]+) = \[/g);
for (const match of arrayMatches) {
  if (!exportNames.includes(match[1])) {
    exportNames.push(match[1]);
  }
}

const setMatches = cjsContent.matchAll(/const ([A-Z_]+) = new Set\(/g);
for (const match of setMatches) {
  if (!exportNames.includes(match[1])) {
    exportNames.push(match[1]);
  }
}

// Add module.exports at the end
cjsContent += `\n\nmodule.exports = {\n`;
exportNames.forEach((exp, idx) => {
  cjsContent += `  ${exp}${idx < exportNames.length - 1 ? "," : ""}\n`;
});
cjsContent += `};\n`;

// Write CommonJS output
fs.writeFileSync(distFile, cjsContent, "utf-8");

console.log(`✓ Built ${distFile}`);
console.log(`  Exports: ${exports.length} constants`);
