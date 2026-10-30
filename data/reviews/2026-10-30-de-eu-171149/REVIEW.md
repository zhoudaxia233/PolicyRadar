# Germany and EU update — 30 October 2026

## Scope and result

Owner request: one round for Germany and the EU, focused on the owner's topics (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets). Window 28–30 October at federal and EU level; 30 October is the current day and is not closed. State channels got a list-level sweep for 23–30 October. `data:coverage` exits 2 for both regions (`coverage-DE.json`, `coverage-EU.json`); the Official Journal has no gap in the closed seven-day window.

| Change | Count |
|---|---|
| New explanations | 6: 3 German federal, 1 Hessen, 2 EU |
| Revised explanations | 6: Hessen tenant protection v3 → v4, GKV average rate v1 → v2, benefits in kind v2 → v3, foreign health qualifications v2 → v3, Ukraine treaty v2 → v3, Albania protocol v2 → v3 |
| New intake rows | 102: 3 Federal Law Gazette, 1 BMF, 1 BMF press, 1 BMG, 3 Bundestag agenda, 9 Hessen, 1 Rhineland-Palatinate, 2 EU news, 81 Official Journal |
| New scan rows | 67 |
| New topic groups | 6, plus 1 document added to `eu-union-handling-fee-2026` |
| New disposition groups | 17 |

New explanations: `de-aml-act-2027`, `de-cash-register-digital-receipts-2028`, `de-civil-status-tax-id-2026`, `he-skilled-immigration-central-office-2026`, `eu-withdrawn-commission-proposals-2026`, `eu-carcinogens-workplace-directive-2026`.

No application code changed. New regression file: `tests/october-30-de-eu.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | Part I Nos. 324, 325 (29 October), 326 (30 October), each read from its PDF. Part II ends at No. 239; No. 240 returns 404. |
| Federal cabinet | Results page still ends at the 63rd meeting of 28 October. |
| Bundesrat | 1070th agenda still 404. Date pages exist for 20 November and 18 December; no agenda. |
| BMAS | 30 October: monthly employment figures only (excluded). Calculation values regulation 2027 still "in process". |
| BMF | 28 October: anti-money-laundering draft. The 171st tax estimate was already recorded and dismissed on 23 October. |
| BMG | 30 October: 2027 average supplementary rate. |
| Bundestag | Agenda for sittings 104–106 (4–6 November), version of 30 October 14:30, read in full; three tax items recorded. No plenary this week. |
| Official Journal | L and C views for 28–30 October rendered. 28 October: 50 items, matches the earlier partial record, now complete. 29 October: 41, complete. 30 October: 40 so far, partial. |
| ESMA / TAXUD | ESMA 29 October: Taxonomy reporting proposal (dismissed), newsletter (excluded). TAXUD 30 October: 2027 Combined Nomenclature (dismissed). |
| Council register | 403 to automated access; `blocked`. |
| OEIL, Commission portal | Entry pages only; not reconciled. Parliament press room latest 26 October. |
| Sixteen states | 52 channels fetched once. Hessen gazette rendered and read as a list; Hessen press titles read. Others keyword-sweep only: dated entries could be read on some channels, many show none, two returned 404 and one 403. Not scanned below list level. |
| Not reached | BMI, BMWSB, BMJV, BAMF and BaFin pages tried at guessed URLs returned 400 or 404. No housing, migration or crypto ministry channel was read this round; only the agenda and gazette cover them. |

## Source-located review

### Policy-question gate

- **Hessen tenant protection** — Ministry page "Mieterschutzverordnung": 49 municipalities until 25 November 2026; "Geplante Neufassung": 71 municipalities "nach dem aktuellen Stand", cabinet expected mid-November, rent cap three more years, other rules five years, waiting period 8 → 6 years. GEWOS report section 3.3 and Table 8: 76 qualify (43 continuing, 33 new), 21 no longer qualify. Intersection of those 21 with the 49-list gives 14 names, stated in the explanation. The 71-list is unpublished, the gap between 76 and 71 is unknown and is stated as unknown. GVBl. Hessen reviewed to No. 72 (29 October): no new ordinance. Consequence of removal uses the ministry's own statement of the nationwide 20% limit. Status stays `adopted` with `nextKind: expiry`: an expiry date alone does not make a measure temporary (`tests/status-detail.test.ts`).
- **Anti-money-laundering draft** — Letter pages 1–4 (cabinet 16 December, comments by 19 November, traders' scope, FIU, ZKGw), draft A–E, Art. 1 § 9 (property payment ban, EUR 10,000 notary exemption), Art. 15 (crypto tax transparency cross-references only), Art. 19 (10 July 2027). Current GwG § 16a read: same payment ban. The EUR 10,000 limit comes from the EU regulation, stated separately so the draft is not presented as its source. Not read: rest of about 20,000 lines; the EU regulation itself.
- **Withdrawn proposals** — C/2026/5770: 22 proposals (the 23rd COM number is the reasons reference), approved at the 2576th meeting of 22 July 2026; annex of COM(2025)870 for the general reasons. Stated that withdrawal does not end the policy aims, that no existing law changes, and that national taxes and any new proposals were not checked.
- **Cash-register bill** — BMF press release and agenda item 28 only. Bill text not read; stated.
- **GKV rate** — BMG press release of 30 October. The gazette notice and insurers' actual 2027 rates not read; stated. Average rate 2.9% stays separate from any insurer's rate.

### Gazette

- **No. 324** — full text. Amounts match the existing explanation; in force 1 January 2027.
- **No. 325** — notice only. Art. 19 Register Modernisation Act not read; stated.
- **No. 326** — doctors' parts of Art. 1 (application, Kenntnisprüfung, four-month and two-month decision periods, six-month exam availability) and Art. 6 (1 November). Other professions not read provision by provision. Removal of the final-year pay cap not found in the text checked; marked unverified.

### Hessen and EU

- **GVBl. Hessen 2026 Nr. 63** — Art. 1 § 2, Art. 3, Art. 4, commencement. Darmstadt from 1 October for Frankfurt, from 1 December statewide; local offices keep the function; earlier applications stay.
- **Directive (EU) 2026/2450** — Articles 1–3 and the Annex rows for PAHs, cobalt, isoprene, 1,4-dioxane and welding fumes. Mercury and lead rows not read; stated. Entry into force: 20th day after 30 October = 19 November. No claim about earlier limits except that cobalt and welding fumes are new.
- **Regulation (EU) 2026/2403** — recitals and Article 1: reduced guarantees and data elements for the handling fee. Grouped with `eu-union-handling-fee-2026`; no change to the parcels explanation.

## Reader checks

- Each language read on its own and compared for dates, amounts, stage and scope.
- GKV example: EUR 4,000 monthly income subject to premiums, 14.6% + 2.9% = 17.5%, EUR 700, EUR 350 each; states the amount is income used for calculation. A second case uses 3.5%.
- AML example is labelled hypothetical and dated after the planned commencement; the draft is called a draft in title, status and limits.
- Hessen: the plan appears only under "planned, not yet adopted"; the study is not presented as the final list.

## Still awaiting explanation from this round

- `eu-oj-c-202605780`: safeguard investigation on new hybrid passenger cars. Read in part, not explained; outside the focus topics.
- `eu-oj-l-202602393`: definitive anti-dumping duty.
- Hessen GVBl. Nos. 65, 68, 69; Rhineland-Palatinate MinBl. No. 46 (social rental housing rent tiers, read in part).

## Unresolved leads

- Baden-Württemberg: press item of 28 October on restructuring the tax administration; the guessed URL returned 404, not read. Gazette Nos. 85–89 not recorded individually.
- Bremen Gazette No. 108 (municipal share of income tax), Rhineland-Palatinate gazette items of 23–27 October: seen in lists, not recorded individually.

## Follow-up

- 1 November: EU parcel handling fee applies; foreign health qualifications regulation in force; social security coordination regulation in force.
- 2 November: annual tax act hearing. 4–6 November: Bundestag votes on the Ukraine and Albania treaties, cash-register first reading, care reform first reading.
- Mid-November: Hessen cabinet on the new tenant ordinance; 19 November: comments on the AML draft; 20 November: Bundesrat, likely including the 2027 calculation values regulation (not confirmed); 25 November: Hessen ordinance expires.
