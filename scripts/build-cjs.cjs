#!/usr/bin/env node
/**
 * Build script to create CommonJS version from TypeScript compiled output.
 * Converts CommonJS exports to proper module.exports format.
 */

const fs = require("fs");
const path = require("path");

const distJsFile = path.join(__dirname, "../dist/governanceReasonCodes.js");
const distCjsFile = path.join(__dirname, "../dist/governanceReasonCodes.cjs");

// Read compiled JavaScript (already CommonJS from tsconfig)
const jsContent = fs.readFileSync(distJsFile, "utf-8");

// Convert exports.* to module.exports.*
const cjsContent = jsContent.replace(/exports\./g, "module.exports.");

// Write CommonJS output
fs.writeFileSync(distCjsFile, cjsContent, "utf-8");

console.log(`✓ Built ${distCjsFile}`);
console.log(`  Source: ${distJsFile}`);
