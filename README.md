# Policy Radar

German federal/state and French national/regional policy changes, explained in Chinese, German and English with official sources, policy timelines and explicit coverage gaps.

The website is static: it loads published JSON and filters records in the browser. It needs no login, database or application server.

## Languages

Use the language selector to switch between **中文**, **Deutsch** and **English**,
including inside an open policy detail. Selection priority is the `lang` URL
parameter (`zh`, `de`, `en`), saved preference, supported browser language, then
English. Switching preserves filters, search and the selected policy. Search
matches explanations and topic labels across all three languages.

German is the original language of German official sources; French records retain their French originals. German
summaries, like Chinese and English summaries, are **editorial explanations**,
not the official legal text. Original titles, citations and archived source files
remain intact. Original language is recorded per item, independently of the
country and interface language, so countries need not use German sources.
Language availability does not imply coverage of additional countries.

The site uses a typed UI dictionary and checked-in content translations, with no
translation service or additional runtime dependency. Translation bindings include
the policy version and a hash of the complete canonical record. A changed record
invalidates its old translations; missing or stale explanations remain visible in
the existing language with an explicit notice rather than disappearing from the
list. Translation work does not advance factual review dates. See
[data/translations/README.md](data/translations/README.md) for maintenance.

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

## France

France uses a national level and 18 regional geographic areas: 13 metropolitan and
five overseas. These are not German-style federal states. Corsica, Guyane,
Martinique and Mayotte have special institutional arrangements. Region identifiers
use ISO 3166-2 codes, as Germany does. INSEE region codes and French original
names are separate metadata; German and English labels are localized.
The [official prefecture directory](https://www.prefectures-regions.gouv.fr/) and
[INSEE regional atlas](https://www.insee.fr/fr/statistiques/8887938?sommaire=8887976)
define this geographical scope. Departments, municipalities and other special
overseas territories are not independently connected.

The registry contains five national channels and three entry points per regional
area: local authority announcements, administrative acts/decisions and the state
prefecture. Prefecture and council homepages are discovery entry points, not a
claim that gazette documents have been exhausted. Every region supports the same
filters, URL state, source checks, evidence downloads and multilingual detail view
as German regions. French originals remain available; explanations support Chinese,
German and English.

The initial French baseline contains 14 explanations (12 adopted/operational,
two pending) and seven unverified discoveries. Existing schemes and new application
rounds are distinguished from new legislation. Publication, adoption, application
windows and legal commencement are not interchangeable. Every explanation cites
an archived original; blocked downloads and unreviewed attachments remain in intake.
The regional sweep records all 54 portal attempts as partial or blocked, never
complete. Registering 18 regions does not mean all their policies have been found.
Country-specific review markers prevent a French update from re-dating Germany.


### Region identifier migration

The current export uses schema version 3 with ISO subdivision identifiers.
Examples: `FR-IDF` (Île-de-France), `FR-NAQ` (Nouvelle-Aquitaine), `FR-20R`
(Corsica), and `FR-971`/`FR-972`/`FR-973`/`FR-974`/`FR-976` for the five overseas
geographical areas. The ISO identifiers represent different institutional types;
listing them together does not assert that all are ordinary regional councils.
The code list was cross-checked against the maintained
[ISO 3166 dataset](https://github.com/wooorm/iso-3166/blob/main/2.js).

Version-2 export files remain byte-for-byte unchanged. The reader and update gate
apply a version-specific conversion of only the region fields in policies,
revisions and intake; a new version-3 export saves that representation. Stable
record IDs, factual-review dates, evidence, events and other history are unchanged.
Version-3 input never interprets an ISO department code as a legacy region.

Pre-release unversioned region URLs retain their old meaning and are rewritten to
canonical URLs with `regionFormat=iso`. This marker separates future ISO department
links from old region bookmarks. New links should always use `filterSearch`.
Legacy global review metadata is mapped to Germany only at read time; the old
France-specific initial fields map to France only. The UI uses country-scoped
review metadata and shows an explicit unreviewed state when it is absent.
