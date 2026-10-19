# MVP Scope — SkillWeave Initial Release

**Document Status:** Minimal Testable Product Definition
**Last Updated:** February 2025
**Target Goal:** Validate Outcome-Based Workflow Adoption & CLI Verification

---

## 1. Minimal Initial User Journey

SkillWeave's initial MVP focuses on validating one high-value, outcome-oriented workflow: **"Web Brief to Tested Web Feature"**.

### Step-by-Step Developer Journey
1. **Discovery:** The developer searches the SkillWeave Registry Web UI or CLI for a specific outcome: `"Web Brief to Accessible Web Component"`.
2. **Evaluation Inspection:** The developer views the workflow page, inspecting four explicit trust signals:
   - **Provenance & License:** GitHub repo source, commit SHA, MIT License.
   - **Security Findings:** Static scan output (No arbitrary script execution, no unauthorized network domains).
   - **Compatibility:** Certified for Claude Code (v0.2+) and OpenCode (v1.0+).
   - **Evaluation Evidence:** 100% pass rate on standard `a11y-wcag21` accessibility fixtures and Vitest unit test suite.
3. **Installation:** The developer runs in their project root:
   ```bash
   npx skillweave add workflow/web-brief-to-feature
   ```
4. **Agent Auto-Configuration:** The SkillWeave CLI auto-detects local agent configs (`.claude/` or `.opencode/`), creates a `skillweave.lock` file, and installs the version-pinned workflow manifest (`skillweave.yml`) and sub-skills.
5. **Local Execution & Verification:** The developer executes the workflow through their AI agent. Post-execution, the developer runs:
   ```bash
   npx skillweave test
   ```
   The CLI runs local acceptance checks against generated code and outputs an evaluation result manifest (`evaluation-result.json`).

---

## 2. Minimum Core Feature Set

### A. SkillWeave Manifest Specification (`skillweave.yml`)
* Formal schema defining workflow name, version, author, license, target agent runtimes, ordered execution steps, input parameters, and required sub-skills.

### B. SkillWeave CLI (`npx skillweave`)
* `skillweave search <query>`: Search public workflow registry.
* `skillweave add <workflow-id>`: Download manifest, verify signatures, detect local agent, write pinned agent instructions, and generate `skillweave.lock`.
* `skillweave list`: List locally installed workflows and their lockfile state.
* `skillweave test`: Execute local acceptance test scripts for installed workflows and log structured results.

### C. SkillWeave Web Registry Interface
* Searchable web portal displaying workflow listings, step-by-step DAG visualization, version history, and four-axis trust scorecard.

---

## 3. Explicit Exclusions (What Will NOT Be Built in MVP)

1. **NO Cloud Execution Engine:** SkillWeave will NOT run agents in the cloud. All agent interactions occur in the developer's local environment.
2. **NO Cloud Sandboxing Infrastructure:** Test runner executes client-side via CLI; no cloud sandbox VMs will be provisioned.
3. **NO Monetization or Payment Processing:** Purely open-source and free public registry for MVP.
4. **NO Drag-and-Drop Visual Workflow Builder:** Workflows are defined strictly in version-controlled `skillweave.yml` files.
5. **NO Multi-Agent Runtime Expansion Beyond Initial 2:** Supporting only Claude Code and OpenCode/Codex initially.

---

## 4. Acceptance Criteria & Definition of Done

* **Criterion 1 (Manifest Validation):** The CLI strictly validates `skillweave.yml` schemas using Zod/JSON-Schema, rejecting invalid step ordering or missing dependencies.
* **Criterion 2 (Multi-Agent Writer):** `skillweave add` correctly auto-detects `.claude/` and `.opencode/` config paths and writes pinned instructions without corrupting existing rules.
* **Criterion 3 (Deterministic Lockfile):** `skillweave.lock` records exact git commit SHAs, sub-skill versions, and agent runtime targets.
* **Criterion 4 (Evaluation Logger):** `skillweave test` executes local verification scripts, records pass/fail test results, and generates a standardized JSON output.
* **Criterion 5 (4-Axis Trust UI):** The web UI renders separate UI cards for (1) Provenance, (2) License, (3) Security Scan, and (4) Evaluation Evidence without aggregating them into a single score.
