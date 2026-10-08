# Topic grouping review — 8 October 2026

## Scope and result

Reviewed the complete current inventory: 2,942 intake records and 274 policy explanations in `2026-10-08-complete-translations`. The review compared original titles, identifiers, URLs, explicit amendment/correction references, jurisdiction and existing explanations. It is an identity/presentation review, not a fresh full-text legal-effect verification.

86 reviewed matters contain 201 original records. All 2,942 records remain reachable exactly once in official progress. The original export, factual metadata, translations, revisions and evidence archives are unchanged. Each relationship and its basis is recorded in `../topics.json`.

Confirmed families include EU PRIMA signing/agreement/conclusion, European Parliament minutes and verbatim reports for the same sitting, notices citing the same EU sanctions amendment, German parliamentary steps, UK commencement batches for the exact Act and jurisdiction, original instruments and explicit amendments/corrections, Spanish corrections and matching court cases, French diesel relief and its implementation explanation, and the two Italian newborn-benefit explanations.

## Candidates deliberately kept separate

Similarity is not sufficient evidence. These candidate buckets require either separate identities or further source investigation:

- `NL|title|cyberbeveiligingswet en wet weerbaarheid kritieke entiteiten vanaf vandaag van kracht` (2 records): One announcement covers two distinct laws.
- `EU|title|the corrigendum does not concern the english version` (21 records): Generic title does not identify the affected instrument or product.
- `EU|title|publication of the communication of an approved standard amendment to a product specification of a geographical indication in accordance with article 5(4) of commission delegated regulation (eu) 2025/27` (5 records): Generic title does not identify the affected instrument or product.
- `EU|title|publication of an application for registration of a geographical indication pursuant to article 15(4) of regulation (eu) 2024/1143 of the european parliament and of the council` (5 records): Generic title does not identify the affected instrument or product.
- `GB|commencement|victims and prisoners act 2024` (2 records): A multi-Act commencement instrument cannot merge otherwise distinct matters.
- `GB-SCT|commencement|wildlife management and muirburn (scotland) act 2024` (2 records): A multi-Act commencement instrument cannot merge otherwise distinct matters.

Additional Spanish correction candidates were examined. The source original is absent or not safely identified for the Colombia film agreement, 2022 SOLAS amendments, vocational military education Order 1333/2025 and road-fee Royal Decree 205/2025. The Doñana housing correction cites Royal Decree 940/2025, while the similar current record cites 765/2026; Navarra cites different numbered amendments. Cantabria has matching subject wording but conflicting law identifiers (1/2026 versus 7/2025). These have not been silently joined.

## Validation

- 177 automated tests pass, including 11 grouping regression tests.
- TypeScript and static build pass; all 2,015 source evidence checks remain in the build.
- Browser: PRIMA collapses to one matter; keyboard expansion exposes all three distinct original links. Child-ID search and reload retain one matching child.
- Browser: the Italian newborn matter exposes two explanation buttons; the second opens its own deadline explanation.
- Browser: Chinese, German and English matter headings display completely.
- Responsive check at 390 px with documents expanded: no horizontal page overflow.
- `npm run data:topics` validates all current references and reports unresolved candidate buckets without merging automatically.

Re-check against the current export `2026-10-08-crypto-alternatives-173843` (which `topics.json` applies from): 2,956 records and 275 policies scanned; 86 matters contain 202 records; the only unmerged candidate buckets are the six listed above. The 16 records added since `2026-10-08-complete-translations` were reviewed as a set: the three crypto records join `de-crypto-information-exchange` (BT-Drs. 21/7195) and `de-crypto-holding-period` (BMF draft and BT-Drs. 21/5752). The other 13 stay independent: BGBl. 2026 II Nr. 220 concerns the multilateral agreement of 15 January 2025, not the 8 June 2023 agreement in BT-Drs. 21/7195; Nr. 225 and Nr. 226 cover the UN personnel-safety convention and its separate optional protocol; the remaining records have no related original in the inventory. 180 automated tests, TypeScript and the static build pass (2,062 verified evidence files).

## Future updates

Follow `../TOPICS.md` and run `npm run data:topics -- <candidate-export>` for every intake update. Review the entire added set, not only machine-generated candidates. Record explicit relations and keep ambiguous records separate. Historical snapshot builds do not inherit these newer grouping judgments.
