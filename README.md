# Policy Radar

German federal and state policy changes, explained in Chinese with official sources, policy timelines and explicit coverage gaps.

The website is static: it loads published JSON and filters records in the browser. It needs no login, database or application server.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:8080. `npm run dev` builds the site and serves it; run it again after editing source or data. To build and serve separately, use `npm run build` and `npm start`.

## Publish

Every push to `main` runs the checks, builds `dist/` and deploys it to GitHub Pages (`.github/workflows/pages.yml`). All URLs are relative, so the site works under the project path `/PolicyRadar/` or on any other static host.

## Data

The active dataset is selected by `data/current-export.json`. The initial export is `data/exports/2026-10-03/policy-radar-export.json`: 24 policies, 59 revisions, 18 intake records, 51 scan records and 137 archived source files.

- `data.json` in `dist/` is the browser dataset generated at build time.
- Archived HTML/PDF sources are published with `.bin` extensions as downloads, so third-party HTML never runs on the site's origin.
- The build validates the policy data and every archived source's SHA-256 hash, and fails if evidence is missing or corrupt.

To build from a newer export, keep its `sources/` directory beside it and run:

```sh
npm run build -- data/exports/YYYY-MM-DD/policy-radar-export.json
```

A rebuild does not mean the policies were re-verified. The interface shows the review dates and scan coverage recorded in the data.

## Weekly updates

A local Codex scheduled chat performs official-source collection and AI review
weekly on Sunday at 08:30 Europe/Berlin. It requires the computer and Codex to be
available, and uses the workflow in [data/UPDATE.md](data/UPDATE.md). The schedule
is managed in Codex, not by GitHub Actions. AI review does not guarantee accuracy.

Prepare a new export with its source archive, then build it using the explicit
path above. Run `npm run data:select -- data/exports/RUN/policy-radar-export.json`
to validate history and evidence and select it for subsequent default builds.
Never edit an active or historical export in place. After validation, the weekly
task is authorized to commit and push its data updates to `main`, triggering
GitHub Pages publication. It must verify the deployment and preserve unrelated
work. Application changes are outside this recurring authorization.

## Checks

```sh
npm test
npx tsc --noEmit --incremental false
npm run build
```
