import { Bundle, Skill, ConflictWarning, AgentTarget } from '../types';

export function analyzeBundleConflicts(bundle: Bundle, availableSkills: Skill[]): ConflictWarning[] {
  const warnings: ConflictWarning[] = [];

  if (!bundle.components || bundle.components.length === 0) {
    warnings.push({
      id: 'warn-empty-bundle',
      bundle_id: bundle.id,
      severity: 'error',
      title: 'Empty Workflow Bundle',
      description: 'This workflow bundle contains no skill components.',
      affectedComponents: [],
      resolutionAdvice: 'Add at least one skill component to make this bundle functional.'
    });
    return warnings;
  }

  // 1. Duplicate Skill Check
  const skillIds = bundle.components.map(c => c.skill_id);
  const duplicateIds = skillIds.filter((id, index) => skillIds.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    const uniqueDupes = Array.from(new Set(duplicateIds));
    warnings.push({
      id: `warn-dupe-${Date.now()}`,
      bundle_id: bundle.id,
      severity: 'warning',
      title: 'Duplicate Skill Components Detected',
      description: `Skill(s) [${uniqueDupes.join(', ')}] are included multiple times in the workflow.`,
      affectedComponents: uniqueDupes,
      resolutionAdvice: 'Remove redundant steps or verify that multiple passes are intentional.'
    });
  }

  // 2. Prerequisite Ordering Check
  bundle.components.forEach((component, index) => {
    if (component.prerequisites && component.prerequisites.length > 0) {
      component.prerequisites.forEach(reqRole => {
        const prevComponents = bundle.components.slice(0, index);
        const existsBefore = prevComponents.some(pc => pc.role === reqRole || pc.skill_name === reqRole);
        if (!existsBefore) {
          warnings.push({
            id: `warn-prereq-${component.id}`,
            bundle_id: bundle.id,
            severity: 'error',
            title: `Missing Step Prerequisite for Step ${component.order_index}`,
            description: `Step "${component.skill_name}" requires prerequisite role "${reqRole}", which is not placed before it.`,
            affectedComponents: [component.skill_id],
            resolutionAdvice: `Move prerequisite step "${reqRole}" above Step ${component.order_index} in the pipeline.`
          });
        }
      });
    }
  });

  // 3. Agent Compatibility Intersect Check
  let commonAgents: AgentTarget[] | null = null;
  bundle.components.forEach(comp => {
    const skillObj = availableSkills.find(s => s.id === comp.skill_id);
    if (skillObj) {
      if (commonAgents === null) {
        commonAgents = [...skillObj.supportedAgents];
      } else {
        const currentCommon: AgentTarget[] = commonAgents;
        commonAgents = currentCommon.filter(ag => skillObj.supportedAgents.includes(ag));
      }
    }
  });

  if (commonAgents !== null && (commonAgents as AgentTarget[]).length === 0) {
    warnings.push({
      id: 'warn-agent-mismatch',
      bundle_id: bundle.id,
      severity: 'error',
      title: 'Incompatible Agent Runtimes',
      description: 'The selected skills do not share a single common target agent runtime.',
      affectedComponents: bundle.components.map(c => c.skill_id),
      resolutionAdvice: 'Replace incompatible components or target an agent with broader protocol support.'
    });
  }

  // 4. Context Token Burden Check
  let totalTokens = 0;
  bundle.components.forEach(comp => {
    const skillObj = availableSkills.find(s => s.id === comp.skill_id);
    if (skillObj) {
      totalTokens += skillObj.currentVersion.context_tokens_estimate;
    }
  });

  if (totalTokens > 10000) {
    warnings.push({
      id: 'warn-high-context',
      bundle_id: bundle.id,
      severity: 'info',
      title: 'High Cumulative Context Token Cost',
      description: `Total estimated system prompt overhead is ~${totalTokens.toLocaleString()} tokens.`,
      affectedComponents: [],
      resolutionAdvice: 'Consider combining or trimming redundant prompts to optimize context window latency.'
    });
  }

  // 5. Shell Execution / Privilege Warning
  const shellExecSteps = bundle.components.filter(comp => {
    const skillObj = availableSkills.find(s => s.id === comp.skill_id);
    return skillObj?.trustReport.security.tool_permissions.shell_execution;
  });

  if (shellExecSteps.length > 0) {
    warnings.push({
      id: 'warn-shell-exec',
      bundle_id: bundle.id,
      severity: 'warning',
      title: 'Elevated Shell Permission Required',
      description: `${shellExecSteps.length} step(s) require local shell execution rights (${shellExecSteps.map(s => s.skill_name).join(', ')}).`,
      affectedComponents: shellExecSteps.map(s => s.skill_id),
      resolutionAdvice: 'Run in an isolated local sandbox or container with network restrictions.'
    });
  }

  return warnings;
}
