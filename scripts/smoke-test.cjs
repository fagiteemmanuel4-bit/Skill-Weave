const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const required = ["index.html", "library.html", "skill.html", "download.html", "app.js", "universe.js", "styles.css", "catalog.json"];
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
for (const file of ["app.js", "universe.js", "scripts/build-index.cjs"]) {
  const check = spawnSync(process.execPath, ["--check", path.join(root, file)], { encoding: "utf8" });
  if (check.status !== 0) throw new Error(file + ": " + (check.stderr || "JavaScript syntax check failed"));
}
const homeHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const marker of ['id="starfield"', 'id="open-command"', 'id="command-dialog"', "planet-horizon", "skill-leaderboard"]) {
  if (!homeHtml.includes(marker)) throw new Error("Missing SkillWave homepage feature: " + marker);
}
const universe = fs.readFileSync(path.join(root, "universe.js"), "utf8");
for (const marker of ["prefers-reduced-motion", "loadSkills", "leaderboard-status", "weekly-count"]) {
  if (!universe.includes(marker)) throw new Error("Missing SkillWave interaction: " + marker);
}
console.log("SkillWave smoke tests passed: pages, observatory UI markers, and JavaScript syntax are valid.");
