# Architectural Decision Log (ADR) — SkillWeave

**Document Status:** Architectural Decision Record Log
**Research Date / Last Checked:** October 19, 2026
**Maintainer:** Lead Architect & Product Strategist

---

## ADR-001: Strategic Assignment Mode — Research and Documentation First

* **Date:** October 19, 2026
* **Status:** APPROVED (Founder Mandate)
* **Context:** Before committing engineering resources to building a marketplace, API, or execution engine, SkillWeave requires a clear competitive assessment, target user validation, and system blueprint.
* **Decision:** Keep initial repository assignment strictly limited to research, competitive reverse-engineering, and authoring 10 comprehensive Markdown blueprints in `docs/`. **Application implementation is explicitly NOT authorized during this research phase.**
* **Consequences:** Eliminates premature stack lock-in; provides clear architectural specification for founder review.

---

## ADR-002: Workflow Definition Standard — Markdown Frontmatter + `skillweave.yml` Manifest

* **Date:** October 19, 2026
* **Status:** PROPOSED (Requires Founder Approval)
* **Context:** SkillWeave must decide how to represent multi-step workflows while remaining compatible with existing atomic skill standards (`SKILL.md` led by Anthropic / Agent Skills spec).
* **Options Considered:**
  1. *Extend `SKILL.md` with multi-step syntax:* Simple, but mixes single-skill prompts with multi-tool DAG orchestration.
  2. *Proprietary JSON format:* Machine-readable, but poor developer experience for human editing.
  3. *Standalone `skillweave.yml` Manifest:* Standard YAML configuration defining workflow metadata, ordered execution steps, and references to pinned atomic `SKILL.md` git SHAs.
* **Decision Recommendation:** Adopt Option 3 (`skillweave.yml`). Single skills remain standard `SKILL.md` files; workflows compose them using `skillweave.yml`.
* **Consequences:** Maintains backward compatibility with Vercel `skills.sh` and Anthropic skills while introducing version-pinned DAG orchestration.

---

## ADR-003: Client-Side Evaluation Execution Engine vs Cloud Sandboxing

* **Date:** October 19, 2026
* **Status:** PROPOSED (Requires Founder Approval)
* **Context:** Evaluating agent workflows against task fixtures requires running agent loops and LLM calls, which can be costly and security-sensitive.
* **Options Considered:**
  1. *Cloud Sandboxing (E2B / Fly.io / Modal):* Hosted execution environment. Safe, but incurs high server & API token costs per evaluation.
  2. *Decentralized Client-Side CLI Evaluation:* Developers execute `npx skillweave test` locally using their own local agent and API keys, publishing signed `evaluation-result.json` logs back to SkillWeave.
* **Decision Recommendation:** Adopt Option 2 (Client-Side CLI) for proposed MVP. Revisit Cloud Sandboxing in Phase 2 for enterprise verified badges.
* **Consequences:** Near-zero cloud infrastructure cost for MVP; relies on cryptographic signatures to prevent tampered test logs.

---

## ADR-004: Proposed Technology Stack Selection for Core Platform

* **Date:** October 19, 2026
* **Status:** PROPOSED (Requires Founder Approval)
* **Context:** Selecting the primary technology stack for the proposed SkillWeave CLI and Web Registry.
* **Options Considered:**
  1. *Rust CLI + React SPA + Go API:* High performance, but slows down initial iteration speed.
  2. *TypeScript/Node.js CLI + Next.js (App Router) + PostgreSQL (Prisma):* Unified TypeScript ecosystem, zero-install `npx` execution, shared Zod data validation schemas across client and server.
* **Decision Recommendation:** Adopt Option 2 (TypeScript / Next.js / PostgreSQL).
* **Consequences:** Fast development velocity, single language across codebase, native `npx` compatibility.

---

## ADR-005: Multi-Axis Trust Framework vs Unified Score

* **Date:** October 19, 2026
* **Status:** APPROVED (Aligned with Product Principles in `AGENTS.md`)
* **Context:** Competitors present single ambiguous "security scores" (e.g., 95/100) or badges that lack published methodology.
* **Decision:** SkillWeave will NEVER aggregate trust into a single score. Trust is presented across 4 explicit, separate axes: (1) Provenance, (2) License, (3) Static Security, and (4) Functional Evaluation Evidence.
* **Consequences:** Provides honest, transparent disclosures; prevents false sense of security.
