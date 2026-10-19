# Implementation Backlog — Task Breakdown Proposal

**Document Status:** Prioritized Engineering Tasks Proposal
**Research Date / Last Checked:** October 19, 2026
**Execution Target:** Proposed tasks for future automated engineering (Google Jules)

*Note on Implementation Status:* This backlog outlines proposed future tasks. **Code implementation is explicitly NOT authorized during this current research and documentation phase.**

---

## Proposed Sprint 1: Core Specification & Local CLI Tooling

### TASK-001: Implement Workflow Manifest & Lockfile Parser (`skillweave-core`)
* **Priority:** P0 (Blocker)
* **Purpose:** Create TypeScript library and Zod schemas for parsing, validating, and generating `skillweave.yml` workflow manifests and `skillweave.lock` files.
* **Dependencies:** None
* **Proposed Files to Create/Modify:**
  - `packages/core/src/schemas/manifest.ts`
  - `packages/core/src/schemas/lockfile.ts`
  - `packages/core/src/parser.ts`
  - `packages/core/tests/parser.test.ts`
* **Proposed Acceptance Criteria:**
  1. Parses valid YAML/JSON workflow manifests adhering to `docs/DATA_MODEL.md`.
  2. Rejects invalid step ordering, missing `commit_sha` fields, or invalid agent IDs with descriptive Zod error messages.
  3. Generates deterministic SHA-256 lockfile strings.
* **Proposed Definition of Done:** 100% unit test pass rate; exported TypeScript types verified.

---

### TASK-002: Build Agent Configuration Auto-Detector & Writer (`skillweave-cli`)
* **Priority:** P0 (Blocker)
* **Purpose:** Develop CLI module that scans local project directories for known coding agent paths (`.claude/`, `.opencode/`, `.cursor/`) and writes pinned workflow instructions without overwriting user rules.
* **Dependencies:** TASK-001
* **Proposed Files to Create/Modify:**
  - `packages/cli/src/detectors/agent-detector.ts`
  - `packages/cli/src/writers/claude-writer.ts`
  - `packages/cli/src/writers/opencode-writer.ts`
  - `packages/cli/tests/agent-writer.test.ts`
* **Proposed Acceptance Criteria:**
  1. Auto-detects Claude Code and OpenCode workspace config directories.
  2. Automatically creates a timestamped `.bak` backup before modifying any config file.
  3. Appends version-pinned SkillWeave instructions clearly wrapped in `# SKILLWEAVE START` / `# SKILLWEAVE END` comments.
* **Proposed Definition of Done:** Automated test suite passes; creates backups on mock file systems.

---

## Proposed Sprint 2: Web Registry & API Infrastructure

### TASK-003: Implement Database Schema & Prisma Migrations
* **Priority:** P1
* **Purpose:** Setup PostgreSQL database schema using Prisma ORM to store Workflows, Skills, Revisions, Evaluation Runs, and Security Findings.
* **Dependencies:** None
* **Proposed Files to Create/Modify:**
  - `packages/db/prisma/schema.prisma`
  - `packages/db/src/client.ts`
  - `packages/db/prisma/seed.ts`
* **Proposed Acceptance Criteria:**
  1. Schema matches entity relationships in `docs/DATA_MODEL.md`.
  2. Seeds database with sample workflows and mock evaluation runs for testing.
  3. Migration script runs cleanly without errors.
* **Proposed Definition of Done:** `npx prisma db seed` successfully populates database.

---

### TASK-004: Build 4-Axis Trust Scorecard Web UI Components
* **Priority:** P1
* **Purpose:** Create React/Tailwind UI components in Next.js displaying four separate trust cards (Provenance, License, Security, Evaluation Evidence).
* **Dependencies:** TASK-003
* **Proposed Files to Create/Modify:**
  - `apps/web/components/trust/provenance-card.tsx`
  - `apps/web/components/trust/license-card.tsx`
  - `apps/web/components/trust/security-card.tsx`
  - `apps/web/components/trust/evaluation-card.tsx`
  - `apps/web/app/workflows/[id]/page.tsx`
* **Proposed Acceptance Criteria:**
  1. Renders 4 independent card components without aggregating data into a single score.
  2. Displays exact git commit SHAs, OSI license badges, static scan flags, and pass/fail metrics.
* **Proposed Definition of Done:** Visual confirmation in browser preview; component unit tests pass.

---

## Proposed Sprint 3: Verification & Evaluation Engine

### TASK-005: Local Evaluation Test Runner (`skillweave test`)
* **Priority:** P1
* **Purpose:** CLI command that executes verification scripts associated with an installed workflow and outputs a structured `evaluation-result.json` log.
* **Dependencies:** TASK-001, TASK-002
* **Proposed Files to Create/Modify:**
  - `packages/cli/src/commands/test.ts`
  - `packages/cli/src/evaluator/test-runner.ts`
  - `packages/cli/tests/evaluator.test.ts`
* **Proposed Acceptance Criteria:**
  1. Executes local verification scripts (e.g., `vitest`, `axe-core` accessibility checks).
  2. Formats execution duration, cost estimate, and pass/fail test count into JSON.
  3. Computes SHA-256 digest of output log for tamper resistance.
* **Proposed Definition of Done:** Passes test suite against sample web component test fixtures.
