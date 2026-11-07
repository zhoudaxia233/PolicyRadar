# All-country round — 7 November 2026

## Scope and result

Owner request: "全部更新一轮" (one full round). Read as in the 30 October, 4 November and 6 November rounds: tier 1 (Germany federal and states, EU) in full, tier 2 national channels on the owner's standing topics (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets). Frozen regional channels were not touched. Window: since the 6 November round (export `2026-11-06T09:42:45.132Z`) through today, a Saturday; 7 November is the current day and stays partial. Export time `2026-11-07T16:00:39.127Z`.

| Change | Count |
|---|---|
| New explanations | 2: `gb-hmrc-interest-rates-202611`, `fr-single-permit-decree-2026` |
| Revised explanations | 14, all next-step updates: 11 for the Bundesrat 1070th plenary (20 November), 3 for Bundestag votes on 12 November |
| New intake rows | 39: Bundesrat agenda 17, Bundestag text archive 13, UK 2, ES 1, CH 2, FR 2, US 2 |
| New scan rows | 76 |
| New snapshots / sources | 94 |
| New topic groups | 3: `de-br-energy-price-relief-motion-2026` and `de-br-pension-trust-motion-2026` (each joining the 1069th and 1070th agenda items of one motion) and `gb-hmrc-interest-rates-202611`; 13 documents added to 13 existing groups |
| New disposition groups | 1 (Spanish tobacco price notice) |

Revisions: `de-social-insurance-ceilings-2027` v3, `de-starter-pension-2027` v4, `de-co2-price-corridor-2027` v4, `de-carf-agreement-2026` v10, `de-emergency-care-reform-2026` v3, `de-eudi-wallet-2026` v3, `de-cash-register-digital-receipts-2028` v2, `de-tax-adviser-exam-2026` v2, `de-care-insurance-reform-pnog` v5, `de-br-pension-trust-motion-2026` v2, `de-br-energy-price-relief-motion-2026` v2 (Bundesrat); `de-kita-quality-act-2027` v3, `de-customs-financial-crime-2026` v2, `de-academic-fixed-term-contracts-2026` v2 (Bundestag).

No application code changed. New regression file: `tests/november-07-all-countries.test.ts` (433 tests pass).

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | Part I Nos. 331–338 and Part II Nos. 262–272 return 404. 6 November closed by issue continuity (Part I 328–330, no Part II); 7 November partial. |
| Bundestag text archive | Latest 40 items via the filter-list endpoint and per-item teaser JSON: the 6 November sitting and the week-46 previews. 13 recorded, 8 previews of matters with existing explanations outside this round's focus listed as excluded, 19 unrelated. |
| Bundestag agenda PDF | Still the sittings 104–106 version of 3 November; week-46 dates taken from the previews. |
| Federal cabinet | Rendered list: no cabinet decision after 4 November. |
| Bundesrat | Draft agenda of the 1070th plenary (20 November, version of 3 November, 65 items) read in full; 17 recorded, 7 items concerning explanations outside this round's focus and 41 unrelated items excluded with reasons. **Correction to the 6 November review**: it said the agenda was "not yet published"; the draft was published on 3 November and that round only read the plenary page. |
| BMF, BMAS, BMG | BMF nothing new; BMAS one sector-dialogue item (not a rule); BMG list did not render. |
| Sixteen states | 52 channels fetched once; list-level keyword sweep for 6–7 November. Failed: Saxony-Anhalt Landtag documents and press (404), Bremen Bürgerschaft (404), MV Landtag (403), NRW press (timeout) — the same set as on 4 and 6 November. Bremen gazette 6 November closed (no issue). Nothing recorded; the Bremen heavy-rain release is a status report without a new rule. |
| EU Official Journal | Rendered daily views: 6 November L 9 + C 13 = 22, matching last round's 22 records one to one (closed); 7 November shows no new issue (partial). |
| ESMA, TAXUD, Council | ESMA nothing after 29 October; TAXUD nothing after 6 November; Council render blocked. |
| GB | GOV.UK search API for HMT, HMRC, DWP, Home Office, MHCLG (6–7 November): HMRC interest rate change recorded and explained; two policy-paper updates excluded as updates of 28/30 October documents. legislation.gov.uk feed: S.I. 2026/1171 recorded; devolved instruments frozen. |
| ES | BOE API: 6 November section I already reviewed; 7 November one item (tobacco retail prices), recorded and dismissed. Congress press notes read but not recorded (not a registered channel; see open leads). |
| NL | Tweede Kamer OData: no legislative case after 5 November. |
| CH | news.admin.ch rendered: ESTV circular 37A and health insurance cost monitoring recorded by title. |
| FR | service-public: A19128 (Decree 2026-1001) recorded and explained; A18805 (thermostats, 4 November) added because the 6 November round missed it. |
| US | IRS current-month releases (IR-2026-134 excluded); Federal Register API for 6 November: WIC and Medicare OPPS final rules recorded by title. |
| IT | governo.it render returned "page not found"; not checked. IT review marker left unchanged. |

## Source-located review

### Policy-question gate

- **Bundesrat draft agenda** — every revised card states "draft agenda (version of 3 November), item N" and keeps its stage. The agenda is only fixed at the start of the session; the scheduled events say the outcome is unknown. Consent/objection category read from each item page (`tops/N.html`): Frühstartrente and EUDI wallet require consent; emergency care, BEHG and the three exchange agreements are objection laws. The draft does not yet list the laws the Bundestag adopted on 5–6 November (Ukraine/Albania treaties, driving school, FAG/tobacco correction, EmoG), so their cards were not given a 20 November date.
- **CARF identity** — item 14 (BR-Drs. 629/26) is the Act on the 8 June 2023 multilateral agreement under the Crypto-Asset Reporting Framework, i.e. Bundestag bill 21/7195. Items 13 (digital platform income, 2021 agreement) and 15 (CRS addendum) are separate instruments and were not attached to the CARF matter. The card's phase stays as reviewed on 8 October; only the next step changed.
- **CO2 price corridor** — committee recommendations BR-Drs. 624/1/26 (6 November) read: Part A, environment and economic committees recommend not calling the mediation committee; Part B, the economic committee recommends a resolution on auction conditions. Recorded as a recommendation, not a decision.
- **Social insurance values 2027** — item 53 (BR-Drs. 576/26). The planned 1 January 2027 event stays in history; the next step is now the 20 November consent. Amounts unchanged.
- **Emergency care reform** — the card's status note still read "as of 10 October … not yet adopted; vote planned on 15 October" although the 15 October adoption had been recorded. Replaced by the current state and the 20 November second round; the date explanation was rewritten the same way.
- **Bundestag week 46** — the Kita quality act, customs/financial crime act and academic fixed-term contracts act are scheduled for second and third reading on 12 November. Cards say a vote is scheduled; no result is implied. The Building Code upgrade (13 November) and the "Mother and Child" foundation act have no explanation yet and are recorded as awaiting.
- **Cash register bill** — the elapsed 6 November date is resolved by the Bundestag article: first reading held, referred to the Finance Committee. Next step: Bundesrat first-round opinion on 20 November.
- **Spanish decree-laws 28/2026 and 29/2026** — a Congress press note dated 6 November announces that the Standing Committee meets "this Thursday" to debate confirmation or repeal; it gives no result. BOE section I of 6–7 November has no confirmation notice. The congreso.es press page is not a registered channel, so the note is not stored as intake; the cards are unchanged (validity still unverified). Lead stays open.

### New explanations

- **HMRC interest** — news story of 6 November read in full. It gives the Bank Rate change (3.75% → 4.00% on 5 November), the formulas (late payment = Bank Rate + 4; repayment = Bank Rate − 1, floor 0.5%) and the dates (16 November for quarterly instalment payments, 24 November otherwise), but not the new figures. 8.00% and 3.00% are derived and the card says so. Per-tax exceptions not checked; stated.
- **French Decree 2026-1001** — Service-Public article A19128 read in full: 90-day decision period (+30 days for complex files), employer-change restriction 12 → 6 months, right of residence kept in involuntary unemployment (3 months, 6 for trafficking victims), 6-month job-search period for Blue Card holders when the employer defaults, ICT salary threshold pending an arrêté. Légifrance returned HTTP 403, so the decree text, transitional rules and the Official Journal date were not checked; stated in the card.

### Reader comprehension check

HMRC: both rates are annual interest rates, named as late payment or repayment interest; the example (GBP 10,000, 30 days late: about GBP 65.75 at 8% versus GBP 63.70 at 7.75%) separates interest from penalties. France: "decision period", "restriction on changing employer" and "months without work" are each given a unit and whom they apply to; the example uses a first authorisation dated 1 December 2026 to avoid implying a transition rule for earlier permits. Every revised German card names the body, the date, the item number and that the agenda is a draft. Each language was read alone and then compared for numbers, dates and stage.

## Grouping and dispositions

Added to existing groups: BR-Drs. 576/26 (social insurance values), 618/26 (EUDI), 620/26 (emergency care), 629/26 (`de-crypto-information-exchange`), 585/26 (cash register), 587/26(neu) (PNOG), 619/26 (`de-starter-pension-2026`), 624/26 (`de-fuel-emissions-2026`), 586/26 (`de-tax-adviser-exam-reform-2026`), the three week-46 vote previews, and the motorway financing first reading. Two new groups join the 1069th and 1070th agenda records of BR-Drs. 598/26 and 599/26. The topic review reports no ungrouped candidate involving this round's records.

Disposition: BOE-A-2026-23341 (tobacco retail price notice). Kept awaiting on purpose: BR items 13, 15, 43, 45, 49, 58 (Wage Tax Guidelines 2027); Building Code upgrade and Mother and Child foundation votes; six opposition motions (maintenance advance, rent cap, wealth tax, heating costs, EU poverty migration, refugee status); UK S.I. 2026/1171; CH ESTV circular 37A and health cost monitoring; FR A18805; US WIC and Medicare OPPS rules.

## Open leads

- Spain: Standing Committee result on RDL 28/2026 and 29/2026 (BOE confirmation resolution not yet found).
- Bundestag 12–13 November votes (Kita, customs, academic contracts, Building Code upgrade, and eight matters with explanations not updated this round: Mercosur, cyber security, radiation protection, agriculture bureaucracy, deforestation, guardianship, intelligence reform, Bundeswehr infrastructure).
- Bundesrat 1070th plenary on 20 November: final agenda (expected additions for the acts adopted on 5–6 November).
- HMRC official rate table update; French arrêté on the ICT salary threshold.
- Cabinet results page of the 64th meeting; parental allowance lead and RED III biomass ordinance remain open from 2 November.

## Tool note

`data:coverage` exits 2 for every region (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window, as on 6 November; the Federal Law Gazette has no gap. EU: 6 of 7 incomplete, as on 6 November; the Official Journal is closed through 6 November. No newly failed tier-1 source. Tier-2 scans all partial; Italy not checked this round.

## Follow-up

12–13 November: Bundestag votes. 16 November: new HMRC rates for quarterly instalments; 24 November: other HMRC interest. 20 November: Bundesrat plenary. 1 December: expected start of the eWA ordinance. 1 January 2027: social insurance values 2027 (subject to Bundesrat consent).
