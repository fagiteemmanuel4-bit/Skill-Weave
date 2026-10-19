# Competitive Analysis — SkillWeave Ecosystem Matrix

**Document Status:** Sourced Market Analysis & Evidence-Backed Competitive Matrix
**Research Date / Last Checked:** October 19, 2026
**Scope:** 20 Evaluated Competitors & Ecosystem Platforms

---

## 1. Executive Summary & Market Structure

The market for AI agent capabilities is currently divided into three main categories:
1. **Direct Agent Skill Registries & Specifications:** Standardized markdown/instruction formats (`SKILL.md`) designed for AI coding agents like Claude Code, Cursor, Codex, and OpenCode (e.g., Skills.sh, SkillsMP, AgentSkill.sh, Vercel Skills CLI, Agent Skills Spec).
2. **Model Context Protocol (MCP) Directories:** Platforms indexing MCP servers that expose tools, resources, and prompts over JSON-RPC protocols (e.g., Glama, Smithery, MCP.so, Awesome MCP Servers).
3. **Adjacent Automation & Prompt Marketplaces:** General low-code automation tools, prompt directories, and platform-specific plugin indexes (e.g., n8n Workflows, PromptBase, FlowGPT, Composio).

### Core Finding (INFERRED)
Based on public interface inspection and documented specifications across reviewed platforms, **no existing platform currently combines version-controlled, dependency-aware multi-step workflow manifests with reproducible execution test records.** Existing platforms focus primarily on search indexing (e.g., AgentSkill.sh), CLI installation of single skill files (e.g., Vercel Skills CLI), or link directory aggregation (e.g., Awesome MCP Servers).

*Note on Market Research Limitations:* Access status was recorded on October 19, 2026. Certain platforms (PromptBase, FlowGPT, Cursor Directory, mcpservers.org) returned HTTP 403/429 access restrictions during HTTP automated requests. Their capabilities are reported strictly as UNVERIFIED or based on documented public claims without assuming non-existence.

---

## 2. Competitive Landscape Matrix (20 Evaluated Targets)

*Classification Legend:*
- **OBSERVED:** Directly visible in public UI, CLI commands, or source code.
- **DOCUMENTED:** Stated in official documentation, README files, or release notes.
- **INFERRED:** Reasoned interpretation of public evidence.
- **UNVERIFIED:** Claim not established due to access restrictions or missing documentation.

| Competitor Name & Source URL | Target User & Primary Purpose | Catalog Curation & Depth | Search & Discovery Model | Workflow Composition | Compatibility Declarations | Provenance & Licensing | Security & Trust Disclosures | Installation / Developer Experience | Functional Quality Evidence | Versioning & Reproducibility | Team & Governance | Monetization & Pricing | APIs, CLIs & Surfaces | Key Findings & Evidence Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Skills.sh**
https://skills.sh/ | Agent developers seeking curated instruction skills | Curated + Vercel Labs sync (**OBSERVED**) | Fuzzy title search + Categories (**OBSERVED**) | No multi-step DAG workflows (**OBSERVED**) | Lists supported agents (Claude Code, Cursor, Codex, OpenCode) (**OBSERVED**) | GitHub repo link & commit SHA (**OBSERVED**) | Verified badge; no deep scan reports (**OBSERVED**) | `npx skills add <repo>` (**OBSERVED**) | Not found in reviewed UI (**UNVERIFIED**) | Git commit SHA based (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Free / Open source (**DOCUMENTED**) | Web UI, `npx skills` CLI (**OBSERVED**) | Pristine CLI installation DX; limited to atomic skills. (**OBSERVED**) |
| **2. SkillsMP**
https://skillsmp.com/ | Buyers & creators of Claude/Codex skills | PR + self-submit listing (**DOCUMENTED**) | Semantic & keyword search (**OBSERVED**) | Collections / lists (**OBSERVED**) | Agent tag labels (**OBSERVED**) | Author link & license tag (**OBSERVED**) | Basic verification tag (**OBSERVED**) | Zip download or text copy (**OBSERVED**) | User reviews / ratings (**OBSERVED**) | Static version labels (**OBSERVED**) | Not found (**UNVERIFIED**) | Paid & free skills ($0–$49) (**OBSERVED**) | Web marketplace UI (**OBSERVED**) | Commercial marketplace focus; lacks CLI installer & evaluation runner. (**OBSERVED**) |
| **3. AgentSkill.sh**
https://agentskill.sh/ | Mass search for GitHub agent skills | Scraped 275k+ claimed skills (**OBSERVED**) | Full-text search + tags (**OBSERVED**) | No (**OBSERVED**) | Supported agent tags (**OBSERVED**) | Scraped GitHub repo link (**OBSERVED**) | Security badge displayed without methodology (**OBSERVED**) | `npx @agentskill.sh/cli@latest` (**OBSERVED**) | Not found (**UNVERIFIED**) | GitHub commit history (**OBSERVED**) | Not found (**UNVERIFIED**) | Ad-supported / Directory (**OBSERVED**) | Web UI, CLI package (**OBSERVED**) | High scale (275k+ index); high noise and unverified security badges. (**OBSERVED**) |
| **4. The Bao Skills Registry**
https://github.com/the-bao/skills-registry | OpenClaw / Codex skill users | GitHub PR submissions (**DOCUMENTED**) | README directory list (**OBSERVED**) | No (**OBSERVED**) | Claude Code, Codex, OpenClaw (**DOCUMENTED**) | License file in repo (**OBSERVED**) | Not found (**UNVERIFIED**) | Git clone / file copy (**OBSERVED**) | Not found (**UNVERIFIED**) | Git commit log (**OBSERVED**) | Not found (**UNVERIFIED**) | Free / Open source (**DOCUMENTED**) | GitHub repository (**OBSERVED**) | Lightweight community markdown list; lacks web UI and CLI package. (**OBSERVED**) |
| **5. Agent-mag Skills Registry**
https://github.com/Agent-mag/skills | Open agent community | PR submission registry (**DOCUMENTED**) | Web catalog + GitHub list (**OBSERVED**) | No (**OBSERVED**) | Agent tag labels (**OBSERVED**) | MIT License / Repo link (**OBSERVED**) | Not found (**UNVERIFIED**) | File copy / Git clone (**OBSERVED**) | Not found (**UNVERIFIED**) | Git commit log (**OBSERVED**) | Not found (**UNVERIFIED**) | Free / Open source (**DOCUMENTED**) | Web catalog, GitHub repo (**OBSERVED**) | Open community submission model linked to digital publication. (**DOCUMENTED**) |
| **6. Agent Skills Spec**
https://github.com/agentskills/agentskills | Specification for AI skills | Universal standard spec (**DOCUMENTED**) | N/A (Specification) (**DOCUMENTED**) | Defines atomic `SKILL.md` format (**DOCUMENTED**) | Universal specification format (**DOCUMENTED**) | Specification license (**DOCUMENTED**) | N/A (**DOCUMENTED**) | Standard format compliance (**DOCUMENTED**) | N/A (**DOCUMENTED**) | SemVer specification (**DOCUMENTED**) | N/A (**DOCUMENTED**) | Open standard (**DOCUMENTED**) | Spec docs, parser spec (**DOCUMENTED**) | The canonical format standard for `SKILL.md` adopted across 75+ agents. (**DOCUMENTED**) |
| **7. Anthropic Skills**
https://github.com/anthropics/skills | Claude Code users | Official Anthropic repo (**OBSERVED**) | GitHub tree navigation (**OBSERVED**) | Skill packs (**OBSERVED**) | Claude Code / Anthropic agents (**DOCUMENTED**) | MIT License (**OBSERVED**) | Internal prompt safety review (**DOCUMENTED**) | `npx skills add anthropics/skills` (**DOCUMENTED**) | Internal evaluation testing (**INFERRED**) | Git commit SHA (**OBSERVED**) | Not found (**UNVERIFIED**) | Free / Open source (**DOCUMENTED**) | GitHub repo, Skills CLI (**OBSERVED**) | Reference skill implementations for Claude Code environment. (**OBSERVED**) |
| **8. Vercel Skills CLI**
https://github.com/vercel-labs/skills | Developers installing skills | Automated CLI parser (**OBSERVED**) | CLI search (`npx skills search`) (**OBSERVED**) | No (**OBSERVED**) | Detects 75+ agent configs (**DOCUMENTED**) | GitHub repository parser (**OBSERVED**) | Basic file sanity check (**OBSERVED**) | `npx skills add <repo>` (**OBSERVED**) | Not found (**UNVERIFIED**) | Git commit SHA pinning (**OBSERVED**) | Not found (**UNVERIFIED**) | Open source (MIT) (**DOCUMENTED**) | TypeScript CLI (`npx skills`) (**OBSERVED**) | Gold standard multi-agent config writer engine (`src/detectors`). (**OBSERVED**) |
| **9. Smithery**
https://smithery.ai/ | MCP server developers & agents | Submitted MCP servers (**OBSERVED**) | Semantic search + categories (**OBSERVED**) | Server bundles (**OBSERVED**) | Claude Desktop, Cursor, MCP Clients (**DOCUMENTED**) | GitHub repo link (**OBSERVED**) | Docker build check (**OBSERVED**) | `npx smithery install` (**OBSERVED**) | Server health ping (**OBSERVED**) | Docker image tags / Git SHA (**OBSERVED**) | Not found (**UNVERIFIED**) | Developer hosting tiers (**DOCUMENTED**) | Web UI, CLI, MCP Gateway (**OBSERVED**) | Hosted MCP server execution gateway and CLI installer. (**OBSERVED**) |
| **10. Glama MCP Directory**
https://glama.ai/mcp/servers | Enterprise MCP server users | Automated security scan (**OBSERVED**) | Capabilities, auth, pricing filter (**OBSERVED**) | No (**OBSERVED**) | Standard MCP Clients (**DOCUMENTED**) | Provenance & GitHub owner (**OBSERVED**) | Deep static code analysis & risk tags (**OBSERVED**) | One-click client JSON copy (**OBSERVED**) | Server uptime monitor (**OBSERVED**) | Version tags (**OBSERVED**) | Not found (**UNVERIFIED**) | Sponsored server listings (**DOCUMENTED**) | Web UI, REST API (**OBSERVED**) | Granular security disclosures (Network, Filesystem, Subprocess tags). (**OBSERVED**) |
| **11. MCP.so**
https://mcp.so/ | AI developers and power users | Community submission (**OBSERVED**) | Keyword search (**OBSERVED**) | No (**OBSERVED**) | Claude, Cursor, Windsurf (**DOCUMENTED**) | Repo link (**OBSERVED**) | Basic static scan badge (**OBSERVED**) | Config snippet copy (**OBSERVED**) | Not found (**UNVERIFIED**) | Not found in reviewed sources (**UNVERIFIED**) | Not found (**UNVERIFIED**) | Promoted listings (**DOCUMENTED**) | Web UI (**OBSERVED**) | Clean community-driven directory with tag filtering. (**OBSERVED**) |
| **12. PromptBase**
https://promptbase.com/ | Non-technical prompt buyers | Paid review team (*HTTP 403 access*) | Category & model filters (**DOCUMENTED**) | No (**DOCUMENTED**) | Midjourney, ChatGPT, Claude (**DOCUMENTED**) | Creator profiles (**DOCUMENTED**) | Human review of prompts (**DOCUMENTED**) | Copy-paste text (**DOCUMENTED**) | User ratings & sales counts (**DOCUMENTED**) | Versioned prompt updates (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Paid prompts ($1.99–$9.99) (**DOCUMENTED**) | Web marketplace UI (**DOCUMENTED**) | Commercial marketplace for static prompts (*Site blocked automated HTTP request*). (**UNVERIFIED**) |
| **13. FlowGPT**
https://flowgpt.com/ | Prompt creators & chat users | Community submission (*HTTP 403 access*) | Search & leaderboard (**DOCUMENTED**) | No (**DOCUMENTED**) | Web Chat, Custom GPTs (**DOCUMENTED**) | Creator attribution (**DOCUMENTED**) | Community flagging (**DOCUMENTED**) | Web chat runner (**DOCUMENTED**) | User likes & view counts (**DOCUMENTED**) | Draft vs published state (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Creator fund (**DOCUMENTED**) | Web UI, Mobile app (**DOCUMENTED**) | High-traffic community chat prompt portal (*Site blocked automated HTTP request*). (**UNVERIFIED**) |
| **14. Cursor Directory**
https://cursor.directory/ | Cursor IDE developers | Community submissions (*HTTP 429 access*) | Tech stack & framework search (**DOCUMENTED**) | No (**DOCUMENTED**) | Cursor IDE (`.cursorrules`) (**DOCUMENTED**) | Author link (**DOCUMENTED**) | Not found (**UNVERIFIED**) | One-click copy to `.cursorrules` (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Not found in reviewed sources (**UNVERIFIED**) | Not found (**UNVERIFIED**) | Free / Open source (**DOCUMENTED**) | Web UI (**DOCUMENTED**) | Framework-specific Cursor prompt rules (*Site rate-limited automated HTTP request*). (**UNVERIFIED**) |
| **15. Composio**
https://composio.dev/ | Enterprise agent builders | Curated SaaS integrations (**OBSERVED**) | Tool & SaaS app search (**OBSERVED**) | Multi-tool workflows (**OBSERVED**) | LangChain, LlamaIndex, CrewAI (**DOCUMENTED**) | Verified integrations (**OBSERVED**) | SOC2, OAuth token isolation (**DOCUMENTED**) | SDK (`pip install composio`) (**OBSERVED**) | Integration test suite (**DOCUMENTED**) | Versioned SDK packages (**DOCUMENTED**) | Enterprise SSO & RBAC (**DOCUMENTED**) | Usage-based pricing (**DOCUMENTED**) | REST API, Python/TS SDKs (**OBSERVED**) | Enterprise SaaS authentication and tool execution management platform. (**OBSERVED**) |
| **16. n8n Workflow Templates**
https://n8n.io/workflows | Automation engineers | Team & community curated (**OBSERVED**) | Trigger & category search (**OBSERVED**) | Visual DAG workflows (**OBSERVED**) | n8n cloud & self-hosted (**DOCUMENTED**) | Author profile (**OBSERVED**) | Node security audit (**DOCUMENTED**) | One-click import JSON (**OBSERVED**) | Execution success rate (**OBSERVED**) | Workflow JSON versioning (**OBSERVED**) | n8n Enterprise team roles (**DOCUMENTED**) | Paid enterprise tiers (**DOCUMENTED**) | Web UI, REST API, JSON export (**OBSERVED**) | Gold standard for multi-step visual DAG workflow composition and versioning. (**OBSERVED**) |
| **17. MCP Servers**
https://mcpservers.org/ | MCP tool users | Community PRs (*HTTP 403 access*) | Category list (**DOCUMENTED**) | No (**DOCUMENTED**) | Claude Desktop (**DOCUMENTED**) | Repo link (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Config copy (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Git commit history (**DOCUMENTED**) | Not found (**UNVERIFIED**) | Free (**DOCUMENTED**) | Web directory (**DOCUMENTED**) | Static MCP server catalog (*Site blocked automated HTTP request*). (**UNVERIFIED**) |
| **18. MCP Market**
https://mcpmarket.com/ | MCP developers | Curation + submissions (**OBSERVED**) | Search & top lists (**OBSERVED**) | No (**OBSERVED**) | MCP Clients (**DOCUMENTED**) | Repo link (**OBSERVED**) | Basic status ping (**OBSERVED**) | Config copy / CLI snippet (**OBSERVED**) | Not found (**UNVERIFIED**) | Not found in reviewed sources (**UNVERIFIED**) | Not found (**UNVERIFIED**) | Featured listings (**DOCUMENTED**) | Web UI (**OBSERVED**) | Clean developer UI directory for discovering MCP servers. (**OBSERVED**) |
| **19. Awesome MCP Servers**
https://github.com/punkpeye/awesome-mcp-servers | GitHub developers | GitHub Community PRs (**OBSERVED**) | Markdown search (**OBSERVED**) | No (**OBSERVED**) | MCP Clients (**DOCUMENTED**) | GitHub repo link (**OBSERVED**) | Community PR review (**OBSERVED**) | Git clone / copy (**OBSERVED**) | Not found (**UNVERIFIED**) | Git commit history (**OBSERVED**) | Not found (**UNVERIFIED**) | Free / Open source (**DOCUMENTED**) | GitHub Markdown file (**OBSERVED**) | Comprehensive community markdown list of MCP servers (96k+ GitHub stars). (**OBSERVED**) |
| **20. Claude Plugins Registry**
https://claude-plugins.dev/ | Claude Code power users | Community PRs (**OBSERVED**) | Category search (**OBSERVED**) | No (**OBSERVED**) | Claude Code (**DOCUMENTED**) | Repo link (**OBSERVED**) | Static rule checks (**OBSERVED**) | `npx claude-plugins` (**OBSERVED**) | Not found (**UNVERIFIED**) | Version tags (**OBSERVED**) | Not found (**UNVERIFIED**) | Free (**DOCUMENTED**) | Web UI, CLI (**OBSERVED**) | Community plugin directory tailored specifically to Claude Code CLI. (**OBSERVED**) |

---

## 3. Table-Stakes vs. Differentiating Features

### Table-Stakes Features (Observed / Documented across Market Leaders)
1. **Web Directory with Keyword Search & Filtering:** Keyword search, category tags (e.g., Coding, DevOps, Data), and basic author attribution.
2. **Standard CLI Installer:** Command-line tool capable of writing instructions into local agent configuration paths (`npx skills add <repo>`).
3. **GitHub Repository Synchronization:** Automatic parsing of public GitHub `SKILL.md` or `README.md` files via pull requests or webhooks.
4. **Git Commit SHA Pinning:** Tracking the precise commit SHA of imported skill files.

### Differentiating Opportunities for SkillWeave (Proposed Strategy)
1. **Multi-Step Composable Workflows:** Going beyond single skills to define ordered, versioned, multi-tool workflow DAGs (`skillweave.yml`).
2. **Automated Runtime Compatibility Matrix:** Continuous evaluation testing across multiple agent runtimes (Claude Code, Cursor, Codex, OpenCode) with published test results.
3. **Reproducible Outcome Evaluation Records:** Publishing immutable test run logs showing pass/fail execution history on standard task fixtures (e.g., WCAG accessibility audits, test suites).
4. **4-Axis Trust Scorecard:** Unbundling security into explicit, separate signals: (a) Source Provenance, (b) License Compliance, (c) Static Security Scan, and (d) Functional Execution Evidence.
5. **Private Team Registries & Governance:** Providing enterprise teams with private workflow hosting, role-based permission disclosures, and audit trails.

---

## 4. Platform Owner Threats & Market Risks

1. **Anthropic / Vercel Ecosystem Integration:** Vercel (`skills.sh` + `npx skills`) or Anthropic (`anthropics/skills`) could incorporate workflow composition directly into `npx skills` or Claude Code.
   *Mitigation:* SkillWeave must remain strictly cross-platform and focus on multi-agent compatibility and evaluation transparency, which platform owners have less commercial incentive to build for competitors.
2. **High Cost of Automated Evaluation:** Running agent workflows in sandboxes against standard benchmarks incurs significant LLM API token and infrastructure costs.
   *Mitigation:* Enable a client-side CLI test runner where developers run evaluations using their own local agent credentials, uploading cryptographically signed test result manifests to SkillWeave.
3. **Model Non-Determinism:** LLM model updates (e.g., Claude 3.5 Sonnet → Claude 3.7) can alter workflow performance without code changes.
   *Mitigation:* Every evaluation record explicitly pins both the workflow git commit SHA **and** the specific foundation model version + agent runtime version tested.
