# Competitive Analysis — SkillWeave Ecosystem Matrix

**Document Status:** Complete Sourced Market Analysis
**Last Updated:** February 2025
**Scope:** 20 Verified Competitors & Adjacent Ecosystem Platforms

---

## 1. Executive Summary & Market Structure

The market for AI agent capabilities is currently bifurcated into three main categories:
1. **Direct Agent Skill Registries & Specifications:** Standardized markdown/instruction formats (`SKILL.md`) designed for AI coding agents like Claude Code, Cursor, Codex, and OpenCode (e.g., Skills.sh, SkillsMP, AgentSkill.sh, Vercel Skills CLI, Agent Skills Spec).
2. **Model Context Protocol (MCP) Directories:** Platforms indexing MCP servers that expose tools, resources, and prompts over JSON-RPC protocols (e.g., Glama, Smithery, MCP.so, Awesome MCP Servers).
3. **Legacy Prompt & Automation Marketplaces:** General low-code automation tools, prompt directories, and platform-specific plugin indexes (e.g., n8n Workflows, PromptBase, FlowGPT, Composio).

### Core Finding
**Zero existing platforms provide a unified, version-controlled, dependency-aware workflow registry with verifiable execution results.** Competitors focus either on raw search volume (AgentSkill.sh: 275k skills), distribution CLI tools (Vercel Skills CLI), or simple link curation (Awesome MCP Servers).

---

## 2. Competitive Landscape Matrix (20 Evaluated Targets)

*Note on Values: "Yes—verified", "Partial", "Not found in reviewed sources", "Unverified", "N/A"*

| Competitor Name | Primary Target User | Catalog Curation | Search & Discovery Model | Bundles & Workflow Composition | Compatibility Declarations | Provenance & Licensing | Security & Trust Disclosures | Installation / Developer Experience | Functional Quality Evaluation | Versioning & Reproducibility | Team & Private Registry | Creator Tools & Monetization | APIs, CLIs & Surfaces | Relevant Features to SkillWeave | Strongest Advantage | Most Critical Gap / Limitation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Skills.sh** | Coding Agent Developers | High (Vercel curated + GH sync) | Algorithmic + Category filters | No (Single skill focus) | Declared supported agents list | GH Repo linked | Static scan badges | `npx skills add` | Not found | Git commit SHA based | Not found | Free / Open source | Web UI, `npx skills` CLI | `npx skills` installation model, agent auto-detection | Vercel backing & pristine CLI DX | No workflow composition or pass/fail evaluation records |
| **2. SkillsMP** | Claude/Codex Skill Buyers & Creators | Hybrid (PR + Self-submit) | Semantic / Keyword search | Partial (Collections) | Agent tag labels | Author link + License tag | Basic verification tag | Manual copy or zip download | Not found | Static versioning | Not found | Paid skill listings | Web marketplace UI | Market UI layout, buyer/creator workflow | Monetization & creator listing focus | Lacks CLI tooling and execution verification |
| **3. AgentSkill.sh** | Agent Developers (Mass Index) | Automated indexing (275k+) | Full-text search + Tags | No | Supported agents list | GH link extracted | Unverified security badge | `npx @agentskill.sh/cli` | Not found | Unverified | Not found | Ad-supported / Directory | Web UI, CLI package | Mass directory search patterns | Sheer scale of indexed skills (275k+) | Extremely high noise-to-signal ratio; unverified skills |
| **4. The Bao Skills Registry** | OpenClaw / Codex Users | Low (Community GitHub PR) | Basic README list | No | Claude Code, Codex, OpenClaw | License file in repo | Not found | Git clone / manual copy | Not found | Git commit history | Not found | Free / Open source | GitHub Repo | Markdown format specs | Lightweight & transparent | No web interface or CLI manager |
| **5. Agent-mag Skills Registry** | Open Agent Ecosystem | Curated PR submissions | Web catalog + GitHub list | No | Tag-based agent labels | MIT / Repo links | Not found | Manual copy / Git clone | Not found | Git commit history | Not found | Free / Open source | Web site + GH repo | Open community submission model | Community newsletter integration | Very small catalog size (<50 skills) |
| **6. Agent Skills Specification** | Standard Specification | Open Standard (Anthropic lead) | N/A (Spec repo) | No (Spec only) | Universal specification | Specification license | N/A | Format compliance | N/A | Semantic versioned spec | N/A | Open Standard | Spec docs, `SKILL.md` parser | The `SKILL.md` canonical format spec | Industry standard format adopted by 75+ agents | Only defines format; no hosting or workflow layer |
| **7. Anthropic Skills Repo** | Claude Code Users | Official Anthropic curation | GitHub directory tree | Partial (Skill packs) | Claude Code / Anthropic agents | MIT License | Static prompt review | `npx skills add anthropics/skills` | Internal testing | Git commit history | Not found | Free / Open source | GitHub repo, Skills CLI | Reference implementations for agent tools | Official Anthropic backing & quality code | Single-agent focus (Claude-centric) |
| **8. Vercel Skills CLI** | Agent Developers & CLI tools | Automatic CLI index | CLI search (`npx skills search`) | No | Auto-detects 75+ agent configs | GitHub repo parsing | Static check during import | `npx skills add <repo>` | Not found | Git commit SHA pinning | Not found | Open source (Vercel) | CLI (`npx skills`), JSON registry | Agent config auto-detection engine | Seamless multi-agent config writer | CLI only; lacks rich evaluation & governance |
| **9. Smithery** | MCP Server Developers | Medium (Submitted MCPs) | Semantic search + Categories | Partial (Server bundles) | Claude Desktop, Cursor, MCP Clients | Repo link | Docker build check | `npx smithery install` | Health status ping | Docker tag / Git SHA | Not found | Developer hosting tiers | Web UI, CLI, MCP Gateway API | Auto-hosting and proxying for MCP servers | Hosted MCP execution gateway | High runtime dependency overhead; MCP only |
| **10. Glama MCP Directory** | MCP Developers & Enterprise | High (Automated security scan) | Filter by capability, auth, pricing | No | Standard MCP Clients | Provenance, GitHub owner | Deep static code analysis + risk tags | One-click client integration | Server uptime check | Version tags | Not found | Paid sponsored listings | Web UI, REST API | Granular security disclosures and permissions | Deepest security analysis for MCP servers | Focused on MCP protocol; no high-level workflows |
| **11. MCP.so** | General AI Users & Developers | Community submission | Keyword search | No | Claude, Cursor, Windsurf | Repo link | Basic static scan | Config snippet copy | Not found | Not found | Not found | Promoted listings | Web UI | Community-driven tag system | Clean SEO-optimized directory | Lacks CLI tools and automated compatibility checks |
| **12. PromptBase** | Non-technical Prompt Buyers | Paid curation / Review | Category & Model filters | No | Midjourney, ChatGPT, Claude | Author profile | Human review of prompts | Copy-paste prompt | Star ratings / Sales count | Versioned prompt updates | Not found | Commission per prompt sale | Web marketplace UI | Monetization mechanics for prompt creators | Established creator marketplace revenue model | Static text prompts; completely unsuitable for agent code |
| **13. FlowGPT** | AI Enthusiasts & Creators | Community + Algorithmic rank | Search + Prompt leaderboard | No | Custom GPTs, Web Chat | Author attribution | Community flags | Web chat runner | User like/view count | Draft vs Published state | Not found | Creator reward fund | Web UI, Mobile app | Leaderboard and social engagement loops | Massive user traffic and viral discovery | Low-code chat focus; no software engineering workflows |
| **14. Cursor Directory** | Cursor IDE Users | Community submissions | Search by tech stack / framework | No | Cursor IDE (`.cursorrules`) | Author link | Not found | One-click copy to `.cursorrules` | Not found | Not found | Not found | Free / Open source | Web UI | Framework-specific prompt rules | Extreme simplicity (`.cursorrules` snippet copy) | Restricted to Cursor IDE rules format |
| **15. Composio** | Enterprise Agent Builders | Proprietary Curation | Tool & SaaS app search | Yes (Multi-tool workflows) | LangChain, LlamaIndex, CrewAI | Verified SaaS integrations | SOC2, OAuth token isolation | SDK (`pip install composio`) | Integration test suite | Versioned SDK packages | Yes (Enterprise SSO) | Usage-based pricing | REST API, Python/TS SDKs | OAuth authentication management | Production-grade SaaS authentication handling | Proprietary closed platform; heavy SDK lock-in |
| **16. n8n Workflow Templates** | Automation Engineers | High (n8n team + Community) | App trigger & Category search | Yes (Full visual DAG workflows) | n8n self-hosted / cloud | Template author profile | Security audit of nodes | One-click import to n8n | Execution success rates | Workflow JSON versioning | Yes (n8n Enterprise) | Template monetization | Web UI, REST API, JSON export | Multi-step DAG workflow representation | Gold standard for visual workflow composition | Low-code focus; not designed for autonomous agent execution |
| **17. MCP Servers** | MCP Tool Users | Community PRs | Category list | No | Claude Desktop | Repo link | Not found | Config copy | Not found | Git history | Not found | Free | Web directory | Categorization schema | Clean category taxonomy | Static list; no interactive evaluation or install CLI |
| **18. MCP Market** | MCP Developers | Curation + Submissions | Search + Top lists | No | MCP Clients | Repo link | Basic status check | Config copy / CLI snippet | Not found | Not found | Not found | Featured listings | Web UI | Feature request submission flow | Good developer UI design | Limited technical evaluation or test evidence |
| **19. Awesome MCP Servers** | GitHub Developers | GitHub Community PR | README Markdown search | No | MCP Clients | GitHub repo link | Community PR review | Git clone | Not found | Git commit history | Not found | Free | GitHub Markdown file | Markdown catalog taxonomy | Universal recognition & standard GitHub community hub | Static markdown file; no programmatic API or CLI |
| **20. Claude Plugins Registry** | Claude Code Power Users | Community GitHub PRs | Search by category & agent | No | Claude Code | Repo link | Static rule checks | `npx claude-plugins install` | Not found | Version tags | Not found | Free | Web UI, CLI | Plugin installation CLI UX | Focused directly on Claude Code ecosystem | Vendor lock-in to Claude Code runtime |

---

## 3. Table-Stakes vs. Differentiating Features

### Table-Stakes Features (Already Universal across Market Leaders)
1. **Web Directory with Search & Filtering:** Keyword search, category tags (e.g., Coding, DevOps, Data), and basic author attribution.
2. **Standard CLI Installer:** Command-line tool capable of writing instructions into local agent configuration paths (`npx skills add <repo>`).
3. **GitHub Repository Synchronization:** Automatic parsing of public GitHub `SKILL.md` or `README.md` files via pull requests or webhooks.
4. **Git Commit SHA Pinning:** Tracking the precise commit SHA of imported skill files.

### Differentiating Opportunities for SkillWeave
1. **Multi-Step Composable Workflows:** Going beyond single skills to define ordered, versioned, multi-tool workflow DAGs (`skillweave.yml`).
2. **Automated Runtime Compatibility Matrix:** Continuous evaluation testing across multiple agent runtimes (Claude Code, Cursor, Codex, OpenCode) with published test results.
3. **Reproducible Outcome Evaluation Records:** Publishing immutable test run logs showing pass/fail execution history on standard task fixtures (e.g., SWE-bench style fixtures, accessibility audits).
4. **4-Axis Trust Scorecard:** Unbundling security into explicit, separate signals: (a) Source Provenance, (b) License Compliance, (c) Static Security Scan, and (d) Functional Execution Evidence.
5. **Private Team Registries & Governance:** Providing enterprise teams with private workflow hosting, role-based permission disclosures, and audit trails.

---

## 4. Platform Owner Threats & Market Risks

1. **Anthropic / Vercel Ecosystem Lock-In:** Vercel (`skills.sh` + `npx skills`) or Anthropic (`anthropics/skills`) could incorporate workflow composition directly into `npx skills` or Claude Code.
   *Mitigation:* SkillWeave must remain strictly cross-platform and focus on evaluation transparency, which platform owners have less incentive to provide for competitor models.
2. **High Cost of Automated Evaluation:** Running agent workflows in sandboxes against standard benchmarks incurs significant LLM API token and infrastructure costs.
   *Mitigation:* Enable a client-side CLI test runner where developers run evaluations using their own local agent credentials, uploading cryptographically signed test result manifests to SkillWeave.
3. **Model Non-Determinism:** LLM model updates (e.g., Claude 3.5 Sonnet → Claude 3.7) can break previously passing workflows without code changes.
   *Mitigation:* Every evaluation record explicitly pins both the workflow git commit SHA **and** the specific foundation model version + agent runtime version tested.
