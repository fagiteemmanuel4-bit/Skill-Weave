import { Skill, Bundle, IncidentReport } from '../types';

export const SEED_SKILLS: Skill[] = [
  {
    id: 'prd-brief-analyst',
    name: 'Product Brief Analyst',
    slug: 'prd-brief-analyst',
    category: 'Product & Planning',
    summary: 'Extracts clear target audience, user journeys, content models, and constraints from raw product briefs.',
    description: 'Analyzes user briefs without inventing false facts. Generates explicit acceptance criteria, scope boundaries, and open assumption lists for downstream developer and design skills.',
    repository: 'https://github.com/skillweave-catalog/brief-analyst',
    path: 'skills/brief-analyst/skill.md',
    author: 'SkillWeave Core Team',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    stars: 12450,
    license: 'MIT',
    status: 'Maintainer verified',
    riskTier: 'low',
    tags: ['product', 'brief', 'requirements', 'planning', 'specs'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands', 'aider', 'cli'],
    currentVersion: {
      id: 'v1.4.0',
      skill_id: 'prd-brief-analyst',
      commit_sha: 'a7b8c9d0123456789abcdef0123456789abcdef0',
      captured_at: '2026-10-15T10:00:00Z',
      file_hash: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      context_tokens_estimate: 1850,
      system_prompt_excerpt: 'You are a meticulous Senior Product Manager. Parse the user request into non-overlapping user stories with measurable acceptance criteria...',
      risk_flags: []
    },
    trustReport: {
      provenance: {
        repository_url: 'https://github.com/skillweave-catalog/brief-analyst',
        commit_sha: 'a7b8c9d0123456789abcdef0123456789abcdef0',
        author: 'SkillWeave Core Team',
        license: 'MIT',
        license_verified: true,
        checksum: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        file_path: 'skills/brief-analyst/skill.md',
        captured_at: '2026-10-15T10:00:00Z'
      },
      quality: {
        outcomeQuality: 96,
        repeatability: 94,
        compatibility: 98,
        maintainability: 92,
        usabilityOfInstructions: 95,
        contextEfficiency: 90,
        overallScore: 94
      },
      security: {
        artifact_version: '1.4.0',
        reviewer: 'Security Core Working Group',
        reviewed_at: '2026-10-16T12:00:00Z',
        expiry_date: '2027-04-16T12:00:00Z',
        tool_permissions: {
          filesystem_read: true,
          filesystem_write: false,
          shell_execution: false,
          network_outbound: false,
          secrets_access: false,
          details: ['Reads prompt context and markdown specification files. No write permissions required.']
        },
        script_inventory: [],
        network_destinations: [],
        findings: []
      }
    },
    updated_at: '2026-10-16T12:00:00Z'
  },
  {
    id: 'art-director-brand',
    name: 'Art Director & Character System',
    slug: 'art-director-brand',
    category: 'Design & Visual Identity',
    summary: 'Establishes visual direction, silhouette rules, palette logic, expression ranges, and character design systems.',
    description: 'Generates cohesive visual brand direction tokens, SVGs, character emotion states, and palette guidelines. Prevents generic SaaS templates by enforcing custom visual art direction.',
    repository: 'https://github.com/nextlevelbuilder/art-director-skill',
    path: 'skills/art-direction/SKILL.md',
    author: 'Elena Rostova',
    author_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    stars: 84200,
    license: 'Apache-2.0',
    status: 'Task-tested',
    riskTier: 'low',
    tags: ['design-system', 'art-direction', 'branding', 'characters', 'svg', 'color-tokens'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands'],
    currentVersion: {
      id: 'v2.1.0',
      skill_id: 'art-director-brand',
      commit_sha: 'c1d2e3f4567890abcdef1234567890abcdef1234',
      captured_at: '2026-10-14T14:30:00Z',
      file_hash: 'sha256-8f32145b2e987c012d4567e8901234abcdef5678901234abcdef5678901234ab',
      context_tokens_estimate: 2400,
      system_prompt_excerpt: 'You are an Art Director & Lead Designer. Define strict color token scales, typography hierarchy, character silhouette guidelines, and emotion state SVGs...',
      risk_flags: []
    },
    trustReport: {
      provenance: {
        repository_url: 'https://github.com/nextlevelbuilder/art-director-skill',
        commit_sha: 'c1d2e3f4567890abcdef1234567890abcdef1234',
        author: 'Elena Rostova',
        license: 'Apache-2.0',
        license_verified: true,
        checksum: 'sha256-8f32145b2e987c012d4567e8901234abcdef5678901234abcdef5678901234ab',
        file_path: 'skills/art-direction/SKILL.md',
        captured_at: '2026-10-14T14:30:00Z'
      },
      quality: {
        outcomeQuality: 94,
        repeatability: 91,
        compatibility: 95,
        maintainability: 90,
        usabilityOfInstructions: 93,
        contextEfficiency: 88,
        overallScore: 92
      },
      security: {
        artifact_version: '2.1.0',
        reviewer: 'Design Systems Security Reviewer',
        reviewed_at: '2026-10-15T09:15:00Z',
        expiry_date: '2027-04-15T09:15:00Z',
        tool_permissions: {
          filesystem_read: true,
          filesystem_write: true,
          shell_execution: false,
          network_outbound: false,
          secrets_access: false,
          details: ['Writes design tokens and SVG assets to local directory.']
        },
        script_inventory: [],
        network_destinations: [],
        findings: []
      }
    },
    updated_at: '2026-10-15T09:15:00Z'
  },
  {
    id: 'ui-ux-pro-max',
    name: 'UI/UX Pro Max Implementation',
    slug: 'ui-ux-pro-max',
    category: 'Frontend & UI Engineering',
    summary: 'Generates responsive, component-driven React + Tailwind interfaces with rich states and micro-interactions.',
    description: 'Translates brand requirements and art direction into pixel-perfect React TypeScript components. Handles empty states, loading skeletons, responsive layouts, and interactive character cards.',
    repository: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    path: 'skills/ui-ux-pro-max/skill.md',
    author: 'NextLevelBuilder',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    stars: 136642,
    license: 'MIT',
    status: 'Task-tested',
    riskTier: 'low',
    tags: ['react', 'tailwind', 'frontend', 'ui-components', 'responsive', 'animation'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands', 'aider', 'cli'],
    currentVersion: {
      id: 'v3.5.2',
      skill_id: 'ui-ux-pro-max',
      commit_sha: 'f9e8d7c6543210fedcba9876543210fedcba9876',
      captured_at: '2026-10-12T18:20:00Z',
      file_hash: 'sha256-4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
      context_tokens_estimate: 3100,
      system_prompt_excerpt: 'You are a Principal Frontend Architect. Write modular, typed React components with Tailwind CSS. Follow WCAG AA visual contrast and fluid responsive design...',
      risk_flags: []
    },
    trustReport: {
      provenance: {
        repository_url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
        commit_sha: 'f9e8d7c6543210fedcba9876543210fedcba9876',
        author: 'NextLevelBuilder',
        license: 'MIT',
        license_verified: true,
        checksum: 'sha256-4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
        file_path: 'skills/ui-ux-pro-max/skill.md',
        captured_at: '2026-10-12T18:20:00Z'
      },
      quality: {
        outcomeQuality: 98,
        repeatability: 95,
        compatibility: 97,
        maintainability: 94,
        usabilityOfInstructions: 96,
        contextEfficiency: 89,
        overallScore: 95
      },
      security: {
        artifact_version: '3.5.2',
        reviewer: 'Frontend Security Working Group',
        reviewed_at: '2026-10-13T11:00:00Z',
        expiry_date: '2027-04-13T11:00:00Z',
        tool_permissions: {
          filesystem_read: true,
          filesystem_write: true,
          shell_execution: false,
          network_outbound: false,
          secrets_access: false,
          details: ['Writes source component files to /src/components. No shell execution.']
        },
        script_inventory: [],
        network_destinations: [],
        findings: []
      }
    },
    updated_at: '2026-10-13T11:00:00Z'
  },
  {
    id: 'a11y-auditor-pro',
    name: 'Accessibility & WCAG 2.2 Auditor',
    slug: 'a11y-auditor-pro',
    category: 'Accessibility & Quality',
    summary: 'Audits markup and interactions for WCAG 2.2 AA compliance, ARIA attributes, keyboard focus, and screen reader flow.',
    description: 'Enforces semantic HTML tags, accessible names, visible focus indicators, color contrast standards, and reduced-motion media query handling.',
    repository: 'https://github.com/a11y-tools/wcag-auditor-skill',
    path: 'skills/a11y/audit.md',
    author: 'A11y Alliance',
    author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    stars: 31200,
    license: 'MIT',
    status: 'Task-tested',
    riskTier: 'low',
    tags: ['a11y', 'wcag-2.2', 'accessibility', 'aria', 'keyboard-nav', 'screen-reader'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands', 'aider', 'cli'],
    currentVersion: {
      id: 'v1.8.1',
      skill_id: 'a11y-auditor-pro',
      commit_sha: 'e5f6a7b8901234567890abcdef1234567890abcd',
      captured_at: '2026-10-11T09:10:00Z',
      file_hash: 'sha256-1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
      context_tokens_estimate: 1950,
      system_prompt_excerpt: 'You are an Accessibility Specialist certified in WCAG 2.2 AA. Review code for aria-labels, alt text, focus outline traps, and contrast math...',
      risk_flags: []
    },
    trustReport: {
      provenance: {
        repository_url: 'https://github.com/a11y-tools/wcag-auditor-skill',
        commit_sha: 'e5f6a7b8901234567890abcdef1234567890abcd',
        author: 'A11y Alliance',
        license: 'MIT',
        license_verified: true,
        checksum: 'sha256-1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
        file_path: 'skills/a11y/audit.md',
        captured_at: '2026-10-11T09:10:00Z'
      },
      quality: {
        outcomeQuality: 97,
        repeatability: 96,
        compatibility: 98,
        maintainability: 94,
        usabilityOfInstructions: 95,
        contextEfficiency: 92,
        overallScore: 95
      },
      security: {
        artifact_version: '1.8.1',
        reviewer: 'Accessibility & Security Desk',
        reviewed_at: '2026-10-12T14:20:00Z',
        expiry_date: '2027-04-12T14:20:00Z',
        tool_permissions: {
          filesystem_read: true,
          filesystem_write: true,
          shell_execution: false,
          network_outbound: false,
          secrets_access: false,
          details: ['Reads source code and writes accessibility report card to repo.']
        },
        script_inventory: [],
        network_destinations: [],
        findings: []
      }
    },
    updated_at: '2026-10-12T14:20:00Z'
  },
  {
    id: 'playwright-e2e-verifier',
    name: 'Playwright E2E & Browser Automation',
    slug: 'playwright-e2e-verifier',
    category: 'Testing & Quality Assurance',
    summary: 'Generates Playwright automated browser tests to visually and functionally verify web interfaces across viewports.',
    description: 'Writes clean TypeScript Playwright scripts for mobile, tablet, and desktop viewports. Captures screenshots, verifies user workflows, and asserts zero console error regressions.',
    repository: 'https://github.com/qa-agents/playwright-verifier-skill',
    path: 'skills/testing/playwright.md',
    author: 'BrowserQA Labs',
    author_avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    stars: 48900,
    license: 'Apache-2.0',
    status: 'Task-tested',
    riskTier: 'medium',
    tags: ['testing', 'playwright', 'e2e', 'browser-automation', 'screenshots', 'responsive'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands', 'cli'],
    currentVersion: {
      id: 'v2.4.0',
      skill_id: 'playwright-e2e-verifier',
      commit_sha: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',
      captured_at: '2026-10-09T16:00:00Z',
      file_hash: 'sha256-7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      context_tokens_estimate: 2800,
      system_prompt_excerpt: 'You are a Senior QA Automation Engineer. Write resilient Playwright end-to-end tests using strict data-testid locators and visual snapshot comparison...',
      risk_flags: ['Requires local shell access to run `npx playwright test`']
    },
    trustReport: {
      provenance: {
        repository_url: 'https://github.com/qa-agents/playwright-verifier-skill',
        commit_sha: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',
        author: 'BrowserQA Labs',
        license: 'Apache-2.0',
        license_verified: true,
        checksum: 'sha256-7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
        file_path: 'skills/testing/playwright.md',
        captured_at: '2026-10-09T16:00:00Z'
      },
      quality: {
        outcomeQuality: 93,
        repeatability: 91,
        compatibility: 92,
        maintainability: 90,
        usabilityOfInstructions: 91,
        contextEfficiency: 85,
        overallScore: 90
      },
      security: {
        artifact_version: '2.4.0',
        reviewer: 'SecOps Automated Testing Reviewer',
        reviewed_at: '2026-10-10T10:30:00Z',
        expiry_date: '2027-04-10T10:30:00Z',
        tool_permissions: {
          filesystem_read: true,
          filesystem_write: true,
          shell_execution: true,
          network_outbound: false,
          secrets_access: false,
          details: ['Executes local Playwright browser test runner in sandbox environment. Outbound network disabled by default.']
        },
        script_inventory: ['scripts/run-e2e.sh'],
        network_destinations: ['localhost:3000', '127.0.0.1:3000'],
        findings: [
          {
            id: 'SEC-PW-01',
            severity: 'low',
            category: 'Local Command Execution',
            description: 'Skill requires shell execution permission to invoke local test runners.',
            recommendation: 'Run inside ephemeral container or local sandbox with strict localhost network limits.'
          }
        ]
      }
    },
    updated_at: '2026-10-10T10:30:00Z'
  },
  {
    id: 'security-sentinel',
    name: 'Prompt Injection & Security Guardrail',
    slug: 'security-sentinel',
    category: 'Security & Governance',
    summary: 'Scans agent instructions, bundled scripts, and code inputs for indirect prompt injections and dependency vulnerabilities.',
    description: 'Enforces least-privilege tool execution, identifies dangerous file system overwrites, detects unverified external URLs, and prevents prompt hijacking in multi-agent pipelines.',
    repository: 'https://github.com/secops-ai/security-sentinel-skill',
    path: 'skills/security/sentinel.md',
    author: 'SecOps Open Collective',
    author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    stars: 62100,
    license: 'MIT',
    status: 'Maintainer verified',
    riskTier: 'low',
    tags: ['security', 'prompt-injection', 'audit', 'owasp', 'permissions', 'supply-chain'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands', 'aider', 'cli'],
    currentVersion: {
      id: 'v1.5.0',
      skill_id: 'security-sentinel',
      commit_sha: 'd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9',
      captured_at: '2026-10-14T08:00:00Z',
      file_hash: 'sha256-3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
      context_tokens_estimate: 2100,
      system_prompt_excerpt: 'You are a Lead Application Security Engineer. Audit prompts and code against OWASP Top 10 LLM risks including Indirect Prompt Injection...',
      risk_flags: []
    },
    trustReport: {
      provenance: {
        repository_url: 'https://github.com/secops-ai/security-sentinel-skill',
        commit_sha: 'd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9',
        author: 'SecOps Open Collective',
        license: 'MIT',
        license_verified: true,
        checksum: 'sha256-3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
        file_path: 'skills/security/sentinel.md',
        captured_at: '2026-10-14T08:00:00Z'
      },
      quality: {
        outcomeQuality: 98,
        repeatability: 97,
        compatibility: 99,
        maintainability: 96,
        usabilityOfInstructions: 97,
        contextEfficiency: 94,
        overallScore: 97
      },
      security: {
        artifact_version: '1.5.0',
        reviewer: 'Independent AppSec Auditor',
        reviewed_at: '2026-10-14T12:00:00Z',
        expiry_date: '2027-04-14T12:00:00Z',
        tool_permissions: {
          filesystem_read: true,
          filesystem_write: false,
          shell_execution: false,
          network_outbound: false,
          secrets_access: false,
          details: ['Read-only inspection of source files and system prompts. Zero outbound network.']
        },
        script_inventory: [],
        network_destinations: [],
        findings: []
      }
    },
    updated_at: '2026-10-14T12:00:00Z'
  }
];

export const SEED_BUNDLES: Bundle[] = [
  {
    id: 'brief-to-polished-web-ui',
    name: 'Brief to Polished Web UI (Cartoon Character Website)',
    slug: 'brief-to-polished-web-ui',
    goal: 'Transform a raw product brief into an art-directed, accessible, fully tested React website with character emotion states.',
    summary: 'Flagship PRD workflow bundle: orchestrates Product Analyst -> Art Director -> UI Developer -> A11y Auditor -> Playwright Verifier.',
    description: 'Designed specifically for AI-assisted indie builders and product teams. Takes a cartoon character product brief and executes a 5-stage sequential workflow with explicit hand-off contracts, accessibility checks, visual design tokens, and verified Playwright test coverage.',
    author: 'SkillWeave Core Team',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    version: '1.2.0',
    status: 'Task-tested',
    visibility: 'public',
    category: 'Full-Stack Web Creation',
    tags: ['web-app', 'art-direction', 'cartoon-characters', 'react', 'a11y', 'testing', 'flagship'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands', 'cli'],
    overallRiskTier: 'medium',
    qualityScore: 95,
    installsCount: 3840,
    updated_at: '2026-10-16T15:00:00Z',
    components: [
      {
        id: 'step-1-brief',
        bundle_id: 'brief-to-polished-web-ui',
        skill_id: 'prd-brief-analyst',
        skill_name: 'Product Brief Analyst',
        role: '1. Brief Analysis & Feature Matrix',
        order_index: 1,
        input_handoff: 'Raw user prompt / plain text product brief',
        output_deliverable: '1-Page structured brief document with explicit non-goals, character requirements, and target audience persona.'
      },
      {
        id: 'step-2-art',
        bundle_id: 'brief-to-polished-web-ui',
        skill_id: 'art-director-brand',
        skill_name: 'Art Director & Character System',
        role: '2. Art Direction & Visual Tokens',
        order_index: 2,
        prerequisites: ['1. Brief Analysis & Feature Matrix'],
        input_handoff: 'Structured brief document from Step 1',
        output_deliverable: 'Visual design token palette, typography system, SVG character emotion matrices, and silhouette guidelines.'
      },
      {
        id: 'step-3-ui',
        bundle_id: 'brief-to-polished-web-ui',
        skill_id: 'ui-ux-pro-max',
        skill_name: 'UI/UX Pro Max Implementation',
        role: '3. Responsive Component Development',
        order_index: 3,
        prerequisites: ['2. Art Direction & Visual Tokens'],
        input_handoff: 'Visual design tokens and SVG character assets from Step 2',
        output_deliverable: 'Modular TypeScript React application with character cards, emotion state toggles, and responsive layouts.'
      },
      {
        id: 'step-4-a11y',
        bundle_id: 'brief-to-polished-web-ui',
        skill_id: 'a11y-auditor-pro',
        skill_name: 'Accessibility & WCAG 2.2 Auditor',
        role: '4. WCAG 2.2 AA Compliance Audit',
        order_index: 4,
        prerequisites: ['3. Responsive Component Development'],
        input_handoff: 'React TypeScript source components from Step 3',
        output_deliverable: 'Accessibility report card, ARIA labels, focus outline fixes, and color contrast assertions.'
      },
      {
        id: 'step-5-e2e',
        bundle_id: 'brief-to-polished-web-ui',
        skill_id: 'playwright-e2e-verifier',
        skill_name: 'Playwright E2E & Browser Automation',
        role: '5. Visual & Interaction E2E Verification',
        order_index: 5,
        prerequisites: ['4. WCAG 2.2 AA Compliance Audit'],
        input_handoff: 'Audited React components and running dev server',
        output_deliverable: 'Playwright test suite execution report, viewport screenshots, and zero-console-error verification.'
      }
    ],
    conflictWarnings: [],
    latestEvaluationRun: {
      id: 'eval-run-9021',
      bundle_id: 'brief-to-polished-web-ui',
      bundle_version: '1.2.0',
      fixture_id: 'fix-cartoon-web-01',
      fixture_name: 'Cartoon Character Product Launch Website',
      runtime_config: 'Claude 3.5 Sonnet + Node.js v22 + React 18',
      rubric_version: 'v2.0-standard',
      result: 'passed',
      score: 96,
      summary: 'All 5 sequential stages completed successfully with 100% WCAG AA contrast compliance and passing Playwright browser tests across mobile & desktop viewports.',
      sample_size: 15,
      reviewer: 'Independent Evaluation Protocol Runner',
      tested_at: '2026-10-16T14:30:00Z',
      sample_output_preview: 'Successfully built 4 character profiles (Spark, Luna, Orbit, Pixel) with 3 emotion states each (Happy, Curious, Excited) with responsive grid and keyboard accessibility.'
    }
  },
  {
    id: 'secure-api-launch-pack',
    name: 'Secure API & Data Contract Pack',
    slug: 'secure-api-launch-pack',
    goal: 'Build an audited OpenAPI REST/GraphQL backend spec with prompt injection defense.',
    summary: 'Combines Product Brief Analyst + Security Sentinel + API Contract Architect.',
    description: 'Ensures backend and data API specifications are threat-modeled, schema-validated, and free from prompt injection vulnerabilities before code generation.',
    author: 'SecOps Open Collective',
    author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    version: '1.0.1',
    status: 'Task-tested',
    visibility: 'public',
    category: 'Backend & Security',
    tags: ['api', 'openapi', 'security', 'backend', 'owasp'],
    supportedAgents: ['claude-desktop', 'cursor', 'windsurf', 'openhands'],
    overallRiskTier: 'low',
    qualityScore: 94,
    installsCount: 1290,
    updated_at: '2026-10-14T16:20:00Z',
    components: [
      {
        id: 'sec-step-1',
        bundle_id: 'secure-api-launch-pack',
        skill_id: 'prd-brief-analyst',
        skill_name: 'Product Brief Analyst',
        role: '1. API Requirements Extraction',
        order_index: 1,
        input_handoff: 'Backend requirements brief',
        output_deliverable: 'Endpoints schema & entity relationship list.'
      },
      {
        id: 'sec-step-2',
        bundle_id: 'secure-api-launch-pack',
        skill_id: 'security-sentinel',
        skill_name: 'Prompt Injection & Security Guardrail',
        role: '2. OWASP Threat & Security Audit',
        order_index: 2,
        input_handoff: 'Endpoints schema from Step 1',
        output_deliverable: 'Security threat matrix, rate-limiting policy, and authentication boundary rules.'
      }
    ],
    conflictWarnings: [],
    latestEvaluationRun: {
      id: 'eval-run-8812',
      bundle_id: 'secure-api-launch-pack',
      bundle_version: '1.0.1',
      fixture_id: 'fix-sec-api-02',
      fixture_name: 'FinTech REST API Endpoint Specification',
      runtime_config: 'Cursor + Node.js v22',
      rubric_version: 'v2.0-standard',
      result: 'passed',
      score: 94,
      summary: 'Verified threat matrix prevention against parameter pollution and indirect prompt injection.',
      sample_size: 10,
      reviewer: 'SecOps Evaluation Runner',
      tested_at: '2026-10-14T16:00:00Z'
    }
  }
];

export const SEED_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-2026-001',
    target_type: 'skill',
    target_id: 'unverified-prompt-tool-x',
    target_name: 'Unverified Quick Prompt Exec (Third-Party)',
    severity: 'critical',
    reporter: 'Automated Security Scanner',
    summary: 'Detected obfuscated shell command download in third-party unverified skill v0.1.2.',
    description: 'Ingestion parser detected `curl -s | bash` pattern in bundled script. Skill was quarantined immediately prior to indexing approval.',
    status: 'quarantined',
    createdAt: '2026-10-13T08:12:00Z',
    resolvedAt: '2026-10-13T08:15:00Z',
    resolutionNotes: 'Quarantined and author account suspended pending manual review. Zero bundle installs affected.'
  },
  {
    id: 'INC-2026-002',
    target_type: 'bundle',
    target_id: 'deprecated-legacy-web-bundle',
    target_name: 'Legacy React 16 Web Builder',
    severity: 'medium',
    reporter: 'Maintainer Bot',
    summary: 'Upstream dependency deprecation in React 16 visual skill.',
    description: 'Upstream repository received high security vulnerability advisory on deprecated package.',
    status: 'resolved',
    createdAt: '2026-10-10T11:00:00Z',
    resolvedAt: '2026-10-10T14:30:00Z',
    resolutionNotes: 'Bundle updated to replace deprecated skill with UI/UX Pro Max v3.5.2.'
  }
];
