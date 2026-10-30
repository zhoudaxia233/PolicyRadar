# All-country round — 30 October 2026

## Scope and result

Owner request: update every country, push when done, clear as many records awaiting explanation as possible, with the owner's topics first (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets). Tier 1 (Germany, EU) was already updated at 17:11 today, so it got a recheck. Tier 2 got its national channels. Frozen regional channels were not touched, and no frozen record received a disposition.

| Change | Count |
|---|---|
| New explanations | 16: ES 3, GB 7, NL 3, US 1, FR 1, DE 1 |
| Revised explanations | 8: es-rdl-25 v1 → v2 (validated); seven elapsed dates cleared |
| New intake rows | 133: 99 BOE section I, 30 UK SIs (to S.I. 2026/1146), 4 announcements |
| New scan rows | 12, all partial |
| New topic groups | 3, plus 1 document added to the Renters' Rights group |
| New dispositions | 16 groups, 764 records |
| Awaiting explanation | 3,042 → 2,390 |

Remaining: GB 686, ES 516, NL 144, US 92, DE 10 + DE-HE 3, EU 3, FR 2; frozen regions 931 (GB 606, ES 162, US 135, NL 28), which cannot be touched under the scope tiers. No application code changed. New labels in `data/areas.json`: 社会福利 → social, 加密资产 → finance. New regression file: `tests/october-30-all-countries.test.ts`.

## Channels checked

| Country | Checked | Outcome |
|---|---|---|
| ES | BOE day pages 7–30 October, section I | 99 items. Section II and III not recorded. Sections empty 26–27 October. La Moncloa index only. |
| GB | GOV.UK search API for HMT, HMRC, DWP, Home Office, MHCLG; legislation.gov.uk feed | Budget papers read selectively; other tax papers (corporate, VAT, machine games, climate change levy) not recorded. |
| NL | Tweede Kamer OData list; 7 bill pages; 3 memoranda | Rijksoverheid news returned a shell. 37022 plenary date not established. |
| US | Federal Register API 26–30 October; IRS; White House | Titles read. IR-2026-128 still newest; 2027 inflation adjustments not published. PRWORA hearing cancellation read, not explained. |
| FR | service-public lists; November changes dossier; Agirc-Arrco page | PLF, PLFSS and Senate items not rechecked. AMF list had no dated match. |
| CH | news.admin.ch: plain request 403, rendered read | Nothing on the owner's topics on 29–30 October. Taliban sanctions list update not recorded. |
| IT | Palazzo Chigi news | Nothing new; budget bill text not read. Gazzetta and INPS fetched, not reviewed. |
| DE | BMF, BMAS, BMG, cabinet, recht.bund.de; BMI 400, BAMF connection reset, BMWSB 404 | Nothing new after 17:11. Part I No. 327 is 404. States not rescanned. |
| EU | ESMA, TAXUD | Nothing new after 17:11. Official Journal, Council register, OEIL not rechecked. |

`upload.open.rlp.de` returned 403 this round, so `rp-20261030-minbl-46-social-rent` stays awaiting.

## Source-located review

- **RDL 28/2026** (BOE-A-2026-20822) — full text: Art. único (LAU Art. 10 paragraphs 1–6), transitional provision, entry into force 15 November. Example uses the "current rent" fallback in Art. 10.1. RDL 27/2026 (BOE-A-2026-20385) shows repeal on 2 October; grouped as the earlier version.
- **RDL 29/2026** (BOE-A-2026-20823) — preamble, Art. 68.6 LIRPF deduction, final provisions 5 and 6, entry into force. Not read article by article; stated. The 33,007.20 / 23,007.20 / 11,630 / 1.163 figures are from the inserted Art. 68.6. RDL 26/2026 not compared.
- **RDL 31/2026** (BOE-A-2026-21872) — preamble II and commencement only; stated.
- **RDL 25/2026** — BOE-A-2026-21788: the Permanent Deputation validated it on 16 October, published 20 October. The earlier text said plenary and "not found"; corrected throughout.
- **HVCTS** — government response sections 3–10; band table and April 2028 from the May consultation; March 2028 billing from section 6.1.
- **Property and savings rates** — HMRC notice in full. **BADR** — HMRC notice, operative date. Finance Bill text not read.
- **Two-child limit** — Act s.1, effective for assessment periods from 6 April 2026. **Salary sacrifice NICs** — Act s.1; limit unset; 2029–30 start.
- **Renters' Rights** — regulations 2–3 of S.I. 2026/421 and S.I. 2026/638.
- **Refugee sponsorship** — Home Office news; opening of the policy guidance.
- **NL 36992, 36957, 36958** — memoranda sections cited in each explanation's limits.
- **CFTC** — FR 2026-20888 summary, contents and section 2(c)(2)(D) discussion.
- **Agirc-Arrco** — Service-Public page only. **Green motions** — Bundestag agenda summary only.

## Policy-question and reader checks

Every decree-law and bill says what applies now, which instrument changed stage and what is unverified. RDL 28/29/31 are in force or scheduled but not validated, and the card says so. RDL 28's status keeps the nearest step as the validation deadline; 5 November and 19 November are 30 days from enactment. The Spanish rent examples separate tax relief from rent. Budget items stay `pending`. Amounts name their role (annual charge, taxable income, deduction base, tax paid). Each language was read alone and compared for amounts, dates and stage. Hypothetical people use neutral wording.

## Grouping and dispositions

Groups: `es-rent-stability-2026`, `es-rdl-25-validation-2026`, `gb-two-child-limit-2026`; S.I. 2026/325 added to `matter-93b19873afda`. Unresolved: RDL 26/2026 and RDL 29/2026 relationship not established, kept apart.

Dispositions are read by title, in classes for flying restrictions, single infrastructure projects, named local bodies, Church matters, barred lists, Spanish court filings, corrections, treaties, direct grants, vocational curricula, university items, price lists, electronic offices, Dutch budget chapters and annual accounts, and routine US items. Titles naming tax, housing, social security, migration or visas were kept out. **The Spanish direct-grant class is the weakest judgment**: a few grants may reach individuals, and the entry is removable. Spain's remaining titles were not all read.

## Tool note

`data:coverage` exited 1 ("Scan is in the future"). `recentCoverage` hard-codes `+02:00`, so after the October clock change a scan made after 21:59 UTC on the current Berlin day fails. Application code is outside this run, so the coverage files here come from the same function called with today = 2026-10-31. Every tier-1 and tier-2 channel stays incomplete in the seven-day window, as in earlier runs.

## Follow-up

- 1 November: Agirc-Arrco rise; EU parcel fee. 4–6 November: Bundestag items.
- 5 November: validation deadline for RDL 28 and 29; 15 November: RDL 28 starts. 19 November: RDL 31 deadline.
- GB Finance Bill; 14 December: CFTC comments.
