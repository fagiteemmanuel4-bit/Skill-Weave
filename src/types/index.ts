export type RiskTier = 'low' | 'medium' | 'high' | 'critical';

export type ReviewStatus =
  | 'Indexed'
  | 'Metadata checked'
  | 'Static review'
  | 'Task-tested'
  | 'Maintainer verified'
  | 'Deprecated / flagged';

export type AgentTarget = 'claude-desktop' | 'cursor' | 'windsurf' | 'openhands' | 'aider' | 'cli';

export interface ToolPermissions {
  filesystem_read: boolean;
  filesystem_write: boolean;
  shell_execution: boolean;
  network_outbound: boolean;
  secrets_access: boolean;
  details?: string[];
}

export interface SecurityFinding {
  id: string;
  severity: RiskTier;
  category: string;
  description: string;
  recommendation: string;
}

export interface SecurityReview {
  artifact_version: string;
  reviewer: string;
  reviewed_at: string;
  expiry_date: string;
  tool_permissions: ToolPermissions;
  script_inventory: string[];
  network_destinations: string[];
  findings: SecurityFinding[];
}

export interface QualityRubricScore {
  outcomeQuality: number;
  repeatability: number;
  compatibility: number;
  maintainability: number;
  usabilityOfInstructions: number;
  contextEfficiency: number;
  overallScore: number;
}

export interface ProvenanceDetails {
  repository_url: string;
  commit_sha: string;
  author: string;
  author_avatar?: string;
  license: string;
  license_verified: boolean;
  checksum: string;
  file_path: string;
  captured_at: string;
}

export interface TrustReport {
  provenance: ProvenanceDetails;
  quality: QualityRubricScore;
  security: SecurityReview;
}

export interface SkillVersion {
  id: string;
  skill_id: string;
  commit_sha: string;
  captured_at: string;
  file_hash: string;
  context_tokens_estimate: number;
  system_prompt_excerpt: string;
  risk_flags: string[];
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  repository: string;
  path: string;
  author: string;
  author_avatar?: string;
  stars: number;
  license: string;
  status: ReviewStatus;
  riskTier: RiskTier;
  tags: string[];
  supportedAgents: AgentTarget[];
  currentVersion: SkillVersion;
  trustReport: TrustReport;
  updated_at: string;
}

export interface BundleComponent {
  id: string;
  bundle_id: string;
  skill_id: string;
  skill_name: string;
  role: string;
  order_index: number;
  conditions?: string;
  input_handoff: string;
  output_deliverable: string;
  prerequisites?: string[];
}

export interface ConflictWarning {
  id: string;
  bundle_id: string;
  severity: 'info' | 'warning' | 'error';
  title: string;
  description: string;
  affectedComponents: string[];
  resolutionAdvice: string;
}

export interface EvaluationRun {
  id: string;
  bundle_id: string;
  bundle_version: string;
  fixture_id: string;
  fixture_name: string;
  runtime_config: string;
  rubric_version: string;
  result: 'passed' | 'failed' | 'partial';
  score: number;
  summary: string;
  sample_size: number;
  variance_notes?: string;
  reviewer: string;
  tested_at: string;
  sample_output_preview?: string;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  goal: string;
  summary: string;
  description: string;
  author: string;
  author_avatar?: string;
  version: string;
  status: ReviewStatus;
  visibility: 'public' | 'team' | 'private';
  category: string;
  tags: string[];
  supportedAgents: AgentTarget[];
  components: BundleComponent[];
  overallRiskTier: RiskTier;
  qualityScore: number;
  conflictWarnings: ConflictWarning[];
  latestEvaluationRun?: EvaluationRun;
  updated_at: string;
  installsCount: number;
}

export interface IncidentReport {
  id: string;
  target_type: 'skill' | 'bundle';
  target_id: string;
  target_name: string;
  severity: RiskTier;
  reporter: string;
  summary: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'quarantined';
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface UserFeedbackReport {
  id: string;
  bundle_id: string;
  bundle_version: string;
  agent_runtime: AgentTarget;
  outcome: 'success' | 'partial' | 'failure';
  notes?: string;
  environment_info: string;
  submittedAt: string;
}
