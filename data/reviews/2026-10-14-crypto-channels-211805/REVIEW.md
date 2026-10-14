# Discovery channels for the crypto pass — 14 October 2026

The owner approved registering the channels that the France and EU crypto passes had to leave unregistered.

## Registry changes

| Region | Channel | Kind |
|---|---|---|
| FR | AMF news (`amf-france.org/fr/actualites-publications/actualites`) | government |
| EU | ESMA news (`esma.europa.eu/press-news/esma-news`) | government |
| EU | Commission taxation and customs news (`taxation-customs.ec.europa.eu/news_en`) | government |
| EU | Council public register (`consilium.europa.eu/.../public-register/`) | parliament |

Registration is not a claim of coverage. On 14 October the AMF list returned HTTP 503 and the Council register returned 403 to the archiver. Earlier the same day, the individual AMF article and the Council PDFs were archived from their document URLs.

## Intake rows now possible

- `fr-amf-psan-transition-2026-02-05`: AMF reminder that the PSAN transitional period ends on 1 Jul 2026.
- `eu-dac8-directive-2023-2226`: DAC8, adopted 17 Oct 2023 and applying from 1 Jan 2026. The row links to the Commission page because the EUR-Lex text could not be archived.
- `eu-esma-mica-transition-statement-2026-04-17`: ESMA statement on the end of the MiCA transitional periods.
- `eu-council-st-8367-2026-misp` and `eu-council-st-9891-2026-misp`: Presidency notes. They are grouped as `eu-misp-crypto-supervision-council` and are not a Council position.

No scans were added; the new channels remain uncovered from 2026-01-01.

## Test and doc changes

- `tests/france-regions.test.ts`:
  - the French channel count changes from 59 to 60;
  - the source-view check now compares the fixed 2026-10-03 export with its own registry instead of the live one, so channels registered later do not break a historical fixture.
- `data/UPDATE.md` records the new channels and the rule that supervisory statements and Presidency notes are not legislation.

## Validation

`data:topics`, `data:select`, 259 tests, TypeScript and build pass.
