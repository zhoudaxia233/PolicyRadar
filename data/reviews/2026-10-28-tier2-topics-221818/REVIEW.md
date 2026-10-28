# Tier-2 topic round (GB, FR, US, NL, CH, IT, ES) — 28 October 2026

## Scope and result

Owner request: one round on the other countries for the topics the owner follows. No interest list is stored, so the topics are those of earlier owner-requested rounds (crypto on 14 October, tax and asylum on 20 October) plus the priorities in UPDATE.md: taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets. National level only (tier 2). All scans are `partial`; `data:coverage` exits 2 for every country (reports in this directory).

| Country | New explanations | Revised | Intake |
|---|---|---|---|
| GB | 7 (household energy support, minimum wage April 2027, Pension Tax Allowance, ISA changes, trading allowance, stablecoins, triple lock 2030) | crypto loans and liquidity pools v1 → v2 | 8 |
| IT | 1 (2027 budget bill) | work-entry applications v1 → v2 | 1 |
| CH | 2 (BVG ordinance consultation, 28 February 2027 votes) | EFTA–Malaysia v1 → v2 | 2 |
| FR | — | finance bill v3 → v4; property tax and payroll tax reminders v1 → v2 (elapsed dates cleared) | — |
| NL | — | Tax Plan 2027 v1 → v2 (elapsed date cleared) | — |
| US | — | — | — |
| ES | — | — | — |

No application code changed. New regression file: `tests/october-28-tier2-topics.test.ts`.

## Checks by country

| Country | Checked | Outcome |
|---|---|---|
| GB | GOV.UK search API for HM Treasury and Budget publications on 28 October; Budget 2026 HTML document; Budget speech; TIINs for stablecoins, crypto loans and liquidity pools, Lifetime ISA charge, trading allowance; Pension Tax Allowance explainer. | Seven explanations. The High Value Council Tax Surcharge consultation response is recorded but not explained. The many other Budget-day papers (corporate, VAT, gambling, alcohol and others) were not recorded. |
| FR | AN dossier PLF_2027; AN list of adopted texts; Senate PLFSS 2027 file. | No adopted text after T.A. 358 (23 October); Part One of the finance bill not yet adopted. Senate schedule not shown. |
| US | IRS current-month news list. | Newest IR-2026-128 (23 October, already recorded); 2027 inflation adjustments not yet published. |
| NL | Tweede Kamer bill 37022 page and linked plenary activities. | Debate and vote shown as not completed; the plenary date and whether the 26 October consultation took place could not be confirmed. |
| IT | governo.it Palazzo Chigi news; communiqué of Council of Ministers no. 195; Ministry of Labour work-entry circular. | 2027 budget bill approved by cabinet (explained from the communiqué; bill text not read). Pre-fill window 23 October–7 December confirmed. Meetings 193–194 not read. |
| CH | news.admin.ch (reachable again) and EFD news list for 26–28 October. | 12 Federal Council releases on 28 October; BVG consultation and 28 February 2027 vote items explained; EFTA–Malaysia explanation given its vote date. Other releases not recorded. |
| ES | La Moncloa references of 20 and 27 October. | Only administrative budget items; nothing on tax, housing, residence or crypto. |

## Source-located review

- **Household energy support** — Budget chapter 3: VAT cut on electricity extended to July 2027 (~£50 off the April 2027 price cap), £2.6 bn Household Energy Payment, £100 for up to 20 million band A–D households in England from January 2027, Barnett funding for devolved governments, bank surcharge 3% → 6% from 1 January 2027 to 31 March 2028. Delivery mechanism beyond “via the council tax system” not found; stated.
- **Minimum wage** — Budget chapter 3: £13.21 (NLW) and £11.27 (18–20) from 1 April 2027, +3.9%, ~£910 gross a year. Current rates and 16–17/apprentice rates not in the document; stated, not computed.
- **Pension Tax Allowance** — HMT explainer: £13,036.40 threshold, £1 per £3 taper to £13,319, automatic, 2027–28 to 2029–30, worked examples copied in substance (£93.28, £44, £166).
- **ISA** — HMRC TIIN: 20% charge for qualifying purchases above £450,000 from 29 October 2026; Budget: cash ISA stays £20,000; First Time Buyer ISA from April 2029 (£4,000, 25% bonus, no upper age limit). Worked example uses the TIIN’s logic (20% charge returns exactly the saver’s contributions).
- **Trading allowance** — HMRC paper: £3,000 from 2027–28, reporting threshold aligned.
- **Stablecoins** — HMRC TIIN: definition, CGT exemption for individuals and trustees, interest-like returns as savings income, accounts basis for companies, transitional gains/losses with deferral election, operative 6 April 2027 (individuals) / 1 April 2027 (companies), ~1.2 million people.
- **Triple lock** — Budget chapter 5, Box 5.A. The worked example is labelled simplified and hypothetical.
- **Italy budget bill** — communiqué only; the explanation states that conditions and dates depend on the bill text.
- **Swiss BVG consultation and votes** — Federal Council releases; consultation draft and initiative texts not read; stated.

## Policy-question and reader checks

- Every Budget measure is kept `pending` with an explicit status note (announcement or draft, Finance Bill required), except the Lifetime ISA charge, which HMRC states applies to withdrawals from 29 October 2026; its effective date is that operative date.
- Amounts name what they measure: the £50 is an estimated price-cap reduction, the £910 is gross pay, the Pension Tax Allowance is at most about £94 of tax relief, the Italian rent example changes the landlord’s tax, not the rent.
- Chinese and English read separately and compared for amounts, dates and stage.

## Follow-up

- GB: Finance Bill 2026–27 publication; HVCTS explanation; NLW regulations.
- FR: PLF Part One vote; PLFSS in the Senate.
- US: IRS 2027 inflation adjustments (Rev. Proc.).
- NL: Tax Plan plenary debate and vote.
- IT: budget bill text in Parliament.
- CH: consultation deadline for the BVG package; 28 February 2027 vote.
