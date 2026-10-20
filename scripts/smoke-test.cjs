const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const required = ["index.html", "library.html", "skill.html", "download.html", "app.js", "styles.css", "catalog.json"];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error("Missing required site file: " + file);
}
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
for (const marker of ["search/repositories", "SKILL.md", "Download full repository", "Public signal score", "securityReviewHTML", "rate-limited"]) {
  if (!app.includes(marker)) throw new Error("Expected library capability marker missing: " + marker);
}
const libraryHtml = fs.readFileSync(path.join(root, "library.html"), "utf8");
for (const marker of ['id="favorites-toggle"', 'id="exclude-archived"', 'id="export-results"', 'id="copy-search-link"']) {
  if (!libraryHtml.includes(marker)) throw new Error("Missing library interaction: " + marker);
}
for (const file of ["library.html", "skill.html", "download.html"]) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  if (!html.includes('href="styles.css"')) throw new Error(file + " does not load styles.css");
  if (!html.includes('src="app.js"')) throw new Error(file + " does not load app.js");
}
for (const file of ["app.js", "scripts/build-index.cjs"]) {
  const check = spawnSync(process.execPath, ["--check", path.join(root, file)], { encoding: "utf8" });
  if (check.status !== 0) throw new Error(file + ": " + (check.stderr || "JavaScript syntax check failed"));
}
console.log("SkillWeave smoke tests passed: required pages/assets exist, app.js parses, and core library markers are present.");
