# Reverse Engineering Notes — Top 5 Competitors

**Document Status:** Public Interface & Documentation Teardowns
**Last Updated:** February 2025
**Targets Analyzed:** Skills.sh, SkillsMP, AgentSkill.sh, Vercel Skills CLI, Glama MCP Directory

---

## 1. Skills.sh (Vercel Ecosystem)

### Product Overview
* **URL:** https://skills.sh/
* **Backing:** Vercel Labs
* **Primary Function:** Curated directory and CLI installer for `SKILL.md` instruction files compatible with 75+ coding agents.

### Public User Journey
1. **Landing Page:** Minimalist dark-mode landing page displaying featured skills, category filters (e.g., React, Next.js, Testing), search bar, and install commands.
2. **Search Experience:** Instant client-side fuzzy search over skill names, descriptions, and author names.
3. **Detail Page:** Renders the parsed `SKILL.md` content, supported agent list, author attribution (GitHub user/repo link), install button (`npx skills add <owner>/<repo>`), and static verification badge.
4. **Installation Flow:** User runs `npx skills add <repo>` in their local terminal. The CLI scans local directories to detect agent configuration files (e.g., `.claude/mcp.json`, `.cursorrules`, `.opencode/skills.json`), parses the target `SKILL.md`, and writes instructions into the local agent's configuration directory.

### Documented / Observed Interface Artifacts
* **CLI Command:** `npx skills add <github-owner>/<repo>`
* **CLI Search:** `npx skills search <query>`
* **Data Schema (Observed JSON Registry):**
  ```json
  {
    "name": "nextjs-best-practices",
    "description": "Rules and guidelines for Next.js App Router",
    "repository": "https://github.com/vercel-labs/skills",
    "path": "skills/nextjs-best-practices/SKILL.md",
    "supported_agents": ["claude-code", "cursor", "codex", "opencode"],
    "updated_at": "2025-02-10T12:00:00Z"
  }
  ```

### Architecture Inferences & Clues
* **Frontend:** Next.js App Router deployed on Vercel Edge Network.
* **Registry Backend:** Edge-cached static JSON files backed by GitHub Webhooks triggering automated static validation.
* **Strengths:** Immaculate developer experience (DX), zero friction, instant CLI installation.
* **Limitations:** Focuses strictly on single, isolated `SKILL.md` files. No support for multi-step workflows, dependency ordering, or pass/fail execution evidence.

---

## 2. SkillsMP (Skills Marketplace)

### Product Overview
* **URL:** https://skillsmp.com/
* **Primary Function:** Commercial marketplace for buying, selling, and listing agent skills for Claude Code, Cursor, and Codex.

### Public User Journey
1. **Landing Page:** Marketplace grid layout featuring paid and free skills, pricing badges ($0–$49), star ratings, buyer counts, and category tags.
2. **Search & Filter:** Search by target agent (Codex, Claude, Cursor), price tier (Free, Paid), or domain (Frontend, DevOps, Security).
3. **Detail Page:** Skill marketing pitch, creator profile, pricing checkout button, sample instructions preview, and customer reviews.
4. **Purchase & Delivery:** Upon payment, the user receives access to download the skill archive (ZIP) or copy the raw markdown prompt.

### Documented / Observed Interface Artifacts
* **Creator Listing Form Fields:** Title, Short Description, Detailed Instructions (`SKILL.md`), Compatible Agents, Price (USD), Licensing Rights (Personal / Commercial).
* **Delivery Mechanism:** Zip file download or web-copy code block.

### Architecture Inferences & Clues
* **Monetization Engine:** Stripe Connect for creator payouts and platform fees.
* **Strengths:** Unlocks commercial incentive for high-quality skill creators.
* **Limitations:** Completely lacks CLI integration or automated installation. Manual file copying is prone to setup errors. Zero automated functional testing.

---

## 3. AgentSkill.sh (Mass Indexer)

### Product Overview
* **URL:** https://agentskill.sh/
* **Primary Function:** Broad directory claim indexing 275,000+ AI agent skills scraped across GitHub.

### Public User Journey
1. **Landing Page:** Search-centric layout with trend charts, top categories, and total indexed count counter (275,000+).
2. **Search Experience:** Full-text search engine querying scraped GitHub repositories containing markdown files matching skill formats.
3. **Detail Page:** Display scraped GitHub README/SKILL content, star counts, fork counts, author profile, and an install snippet (`npx @agentskill.sh/cli@latest install <skill-id>`).

### Documented / Observed Interface Artifacts
* **CLI Command:** `npx @agentskill.sh/cli@latest install <id>`
* **Scraped Metadata Fields:** GitHub Repo URL, Stars, Forks, Last Commit Date, Language, Detected Agent Target.

### Architecture Inferences & Clues
* **Backend:** Automated GitHub crawler scanning public repositories for `SKILL.md`, `.cursorrules`, and `.claude.json` files. ElasticSearch / Algolia index.
* **Strengths:** Mass scale and extensive catalog reach.
* **Limitations:** Extremely high noise-to-signal ratio. Scraped unverified repositories pose prompt injection and security risks. Fake security badges without methodology.

---

## 4. Vercel Skills CLI (`vercel-labs/skills`)

### Product Overview
* **Repository:** https://github.com/vercel-labs/skills
* **Primary Function:** Open-source TypeScript CLI tool powering the `npx skills` ecosystem.

### Observed Public Source Architecture (Deep Teardown)
* **Core Modules Identified in Source:**
  1. `AgentDetector`: Scans local working directory for known agent config paths (e.g., `.claude/`, `.cursor/rules/`, `.codex/`).
  2. `SkillParser`: Validates frontmatter in `SKILL.md` (requiring `name` and `description` string fields).
  3. `ConfigWriter`: Merges skill instructions into agent-specific config files without corrupting existing user rules.
  4. `RegistryClient`: Fetches registry manifests over HTTP.

* **Supported Agent Auto-Detection Logic:**
  * Claude Code: `.claude/` directory or `claude.json`
  * Cursor: `.cursorrules` or `.cursor/rules/`
  * OpenCode: `.opencode/skills/`
  * Codex: `.codex/`

### Strengths & Weaknesses
* **Strengths:** Universal multi-agent config writing engine; standard-setter for local agent detection.
* **Weaknesses:** No state management or version locking for installed skills. Uninstalling or updating skills requires manual file editing.

---

## 5. Glama MCP Directory

### Product Overview
* **URL:** https://glama.ai/mcp/servers
* **Primary Function:** Enterprise-grade directory and security inspection platform for Model Context Protocol (MCP) servers (105,000+ indexed servers).

### Public User Journey
1. **Catalog View:** Grid view listing MCP servers with real-time health pings, authentication requirements (OAuth, API Key, None), capability tags (Tools, Resources, Prompts), and static security inspection scores.
2. **Filtering:** Granular filters for capabilities, required permissions (Network, File System, Subprocess), and runtime (Node.js, Python, Docker).
3. **Detail Page:** Deep teardown of the MCP server's exposed JSON-RPC tool schemas, argument definitions, permissions requested, open-source license, GitHub commit history, and automated health check status.
4. **Integration:** One-click client config snippet generation for Claude Desktop, Cursor, and Zed.

### Documented / Observed Interface Artifacts
* **Security Inspection Tags:** `Network Access Requested`, `File System Read/Write`, `Subprocess Execution`, `OAuth Token Required`.
* **Health Monitoring:** Automated periodic pings checking server response latency and schema validity.

### Architecture Inferences & Clues
* **Backend:** Automated static analyzer parsing MCP server source code and Dockerfiles to extract tool definitions and detect dangerous calls (`fetch`, `exec`, `fs.writeFile`).
* **Strengths:** Industry best practice for security disclosure and schema introspection.
* **Limitations:** Focused strictly on MCP tool servers rather than multi-step agent prompt/workflow orchestration.
