# System Architecture — SkillWeave Technical Blueprint

**Document Status:** Proposed System Architecture
**Last Updated:** February 2025
**Target Goal:** Scalable, Cross-Platform AI Workflow & Skill Infrastructure

---

## 1. High-Level System Architecture & Component Diagram

SkillWeave is architected as a modular, client-server system comprising four primary subsystems:

```
+-----------------------------------------------------------------------+
|                            USER WORKSTATION                           |
|  +------------------------+          +-----------------------------+  |
|  | Coding Agent Runtime   |          | SkillWeave CLI Tool         |  |
|  | (Claude Code / OpenCode)| <------> | (`npx skillweave`)          |  |
|  +------------------------+          +--------------+--------------+  |
+-----------------------------------------------------|-----------------+
                                                      | HTTPS / REST
                                                      v
+-----------------------------------------------------------------------+
|                          SKILLWEAVE CLOUD PLATFORM                    |
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

### Core Components
1. **SkillWeave CLI (`npx skillweave`):** The primary client interface. Handles local agent detection, manifest resolution, lockfile creation (`skillweave.lock`), instruction writing, and local evaluation execution.
2. **Registry Web Portal & API:** Modern web interface and REST/GraphQL API serving workflow manifests, dependency graphs, search indexes, and trust scorecards.
3. **Static Security Analyzer:** Automated service scanning submitted workflow manifests and skill files for prompt injection vectors, unsafe bash commands, secret leaks, and unlisted network endpoints.
4. **Evaluation & Verification Database:** Store for immutable test runs, task fixtures, runtime compatibility results, and execution evidence logs.

---

## 2. Technology Stack Justification & Trade-Offs

| System Layer | Proposed Technology | Justification | Alternative Considered | Trade-Off Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **CLI Runtime** | Node.js / TypeScript (npm/npx package) | Universal presence across developer workstations; native integration with `npx`. | Rust CLI / Go binary | TypeScript ensures seamless zero-install execution (`npx skillweave`) and shares Zod validation schemas directly with web frontend. |
| **Web Frontend** | Next.js (App Router, React, Tailwind CSS) | Fast edge rendering, strong SEO for workflow discovery, native API routes. | Vite Single-Page App | Next.js provides hybrid SSG/SSR required for indexing thousands of workflow pages for search engines. |
| **Registry Database** | PostgreSQL + Prisma ORM / Drizzle | Structured relational queries required for complex dependency graphs and evaluation records. | MongoDB / Document DB | Workflows, skills, versions, and test runs are deeply relational. SQL ACID transactions ensure lockfile consistency. |
| **Search Engine** | Algolia or PostgreSQL Full-Text Search | Fast instant search with fuzzy matching across skill descriptions, tags, and agent targets. | Elasticsearch | Postgres FTS is sufficient for MVP scale (<10,000 workflows), avoiding extra infrastructure cost. |
| **Validation Schema** | Zod + JSON-Schema standard | Runtime type safety and bidirectional generation of static JSON schemas for public APIs. | TypeBox / Joi | Zod provides best-in-class TypeScript inference and error messages for CLI user feedback. |

---

## 3. System Boundaries & Interface Contracts

### Boundary A: CLI <-> Local Working Directory
* **Inputs:** Local agent configuration files (`.claude/`, `.opencode/`), `skillweave.yml` manifest files.
* **Outputs:** Updated agent prompt rules, `skillweave.lock` file, `evaluation-result.json` log artifacts.
* **Isolation Rule:** The CLI never overwrites user agent files directly without taking a `.bak` backup first.

### Boundary B: CLI <-> SkillWeave Registry API
* **Endpoint:** `GET /api/v1/workflows/:id` -> Returns JSON workflow manifest and sub-skill lock SHAs.
* **Endpoint:** `GET /api/v1/compatibility` -> Returns agent runtime matrix.
* **Endpoint:** `POST /api/v1/evaluations` -> Receives cryptographically signed test execution manifests from CLI.

---

## 4. Key Architectural Decisions Pending Founder Approval

1. **Storage Location for Skill Artifacts:** Store raw `SKILL.md` files in a managed SkillWeave S3 bucket or stream directly from upstream GitHub git commit SHAs? *(Recommendation: Stream from upstream GitHub SHAs with S3 fallback caching).*
2. **Evaluation Telemetry Policy:** Opt-in vs. Opt-out submission of local `skillweave test` execution metrics back to the public SkillWeave registry. *(Recommendation: Explicit opt-in prompt required).*
