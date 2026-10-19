# Proposed Data Model & Entity Schemas — SkillWeave

**Document Status:** Proposed Entity & Relationship Schemas
**Research Date / Last Checked:** October 19, 2026
**Schema Standard:** Proposed Zod / JSON Schema compliant definitions

*Note on Implementation Status:* All schemas presented in this document are **proposals for future engineering**. No database migrations, ORM schemas, or live API endpoints have been implemented during this research phase.

---

## 1. Entity-Relationship Model Overview (Proposed)

SkillWeave's proposed data architecture establishes clear boundaries between atomic **Skills**, composable **Workflows**, immutable **Versions/Revisions**, and independent **Evaluation / Security Evidence**.

```
+-------------------+ 1       N +-----------------------+
|   Publisher User  |---------->|      Skill Entity      |
+-------------------+           +-----------------------+
          |                                 | 1
          | 1                               | N
          v N                           +---v-------------------+
+-------------------+                   |     Skill Version     |
|  Workflow Entity  |                   |  (Git Commit SHA /    |
+-------------------+                   |   Immutable Revision) |
          | 1                           +-----------------------+
          | N                                       |
+---------v---------+                               |
| Workflow Version  |                               |
| (Pinned DAG spec) |                               |
+-------------------+                               |
          | 1                                       |
          | N                                       v
+---------v---------+                   +-----------------------+
|  Evaluation Run   |                   |    Security Finding   |
|  (Test Fixture &  |                   |   (Static Scan / AST) |
|   Pass/Fail Log)  |                   +-----------------------+
+-------------------+
```

---

## 2. Core Entity Schemas (Proposed JSON Schema Definitions)

### Schema A: Workflow Manifest Proposal (`skillweave.yml` / `skillweave.json`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SkillWeaveWorkflowManifestProposal",
  "type": "object",
  "required": ["id", "version", "name", "description", "target_agents", "steps"],
  "properties": {
    "id": { "type": "string", "pattern": "^[a-z0-9-]+/[a-z0-9-]+$" },
    "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "license": { "type": "string", "default": "MIT" },
    "repository_url": { "type": "string", "format": "uri" },
    "target_agents": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["agent_id", "min_version"],
        "properties": {
          "agent_id": { "type": "string", "enum": ["claude-code", "opencode", "cursor", "codex"] },
          "min_version": { "type": "string" }
        }
      }
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["step_id", "name", "skill_ref"],
        "properties": {
          "step_id": { "type": "string" },
          "name": { "type": "string" },
          "skill_ref": {
            "type": "object",
            "required": ["github_repo", "commit_sha", "path"],
            "properties": {
              "github_repo": { "type": "string" },
              "commit_sha": { "type": "string", "pattern": "^[a-f0-9]{40}$" },
              "path": { "type": "string" }
            }
          },
          "input_mappings": { "type": "object" },
          "acceptance_checks": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
```

### Schema B: Proposed Immutable Evaluation Record Schema (`EvaluationRun`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SkillWeaveEvaluationRunProposal",
  "type": "object",
  "required": ["run_id", "workflow_id", "workflow_commit_sha", "agent_runtime", "timestamp", "outcome"],
  "properties": {
    "run_id": { "type": "string", "format": "uuid" },
    "workflow_id": { "type": "string" },
    "workflow_commit_sha": { "type": "string" },
    "agent_runtime": {
      "type": "object",
      "required": ["name", "version", "foundation_model"],
      "properties": {
        "name": { "type": "string" },
        "version": { "type": "string" },
        "foundation_model": { "type": "string" }
      }
    },
    "timestamp": { "type": "string", "format": "date-time" },
    "task_fixture_id": { "type": "string" },
    "outcome": {
      "type": "object",
      "required": ["status", "duration_ms", "tests_passed", "tests_failed"],
      "properties": {
        "status": { "type": "string", "enum": ["PASSED", "FAILED", "PARTIAL_SUCCESS", "ERROR"] },
        "duration_ms": { "type": "integer" },
        "estimated_cost_usd": { "type": "number" },
        "human_interventions_count": { "type": "integer" },
        "tests_passed": { "type": "integer" },
        "tests_failed": { "type": "integer" },
        "metrics": { "type": "object" }
      }
    },
    "evidence_logs_hash": { "type": "string" }
  }
}
```

### Schema C: Proposed Security Finding Record Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SkillWeaveSecurityFindingProposal",
  "type": "object",
  "required": ["finding_id", "target_commit_sha", "severity", "category", "description"],
  "properties": {
    "finding_id": { "type": "string" },
    "target_commit_sha": { "type": "string" },
    "severity": { "type": "string", "enum": ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFORMATIONAL"] },
    "category": { "type": "string", "enum": ["PROMPT_INJECTION", "UNTRUSTED_SHELL_EXEC", "SECRET_LEAK", "NETWORK_EXFILTRATION", "PERMISSIONS_OVERREACH"] },
    "description": { "type": "string" },
    "file_path": { "type": "string" },
    "line_number": { "type": "integer" },
    "remediation": { "type": "string" }
  }
}
```

---

## 3. Proposed Data Integrity & State Transition Rules

1. **Immutable Component Revisions:** A published `WorkflowVersion` or `SkillVersion` record CANNOT be updated or deleted. Any modification requires publishing a new Git Commit SHA / SemVer.
2. **Deterministic Lockfile Generation:** The `skillweave.lock` file generated locally by the CLI pins the exact Git SHA and cryptographic hash of every sub-skill in the DAG.
3. **Evidence Hash Verification:** Evaluation records must include a cryptographic SHA-256 digest of the execution log artifact, preventing retroactively modified test claims.
