# Product Vision — SkillWeave

**Document Status:** Strategic Blueprint & Product Strategy Proposal
**Research Date / Last Checked:** October 19, 2026
**Target Audience:** Founder, Core Engineering Team, Product Researchers

---

## 1. Executive Summary & Problem Statement

### The Problem
The AI agent ecosystem is experiencing rapid fragmentation. Developers and engineering teams face thousands of agent skills, Model Context Protocol (MCP) servers, prompts, and custom tools spread across disjointed directories (e.g., Skills.sh, SkillsMP, Glama, Smithery, GitHub repositories).

However, existing directories present critical limitations:
1. **Directory/List Overload:** Current platforms function primarily as static, keyword-searchable catalogs or star-based aggregators. They list isolated tools rather than end-to-end, outcome-oriented workflows. *(Observed across Skills.sh, SkillsMP, AgentSkill.sh)*
2. **Lack of Compatibility & Versioning Guarantees:** Skills and tools update independently. Developers experience broken workflows due to silent API changes, missing runtime dependencies, or incompatible agent runtime environments (e.g., Claude Code vs. Codex vs. OpenCode). *(Observed / Documented in Vercel Skills CLI issues)*
3. **Implicit Trust & Security Risks:** Static code scanning or security "scores" can create a false sense of security. Prompt injection risks, untrusted bash instruction execution, and unverified data exfiltration vectors are pervasive. *(Documented in Glama security advisories)*
4. **Absence of Functional Outcome Evidence:** High star counts or download metrics on a repository do not establish that a skill successfully completes complex tasks. There are no standardized, reproducible evaluation records or regression histories.

### The SkillWeave Vision
SkillWeave aims to become the **dependable, cross-platform infrastructure layer for discoverable, composable, testable, portable, and reproducible AI workflows**.

Rather than acting as another generic catalog, SkillWeave shifts the paradigm from **tool discovery** to **outcome assurance**. It provides developers with version-pinned, dependency-checked, security-audited, and benchmark-evaluated multi-step agent workflows.

---

## 2. Target Users & Personas

### Primary Persona: The Senior Software Engineer / Lead Developer
* **Context:** Building complex software systems using AI coding agents (Claude Code, Cursor, Windsurf, OpenCode, Codex).
* **Pain Point:** Frustrated by brittle custom scripts and unverified third-party prompt/skill files downloaded from GitHub or marketplaces that break after agent updates or fail silently on edge cases.
* **Goal:** Wants verified, multi-step workflows (e.g., "Full Web Feature Implementation: Web Brief → Architecture Plan → UI Implementation → Accessibility Verification → E2E Test Suite") that work reliably out of the box with minimal setup friction.

### Secondary Persona: Engineering Manager / Tech Lead
* **Context:** Managing a team of developers adopting AI agents.
* **Pain Point:** Concerned about security compliance (prompt injection, secret leaks, licenses), lack of standardization across developer workstations, and unverified AI output quality.
* **Goal:** Requires governance, approved version-pinned workflow registries, permission disclosures, and verifiable regression/evaluation history.

### Strategic Anti-Persona: Non-Technical Prompt Enthusiast
* **Context:** Seeking lightweight text prompts, image generation presets, or casual chat templates.
* **Non-Goal Alignment:** SkillWeave explicitly does NOT target low-code prompt marketplaces (e.g., PromptBase, FlowGPT).

---

## 3. Core Product Principles

SkillWeave adheres to eight fundamental product principles defined in the repository guardrails (`AGENTS.md`):

1. **Outcome-First:** Help users find and execute a workflow for a concrete job, rather than merely browsing a massive pile of uncoordinated skills.
2. **Evidence Over Popularity:** Stars, downloads, rankings, and testimonials are discovery signals—not proof that a workflow succeeds.
3. **Separate Trust Dimensions:** Never conflate source provenance, software license, security findings, compatibility declarations, functional quality, and evaluation results into a single unexplained score.
4. **Reproducibility:** Record exact component versions, git commit SHAs, agent runtime versions, task fixtures, evaluation rubrics, execution logs, cost, and duration.
5. **Human Control & Explicit Consent:** Make installation, permission requests, execution boundaries, and file-system changes explicit. Never imply code is safe simply because it passed static checks.
6. **Portable by Design:** Prefer open, documented formats and CLI interfaces that operate across agent runtimes while explicitly logging platform-specific nuances.
7. **Narrow Before Broad:** Validate one highly valuable, reproducible workflow (e.g., Web Brief to Tested Web Experience) before scaling a universal marketplace.
8. **Honest Uncertainty:** Clearly distinguish observed facts from inferences, and label unverified claims.

---

## 4. Evaluation of Strategic Hypotheses

SkillWeave's strategic direction rests on four core hypotheses. Each is evaluated below with its evidence classification:

### Hypothesis A: Outcome-Based Workflow Discovery vs. Individual Skill Search
* **Statement:** Developers prefer discovering workflows by intended outcome (e.g., "Generate accessible React component with tests") rather than searching for individual skill names.
* **Supporting Evidence (Inferred):** Popular search terms on n8n Workflow Templates (13k+ templates documented at https://n8n.io/workflows) and community request threads indicate high developer interest in multi-tool recipes.
* **Contradictory Evidence (Observed):** Early adopters (e.g., Claude Code power users) frequently search for specific atomic CLI utilities (e.g., `git-commit-helper`, `shadcn-ui-adder`) on https://skills.sh because they prefer composing workflows themselves in natural language.
* **Confidence Level:** **MEDIUM (Inferred / Unverified in market)**.
* **Validation Experiment (Proposed):** Run a concierge A/B experiment presenting 30 developers with (1) a list of 10 atomic skills vs. (2) 2 pre-composed outcome workflows for web feature creation. Measure task completion time, drop-off rate, and qualitative preference.
* **Success Criterion:** >65% of participating developers select and successfully complete the goal using pre-composed workflows rather than assembling atomic skills manually.

### Hypothesis B: Compatibility & Dependency Transparency Materially Improves Adoption
* **Statement:** Explicit dependency graph, version locking, and runtime compatibility declarations reduce workflow breakage and build user trust.
* **Supporting Evidence (Documented / Observed):** Vercel Skills CLI (`npx skills`, https://github.com/vercel-labs/skills) auto-detects agent configurations to prevent installation errors. Glama (https://glama.ai/mcp/servers) maintains explicit permission & capability schemas to avoid runtime incompatibilities.
* **Contradictory Evidence (Inferred):** Simple single-file instructions (`SKILL.md`) have very few external code dependencies; developers often fix minor markdown/prompt mismatches on the fly.
* **Confidence Level:** **HIGH (Documented)**.
* **Validation Experiment (Proposed):** Test 20 top open-source skills across 3 different agent runtimes (Claude Code, Cursor, OpenCode). Measure silent failures vs. explicit schema failures.
* **Success Criterion:** Unpinned skills exhibit >30% runtime failure across different agent runtimes, whereas version-pinned workflows achieve 100% execution consistency.

### Hypothesis C: Reproducible Evaluation Evidence Drives Trust & Adoption
* **Statement:** Developers are significantly more likely to adopt AI workflows if accompanied by immutable, version-specific evaluation records (task fixtures, run counts, pass/fail rates, execution cost).
* **Supporting Evidence (Inferred):** Machine learning research benchmarks (e.g., SWE-bench) drive model adoption in developer tools. Public developer discussion shows skepticism toward unverified marketing claims ("100% accurate code generator").
* **Contradictory Evidence (Observed):** Most developers currently adopt skills based on GitHub star counts, author reputation, or Twitter recommendations without checking evaluation logs.
* **Confidence Level:** **MEDIUM (Unverified in market)**.
* **Validation Experiment (Proposed):** Publish two identical workflow listings—one with static star ratings, and one with verifiable evaluation logs (pass/fail run history on standard task fixtures). Track click-through and installation conversions.
* **Success Criterion:** Evaluation-backed listings achieve a 2x higher installation conversion rate among senior engineering leads.

### Hypothesis D: Reusable Workflows Encourage Repeat Usage & Paid Retention
* **Statement:** High-quality, version-controlled workflows create habit-forming developer routines, driving willingness to pay for private team registries and governance.
* **Supporting Evidence (Documented / Inferred):** Enterprise adoption of Terraform modules, GitHub Actions, and private npm registries demonstrates that reusable workflow infrastructure commands enterprise software budgets.
* **Contradictory Evidence (Observed):** Individual developers strongly prefer free public registries (Skills.sh, GitHub repositories) over paid prompt directories.
* **Confidence Level:** **LOW to MEDIUM (Unverified for AI skills)**.
* **Validation Experiment (Proposed):** Offer a free public registry and survey 30 engineering teams regarding willingness to pay for private workflow hosting, SSO, and permission controls.
* **Success Criterion:** >20% of surveyed engineering managers express immediate budget intent for private team registries with audit logs.

---

## 5. Strategic Scope & Non-Goals

### What SkillWeave IS (Initial Proposal)
- A version-controlled, CLI-driven registry for AI agent skills and multi-step workflows.
- A compatibility matrix and verification engine testing skills against supported agent runtimes.
- A standardized evaluation record framework logging real-world workflow execution results.
- A lightweight web interface for discovering outcome-based workflows with full provenance and trust breakdowns.

### Explicit Non-Goals (What SkillWeave IS NOT Building Yet)
- **NOT an Autonomous Agent Execution Engine:** SkillWeave does not execute agent loops in the cloud or compete with Claude Code or Cursor. It provides the *blueprints and skills* that agents execute locally or in sandboxes.
- **NOT a Low-Code Prompt Marketplace:** No prompt trading, image generation prompts, or non-developer chat templates.
- **NOT an All-in-One Quality Score Evaluator:** SkillWeave will never aggregate security, quality, and popularity into a single ambiguous "95/100" rating.
- **NOT a Proprietary Closed Ecosystem:** SkillWeave will support open specifications (Agent Skills format, MCP standards) to prevent lock-in.

---

## 6. Key Unresolved Questions for Founder Approval

1. **Target Runtime Focus:** Should the initial MVP focus exclusively on **Claude Code** and **OpenCode / Codex** CLI environments, or attempt multi-agent support (Cursor, Windsurf) immediately? *(Recommendation: Focus on Claude Code + CLI first).*
2. **Evaluation Hosting Model:** Should evaluation test runs be executed client-side via CLI or hosted in an isolated SkillWeave cloud sandbox? *(Recommendation: Client-side CLI test runner for MVP, cloud sandboxing in Phase 2).*
3. **Registry Monolith vs. Federated Repositories:** Should SkillWeave index public GitHub repositories dynamically, or require explicit workflow manifest submissions to a centralized SkillWeave registry? *(Recommendation: Hybrid approach—index GitHub repositories while requiring a `skillweave.json` manifest for verified status).*
