# System Architecture — SkillWeave Technical Blueprint Proposal

**Document Status:** Proposed System Architecture
**Research Date / Last Checked:** October 19, 2026
**Target Goal:** Scalable, Cross-Platform AI Workflow & Skill Infrastructure

*Note on Implementation Status:* This document represents a proposed technical architecture for founder approval. **No cloud services, databases, web applications, or CLI utilities have been implemented or deployed during this research phase.**

---

## 1. High-Level Proposed System Architecture

SkillWeave is proposed as a modular system comprising four primary subsystems:

```
+-----------------------------------------------------------------------+
|                            USER WORKSTATION                           |
|  +------------------------+          +-----------------------------+  |
|  | Coding Agent Runtime   |          | SkillWeave CLI Tool         |  |
|  | (Claude Code / OpenCode)| <------> | (`npx skillweave` proposed)  |  |
|  +------------------------+          +--------------+--------------+  |
+-----------------------------------------------------|-----------------+
                                                      | HTTPS / REST
                                                      v
+-----------------------------------------------------------------------+
|                      SKILLWEAVE CLOUD PLATFORM (PROPOSED)             |
|  +------------------------+          +-----------------------------+  |
|  | API Gateway & Edge     |          | Registry Service            |  |
|  | (Cloudflare / Next API) | <------> | (Workflow & Skill Index)    |  |
|  +------------------------+          +--------------+--------------+  |
|                                                     |                 |
|  +------------------------+          +--------------v--------------+  |
|  | Static Security Scan   |          | Verification & Evaluation   |  |
|  | Engine (AST/Prompt)    |          | Database (PostgreSQL / Edge) |  |
|  +------------------------+          +-----------------------------+  |
+-----------------------------------------------------------------------+
```

### Proposed Core Subsystems
1. **SkillWeave CLI (`npx skillweave` Proposal):** The primary client interface. Proposed to handle local agent detection, manifest resolution, lockfile creation (`skillweave.lock`), instruction writing, and local evaluation execution.
2. **Registry Web Portal & API (Proposal):** Proposed web interface and REST/GraphQL API serving workflow manifests, dependency graphs, search indexes, and trust scorecards.
3. **Static Security Analyzer (Proposal):** Automated service proposed to scan submitted workflow manifests and skill files for prompt injection vectors, unsafe bash commands, secret leaks, and unlisted network endpoints.
4. **Evaluation & Verification Database (Proposal):** Proposed store for immutable test runs, task fixtures, runtime compatibility results, and execution evidence logs.

---

## 2. Proposed Technology Stack & Trade-Offs

| System Layer | Proposed Technology | Justification | Alternative Considered | Trade-Off Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **CLI Runtime** | Node.js / TypeScript (npm/npx package) | Universal presence across developer workstations; native integration with `npx`. | Rust CLI / Go binary | TypeScript ensures seamless zero-install execution (`npx skillweave`) and shares Zod validation schemas directly with web frontend. |
| **Web Frontend** | Next.js (App Router, React, Tailwind CSS) | Fast edge rendering, strong SEO for workflow discovery, native API routes. | Vite Single-Page App | Next.js provides hybrid SSG/SSR required for indexing thousands of workflow pages for search engines. |
| **Registry Database** | PostgreSQL + Prisma ORM / Drizzle | Structured relational queries required for complex dependency graphs and evaluation records. | MongoDB / Document DB | Workflows, skills, versions, and test runs are deeply relational. SQL ACID transactions ensure lockfile consistency. |
| **Search Engine** | Algolia or PostgreSQL Full-Text Search | Fast instant search with fuzzy matching across skill descriptions, tags, and agent targets. | Elasticsearch | Postgres FTS is sufficient for MVP scale (<10,000 workflows), avoiding extra infrastructure cost. |
| **Validation Schema** | Zod + JSON-Schema standard | Runtime type safety and bidirectional generation of static JSON schemas for public APIs. | TypeBox / Joi | Zod provides best-in-class TypeScript inference and error messages for CLI user feedback. |

---

## 3. System Boundaries & Interface Contracts (Proposed)

### Boundary A: CLI <-> Local Working Directory
* **Inputs:** Local agent configuration files (`.claude/`, `.opencode/`), `skillweave.yml` manifest files.
* **Outputs:** Updated agent prompt rules, `skillweave.lock` file, `evaluation-result.json` log artifacts.
* **Isolation Rule:** The CLI never overwrites user agent files directly without taking a `.bak` backup first.

### Boundary B: CLI <-> SkillWeave Registry API
* **Endpoint (Proposed):** `GET /api/v1/workflows/:id` -> Returns JSON workflow manifest and sub-skill lock SHAs.
* **Endpoint (Proposed):** `GET /api/v1/compatibility` -> Returns agent runtime matrix.
* **Endpoint (Proposed):** `POST /api/v1/evaluations` -> Receives cryptographically signed test execution manifests from CLI.

---

## 4. Key Architectural Decisions Pending Founder Approval

1. **Storage Location for Skill Artifacts:** Store raw `SKILL.md` files in a managed SkillWeave S3 bucket or stream directly from upstream GitHub git commit SHAs? *(Recommendation: Stream from upstream GitHub SHAs with S3 fallback caching).*
2. **Evaluation Telemetry Policy:** Opt-in vs. Opt-out submission of local `skillweave test` execution metrics back to the public SkillWeave registry. *(Recommendation: Explicit opt-in prompt required).*
