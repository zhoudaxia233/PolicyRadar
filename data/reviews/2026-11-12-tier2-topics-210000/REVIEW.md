# Tier-2 standing-topics round — 12 November 2026

## Scope and result

Owner request: "更新一轮其他国家（关注的话题）". Read as a tier-2 topic round under `data/UPDATE.md`: national channels of France, the Netherlands, Switzerland, Italy, the United Kingdom, Spain and the United States, on the owner's standing topics (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets). Frozen regional channels were not touched. Window: since the 10 November all-country round through today; every scan stays `partial`. Export time `2026-11-12T19:51:08.221Z`.

| Change | Count |
|---|---|
| New explanations | 3: `gb-benefit-pension-rates-2027-28`, `es-single-parent-families-rdl-35-2026`, `us-retirement-plan-limits-2027` |
| Revised explanations | 0 |
| New intake rows | 19 (GB 7, ES 5, US 3, CH 2, NL 2) |
| New scan rows | 9 |
| New snapshots | 8 |
| Topic groups / dispositions | none; the three explanations link to their records by identical official ID |

Review markers updated for GB, ES, US, FR, NL and CH. Italy's press page still renders "page not found"; its marker is unchanged. New regression file `tests/november-12-tier2-topics.test.ts` (457 tests pass).

## Channels checked

| Country | Channel | Result |
|---|---|---|
| GB | GOV.UK search API (HMT, HMRC two pages, DWP, Home Office, MHCLG), 10–12 Nov | Benefit and pension rates 2027–28 explained; Tenant Fees Act statutory guidance, service charges, NPPF response, employee share schemes recorded by title. The earned settlement response (HTML posted 12 Nov) and guided retirement pages are updates of matters explained on 2–4 Nov; excluded with pointers. |
| GB | legislation.gov.uk new feed | S.I. 2026/1175 (student loan repayment) and 2026/1181 (building insurance information, England) recorded; devolved items frozen. |
| ES | BOE API section I, 11–12 Nov (needs `Accept: application/json`; a request without it returned HTTP 400) | RDL 33–36/2026 recorded, RDL 35/2026 explained; Constitutional Court jurisdiction dispute on the State Housing Plan recorded; 8 administrative items excluded. No confirmation of RDL 28, 29 or 31/2026 yet. |
| US | Federal Register API; IRS newsroom | No FR documents on 11 Nov (Veterans Day); 2 of 28 items on 12 Nov recorded. IR-2026-136 explained. |
| FR | Service Public news | Two new items (bank overdrafts, France Identité) outside the standing topics; excluded. |
| NL | Tweede Kamer OData (Zaak, Besluit) | Blue Card novelle and Verzamelwet SZW 2027 recorded. Tax Plan 2027 plenary debate concluded 11 Nov; no vote yet. |
| CH | news.admin.ch rendered (first page only) | Hearing-aid flat rates and Familienzeit initiative recorded. |
| IT | governo.it rendered | "Pagina non trovata"; blocked as before. |

## Source-located review

### Policy-question gate

- **UK rates.** Source: DWP page and HTML table "Proposed benefit and pension rates 2027 to 2028" (11 Nov), stating they follow the written ministerial statement of 28 October. Stage: proposed; the up-rating order still needs parliamentary approval, so the card is `pending` with no effective date. Figures read from the tables: new State Pension 241.30 → 250.70; basic 184.90 → 192.10; Pension Credit single 238.00 → 247.30, couple 363.25 → 377.40; UC single 25+ 424.90 → 443.21, couple 666.97 → 695.71, under 25 338.58 → 353.87; Carer's Allowance 86.45 → 89.50 (earnings limit 204 → 212); Attendance Allowance higher 114.60 → 118.60; benefit cap and LCW amount unchanged. The full new State Pension × 52 (£13,036.40) matches the figure already used in `gb-pension-tax-allowance-2027`. The exact first payment week in April was not checked.
- **UK settlement.** The 12 Nov HTML response is the same document as the PDF behind `gb-earned-settlement-2026` (explained 2 Nov). No new implementation date; card not revised.
- **Spain RDL 35/2026.** Read Articles 1–8, the transitional provision and final provisions 1, 2, 4 and 10 in the BOE HTML. In force 12 November; Article 5 and the large-family amendments from 1 January 2027 (card `phased`, next step 1 January 2027). Congress confirmation under Article 86 of the Constitution is pending; the exact deadline was not computed and the card says so. The IPREM amount was not checked, so the example gives no income figure. Maintenance-fund beneficiaries per the amended Article 4 of RD 1618/2007: Spanish children and EU-national minors resident in Spain; stated in limits.
- **US limits.** IRS release IR-2026-136; Notice 2026-66 not read item by item. Card `adopted`, application date 1 January 2027.

### Reader comprehension check

UK: each figure says weekly or monthly and which benefit; the example converts the State Pension rise to a yearly amount and states these are benefit amounts, not thresholds. Spain: the two certificate categories are defined in plain terms; the example shows which category a one-child family falls into and says the certificate itself pays nothing. US: limits are named as contribution caps, not taxes; the example adds the catch-up for a 55-year-old and places a $160,000 earner within the Roth phase-out. Each language was read alone and then compared for numbers, dates and stage.

## Open leads

- Dutch Tax Plan 2027 vote; box 3 novelle in committee.
- Spain: Congress confirmation of RDL 28, 29, 31 and 35/2026 (`es-social-protection-rdl-31-2026` deadline 19 November).
- UK up-rating order approval; earned settlement implementation date and Immigration Rules changes.
- Swiss news beyond the first page; Italy press page unreadable.

## Tool note

`data:coverage` exits 2 for all seven countries (reports saved); recent windows stay incomplete because tier-2 scans are topic-limited and partial by design. No newly failed source; the BOE API requires an explicit JSON `Accept` header.
