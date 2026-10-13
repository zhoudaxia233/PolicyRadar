# Validation

- 233 tests passed; none failed or skipped. Includes reserve-service baseline/transition regression tests and new announcement identity/topic separation coverage.
- TypeScript check, data selection validation, topic review and static build passed. Build: 640 policies, 735 revisions, 4,537 archive evidence files.
- Coverage command returned 2: incomplete German coverage. This is preserved, not waived. The accompanying all-Germany coverage report includes state channels as well as federal ones.
- Compared with the pre-run local baseline: every old intake, revision, scan and snapshot row remains byte-for-byte equivalent as an object; all non-German policies unchanged. Only Germany review settings changed.
- Browser: English adopted list shows Lower Saxony land-law commencement on 14 April 2027 and wastewater-law commencement on 1 January 2027, both explicitly not yet in effect.
- Browser: Bernau search returns one matter, two related explanations, and one matching source child. Navigation counts agree. Brandenburg filtering shows one matching explanation while retaining access to both related explanations.
- Browser: English and Chinese labels, keyboard Enter expand/collapse, persisted search and region after reload verified. Final source child offers the linked policy explanation rather than an incorrect pending label.
- Mobile 390 x 844: Chinese group and source child remain accessible; document scroll width equals viewport width (390), with no horizontal overflow. Viewport override reset after checking.

No live deployment was changed or verified. These are local checks only.
