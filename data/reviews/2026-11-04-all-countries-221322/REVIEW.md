# All-country round — 4 November 2026

## Scope and result

Owner request: "全部更新一轮" (one full round). Read as in the 30 October all-country round: tier 1 (Germany federal and states, EU) in full, tier 2 national channels on the owner's standing topics (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets). Frozen regional channels were not touched. Window: since the 2 November DE/EU round and the 30 October tier-2 round, through today; 4 November is the current day and stays partial.

| Change | Count |
|---|---|
| New explanations | 9: DE 1, DE-HH 1, DE-HB 1, GB 5, CH 1 |
| Revised explanations | 18: 5 substantive (DE 3, NL 1, EU parcels next step), 13 elapsed dates cleared or advanced (DE 2, DE-RP 1, DE-HB 1, FR 4, CH 4, NL 1) |
| New intake rows | 181: BGBl. II 17, Bremen gazette 8, EU Official Journal 117, UK S.I. 13, BOE 5, and 21 announcements and bills |
| New scan rows | 77 |
| New topic groups | 2 (`gb-earned-settlement-2026`, `nl-box3-novelle-2026`), plus 3 documents added to existing groups |
| New disposition groups | 22 |
| Awaiting explanation | DE 2 → 3, EU 0 → 7, GB 686 → 697, ES 516 → 519, FR 2 → 4, NL 144 → 143, US 92 → 92 |

New explanations: `de-ewa-online-registration-2026`, `hh-property-tax-residential-location-2027`, `hb-social-housing-income-limits-2026`, `gb-earned-settlement-2026`, `gb-child-trust-fund-capacity-2026`, `gb-guided-retirement-2026`, `gb-auto-enrolment-thresholds-2027`, `gb-visitor-levy-bill-2026`, `ch-iv-integration-reform-2026`.

Substantive revisions: `de-afd-minor-taxes-motion-2026` v2, `de-green-skilled-immigration-motions-2026` v2, `de-housing-benefit-cuts-2027` v2, `nl-box3-actual-return-crypto` v2, `eu-low-value-parcels-2026` v4.

No application code changed. Two older regression tests were pinned to the revision of their own round instead of the latest version (`tests/october-28-de-eu.test.ts`: Bremen closure date; `tests/october-30-de-eu.test.ts`: cash-register group size), because this round advanced those facts with evidence. New regression file: `tests/november-04-all-countries.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | Part I: No. 328–330 still 404 after No. 327 (2 November). Part II: Nos. 240–256 all dated 4 November (12 DOCPER notices, 5 convention notices); No. 257 is 404. 2–3 November closed by issue continuity; 4 November partial. |
| Federal cabinet | Rendered: 4 November decision on online address registration. The results page of the 64th meeting is not yet published; other agenda items not recorded. |
| Bundestag | Agenda for sittings 104–106, version 3 November 18:30, compared by printed-paper number with 2 November 13:45: 11 added, none removed; 21/8867 and 21/8869 recorded (grouped), the other 9 excluded with reasons. Text archive rendered: outcomes for 21/8637, 21/2248, 21/6346 and the housing benefit hearing. |
| BMF, BMAS, BMG, Bundesrat | BMF newest release 22 October; BMAS only a digital-summit visit (3 November); BMG nothing after 30 October; no new Bundesrat plenary documents. |
| Sixteen states | 52 channels fetched once; list-level keyword sweep for 2–4 November. HTTP 403: MV Landtag; 404: Saxony-Anhalt Landtag documents and press, Bremen Bürgerschaft; NRW press timeout. Bremen gazette Nos. 102–104 and 106–110 found unrecorded and added; 4 October – 3 November closed for that gazette by issue continuity. |
| EU Official Journal | Publications Office SPARQL list for 31 October – 4 November: none on 31 October – 2 November (weekend and EU holiday); 92 on 3 November, matching the rendered L (16) and C (76) daily views one to one; 25 so far on 4 November. |
| ESMA, TAXUD | ESMA nothing on 3–4 November; TAXUD one item (e-commerce product identifiers, 3 November). Council register not rechecked. |
| GB | GOV.UK search API for HMT, HMRC, DWP, Home Office, MHCLG (31 October – 4 November); legislation.gov.uk feed S.I. 2026/1148–1160 (No. 1147 not yet listed). |
| ES | BOE section I 31 October (4) and 2 November (1); no section I on 3 or 4 November. Cabinet references of 3 November. |
| NL | Tweede Kamer OData: three new bills; box 3 amending bill 37053 read (bill and memorandum DOCX via the dossier). |
| CH | news.admin.ch: plain request 403, rendered read. |
| FR, IT, US | service-public lists; Palazzo Chigi news; Federal Register API and IRS newsroom by title. |

## Source-located review

### Policy-question gate

- **NL box 3 (`nl-box3-actual-return-crypto` v2)** — Bill 37053-2 Article I (A–I: "financial instruments" replace start-up shares in the capital-gains part of bill 36748), Articles II–VI (box 2 excessive-borrowing ceiling 500,000 → 100,000 in steps; box 2 rates restored 2031), Article VII (in force 1 January 2027, Article I with the box 3 Act). Memorandum 37053-3 section 1 (2028 not workable per the Tax Administration and the Council of State; government proposes 1 January 2029; deemed-return system continues in 2028), 2.3 (value on 1 January 2029 as acquisition price, worked example), 2.4 (direct crypto wallets, insurance products, receivables temporarily on accrual from 2029, expected switch 2030), budget paragraph (box 2 measures replace parts of the funding package "to spare small savers"). Current law baseline kept (2026 deemed return 6.00%, exemption 59,357, 36%). Both bills keep separate identities: 36.748 in the Senate, 37.053 in the House. Unresolved and stated in the reader text: whether the 30 September 2027 measures (exemption 30,846, +1.5 points) and the 31 December target were dropped — the amending bill has no provision for them. Not read: Council of State advice, budget tables.
- **AfD motion 21/8637** — Bundestag article of 4 November: referred to the Finance Committee after 30 minutes; no vote on the motion. Tax law unchanged.
- **Green motions 21/2248, 21/6346** — Bundestag article: 21/2248 rejected (CDU/CSU, AfD, SPD against; Die Linke abstained); 21/6346 referred to the Interior Committee. Reader text states that rejecting the motion does not mean the quota was cut; no government document on halving the quota was found or read.
- **Housing benefit reform** — housing committee public hearing of 4 November (34th meeting); bill unchanged, still pending.
- **UK earned settlement** — Home Office news, Home Secretary's statement, government response (62 pp.) chapters on earnings thresholds, care workers (pre-May 2025 cohort, £25,000, further 5-year visa, 1 February 2027 sponsor-loss rule not used in the card), refugees and transition. Start date and Immigration Rules text not published; stated.
- **Swiss IV reform** — Federal Council release only; current IV rate and consultation deadline not read and stated as such.

### Other explanations

- **eWA ordinance** — cabinet article of 4 November; ordinance text and Bundesrat consent not read; 1 December is the government's expectation.
- **Hamburg property tax** — finance authority release of 3 November: 26,000 of 430,000 cases; 70% / 52.5% base factor; rate 975%; notices this year and early 2027; SEPA vs standing order. Ordinance and register not read.
- **Bremen Nr. 104** — full two pages; federal § 9(2) WoFG from gesetze-im-internet. The case groups of the 2009 ordinance were not read; the example assumes § 1.
- **Child Trust Fund, Guided Retirement, AE thresholds, Visitor Levy** — each from the government page cited; bills, draft regulations and consultation documents not read, stated in limits.

### Reader comprehension check

Every number names its role: Hamburg example is the living-space part of an annual tax bill, both directions; Bremen limits are annual income under §§ 20–24 WoFG, not gross pay; UK settlement thresholds are annual earnings and qualifying years; AE example separates the £23,760 contribution base from salary; IV example gives the employee's and employer's monthly share and the 0.6-point surcharge only above CHF 181,440; Visitor Levy example is per room night at a hypothetical 5%; NL example separates a wallet from an ETF. All proposals say so in the title, status note or first paragraph. Each language was read alone and then compared for amounts, dates and stage.

## Elapsed and approaching dates

Cleared with the standard "date passed, not verified" sentence (verifiedAt unchanged): EVPG old regulation expiry, FR construction diesel aid, FR micro-enterprise declaration, FR gas benchmark, CH public-sector climate ordinance, CH customs end-use relief, CH jet fuel drawdown, CH vaccination week, DE-RP teacher trainee intake (legacy status replaced by `adopted`), DE annual tax act hearing, NL vacancy bill written input. Advanced to the next published step: Bremen closures to 9 November, French winter protection to 31 March 2027 (expiry), EU low-value parcels to 1 July 2028 (expiry of the EUR 3 duty). Still ahead: 5 November (ES validation deadlines for RDL 28/29; Bundestag readings), 6 November (cash-register bill; BW orchard call).

## Grouping and dispositions

Groups: `gb-earned-settlement-2026` (news + response document, linked by the news page); `nl-box3-novelle-2026` (EK 37.020 / 36.748 B letter announcing the amending bill + bill 37053, whose Article I amends 36748; explanation `nl-box3-actual-return-crypto`). Added: BT-Drs. 21/8869 to the care-insurance reform group, BT-Drs. 21/8867 to the cash-register group, the housing benefit hearing article to the housing benefit group.

Unresolved candidate: BGBl. 2026 II Nr. 237 (28 October) and Nr. 256 (4 November) share the title "Bekanntmachung zu dem Internationalen Übereinkommen … Finanzierung des Terrorismus". Kept apart: separate notices; the shared title is not evidence of one matter.

Dispositions (22 groups): BGBl. II treaty and DOCPER notices; Bremen Nos. 102, 106–110 (judges' assessments, correction, paper-file transition, municipal tax-share key, police training, legal trainees' allowance — the last changes a trainee allowance, not a general benefit); Hamburg tax estimate; Lower Saxony Start Guides funding (project funding, guideline not published); Saxony nursing-assistant implementing act; 15 Official Journal classes by title (court, merger, exchange rates, state aid, GI, corrigenda, competition, biocide, aviation equipment, external positions, Eurojust mandate, sanctions list, budget, EDU-EDIC, Danish VAT derogation, GFCM fisheries); UK S.I. 1149 and 1159; BOE tobacco prices, direct grants, correction and generator remuneration method. **Weakest call**: the Danish VAT derogation (Article 75) is dismissed as Denmark-only without reading the decision.

Kept awaiting on purpose: Bremen Hospitals Act (No. 103); EU defence simplification package (Regulations 2026/2381, 2382, 2387, Directive 2026/2383, joint statement C/2026/5559) and Delegated Regulation 2026/1741; TAXUD product identifiers; UK S.I. 1148 (mesothelioma lump sums), 1152 (interest and card data gathering), 1156 (controlled transaction reporting) and the other S.I. read by title only; BOE Orden TED/1149/2026 (gas-system charges for 2027); Spanish cabinet decrees of 3 November (child-illness care benefit, Urda rail accident aid) pending BOE publication; FR medical-student allowance and additional birth-leave form.

## Open leads

- Cabinet results page of the 64th meeting (4 November) not yet published.
- Spain: Congress validation of RDL 28/2026 and 29/2026 due 5 November.
- UK: Immigration Rules changes and start date for earned settlement; the Child Trust Fund amendment to the Financial Services and Markets Bill.
- Parental allowance lead (`mv-20261029-elterngeld-reaction`) and the RED III biomass ordinance (`kab63-top1-05`) remain open from 2 November.

## Tool note

`data:coverage` exits 2 for every region (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window, as on 2 November; the Federal Law Gazette has no gap. EU: 6 of 7 incomplete (one fewer than on 2 November: the Official Journal is now closed through 3 November). No newly failed tier-1 source; the state 403/404 pages are the same as on 2 November except the NRW press timeout. Tier-2 gaps are unchanged in kind: all scans partial.

## Follow-up

5 November: Bundestag first reading of the care-insurance reform; ES validation deadline for RDL 28/29. 6 November: cash-register bill first reading. 9 November: third Bremen closure. 1 December: expected start of the eWA ordinance. 22 December: Guided Retirement consultation closes. 1 January 2027: Hamburg location classes apply.
