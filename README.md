# Policy Radar

English | [简体中文](README.zh-CN.md)

Track policy changes in Germany, France, the Netherlands, Switzerland, Italy, Spain, the United Kingdom and the European Union, with official sources and policy timelines.

A static website with browser-side search and filters. No login, database or application server required.

## Coverage

- European Union: a separate supranational level, with historical explanations covering digital services and markets, consumer rights, product requirements, payments and travel. Official EU discovery channels are registered; exhaustive monitoring and national transposition checks remain incomplete. EU policies are stored once in the EU view, without duplicating them as national measures.

- Germany: federal level and all 16 states.
- France: national level and 18 regional geographic areas.
- Netherlands: national level and 12 European provinces.
- Switzerland: federal level and all 26 cantons.
- Italy: national level and all 20 regions; initial source registration and a first national explanation. Regional parliaments, regional gazettes and autonomous provinces are not yet individually connected.

- Spain: national level, 17 autonomous communities and two autonomous cities; 40 government/gazette channels registered and the 2026 minimum wage backfilled. Historical scans remain incomplete; parliaments and other local bodies are not independently connected.
- United Kingdom: national level and England, Scotland, Wales and Northern Ireland; nine shared or devolved official channels, historical catalogue discoveries and selected reviewed explanations. Territorial extent is checked per measure. Local authorities, Crown Dependencies and Overseas Territories are not separately connected; historical scans remain incomplete.

Coverage is incomplete; the site shows review dates, scan gaps and unverified discoveries. Explanations are editorial summaries, not official legal text. Original sources remain available, and pending proposals are distinguished from adopted measures.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:8080. Restart the command after editing source or data; it builds and serves the site without live reload.

## Validate and publish

```sh
npm test
npx tsc --noEmit --incremental false
npm run build
```

Pushes to `main` run checks and deploy `dist/` to GitHub Pages through [the deployment workflow](.github/workflows/pages.yml). The output can also be served by any static host.

## Maintain data

[data/current-export.json](data/current-export.json) selects the active dataset. Builds validate policy data and archived source hashes. Archived originals are not published with the site; the site links each one to its committed copy in `data/sources/` on `main`, so every new archive file must be pushed with the export that uses it. A rebuild does not count as factual re-verification; never edit active or historical exports in place.

- [Weekly update workflow](data/UPDATE.md): collection, evidence, new exports and publication rules.
- [Translation maintenance](data/translations/README.md): reviewed translations and stale-content handling.
- [Official-source registry](data/discovery-registry.json): discovery channels and jurisdictions.
