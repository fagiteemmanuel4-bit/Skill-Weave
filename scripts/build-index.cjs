const fs = require("node:fs");
const { setTimeout: sleep } = require("node:timers/promises");

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required to index public SKILL.md files.");
const queries = [
  "agent", "claude", "cursor", "codex", "react", "python", "testing", "design",
  "security", "frontend", "workflow", "documentation", "automation", "typescript",
  "nextjs", "database", "api", "research", "devops", "openai", "anthropic",
  "vercel", "mcp", "browser", "mobile", "data", "writing", "git", "docker",
  "accessibility", "performance", "architecture", "sql", "kubernetes", "prompt",
  "tool", "web", "javascript", "build", "deploy"
];
const unique = new Map();
let requests = 0;

async function search(query, page) {
  const url = "https://api.github.com/search/code?q=" + encodeURIComponent(query + " filename:SKILL.md") + "&per_page=100&page=" + page;
  for (let attempt = 0; attempt < 20; attempt++) {
    const response = await fetch(url, {headers:{
      "Accept":"application/vnd.github+json",
      "Authorization":"Bearer " + token,
      "X-GitHub-Api-Version":"2022-11-28",
      "User-Agent":"SkillWeave-Catalog-Indexer"
    }});
    requests++;
    if (response.status === 403 || response.status === 429) {
      const retryHeader = Number(response.headers.get("retry-after") || 0);
      const resetAt = Number(response.headers.get("x-ratelimit-reset") || 0);
      const body = await response.text();
      const messageMatch = body.match(/try again in ([0-9.]+)\s*(ms|s)\b/i);
      const messageWait = messageMatch ? (messageMatch[2].toLowerCase() === "ms" ? Number(messageMatch[1]) / 1000 : Number(messageMatch[1])) : 0;
      const resetWait = resetAt > 0 ? Math.max(0, resetAt - Math.floor(Date.now() / 1000)) : 0;
      const backoff = Math.min(120, 15 * (attempt + 1));
      const waitSeconds = Math.max(retryHeader, Math.ceil(messageWait), resetWait, backoff);
      if (attempt < 19 && waitSeconds <= 1800) {
        console.warn("GitHub code search throttled this request. Waiting", waitSeconds, "seconds before retry", attempt + 2, "of 20.");
        await sleep((waitSeconds + 2) * 1000);
        continue;
      }
      throw new Error("GitHub code search rate limit/access error after " + requests + " requests. Retry-After=" + waitSeconds + ". Response: " + body.slice(0, 500));
    }
    if (!response.ok) throw new Error("GitHub code search failed (" + response.status + "): " + (await response.text()).slice(0, 500));
    return response.json();
  }
  throw new Error("GitHub code search exhausted retries.");
}

function toEntry(item) {
  const r = item.repository || {};
  const fullName = r.full_name;
  const filePath = item.path;
  if (!fullName || !filePath) return null;
  const parts = filePath.split("/");
  let skillName = parts[parts.length - 2] || r.name || fullName;
  if (parts.length === 1) skillName = r.name || fullName;
  skillName = skillName.replace(/[-_]+/g, " ");
  const licenseId = r.license && r.license.spdx_id;
  return {
    id: fullName + ":" + filePath,
    name: skillName,
    skill_name: skillName,
    full_name: fullName,
    path: filePath,
    skill_path: filePath,
    html_url: r.html_url || ("https://github.com/" + fullName),
    file_url: item.html_url || ("https://github.com/" + fullName + "/blob/" + (r.default_branch || "main") + "/" + filePath),
    description: r.description || "",
    stargazers_count: Number(r.stargazers_count || 0),
    forks_count: Number(r.forks_count || 0),
    language: r.language || null,
    license: licenseId ? {spdx_id:licenseId} : null,
    pushed_at: r.pushed_at || null,
    default_branch: r.default_branch || "main",
    archived: Boolean(r.archived),
    owner: r.owner && r.owner.login || fullName.split("/")[0],
    topics: []
  };
}

async function main() {
  const started = new Date().toISOString();
  for (const term of queries) {
    for (let page = 1; page <= 10; page++) {
      const data = await search(term, page);
      for (const item of data.items || []) {
        const entry = toEntry(item);
        if (entry) unique.set(entry.id, entry);
      }
      if (!data.items || data.items.length < 100 || page * 100 >= Math.min(Number(data.total_count || 0), 1000)) break;
      await sleep(6100);
    }
    console.log("Indexed query:", term, "| unique skills:", unique.size, "| API requests:", requests);
    await sleep(6100);
  }
  const skills = Array.from(unique.values()).sort(function (a, b) {
    return (b.stargazers_count - a.stargazers_count) || a.name.localeCompare(b.name);
  });
  const output = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    startedAt: started,
    totalSkills: skills.length,
    queries: queries,
    source: "GitHub Code Search API",
    limitations: [
      "Search results are bounded and not a guarantee of complete GitHub coverage.",
      "The catalogue indexes public files named SKILL.md and may contain duplicates or outdated repositories.",
      "Metadata scores are not quality reviews or security certifications."
    ],
    skills
  };
  fs.writeFileSync("catalog.json", JSON.stringify(output) + "\n");
  console.log("Wrote catalog.json with", skills.length, "unique SKILL.md paths after", requests, "GitHub API requests.");
}
main().catch(function (error) { console.error(error); process.exitCode = 1; });
