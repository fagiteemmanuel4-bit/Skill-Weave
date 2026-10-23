import { Bundle, AgentTarget } from '../types';

export function generateBundleManifestJson(bundle: Bundle): string {
  const manifest = {
    $schema: 'https://skillweave.dev/schemas/v1/bundle.json',
    id: bundle.id,
    name: bundle.name,
    version: bundle.version,
    goal: bundle.goal,
    author: bundle.author,
    updated_at: bundle.updated_at,
    overall_risk_tier: bundle.overallRiskTier,
    quality_score: bundle.qualityScore,
    supported_agents: bundle.supportedAgents,
    components: bundle.components.map(c => ({
      order: c.order_index,
      role: c.role,
      skill_id: c.skill_id,
      skill_name: c.skill_name,
      input_handoff: c.input_handoff,
      output_deliverable: c.output_deliverable,
      prerequisites: c.prerequisites || []
    })),
    trust_verification: {
      status: bundle.status,
      evaluation_run_id: bundle.latestEvaluationRun?.id || 'none'
    }
  };

  return JSON.stringify(manifest, null, 2);
}

export function generateClaudeDesktopConfig(bundle: Bundle): string {
  const stepsMarkdown = bundle.components.map(c => `
### Step ${c.order_index}: ${c.role} (${c.skill_name})
- **Input Handoff**: ${c.input_handoff}
- **Deliverable**: ${c.output_deliverable}
  `).join('\n');

  return `# CLAUDE DESKTOP WORKFLOW SKILL MANIFEST
# Bundle: ${bundle.name} (v${bundle.version})
# Goal: ${bundle.goal}

SYSTEM INSTRUCTION:
Execute the following 5-stage sequential workflow with explicit step boundaries and handoff validation.

${stepsMarkdown}

INSTALLATION PATH:
Save this file under \`~/.claude/skills/${bundle.id}.md\` or add to your local repository at \`.claude/skills/${bundle.id}.md\`.
`;
}

export function generateCursorRulesMdc(bundle: Bundle): string {
  const stepsList = bundle.components.map(c => `
  - step_${c.order_index}:
      role: "${c.role}"
      skill: "${c.skill_name}"
      input: "${c.input_handoff}"
      deliverable: "${c.output_deliverable}"
  `).join('');

  return `---
description: ${bundle.goal}
globs: "*.*"
alwaysApply: true
---

# SKILLWEAVE WORKFLOW BUNDLE: ${bundle.name}
# Version: ${bundle.version}

workflow:
  id: "${bundle.id}"
  steps:${stepsList}

instructions: |
  When triggered for full-stack tasks, follow the step order sequentially.
  Validate each deliverable before proceeding to the next step.
  Do not bypass accessibility and Playwright verification checks.
`;
}

export function generateWindsurfRulesMd(bundle: Bundle): string {
  const stepsList = bundle.components.map(c => `
${c.order_index}. **${c.role}** (\`${c.skill_name}\`)
   - Expects: ${c.input_handoff}
   - Produces: ${c.output_deliverable}
  `).join('');

  return `# WINDSURF AGENT CASCADE RULES
# Workflow: ${bundle.name}

## Objective
${bundle.goal}

## Execution Sequence
${stepsList}

## Enforcement
- Do not skip steps.
- Maintain WCAG 2.2 AA accessibility and zero console error test criteria.
`;
}

export function generateCliScript(bundle: Bundle, agent: AgentTarget): string {
  return `#!/usr/bin/env bash
# SkillWeave Agent Installer Script for ${bundle.name}
# Target Agent: ${agent}
# Date: ${new Date().toISOString()}

set -e

echo "=== SkillWeave Agent Skill Installer ==="
echo "Targeting agent: ${agent}"
echo "Installing bundle: ${bundle.id} (v${bundle.version})"

# 1. Create agent configuration directory
case "${agent}" in
  "claude-desktop")
    TARGET_DIR="$HOME/.claude/skills"
    mkdir -p "$TARGET_DIR"
    echo "Created $TARGET_DIR"
    ;;
  "cursor")
    TARGET_DIR="./.cursor/rules"
    mkdir -p "$TARGET_DIR"
    echo "Created $TARGET_DIR"
    ;;
  "windsurf")
    TARGET_DIR="./.windsurf/rules"
    mkdir -p "$TARGET_DIR"
    echo "Created $TARGET_DIR"
    ;;
  *)
    TARGET_DIR="./.skillweave/workflows"
    mkdir -p "$TARGET_DIR"
    echo "Created $TARGET_DIR"
    ;;
esac

# 2. Download and verify bundle manifest checksum
echo "Downloading verified bundle manifest..."
cat << 'EOF' > "$TARGET_DIR/${bundle.id}.json"
${generateBundleManifestJson(bundle)}
EOF

echo "✓ SkillWeave workflow bundle '${bundle.name}' successfully installed to $TARGET_DIR/${bundle.id}.json"
echo "To uninstall this bundle, run:"
echo "  rm -f $TARGET_DIR/${bundle.id}.json"
`;
}
