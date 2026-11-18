const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "dist");
const publicFiles = [
  "index.html",
  "app.js",
  "styles.css",
  "api-config.js",
  "payment-details.js",
  "payment-editor.html",
  "payment-instructions.html",
  "manus-routes.json",
];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const name of publicFiles) {
  fs.copyFileSync(path.join(root, name), path.join(output, name));
}
fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
console.log(`Static site written to ${path.relative(root, output)}.`);