# Tax round and EU asylum backfill (EU, US, GB, NL) — 20 October 2026

## Scope and result

Owner request: run a round on new tax policies across the tracked countries, and add the EU refugee-related measures if found.

| Region | New explanations | Updated | Intake | No explanation needed |
|---|---|---|---|---|
| EU | 4 (temporary protection, safe countries of origin, safe third country, European Council migration conclusions) | — | 4 | — |
| US | 2 (premium tax credit proposed rules, adoption credit refunds) | diesel relief v1 → v2 | 7 | 4 |
| GB | 2 (vaping products duty, Making Tax Digital £30,000) | — | 4 | 2 |
| NL | 1 (Tax Plan 2027) | — | — | — |

- The EU asylum pact had no records at all before this run. The three legal acts are targeted backfill (published February and August 2026) and do not close any Official Journal day.
- No application code was changed. New regression test: `tests/october-20-tax-asylum.test.ts`.
- All scans are `partial`.

## Tax checks by country

| Country | Checked | Outcome |
|---|---|---|
| DE | BMF press releases for October | Only the sugary drinks tax (14 Oct, already explained) and the Stability Council meeting. Nothing new. |
| FR | Assemblée nationale PLF 2027 dossier | Secondary reports say the solemn vote on Part One, expected on 20 October, was postponed to 27 October. The AN dossier page did not show it, and the agenda URLs returned 404. **The French record was not changed**; it needs an official source. |
| IT | Search for the 2027 budget bill | Reports conflict on whether the Council of Ministers has approved the bill; no official communiqué was archived. Not changed. |
| ES | Search | The 2027 budget has not been sent to parliament; no tax measure found. Not changed. |
| US | IRS current-month news list | IR-2026-118 to 124 recorded. The 2027 inflation adjustments (brackets, standard deduction) are not yet published. |
| GB | HMRC news index | Budget is on 28 October; no official tax changes yet. |
| NL | Government and House pages | Tax Plan 2027 explained. |
| CH | Not scanned | — |

## Evidence route

- **EU legal texts.** Fetched from `publications.europa.eu/resource/oj/<ID>` with `Accept: application/xhtml+xml`. They were re-fetched at their https Cellar manifestation and archived byte for byte. Acts: 2026/1912, 2026/463, 2026/464, and 2024/1348 for the base articles and application date.
- **EUCO 14/26.** Taken from the Council register, `data.consilium.europa.eu/doc/document/ST-14-2026-INIT/en/pdf`.
  - The `consilium.europa.eu` meeting page and media PDF returned a browser challenge (403). A `data:render` attempt also landed on the challenge page.
  - This was not bypassed and not archived as evidence (see `fetch-ledger.json`).
  - The Council's 15 July press release on temporary protection also returned 403 and was not used.
- **Other sources.** IRS, GOV.UK, Rijksoverheid and Tweede Kamer pages were fetched directly (HTTP 200) and archived.

## Source-located review

### EU

**Temporary protection, Implementing Decision 2026/1912**

| Item | Detail |
|---|---|
| Art. 1 | Protection extended to 4 March 2028 |
| Art. 2 | Protection is granted only to those who meet their military obligations "upon presenting, where applicable, proof" |
| Art. 2, exemption | People already protected on or before 30 July 2026 who keep that status continuously in the same member state |
| Art. 3 | In force the day after publication (5 August); Art. 2 applies from 31 July 2026; Art. 1 applies from 5 March 2027 |

- **Recitals used:** 5 (no duplicate permits), 9 (4.4 million beneficiaries), 18 (proof: border crossing, exit stamp, Reserv+, burden on the applicant), 20 (not only conscripts), 25 (Denmark not bound).
- **Card date:** `effectiveDate` 2026-08-05 is entry into force. `nextDate` 2027-03-05 is when the extension starts to apply.

**Safe countries of origin, Regulation 2026/464**

- Annex II lists Bangladesh, Colombia, Egypt, India, Kosovo, Morocco and Tunisia.
- New Art. 62(1b) also designates candidate countries, except where any of three conditions applies:
  - indiscriminate violence;
  - restrictive measures over fundamental rights;
  - an EU-wide recognition rate above 20%.
- New Art. 63: suspension by delegated act for 6 months. A proposal must follow within 3 months; the suspension can be extended by 6 months, renewable once; it lapses after 15 months.
- Art. 79 addition: Articles 59(2), 61(2) and 61(5)(b) can be used from 27 February 2026 under the old directive.

**Safe third country, Regulation 2026/463**

- New Art. 59(5)(b): connection, transit, or an agreement (any one is enough).
- Art. 59(6): the agreement option does not apply to unaccompanied minors.
- Art. 68(3)(b): appeals against inadmissibility under Art. 38 have no automatic suspensive effect, except for unaccompanied minors in the border procedure.

**Base text and grouping**

- Regulation 2024/1348, Art. 79: applies from 12 June 2026. Art. 42(1)(e): accelerated examination for safe countries of origin.
- 463 and 464 are grouped as one matter (same adoption date, same OJ issue, both amend Articles 59–64). Each keeps its own explanation.

**EUCO 14/26**

- Paragraphs 65–66: strategic discussion; emergency framework; instrumentalisation; leaders will revert.
- Paragraph 73: Ceuta and Melilla. Paragraph 29: temporary protection.
- The Commission President's letter it mentions was not obtained.
- Media claims about rejected stricter wording are not used.
- **Not found:** an official text of the Commission's 2026 annual asylum and migration report, the migratory-pressure decision, or a 2027 solidarity pool proposal. Their calendar deadline is 15 October. Commission press items for 14–20 October and the Home Affairs news list show none. **Unresolved lead.**

### US

- **IR-2026-121 (proposed premium tax credit rules)**
  - Eligibility from 2027 limited to citizens, nationals and "certain" lawfully present non-citizens; new advance-payment verification; parallel HHS rules expected.
  - The Federal Register text, the comment period and the list of retained statuses were not obtained. The explanation says so.
- **IR-2026-123 (adoption credit refunds)**
  - Tax year 2025 only; 2020–2024 carryforwards can raise the refundable part, within $5,000 per child.
  - Automatic adjustments began in late September; extension filers and flagged accounts are reviewed later in 2026.
- **IR-2026-122 (diesel)**
  - No penalties for dyed diesel sold for or used on highways, nationwide, from 1 October to 31 December 2026; enforcement suspended.
  - Section 7508A postponement and Form 720 guidance are still to come. "Explore" eliminating deferred amounts is not a waiver.
  - The diesel explanation advances to v2 and appends a correction event. The v1 "five-day" scheduled event is preserved.
  - Grouped with the executive-order record.
- **No explanation needed:** IR-2026-118 (VITA volunteers), 119 (cybersecurity reminder), 120 (UK whistleblower partnership), 124 (Tax Professional Awareness Week).

### GB

- **Vaping Products Duty (HMRC release, 1 October)**
  - £2.20 per 10ml, with or without nicotine; paid by approved manufacturers, importers and warehousekeepers.
  - Stamps: transitional stamps until 31 December 2026; digital stamps mandatory for new products from 1 January 2027; all products on sale stamped from 1 April 2027 (stock grace period to 31 March 2027).
  - Tobacco duty: one-off increase of £2.20 per 100 cigarettes or 50 g.
  - Traveller allowance in Great Britain: 50ml.
  - Grouped with S.I. 2026/1024 (appointed day) and S.I. 2026/331 and 2026/338 (stamp rules); their titles name the duty and stamps explicitly.
  - The release does not state the VAT treatment, so the example gives no VAT figure.
- **Making Tax Digital (HMRC release, 5 October)**
  - Thresholds: £50,000 from 6 April 2026; £30,000 from 6 April 2027 (about 1,077,000 more people); £20,000 from April 2028 (no day given).
  - Turnover is gross self-employment and property income before allowances and expenses.
  - The underlying regulations were not read.
- **No explanation needed:** the Self Assessment early-filing reminder and the Tax-Free Childcare promotion.

### NL

- **Tax Plan 2027 (Rijksoverheid release of 15 September)**
  - Purchasing-power package of €1.5 billion: employed-person tax credit +€173; first and second income tax rates −0.06 points.
  - Fuel excise discount extended to 2027; tap water tax +€0.10 per 1,000 litres; alcohol excise indexed annually.
  - Less pension accrual relief from €137,800 for six years.
  - Specific medical expense deduction ends in 2028; VAT on ornamental horticulture and hot-air ballooning rises from 9% to 21% in 2028.
  - Starter deductions end in 2028 and 2029; transfer tax for non-owner-occupiers falls from 8% to 7%.
- **Bill 37022 page (Tweede Kamer)**
  - Legislative committee meetings on 12 October (continued) and 26 October; plenary in week 45.
  - Memorandum of amendment 37022-17 dated 14 October; **not read**.
- **Grouping.** Grouped with the existing transfer-tax explanation: the government release lists the 8% → 7% change in the same package. Bill 37023 (Other fiscal measures 2027) stays separate.

## Policy-question completeness

- **Temporary protection.** The explanation states:
  - the previous end date (4 March 2027);
  - the new end date;
  - who is exempt from the new condition;
  - that national benefit, work and housing rules are unchanged and were not checked.
- **Safe countries.**
  - The baseline is Directive 2013/32/EU before 12 June 2026, with no EU list.
  - National lists remain possible.
  - A listed country leads to accelerated examination, not automatic refusal.
- **Premium tax credit.** Labelled proposed rules. The statutory change and the final rules are separate steps, and neither is claimed as in force.
- **Diesel.** Penalty relief is distinguished from tax postponement and from any waiver. State taxes are outside its scope.
- **Dutch Tax Plan.** Proposal only. The government lacks a majority, the amendment memorandum is unread, and box 3 is handled by a separate amending bill (cross-referenced).

## Reader comprehension check

- **Dutch tax credit.** The €173 example says a tax credit lowers annual income tax by up to €173 if tax liability is high enough. It is not a monthly pay rise.
- **Making Tax Digital.** The example sums two gross income sources against the turnover threshold and says profit is irrelevant.
- **Vaping duty.** The example names who owes the duty and treats consumer price effects as conditional on pass-through. No VAT figure is invented.
- **Adoption credit.** The example names the carryforward, the per-child cap and the refund mechanics.
- **Temporary protection.** The example names the evidence a new applicant needs and who bears the burden of proof.
- **Both languages.** Each was read on its own, then compared for dates (31 July, 5 August, 5 March, 4 March), amounts and stage.

## Gaps

- **France.** The PLF 2027 Part One vote postponement is not confirmed from an official source; the French record is unchanged.
- **Italy.** Budget bill status is unconfirmed.
- **EU, not found.** The Commission annual migration report and the solidarity pool proposal for 2027.
- **EU, not checked.** National implementation of temporary protection and of the safe-country rules.
- **Not checked elsewhere.** Federal Register text of the premium tax credit proposal; Dutch amendment memorandum 37022-17; HMRC Making Tax Digital regulations.
- **Not scanned.** Germany, Switzerland, Spain and Italy channels beyond the targeted checks above.
- **Coverage.** `data:coverage` exits 2 (incomplete channels; see `coverage.log`).

## Validation

- Passing: `data:topics`, `data:select`, `npm test` (302 passing), `tsc` and `npm run build`.
- All 10 new or changed policies and 15 intake records have `current` English bindings in `dist/data.json`.
