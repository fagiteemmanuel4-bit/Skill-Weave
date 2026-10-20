const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const required = ["index.html", "library.html", "skill.html", "download.html", "app.js", "styles.css"];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error("Missing required site file: " + file);
}
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
for (const marker of ["search/repositories", "SKILL.md", "Download repository ZIP", "Public signal score", "rate-limited"]) {
  if (!app.includes(marker)) throw new Error("Expected library capability marker missing: " + marker);
}
for (const file of ["library.html", "skill.html", "download.html"]) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  if (!html.includes('href="styles.css"')) throw new Error(file + " does not load styles.css");
  if (!html.includes('src="app.js"')) throw new Error(file + " does not load app.js");
}
const check = spawnSync(process.execPath, ["--check", path.join(root, "app.js")], { encoding: "utf8" });
if (check.status !== 0) throw new Error(check.stderr || "JavaScript syntax check failed");
console.log("SkillWeave smoke tests passed: required pages/assets exist, app.js parses, and core library markers are present.");
