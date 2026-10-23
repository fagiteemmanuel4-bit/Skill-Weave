# SkillWeave — AI Agent Skill Workflow Marketplace & Visual Composer

[![CI](https://github.com/fagiteemmanuel4-bit/Skill-Weave/actions/workflows/ci.yml/badge.svg)](https://github.com/fagiteemmanuel4-bit/Skill-Weave/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple)](https://vitejs.dev/)

> **"Stop collecting prompts. Start shipping with tested AI workflows."**

SkillWeave is an open-source web application and developer ecosystem tool for discovering, composing, validating, and installing compatible AI agent skill workflows. It moves beyond static prompt directories by helping developers assemble multi-step workflows with provenance tracking, permission awareness, real-time conflict detection, reproducible outcome evidence, and single-click multi-agent export generation.

---

## 🌟 Key Capabilities

### 1. Task-First Skill Registry & Discovery
- Discover agent skills by desired job/outcome, categories, target agent runtimes (**Claude Desktop**, **Cursor**, **Windsurf**, **OpenHands**, **Aider**, **CLI**), and risk tiers.
- Multi-faceted filtering and full-text instant search across title, tags, and system prompts.

### 2. 3-Dimension Trust Protocol
Explicitly separates trust into three independent dimensions—never collapsing findings into an opaque single safety score:
1. **Source / Provenance**: Canonical repository URL, immutable commit SHA, license verification, and SHA-256 content checksum.
2. **Reproducible Quality Rubric**: Standardized task fixture execution score (0-100) assessing outcome quality, repeatability, compatibility, maintainability, and context efficiency.
3. **Security & Tool Permission Matrix**: Audit matrix for filesystem read/write, shell execution, network destinations, and OWASP LLM risk findings.

### 3. Visual Workflow Composer & Conflict Engine
- Reorder sequential roles, define explicit input/output handoff contracts, and assign step prerequisites.
- **Real-Time Conflict Engine**: Detects duplicate skills, missing role prerequisites, runtime agent incompatibilities, context token limits (>10k tokens), and elevated shell execution privileges.

### 4. Multi-Agent Export Generator
Single-click export or script generation for:
- Portable JSON manifest (`skillweave.bundle.json`)
- Claude Desktop (`.claude/skills/`)
- Cursor (`.cursor/rules/*.mdc`)
- Windsurf (`.windsurf/rules/*.md`)
- One-liner Bash installer and clean uninstaller scripts

### 5. PRD Cartoon Character Worked Example Simulation
- Interactive 5-stage walkthrough demonstrating a complete web product build ("Brief to Polished Web UI"):
  1. **Product Brief Analyst**: Extracts user stories and acceptance criteria.
  2. **Art Director & Character System**: Generates visual brand tokens and SVG emotion matrices (Spark, Luna, Orbit, Pixel).
  3. **UI/UX Pro Max**: Interactive React component state rendering.
  4. **WCAG 2.2 AA Auditor**: Contrast and ARIA compliance report.
  5. **Playwright Verifier**: Automated E2E test execution log.

### 6. Security Governance & Incident Portal
- Transparent security advisory logging (`INC-2026-001`, etc.) and quarantine tracking.
- Capture agent runtime execution outcome reports (success/partial/failure) tagged to exact bundle versions.

---

## 🏗️ Technical Architecture

- **Frontend**: React 18 + TypeScript + Vite 6 + Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Context + LocalStorage local-first persistence
- **Testing**: Vitest + Testing Library + Playwright E2E
- **Zero Lock-In**: Client-side execution without mandatory remote cloud accounts or secret key exposure.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js >= v20.0.0
- npm >= 10.0.0

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/fagiteemmanuel4-bit/Skill-Weave.git
cd Skill-Weave

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Checks

```bash
# Run TypeScript typechecks
npm run typecheck

# Run Vitest unit & integration test suite
npm run test

# Build production bundle
npm run build
```

---

## 📄 License & Contributing

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.
Contributions welcome! Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`SECURITY.md`](SECURITY.md).
