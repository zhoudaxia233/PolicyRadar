# Germany, France and Italy update — 18 October 2026

## Scope and result

Owner request: one update round for Germany, France and Italy, with attention to whether the recent unrest in France (17 October) and Italy (16 October) is connected to any policy. Closed window 11–17 October 2026; 18 October is not scanned. All new scans are partial; no channel is claimed complete (`data:coverage` exits 2, see coverage.log).

- 2 new explanations (FR riot-damage bill, IT school decree-law 170/2026), 48 revised explanations (47 DE, 1 FR), 17 new intake rows (including one superseding correction), 9 partial scans, 1 topic group.
- Original intake rows, revisions, scans and earlier snapshots are retained; every change appends a revision.
- No application code changed. One regression test added: `tests/october-18-review.test.ts`.

## Unrest and policy: what the sources show

The riots and clashes themselves are not policy documents and are not recorded as policies. Press coverage was used only to find the related official instruments:

- **France, 17 October.** Cost-of-living demonstrations with looting and about 1,200 arrests (press). The government cited bill no. 952 (Senate, filed 16 September). That bill and the fuel-aid renewal are the policy-relevant items.
- **Italy, 16 October.** Student strikes and clashes in several cities (press). One stated target was decree-law 170/2026 (30% class limit, face-covering ban). A general strike on 30 October was announced by protesters (press, not recorded).

## Source-located review (policy-question completeness gate)

### FR — Bill no. 952 (2025-2026), "casseurs-payeurs"

- Sources: Senate legislative file (`https://www.senat.fr/dossier-legislatif/pjl25-952.html`), the filed text (`https://www.senat.fr/leg/pjl25-952.html`), articles 1–5.
- Stage: government bill filed 16 September, accelerated procedure; rapporteur named 7 October; Senate plenary 27–28 October. Not passed by either chamber.
- Current-law baseline: CSI L.211-10 (State liability for damage by gatherings, recovery action against perpetrators). The bill adds L.211-9-1 (joint liability up to EUR 10,000 in two defined cases), widens State recovery and settlement through restorative obligations (art. 2), lets uninformed victims join damages hearings (art. 3), and allows deductions from family allowances (CSS L.553-4) and housing aid (CCH L.821-6) after a final civil judgment, with other debts recovered first (art. 4).
- Alternatives searched: no other active member's bill on the same question was found in one targeted search; older parental-liability proposals (e.g. 2021) were not followed to their current status. The Council of State opinion and impact assessment cited in the file were not read. Both stated in the explanation.
- The grouping with intake `fr-senat-pjl-952-2026` is by identical official identifier.

### FR — Fuel aid for long-distance commuters (existing explanation, version 3)

- Source: Service-Public A18903, updated 16 October: decree no. 2026-959 of 15 October confirms the October–December renewal; automatic payment to earlier recipients from 16 October; **new applications from 27 October** (the tax office page of 12 October had said 22 October). Income limit EUR 22,770 RFR per share.
- Légifrance was not accessed (blocked in earlier runs), so the decree text itself was not read. Stated in statusNote.
- This is the government's cost-of-living measure in place; no new cost-of-living measure after 17 October was found in official sources.

### IT — Decree-law 30 September 2026, n. 170, articles 12–13

- Sources: Normattiva articles 12, 13 and 15 (text in force from 1 October), and the Parliament list of decrees being converted.
- Stage: in force since 1 October (published GU no. 227 on 30 September). Must be converted within 60 days, by 29 November 2026, or lapses from the start. The Parliament page lists it as **C.3133, in committee on 14 October**. Some press reported Senate examination; the Senate iter page returned an empty HTTP 202 and could not be read. The conflict is stated.
- Article 13: from 2027/28, first-year classes in primary, lower and upper secondary should not exceed 30% of the defined group of foreign pupils. Primary: non-Italian citizens not born in Italy or without two years of pre-school. Secondary: non-Italian citizens without three successful school years in Italy. Mid-year placements follow the limit from 2026/27. Regional offices redistribute pupils to nearby schools with exceptions. A language-support fund applies from 2027.
- Article 12: face-covering ban and EUR 200–1,000 fines imposed by the prefect; Italian courses (A2) for parents, with fines after formal notice.
- Baseline: no statutory class quota before the decree. The 2010 ministerial circular mentioned in press was not read. Media readings differ on the "or" in the primary-school criterion; the text is quoted, not reinterpreted.
- Grouping: topic `it-dl-170-2026-school-decree` links the whole-decree intake record to the narrower explanation. The basis states the other articles are not explained.

### DE — Bundestag 15–16 October and Bundesrat 1,069th session (16 October)

Every tracked item with an elapsed 15/16 October scheduled date was resolved from the decision texts.

- Bundesrat decision PDFs: `Drucksache NNN/26(B)` for 343, 483, 502–513, 518, 521, 525, 532, 534, 539, 543, 560–563, 583, 584, 603, and 578/24.
- Bundesrat agenda-item pages: TOP 16, 24, 47, 48 and 49, used for the decision field.
- Bundestag week-42 result pages.

| Outcome | Items |
|---|---|
| Parliament complete, awaiting signature and publication (`adopted`, no invented start date) | tobacco tax (603/26), product liability, science freedom pay, asset recovery (consent under Art. 108(5)), design law, maritime pilots |
| Bundestag passed, Bundesrat still due (stays `pending`) | starter pension (16 Oct), fuel CO2 corridor (15 Oct, 303/210/52), EUDI wallet (15 Oct) |
| Mandates approved (to end of October 2027; exact day not stated) | Aspides (421/66/90), UNMISS (496/73/4) |
| First reading, referred to committee | BAföG, reserve, Bundeswehr infrastructure, terror-victims commissioner, flight/expulsion foundation, arbitration, agriculture bureaucracy |
| Bundesrat opinion, Art. 76(2) | income tax 2027, Kita quality, FAG (states ask a further EUR 500m in 2026), offshore wind, grid subsidy (asks EUR 6.5bn/year); no objections to the Ukraine and Albania tax treaties |
| Ordinances | consent: benefits-in-kind values 2027, municipal VAT keys, rail EBO fix, oil reserve release (all `adopted`, publication pending); consent with conditions: pipeline ordinance, foreign health qualifications (stay `pending`) |
| State bill introduced into the Bundestag | critical-infrastructure trespass (539/26) |
| Resolutions adopted and sent to government (remain `pending` reform demands) | artists' income-gap pillar, child protection (incl. §118b SGB V), EU worker mobility, minors' self-harm, food banks, licence data for intelligence services, occupational safety, cancer right to be forgotten (also the Bavarian announcement), biotech IPCEI |
| Referred to committees / deferred | defence-industry permits, family-court confidant, 60 km/h light vehicles; autonomous driving: committee deliberations continue |
| Care insurance motions | 21/2216 rejected; 21/5828 and 21/8398 referred to the health committee. The rejection is recorded as a `closed` event without closing the matter; the government PNOG bill proceeds separately |

New Bundesrat discoveries were recorded as intake: TOP 51, 54, 55 and 56 (referred to committees) and TOP 57 (resolution adopted). The EU Affordable Housing proposal (TOP 38) received a superseding intake correction recording the subsidiarity complaint.

Discrepancy kept out of reader text: BundesratKOMPAKT gives EUR 11.824 billion in additional tobacco revenue next year, while the Bundestag gives EUR 756 million. Neither figure is used.

## Other discoveries (await explanation)

- IT Council of Ministers no. 192 (13 October): 2027 budget plan, ex-ILVA decree-law, Campi Flegrei decree-law, new highway code (preliminary), differentiated-autonomy bills for four regions, and tax-code corrections. These are recorded from the cabinet communiqué; the decree-laws' Gazzetta texts were not checked.
- IT 16 October: energy-bills decree (DL 21/2026), understanding with the Commission.
- FR: rent reference index (A17342); "Ce qui change en octobre 2026" (A18466).
- Excluded: Service-Public A19096 (legal Q&A); Entreprendre A17731 (awareness campaign).

## Reader comprehension check

- Checked that a Bundestag vote is never worded as law, and that "the Bundesrat did not call the mediation committee" is explained as "parliament finished; signature and publication pending".
- Each EUR amount has a stated role:
  - the riot bill's EUR 10,000 is a per-person liability cap, not a fine;
  - the fuel aid's EUR 22,770 is reference tax income per share, and DILA's monthly net-pay figures are labelled guides only;
  - the FAG EUR 500m is a Bundesrat request, not an adopted transfer.
- Hypothetical examples were added:
  - FR: a person staying after police warnings while others smash windows;
  - IT: a single first-year class with 25 enrolments, 10 counted → at most 7.
- Each language was read on its own and compared with the other for the same amounts, dates and stage.

## Gaps

- No channel has a complete closed-window scan; DE state channels, FR regional channels and IT regional channels were not checked in this run.
- BMG listing is script-rendered without dates; BMAS pagination was not checked.
- Not accessed: Légifrance (decree 2026-959) and the Senate iter page for the Italian conversion bill (HTTP 202).
- Not read: the Bundesrat decision texts for 575/26, 594/26, 544/26, 568/26 and 598/26 (no (B) document; outcome taken from agenda pages and BundesratKOMPAKT).
- Not explained this run: other provisions of DL 170/2026, and the Italian cabinet items.

## Validation

`data:topics`, `data:select`, `npm test` (271 tests including the new file), `tsc` and `npm run build` pass; logs are in this directory. All 50 changed/new policies and 17 intake rows have `current` English bindings.
