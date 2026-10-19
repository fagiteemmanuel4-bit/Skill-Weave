# Reverse Engineering Notes — Top 5 Competitors

**Document Status:** Public Interface & Documentation Teardowns
**Research Date / Last Checked:** October 19, 2026
**Targets Analyzed:** Skills.sh, SkillsMP, AgentSkill.sh, Vercel Skills CLI, Glama MCP Directory

---

## 1. Skills.sh (Vercel Ecosystem)

### Product Overview
* **URL:** https://skills.sh/
* **Backing:** Vercel Labs (**DOCUMENTED**)
* **Primary Function:** Curated directory and CLI installer for `SKILL.md` instruction files compatible with 75+ coding agents.

### Public User Journey
1. **Landing Page:** Minimalist dark-mode landing page displaying featured skills, category filters (e.g., React, Next.js, Testing), search bar, and install commands. (**OBSERVED**)
2. **Search Experience:** Instant client-side fuzzy search over skill names, descriptions, and author names. (**OBSERVED**)
3. **Detail Page:** Renders parsed `SKILL.md` content, supported agent list, author attribution (GitHub user/repo link), install button (`npx skills add <owner>/<repo>`), and static verification badge. (**OBSERVED**)
4. **Installation Flow:** User runs `npx skills add <repo>` in their local terminal. The CLI scans local directories to detect agent configuration files (e.g., `.claude/mcp.json`, `.cursorrules`, `.opencode/skills.json`), parses the target `SKILL.md`, and writes instructions into the local agent's configuration directory. (**DOCUMENTED**)

### Documented / Observed Interface Artifacts
* **CLI Command:** `npx skills add <github-owner>/<repo>` (**OBSERVED**)
* **CLI Search:** `npx skills search <query>` (**OBSERVED**)
* **Observed Registry Metadata Schema:**
  ```json
  {
    "name": "nextjs-best-practices",
    "description": "Rules and guidelines for Next.js App Router",
    "repository": "https://github.com/vercel-labs/skills",
    "path": "skills/nextjs-best-practices/SKILL.md",
    "supported_agents": ["claude-code", "cursor", "codex", "opencode"]
  }
  ```

### Architecture Inferences & Clues
* **Frontend:** Next.js App Router hosted on Vercel Edge Network. (**INFERRED**)
* **Registry Backend:** Edge-cached static JSON files backed by GitHub Webhooks triggering automated static validation. (**INFERRED**)
* **Strengths:** Excellent developer experience (DX), zero install friction (`npx skills`). (**OBSERVED**)
* **Limitations:** Focuses strictly on single, isolated `SKILL.md` files. No support for multi-step workflows, dependency ordering, or pass/fail execution evidence. (**OBSERVED**)

---

## 2. SkillsMP (Skills Marketplace)

### Product Overview
* **URL:** https://skillsmp.com/
* **Primary Function:** Commercial marketplace for buying, selling, and listing agent skills for Claude Code, Cursor, and Codex.

### Public User Journey
1. **Landing Page:** Marketplace grid layout featuring paid and free skills, pricing badges ($0–$49), star ratings, buyer counts, and category tags. (**OBSERVED**)
2. **Search & Filter:** Search by target agent (Codex, Claude, Cursor), price tier (Free, Paid), or domain (Frontend, DevOps, Security). (**OBSERVED**)
3. **Detail Page:** Skill marketing pitch, creator profile, pricing checkout button, sample instructions preview, and customer reviews. (**OBSERVED**)
4. **Purchase & Delivery:** Upon payment, the user receives access to download the skill archive (ZIP) or copy the raw markdown prompt. (**OBSERVED**)

### Documented / Observed Interface Artifacts
* **Creator Listing Form Fields:** Title, Short Description, Detailed Instructions (`SKILL.md`), Compatible Agents, Price (USD), Licensing Rights (Personal / Commercial). (**OBSERVED**)
* **Delivery Mechanism:** Zip file download or web-copy code block. (**OBSERVED**)

### Architecture Inferences & Clues
* **Monetization Engine:** Stripe Connect for creator payouts and platform fees. (**INFERRED**)
* **Strengths:** Unlocks commercial incentive for skill creators. (**OBSERVED**)
* **Limitations:** Lacks CLI integration or automated installation. Manual file copying is prone to setup errors. Zero automated functional testing. (**OBSERVED**)

---

## 3. AgentSkill.sh (Mass Indexer)

### Product Overview
* **URL:** https://agentskill.sh/
* **Primary Function:** Broad directory claiming to index 275,000+ AI agent skills scraped across GitHub repositories.

### Public User Journey
1. **Landing Page:** Search-centric layout with trend charts, top categories, and total indexed count counter (275,000+). (**OBSERVED**)
2. **Search Experience:** Full-text search engine querying scraped GitHub repositories containing markdown files matching skill formats. (**OBSERVED**)
3. **Detail Page:** Displays scraped GitHub README/SKILL content, star counts, fork counts, author profile, and install snippet (`npx @agentskill.sh/cli@latest install <skill-id>`). (**OBSERVED**)

### Documented / Observed Interface Artifacts
* **CLI Command:** `npx @agentskill.sh/cli@latest install <id>` (**OBSERVED**)
* **Scraped Metadata Fields:** GitHub Repo URL, Stars, Forks, Last Commit Date, Language, Detected Agent Target. (**OBSERVED**)

### Architecture Inferences & Clues
* **Backend:** Automated GitHub crawler scanning public repositories for `SKILL.md`, `.cursorrules`, and `.claude.json` files; indexed in full-text search database. (**INFERRED**)
* **Strengths:** High scale and broad catalog reach. (**OBSERVED**)
* **Limitations:** Extremely high noise-to-signal ratio. Scraped unverified repositories pose prompt injection and security risks. Displays security badges without published methodology. (**OBSERVED**)

---

## 4. Vercel Skills CLI (`vercel-labs/skills`)

### Product Overview
* **Repository:** https://github.com/vercel-labs/skills
* **Primary Function:** Open-source TypeScript CLI tool powering the `npx skills` ecosystem.

### Observed Public Source Architecture (Inspected via Public GitHub Repository)
* **Core Source Files Inspected:**
  1. `src/detectors/`: Scans local working directory for known agent config paths (e.g., `.claude/`, `.cursor/rules/`, `.codex/`). (**OBSERVED in repository source**)
  2. `src/parsers/`: Validates frontmatter in `SKILL.md` (requiring `name` and `description` string fields). (**OBSERVED in repository source**)
  3. `src/writers/`: Merges skill instructions into agent-specific config files without corrupting existing user rules. (**OBSERVED in repository source**)

* **Supported Agent Auto-Detection Logic:**
  * Claude Code: `.claude/` directory or `claude.json` (**DOCUMENTED in `docs/agents.md`**)
  * Cursor: `.cursorrules` or `.cursor/rules/` (**DOCUMENTED in `docs/agents.md`**)
  * OpenCode: `.opencode/skills/` (**DOCUMENTED in `docs/agents.md`**)
  * Codex: `.codex/` (**DOCUMENTED in `docs/agents.md`**)

### Strengths & Weaknesses
* **Strengths:** Universal multi-agent config writing engine; standard-setter for local agent detection. (**OBSERVED**)
* **Weaknesses:** No state management or version locking for installed skills. Uninstalling or updating skills requires manual file editing. (**OBSERVED**)

---

## 5. Glama MCP Directory

### Product Overview
* **URL:** https://glama.ai/mcp/servers
* **Primary Function:** Directory and security inspection platform for Model Context Protocol (MCP) servers (105,900+ indexed servers observed on Oct 19, 2026).

### Public User Journey
1. **Catalog View:** Grid view listing MCP servers with real-time health pings, authentication requirements (OAuth, API Key, None), capability tags (Tools, Resources, Prompts), and static security inspection scores. (**OBSERVED**)
2. **Filtering:** Granular filters for capabilities, required permissions (Network, File System, Subprocess), and runtime (Node.js, Python, Docker). (**OBSERVED**)
3. **Detail Page:** Deep teardown of the MCP server's exposed JSON-RPC tool schemas, argument definitions, permissions requested, open-source license, GitHub commit history, and automated health check status. (**OBSERVED**)
4. **Integration:** Client config snippet generation for Claude Desktop, Cursor, and Zed. (**OBSERVED**)

### Documented / Observed Interface Artifacts
* **Security Inspection Tags:** `Network Access Requested`, `File System Read/Write`, `Subprocess Execution`, `OAuth Token Required`. (**OBSERVED**)
* **Health Monitoring:** Automated pings checking server response latency and schema validity. (**DOCUMENTED**)

### Architecture Inferences & Clues
* **Backend:** Automated static analyzer parsing MCP server source code and Dockerfiles to extract tool definitions and detect dangerous system calls (`fetch`, `exec`, `fs.writeFile`). (**INFERRED**)
* **Strengths:** Industry best practice for security disclosure and schema introspection. (**OBSERVED**)
* **Limitations:** Focused strictly on MCP tool servers rather than multi-step agent prompt/workflow orchestration. (**OBSERVED**)
