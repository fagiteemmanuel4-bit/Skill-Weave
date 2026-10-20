# SkillWeave

SkillWeave is an independent, source-first library for discovering public AI-agent skill files. It helps people search GitHub, inspect a repository's `SKILL.md` instructions, review visible repository signals, and download files without pretending that popularity is proof of quality.

## Pages

- `index.html`: product landing page.
- `library.html`: searchable skill catalogue with language/star/archive filters, sorting, pagination, local saved skills, shareable search URLs, and CSV export.
- `skill.html?repo=OWNER/REPO`: repository detail page, file-tree inspection, and instruction preview.
- `download.html?repo=OWNER/REPO`: download a selected instruction file, download a source ZIP, or copy a compatible CLI command.
- `styles.css` and `app.js`: shared UI and client-side behaviour.

## How search works

The library first loads `catalog.json`, a generated index of public files named `SKILL.md`. If no populated index is available, it falls back to GitHub repository search. Repository detail pages fetch live public repository metadata and the default branch's file tree from GitHub, and run small text-pattern checks that flag commands or access patterns worth reviewing. These checks are not a security audit. Saved skills are stored only in the current browser; CSV export contains the current filtered catalogue results.

The scheduled indexer is `scripts/build-index.cjs` and `.github/workflows/index-skills.yml` runs it daily and on manual dispatch. It uses the GitHub Code Search API through the workflow's `GITHUB_TOKEN`. It queries multiple skill-related terms, deduplicates repository/path pairs, and commits the generated catalogue when it changes. GitHub search has rate limits and per-query result caps; therefore, the index is best-effort and **does not guarantee complete coverage of GitHub or a fixed 10,000-skill count**. Inspect the generated timestamp and `totalSkills` in `catalog.json` for the actual indexed count.

## Public-signal score

The 0–100 score is a transparent metadata heuristic using available public signals such as stars, license metadata, description, topics, recency, and archived status. It is not a user review, benchmark result, security scan, or guarantee that the skill is safe or useful. License information is shown as unverified when it is not available.

## Safety and licensing

Third-party skill files are untrusted instructions. Read them before use. Do not blindly execute shell commands, allow broad tool access, or expose credentials. Repository visibility does not mean a skill is open-source or grants redistribution rights; check its license and the repository's terms.

## Run locally

Because browser `fetch()` calls need an HTTP origin, serve the project directory rather than opening the HTML file directly. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Validation and deployment

Run the no-dependency smoke checks with:

```bash
node scripts/smoke-test.cjs
```

The Pages workflow runs the smoke checks on pull requests and deploys the site from `main` after checks pass. GitHub Pages must be configured to use GitHub Actions under repository **Settings → Pages**. Confirm a successful run in the repository's Actions tab before treating the public URL as live.

Expected project URL: https://fagiteemmanuel4-bit.github.io/Skill-Weave/

## Current limits

- No accounts, user-submitted reviews, user-generated ratings, or social features.
- No server-side API proxy; the fallback live search is subject to GitHub API limits.
- The catalogue is best-effort and must be checked after the index workflow runs.
- No security certification or automatic execution sandbox is provided.
- Downloads are sourced from public GitHub files and archives.
- The project is independent and is not affiliated with GitHub, Vercel, or Skills.sh.
