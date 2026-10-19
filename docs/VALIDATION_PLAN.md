# Validation Plan & Proposed Concierge Experiment — SkillWeave

**Document Status:** Practical Customer & Product Experiment Plan
**Research Date / Last Checked:** October 19, 2026
**Target Goal:** Validate Hypothesis A (Outcome Workflows) & Hypothesis C (Evaluation Evidence)
**Governing Document:** `AGENTS.md`

*Note on Implementation Status:* This document presents a proposed validation plan and concierge experiment. **No experiment has been run and no developer cohort results have been recorded yet.**

---

## 1. Executive Experiment Proposal: Concierge Experiment

Before investing engineering resources into cloud sandboxes or complex backend services, SkillWeave proposes conducting a lightweight 2-week **Concierge Experiment** with a cohort of 30 senior software developers building web applications.

### Core Strategic Objective
Demonstrate whether developers complete complex web engineering tasks faster, with higher accessibility/quality compliance, and with greater confidence when using a **curated, version-pinned, multi-step SkillWeave workflow** compared to unassisted agent usage or ad-hoc atomic skills.

---

## 2. Proposed Task Fixture Definition: "Web Brief to Feature"

### Target Task Brief
*"Build a responsive, accessible React pricing card component with monthly/annual billing toggles, feature checkmarks, CTA buttons, and WCAG 2.1 AA accessibility compliance."*

### Proposed Cohort Segmentation (30 Senior Developers)

* **Cohort A (Control - Baseline):** 10 developers using their normal coding agent setup (e.g., raw Claude Code or Cursor) with no third-party skills or structured prompts.
* **Cohort B (Disjointed Atomic Skills):** 10 developers using 3 separate, uncoordinated atomic skills downloaded from open directories (e.g., React skill, Tailwind skill, Accessibility prompt).
* **Cohort C (SkillWeave Curated Workflow):** 10 developers using a single version-pinned SkillWeave workflow (`skillweave add workflow/web-brief-to-feature`) containing explicit step ordering and automated acceptance checks.

---

## 3. Proposed Target Metrics & Baselines

*Note: All values below are target benchmarks for experiment evaluation—not measured historical results.*

| Metric | Measurement Method | Proposed Target Criteria for Cohort C Success |
| :--- | :--- | :--- |
| **Task Completion Time** | Stopwatch / Telemetry log | Proposed target: ≥35% time reduction vs. Cohort A & B |
| **Accessibility Defect Count** | Automated `axe-core` scan | Proposed target: Zero Critical / Serious WCAG AA violations |
| **Unit Test Suite Pass Rate** | Vitest test execution | Proposed target: 100% test pass rate out of the box |
| **Human Interventions Count** | Developer log of manual prompt fixes required | Proposed target: <2 interventions per developer |
| **Developer Confidence Rating** | Post-task survey (1–5 scale) | Proposed target: Average score ≥ 4.5 / 5.0 |
| **Willingness to Pay Intent** | Qualitative survey & deposit request | Proposed target: ≥25% express intent to pay for team registry |

---

## 4. Decision Gate Criteria (Continue, Revise, Stop)

```
                       +-----------------------------------+
                       | Proposed Concierge Experiment     |
                       +-----------------------------------+
                                         |
               +-------------------------+-------------------------+
               |                                                   |
               v                                                   v
   [ Cohort C Outperforms ]                            [ Cohort C Fails to ]
   [ (≥2x Speedup & 0 Defect) ]                        [ Demonstrate Value ]
               |                                                   |
               v                                                   v
+-------------------------------+                   +-------------------------------+
| CONTINUE: Proceed to MVP      |                   | REVISE / STOP: Pivot to       |
| Build CLI & Registry Platform |                   | Single Atomic Skill Tools     |
+-------------------------------+                   +-------------------------------+
```

1. **CONTINUE (Green Light):** Cohort C achieves ≥35% faster task completion, 0 accessibility violations, and ≥80% developer preference over Cohort A/B. Proceed directly to building MVP CLI and Web Registry.
2. **REVISE (Yellow Light):** Workflows provide higher quality code but developers struggle with CLI setup friction. Revise CLI installation DX and re-test.
3. **STOP / PIVOT (Red Light):** Developers prefer composing single atomic skills manually and see no value in multi-step workflow manifests. Pivot away from multi-step DAG workflows.
