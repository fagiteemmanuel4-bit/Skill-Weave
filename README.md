# SkillWeave — Cross-Platform AI Agent Infrastructure

**SkillWeave** is infrastructure designed to make AI-agent capabilities and workflows discoverable, composable, testable, portable, and dependable across tools and platforms.

## Overview

This repository contains:
1. **Research & Engineering Blueprints (`docs/`):** Strategic analysis, competitor reverse engineering, security models, entity schemas, and architectural decision records (ADRs).
2. **Landing Page Website (`index.html`, `styles.css`, `script.js`):** Lightweight, zero-dependency static site introducing SkillWeave, its outcome-first workflow model, and its 4-axis evidence scorecard.

---

## Local Development & Preview

The landing page is a lightweight, modern static site with no required build steps or external node dependencies.

To preview the website locally:

### Option 1: Python HTTP Server
```bash
# From the repository root directory
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Node.js `serve` / `npx`
```bash
npx serve .
```

---

## Deployment Instructions (GitHub Pages)

The website is configured for automated deployment to **GitHub Pages** via the GitHub Actions workflow located at `.github/workflows/deploy.yml`.

### Deployment Setup Steps:
1. Navigate to the repository settings on GitHub: `Settings > Pages`.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. When changes are pushed to the `main` branch, the `.github/workflows/deploy.yml` action will automatically deploy the landing page to GitHub Pages.

---

## Project Structure

```
.
├── index.html                  # Landing page markup
├── styles.css                  # Clean developer-tool design system & CSS variables
├── script.js                   # Client-side interactive logic (CLI copy, smooth scroll)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages automated deployment workflow
├── docs/                       # Research & Engineering Blueprint Documents
│   ├── PRODUCT_VISION.md
│   ├── COMPETITIVE_ANALYSIS.md
│   ├── REVERSE_ENGINEERING_NOTES.md
│   ├── MVP_SCOPE.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── SECURITY_MODEL.md
│   ├── DECISIONS.md
│   ├── IMPLEMENTATION_BACKLOG.md
│   └── VALIDATION_PLAN.md
└── AGENTS.md                   # Repository guardrails and operating principles
```

---

## License

MIT License. See individual research blueprints under `docs/` for details.
