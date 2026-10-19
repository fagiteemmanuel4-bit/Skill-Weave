# SkillWeave

SkillWeave is exploring ways to help developers discover, compose, evaluate, and reuse AI skills and workflows with clearer evidence of what works.

## Website preview

The initial landing page is a static site in `index.html`. It is intentionally small and does not require a build step or package installation.

### Run locally

Open `index.html` in a browser, or serve the repository root with any static HTTP server.

### Publish with GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`. To publish:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Merge the website branch into `main`.
4. Open the **Actions** tab and confirm that **Deploy SkillWeave site** completes successfully.
5. The workflow output will show the published URL. For a project site, the expected URL is usually `https://fagiteemmanuel4-bit.github.io/Skill-Weave/`.

The URL above is an expected GitHub Pages address, not a claim that the site is already live. Publishing depends on repository Pages settings and a successful workflow run.

## Current scope

This is a landing-page starter only. Workflow discovery, accounts, execution, evaluation, and other product features are not implemented yet. The product preview is explicitly illustrative, not live data.
