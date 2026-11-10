# All-country round — 10 November 2026

## Scope and result

Owner request: "全部更新一轮" (one full round). Read as in the previous all-country rounds: tier 1 (Germany federal and states, EU) in full, tier 2 national channels on the owner's standing topics. Frozen regional channels were not touched. Window: since the 7 November round (export `2026-11-07T16:00:39.127Z`) through today, a Tuesday; 7–9 November are closed days, 10 November stays partial. Export time `2026-11-10T20:11:11.722Z`.

| Change | Count |
|---|---|
| New explanations | 5: `de-pension-contract-information-ordinance-2027`, `de-be-tight-housing-market-2027`, `gb-child-benefit-rates-2027-28`, `eu-vat-ioss-threshold-removal-2028`, `fr-working-pensioner-rules-2027` |
| Revised explanations | 16 (listed below) |
| New intake rows | 135 (EU Official Journal 75, Bundesrat 16, Bundestag 7, Federal Law Gazette 4, US 12, UK 10, ES 4, FR 3, other DE/EU 5) |
| New scan rows | 80 |
| New snapshots | 102 (100 new files in `data/sources/`) |
| New topic groups | 3 (Berlin ordinance, UK Child Benefit, EU IOSS); 13 documents added to existing groups |
| New disposition groups | 10 (OJ rates, court notices, institutional notices, mergers, GI, corrigenda, technical acts; BGBl municipal VAT keys; UK flying restrictions; ES administrative items) |

Revisions: Bundesrat agenda renumbering — `de-social-insurance-ceilings-2027` v4 (item 53→48), `de-co2-price-corridor-2027` v5 (9→10), `de-carf-agreement-2026` v11 (14→15), `de-emergency-care-reform-2026` v4 (5→6), `de-cash-register-digital-receipts-2028` v3 (30→32), `de-tax-adviser-exam-2026` v3 (31→33), `de-care-insurance-reform-pnog` v6 (32→34); dropped from the agenda — `de-br-pension-trust-motion-2026` v3, `de-br-energy-price-relief-motion-2026` v3; newly listed for the Bundesrat second round — `de-fiscal-equalisation-2026` v3 (also adds the missed Bundestag adoption of 5 November), `de-ukraine-tax-treaty-2026` v5, `de-albania-tax-protocol-2026` v5; Bundestag votes on 12 November — `de-annual-tax-act-2026` v4, `de-grid-support-proposal-2027` v5; next step advanced — `de-bremen-social-services-closures-2026` v5; December benchmark — `fr-gas-benchmark-october-2026` v4.

No application code changed. New regression file `tests/november-10-all-countries.test.ts`; `tests/topics.test.ts` updated because the rolling French gas page now has a fourth monthly record (445 tests pass).

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | 7 and 8 November closed with no issue (Part I 330 is 6 November, 331 is 9 November). 9 November closed: Part I Nos. 331–334, all recorded; Part I 335 and Part II 262–266 return 404. 10 November partial. One request for No. 331 returned 404 before succeeding on retry; Nos. 332–335 needed retries after "fetch failed" responses. |
| Bundestag text archive | Latest 40 items via filter list and per-item teaser JSON; 13 new: 7 recorded, 6 non-policy items excluded with reasons. Agenda PDF still the 3 November version; dates from the previews. Parliamentary documentation not checked this round. |
| Federal cabinet | Rendered list: no meeting results after 4 November. |
| Bundesrat | **Agenda of the 1070th plenary updated on 10 November** (60 items). Added 642/26, 643/26, 644/26, 645/26, 650/26, 651/26 and two appointments; removed 541, 555, 566, 568, 572, 575, 598, 599, 604, 609, 610, 613, 614/26; the rest renumbered. Item pages read for 3, 4, 5, 6, 10, 15, 17, 18, 32, 33, 34, 48; procedure pages read for 598/26 and 599/26. |
| BMF, BMAS, BMG | BMF legislative page: new ministry draft AltvKInfV dated 6 November (**missed by the 7 November round**), recorded and explained. BMAS nothing new. BMG list downloaded but no dated entries could be parsed. |
| Sixteen states | 52 channels fetched; keyword sweep for 7–10 November. Failed again: Saxony-Anhalt Landtag documents and press (404), Bremen Bürgerschaft (404), MV Landtag (403), NRW press (request failed) — the same set as on 4, 6 and 7 November. Bremen gazette 7–9 November closed (no issue). Recorded: Berlin tight housing market ordinance; Hesse Vacancy Act amendment. |
| EU Official Journal | Rendered daily views: 7 and 8 November fall back to the 6 November issue (no issue; closed). 9 November L 4 + C 48 = 52, all recorded (closed). 10 November L 20 + C 3 recorded (partial). |
| ESMA, TAXUD, Council | ESMA one non-rule item. TAXUD: IOSS general approach recorded and explained. Council not checked. |
| GB | GOV.UK search API (HMT, HMRC, DWP, Home Office, MHCLG; HMRC and MHCLG needed a retry after HTTP 503). Child Benefit 2027/28 provisional amounts explained; BIK payrolling guidance, DWP trust governance response, MHCLG older people's housing response recorded. legislation.gov.uk: 6 UK S.I.s recorded; devolved items frozen. |
| ES | BOE API for 9–10 November: 4 national items recorded, 5 regional items excluded (frozen). No gazette on Sunday 8 November. |
| NL | Tweede Kamer OData: only metadata updates to recorded cases. |
| CH | news.admin.ch rendered: nothing within the standing topics. |
| FR | service-public: A17956 (December gas), A18914 (cumul emploi-retraite), A19131 recorded. |
| US | Federal Register API 9–10 November: 11 rules recorded by title (SNAP ×2, UI work search, MEXC funds transfer ban, QOZ reporting, funds transfer threshold, Medicare ×4, rural housing loans); IRS IR-2026-135 recorded. |
| IT | governo.it render still "page not found"; IT review marker unchanged. |

## Source-located review

### Policy-question gate

- **Bundesrat agenda version.** The 7 November cards cited "draft agenda (version of 3 November), item N". The 10 November version renumbers items, so each card now cites the new number; the old scheduled event is superseded (not deleted) by a new scheduled event. Stages are unchanged; outcomes remain unknown.
- **Motions 598/26 and 599/26.** Absent from the 10 November agenda. The Bundesrat procedure pages still show only referral to committees on 16 October. Cards now say the motions were dropped from the agenda without a published reason, remain in committee and have no next date; not treated as withdrawn or rejected.
- **Fiscal Equalisation Act (642/26).** The card still said the Bundestag vote date was unknown, although the 7 November round had recorded the 5 November adoption (`bt-kw45-fag-tobacco-correction`). Corrected: Bundestag adopted on 5 November with an added Tobacco Tax Act correction; Bundesrat second round 20 November. Whether the Bundesrat's extra EUR 500 million was adopted was not checked in BT-Drs. 21/8946; stated in the card.
- **Ukraine and Albania treaties (643/26, 644/26).** Now listed for 20 November; consent/objection category not shown on the item pages, so not stated.
- **Annual Tax Act 21/8283 and grid subsidy 21/8236.** Bundestag previews of 10 November schedule votes on 12 November. Cards say a vote is scheduled; committee recommendations were not read. The grid preview gives EUR 5.53 billion a year (EUR 16.56 billion total) and the government's rejection of the Bundesrat's EUR 6.5 billion request (21/8826).
- **AltvKInfV.** Ministry draft (working version of 5 November) and cover letter read. Parent Act: BGBl. 2026 I Nr. 156 (signed 26 May, published 29 May 2026). **Gap:** the parent private pension reform Act itself has no explanation on this site; the card says so. Comments due 20 November.
- **Berlin § 201a BauGB ordinance.** Senate press release of 10 November: Senate "took note"; planned 1 January 2027 – 31 December 2031; criteria 1, 3, 4 met. Not yet published; not recorded as in force. The card separates it from the rent brake (`be-rent-brake-2026`). Whether the § 250 conversion ordinance is renewed is unverified.
- **Hesse tenant protection.** `he-rent-protection-2025` expires 25 November; the ministry page still says cabinet adoption is expected mid-November and the gazette shows no new ordinance. Card unchanged. The Vacancy Act amendment (first and second reading 10 November) is recorded, outcome unknown.
- **EU IOSS.** DG TAXUD news of 9 November: Council general approach; Parliament to be consulted again; planned application 1 July 2028; review by 1 December 2030. Card separates this VAT change from the already-adopted customs duty change (`eu-low-value-parcels-2026`).
- **UK Child Benefit.** HMRC rates document updated 10 November: provisional 2027/28 GBP 28.00 / 18.55 / Guardian's Allowance 23.75 per week. Uprating legislation not checked; stated as provisional.
- **France cumul emploi-retraite.** Service Public A18914 (updated 10 November): decrees 2026-1016/1017 published 3 November; applies from 1 January 2027 to first-time pensioners only. Decree texts not read article by article; stated.
- **France gas benchmark.** A17956 updated 10 November: EUR 206.26/MWh from 1 December (+5.8%), EUR 16 average bill rise, 2026 annual bill +11.8% (EUR 143). CRE's own December release and GRDF unit prices not read; stated.
- **Spain RDL 28/2026 and 29/2026.** No confirmation notice in BOE section I of 9–10 November; lead stays open.
- **Bremen.** The third announced closure (9–13 November) passed its start date; next step advanced to 13 November with the note that the closures were not separately verified.

### Reader comprehension check

Pension draft: "effective costs" is defined as the reduction in return caused by charges; the EUR 75/month model customer is labelled as a calculation assumption; the example's percentages are marked illustrative. Berlin: states up front that it is not a rent cap and has no direct rent figure; example uses a vacant plot. Child Benefit: amounts named as weekly benefits paid, not thresholds; two-child example 44.95 → 46.55 per week (about GBP 83 a year), HICBC excluded. IOSS: explains that consumers pay no new tax and only the collection point changes; example EUR 300 coat. Cumul emploi-retraite: EUR 7,000 named as an annual gross earnings threshold, not a pension amount; example EUR 10,000 earnings → EUR 1,500 annual deduction. Each language was read alone and then compared for numbers, dates and stage.

## Grouping and dispositions

Added to existing groups: committee recommendations 585/1/26, 587/1/26, 620/1/26 to their bills; 642/26, 643/26, 644/26 to the FAG, Ukraine and Albania matters; Bundestag previews and hearings to the annual tax act, grid subsidy, budget accompanying act, AFBG and reserve matters. Renumbered Bundesrat items and the December gas record joined their matters through existing official-ID references. New groups: `de-be-tight-housing-market-2027`, `gb-child-benefit-rates-2027-28`, `eu-vat-ioss-threshold-removal-2028`; the AltvKInfV and A18914 records link to their explanations by identical official IDs.

Unresolved candidate: S.I. 2026/1165 (Children's Wellbeing and Schools Act 2026, Commencement No. 1) shares the Act with S.I. 2026/941 (Commencement No. 2 amendment); kept separate as different commencement batches.

Kept awaiting on purpose: BGBl 332–334 (exam ordinances, hospital nursing staff floors); CJEU C-223/25 Finanzamt Siegburg (deduction of household costs); Commission Delegated Decision 2026/1814 (professional qualifications); population preparedness guidelines; Greens' EEG bill; Left motion on education finance; BR items 19, 25, 31; Hesse Vacancy Act; UK BIK payrolling, DWP and MHCLG responses, S.I. 1165 and 1172; RD 954/2026; A19131; all US records.

## Open leads

- Bundestag votes on 12 November (Annual Tax Act, grid subsidy, Kita, customs, academic contracts, Greens EEG bill) and 13 November.
- Bundesrat 1070th plenary on 20 November; final agenda.
- Hesse new tenant protection ordinance before 25 November.
- Berlin § 201a ordinance publication; § 250 conversion ordinance status.
- Parent private pension reform Act (BGBl. 2026 I Nr. 156) has no explanation yet.
- Spain: RDL 28/2026 and 29/2026 confirmation; `es-social-protection-rdl-31-2026` confirmation deadline 19 November.
- Italy press page unreadable; Council register not checked; Bundestag parliamentary documentation not checked this round.

## Tool note

`data:coverage` exits 2 for every region (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window, as on 7 November; the Federal Law Gazette has no gap. EU: 6 of 7 incomplete, as on 7 November; the Official Journal is closed through 9 November. No newly failed tier-1 source.
