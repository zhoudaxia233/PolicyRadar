# Backlog clearance (Germany, EU) and EU news channels — 18 October 2026

Third run of the day, after `2026-10-18-de-fr-it-144322` and `2026-10-18-eu-de-151534`.

## Result

| | New explanations | Reviewed as needing no explanation | Awaiting explanation |
|---|---|---|---|
| Germany | 10 | 3 Lower Saxony gazette issues | 10 → 0 |
| EU | 4 | 29 news items, in 5 groups | 1 → 0 (only the methane proposal was outstanding) |

**Germany's 10 new explanations:**
- Lower Saxony gazette: nos. 84, 85, 81, 88 and 89;
- Schleswig-Holstein: three notices;
- Bundesrat motions 601/26 and 602/26.

Three further Lower Saxony issues (nos. 88–90, published 13 October) were also recorded as new intake. The gazette is reconciled as complete for 11–17 October: the numbered listing shows nos. 86–90 for 13 October, preceded by no. 85 for 6 October.

**EU.** Commission general news (pages 1–6, back to the 9 October boundary), ESMA and Taxation and Customs (TAXUD) were checked for 10–17 October.
- 33 items recorded and 27 excluded with reasons (events, interviews, statistics, feature stories).
- TAXUD had no items in the window.
- The Council press-release listing returned 403 and was not used. It is not a registered channel.

## Source-located review

### Germany

- **Lower Saxony gazette no. 84 (hunting ordinance)**
  - Wolf hunting:
    - **Rapid cull:** wolves of any age, 1 July to end of February, in a designated area, after an expert confirms a wolf killed protected livestock.
    - **Intervention area:** declared after three such losses in one wolf territory (two in coastal-defence areas). Young wolves may be hunted July–February, adults November–February.
  - Both require a cross-district management plan under BJagdG § 22d(2). Whether Lower Saxony has adopted one was not verified; the explanation says so.
  - Federal baseline: BJagdG § 22d, archived. With a management plan, wolves may be hunted 1 July–31 October; otherwise only the § 22d(3) exceptions apply.
  - The geese seasons are also changed.
  - In force 6 October.
- **No. 85 (teacher career ordinance).** Teacher qualifications from other German states are recognised (new § 8 a). A master's degree in another field covering two school subjects, after a bachelor's degree, now opens the path. In force 7 October.
- **No. 81 (lawyers' pension funds).** Treaty approval law in force 16 September. Art. 4: Article 2 from 1 January 2027, Article 3 from 1 November 2027. The treaty itself enters into force on 1 January 2027 after exchange of ratification instruments (treaty Art. 8).
- **No. 88:** the state may issue crypto securities. **No. 89:** coat of arms and flag use. Both in force 14 October.
- **Administrative only, reviewed as needing no explanation:**
  - no. 82: courts' e-file ordinance;
  - no. 83: allocation of competences;
  - no. 90: supervision of the Asse foundation and the Oldenburg renaming, with Art. 12(2) retroactive to 1 March 2025.
- **Schleswig-Holstein:**
  - ÜLU funding of EUR 3.85 million a year, existing since 2022 and budgeted to 2028;
  - action plan "Echte Vielfalt 2.0" (40 measures; not a law);
  - BAföG digital processing (reply channel "this year"; amounts unchanged).
- **Bundesrat:**
  - 601/26: minimum protection standards under the KRITIS umbrella act; referred to committees.
  - 602/26: resolution adopted. The single-wagon freight subsidy falls from EUR 384 million in 2026 to EUR 274 million in the 2027 draft budget, according to point 3 of the decision text.

### EU

- **Anti-trafficking strategy (16 October).** Six pillars. Over 20,000 victims registered in 2023–2024 (+16.1%), 36% of them EU citizens. A strategy, not law.
- **T+1 settlement.** EU securities switch on 11 October 2027. New allocation and confirmation requirements apply from 7 December 2026 (set as an application date). Source: the ESMA news item; the legal texts were not read.
- **Political ads repository.** Pilot opens for voluntary use on 12 October. Obligations apply only from official deployment, whose date has not been announced. Regulation (EU) 2024/900 has applied since 10 October 2025.
- **Methane Regulation proposal (14 October).**
  - The Commission page is a script shell, so the text was taken from the press corner's document service: `https://ec.europa.eu/commission/presscorner/api/documents?reference=IP/26/2119&language=en`. That server JSON is archived byte for byte; the archive only accepts `.html` or `.pdf`, so it is stored as `.html` with content type `application/json`.
  - The proposal postpones importers' monitoring, reporting and verification duties, and methane-intensity reporting, by one year. Dates are not given in the source and are not calculated.
  - The original intake row was superseded by a corrected note.
- **Grouping:**
  - The Commission news on the Russia listings joined the decision–regulation group.
  - The SIS news and OJ decision 2026/2284 form one matter.

## Gaps

- France still has 14 records and Italy 19 awaiting explanation (not in scope of this request).
- Not checked in this window:
  - the Commission press corner beyond the general news pages;
  - the Parliament's Legislative Observatory (OEIL);
  - the Council public register;
  - German state channels other than the Lower Saxony gazette.
- `data:coverage` exits 2.

## Validation

- `data:topics`, `data:select`, `npm test` (282 passing), `tsc` and `build` all pass.
- `tests/october-18-eu-review.test.ts` now checks that the Russia group includes both acts plus the later Commission news, instead of exactly two records.
- All new and changed records have `current` English bindings.
