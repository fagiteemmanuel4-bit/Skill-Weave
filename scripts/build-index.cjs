const fs = require("node:fs");
const { setTimeout: sleep } = require("node:timers/promises");

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required to index public SKILL.md files.");
const terms = [
  "agent", "claude", "cursor", "codex", "react", "python", "testing", "design",
  "security", "frontend", "workflow", "documentation", "automation", "typescript",
  "nextjs", "database", "api", "research", "devops", "openai", "anthropic",
  "vercel", "mcp", "browser", "mobile", "data", "writing", "git", "docker",
  "accessibility", "performance", "architecture", "sql", "kubernetes", "prompt",
  "tool", "web", "javascript", "build", "deploy"
];
const unique = new Map();
let requests = 0;

function toEntry(item) {
  const r = item.repository || {};
  const fullName = r.nameWithOwner;
  const filePath = item.path;
  if (!fullName || !filePath) return null;
  const parts = filePath.split("/");
  let skillName = parts[parts.length - 2] || fullName.split("/").pop();
  if (parts.length === 1) skillName = fullName.split("/").pop();
  skillName = skillName.replace(/[-_]+/g, " ");
  const branch = r.defaultBranchRef && r.defaultBranchRef.name || "main";
  const licenseId = r.licenseInfo && r.licenseInfo.spdxId;
  return {
    id: fullName + ":" + filePath,
    name: skillName,
    skill_name: skillName,
    full_name: fullName,
    path: filePath,
    skill_path: filePath,
    html_url: r.url || ("https://github.com/" + fullName),
    file_url: item.url || ("https://github.com/" + fullName + "/blob/" + branch + "/" + filePath),
    description: r.description || "",
    stargazers_count: Number(r.stargazerCount || 0),
    forks_count: Number(r.forkCount || 0),
    language: r.primaryLanguage && r.primaryLanguage.name || null,
    license: licenseId ? {spdx_id:licenseId} : null,
    pushed_at: r.pushedAt || null,
    default_branch: branch,
    archived: Boolean(r.isArchived),
    owner: fullName.split("/")[0],
    topics: []
  };
}

function buildQuery(batch) {
  const selections = [];
  const aliases = [];
  batch.forEach(function (state, index) {
    const alias = "q" + index;
    const after = state.cursor ? ", after: " + JSON.stringify(state.cursor) : "";
    const query = state.term + " filename:SKILL.md";
    selections.push(alias + ": search(query: " + JSON.stringify(query) + ", type: CODE, first: 100" + after + ") { pageInfo { hasNextPage endCursor } nodes { ... on Blob { path url repository { nameWithOwner url description stargazerCount forkCount isArchived pushedAt defaultBranchRef { name } primaryLanguage { name } licenseInfo { spdxId } } } } }");
    aliases.push({alias:alias,state:state});
  });
  return {query:"query {\n" + selections.join("\n") + "\n}",aliases:aliases};
}

async function requestGraphQL(query) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const response = await fetch("https://api.github.com/graphql", {method:"POST",headers:{
      "Accept":"application/vnd.github+json",
      "Authorization":"Bearer " + token,
      "Content-Type":"application/json",
      "X-GitHub-Api-Version":"2022-11-28",
      "User-Agent":"SkillWeave-Catalog-Indexer"
    },body:JSON.stringify({query:query})});
    requests++;
    if (response.status === 403 || response.status === 429) {
      const retryHeader = Number(response.headers.get("retry-after") || 0);
      const resetAt = Number(response.headers.get("x-ratelimit-reset") || 0);
      const body = await response.text();
      const messageMatch = body.match(/try again in ([0-9.]+)\s*(ms|s)\b/i);
      const messageWait = messageMatch ? (messageMatch[2].toLowerCase() === "ms" ? Number(messageMatch[1]) / 1000 : Number(messageMatch[1])) : 0;
      const resetWait = resetAt > 0 ? Math.max(0, resetAt - Math.floor(Date.now() / 1000)) : 0;
      const waitSeconds = Math.max(retryHeader, Math.ceil(messageWait), resetWait, 2);
      if (attempt < 19 && waitSeconds <= 1800) {
        console.warn("GitHub GraphQL throttled this batch. Waiting", waitSeconds, "seconds before retry", attempt + 2, "of 20.");
        await sleep((waitSeconds + 2) * 1000);
        continue;
      }
      throw new Error("GitHub GraphQL rate limit/access error after " + requests + " requests. Retry-After=" + waitSeconds + ". Response: " + body.slice(0, 500));
    }
    if (!response.ok) throw new Error("GitHub GraphQL failed (" + response.status + "): " + (await response.text()).slice(0, 500));
    const result = await response.json();
    if (result.errors && result.errors.length) {
      throw new Error("GitHub GraphQL query error: " + result.errors.map(function (e) { return e.message; }).join("; ").slice(0, 700));
    }
    if (!result.data) throw new Error("GitHub GraphQL returned no data.");
    return result.data;
  }
  throw new Error("GitHub GraphQL exhausted retries.");
}

async function main() {
  const started = new Date().toISOString();
  const states = terms.map(function (term) { return {term:term,cursor:null,hasMore:true}; });
  for (let page = 0; page < 10; page++) {
    for (let offset = 0; offset < states.length; offset += 10) {
      const batch = states.slice(offset, offset + 10).filter(function (state) { return state.hasMore; });
      if (!batch.length) continue;
      const built = buildQuery(batch);
      const data = await requestGraphQL(built.query);
      for (const pair of built.aliases) {
        const result = data[pair.alias];
        const state = pair.state;
        if (!result) {
          state.hasMore = false;
          continue;
        }
        for (const item of result.nodes || []) {
          const entry = toEntry(item);
          if (entry) unique.set(entry.id, entry);
        }
        state.cursor = result.pageInfo && result.pageInfo.endCursor || null;
        state.hasMore = Boolean(result.pageInfo && result.pageInfo.hasNextPage && state.cursor);
      }
      console.log("Indexed GraphQL batch", Math.floor(offset / 10) + 1, "of", Math.ceil(states.length / 10), "page", page + 1, "| unique skills:", unique.size, "| API requests:", requests);
      await sleep(6100);
    }
    if (states.every(function (state) { return !state.hasMore; })) break;
  }
  const skills = Array.from(unique.values()).sort(function (a, b) {
    return (b.stargazers_count - a.stargazers_count) || a.name.localeCompare(b.name);
  });
  const output = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    startedAt: started,
    totalSkills: skills.length,
    queries: terms,
    source: "GitHub GraphQL Code Search",
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
