# All-country round — 6 November 2026

## Scope and result

Owner request: "全部更新一轮" (one full round). Read as in the 30 October and 4 November all-country rounds: tier 1 (Germany federal and states, EU) in full, tier 2 national channels on the owner's standing topics (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets). Frozen regional channels were not touched. Window: since the 4 November round, through today; 6 November is the current day and stays partial. Export time `2026-11-06T09:42:45.132Z`.

| Change | Count |
|---|---|
| New explanations | 2: `us-tax-inflation-adjustments-2027`, `hb-wastewater-fees-2027` |
| Revised explanations | 12: 9 substantive (DE 8, CH 1), 3 elapsed dates cleared (ES 2, NL 1) |
| New intake rows | 92: BGBl. 8, Bundestag 12, cabinet 1, states 11, EU Official Journal 38, TAXUD 1, UK 11, ES 3, CH 3, FR 1, US 3 |
| New scan rows | 76 |
| New snapshots / sources | 97 |
| New topic groups | 3 (`de-ewa-online-registration-2026`, `ch-iv-integration-reform-2026`, `us-tax-inflation-adjustments-2027`), plus 10 documents added to 7 existing groups |
| New disposition groups | 21 |
| Newly awaiting explanation | DE +7, EU +3, GB +5, ES +2, US +2, CH +2, FR +1 |

Substantive revisions: `de-care-insurance-reform-pnog` v4, `de-ukraine-tax-treaty-2026` v4, `de-albania-tax-protocol-2026` v4, `de-driving-school-reform-2026` v2, `de-tobacco-tax-2027` v5, `de-income-tax-reform-2027` v3, `de-annual-tax-act-2026` v3, `de-grid-support-proposal-2027` v4, `ch-iv-integration-reform-2026` v2. Elapsed dates: `es-rent-renewal-compensation-2026` v2, `es-housing-social-function-2026` v2, `nl-vocational-civic-education-bill-202610` v2.

No application code changed. Four older regression tests were pinned to the revision of their own round instead of the latest version, because this round advanced those facts with evidence: `tests/november-04-all-countries.test.ts` (elapsed-date list, now pinned by that round's `recorded_at`), `tests/october-21-germany.test.ts` (annual tax group now also holds the hearing report), `tests/october-30-all-countries.test.ts` (Spanish rent decree-law v1), `tests/october-30-de-eu.test.ts` (tax treaties v3). New regression file: `tests/november-06-all-countries.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | Part I: Nos. 328–330 dated 6 November, No. 331 is 404. Part II: Nos. 257–261 dated 5 November, No. 262 is 404. 4–5 November closed by issue continuity (22 issues, all Part II); 6 November partial. |
| Bundestag text archive | Latest 60 items (week 45) via the archive's filter-list endpoint and per-item teaser JSON; 10 recorded. The care reform page was already recorded and its explanation updated. The 6 November sitting (cash-register first reading, agenda item 28) was not over. |
| Bundestag agenda / papers | Agenda still the 3 November 18:30 version, unchanged. Committee reports 21/8979 (driving school) and 21/8946 (Fiscal Equalisation Act) read and recorded. |
| Federal cabinet | Rendered list: no cabinet decision after 4 November; two "adopted by the Bundestag" items of 5 November. Results page of the 64th meeting still not published. |
| Bundesrat | No new plenary documents; 1070th plenary on 20 November, agenda not yet published. |
| BMF, BMAS, BMG | BMF newest release 22 October; BMAS nothing after 3 November; BMG list did not render (not checked). |
| Sixteen states | 52 channels fetched once; list-level keyword sweep for 4–6 November. Failed: Saxony-Anhalt Landtag documents and press (404), Bremen Bürgerschaft (404), MV Landtag (403), NRW press (timeout) — same set as on 4 November. Bremen gazette 4–5 November closed (Nos. 109–110, nothing on 5 November). Saarland Gazette I No. 43 read from its PDF table of contents. |
| EU Official Journal | Rendered L and C daily views: 4 November 25 items, matching last round's 25 records one to one (closed); 5 November 16 items (closed); 6 November 22 so far (partial). |
| ESMA, TAXUD, Council | ESMA nothing after 29 October; TAXUD one item (6 November); Council press page 403 and render blocked. |
| GB | GOV.UK search API for HMT, HMRC, DWP, Home Office, MHCLG (4–6 November); legislation.gov.uk feed: UK-wide S.I. 2026/1144, 1161–1164, 1166–1169 (No. 1165 not listed); devolved instruments frozen. |
| ES | BOE API section I: none on 4 November, 8 on 5 November, 11 on 6 November; three national items on tracked topics recorded; regional laws frozen. Congress press page rendered (only one item, 4 November). |
| NL | Tweede Kamer OData: one VWS data-processing omnibus bill (5 November), outside the topics. |
| CH | news.admin.ch rendered for the list; item pages fetched directly via the admin.ch redirect. |
| FR, US | service-public lists (one new item on topic); IRS current-month releases and Federal Register API by title. |
| IT | governo.it render returned no list; not checked. IT review marker left unchanged. |

## Source-located review

### Policy-question gate

- **Ukraine treaty / Albania protocol** — Bundestag articles of 5 November: Ukraine ratification act 21/8245 adopted after 30 minutes (CDU/CSU, SPD, Greens, Die Linke for; AfD against) on recommendation 21/8665 letter a; Albania protocol act 21/8244 adopted without debate (all groups except AfD) on 21/8665 letter b. Bundesrat second round, promulgation and the exchange of ratification instruments remain; cards stay pending with no effective date. The scheduled-vote events remain in history.
- **Driving-school reform** — Bundestag article and committee report 21/8979: adopted in the committee version (CDU/CSU, SPD for; AfD, Greens, Die Linke against); resolution adopted (CDU/CSU, AfD, SPD). Report read: summary, amendments 4–5 (new Article 4 on accident statistics, Article 5(2) early commencement of Article 1 No. 4), transitional paragraphs (14)–(15) with the 1 July 2027 cut-off, resolution text. Government page: Bundesrat consent still required for the act and the separate ordinance. Overall commencement not verified and stated.
- **Tobacco tax correction** — Bundestag article and Budget Committee report 21/8946, special part on new Article 4: for 21 October–31 December 2026 the rates of the version in force until 20 October continue; 2027+ steps unchanged; the committee calls it an error in the text of BGBl. 2026 I Nr. 309. Vote: CDU/CSU, AfD, SPD for; Greens against; Die Linke abstained. Green motion 21/8905 referred. The card keeps its promulgated dates and says that actual levying before the correction is unverified. The FAG part (VAT distribution, EUR 1.25 bn fuel-tax-cut contribution by the states) is recorded but not explained.
- **Care reform (PNOG)** — first reading 5 November, referred to the Health Committee with Die Linke motions 21/8927 and 21/8928. The minister's statements (no cut to carers' pension contributions; changes to the relief amount and respite care to avoid a break in early 2027) are recorded as statements; bill text unchanged.
- **Spanish decree-laws 28/2026 and 29/2026** — the 30-day confirmation deadline (5 November) has passed. Searched: Congress press page (render), BOE section I of 5–6 November. No confirmation or rejection found. Reader text says validity is unverified; neither lapse nor confirmation is claimed. Lead stays open.

### Other explanations

- **US tax year 2027** — IR-2026-133 read in full. 2026 joint standard deduction and child tax credit derived only from the stated increases; 2026 single/head-of-household amounts and full 2026 brackets are not in the release and are not invented. Rev. Proc. 2026-35 not read; stated.
- **Bremen drainage fees** — release of 5 November read in full: deputation decision only; Senate and Bürgerschaft still decide; rates valid until 31 December 2028; city of Bremen only. Fee calculation and draft ordinance not read; stated.
- **Swiss IV reform** — consultation notice of 5 November gives the opening (4 November) and deadline (4 February 2027); consultation documents not read; stated.
- **Hearings** — income tax reform (4 November), Annual Tax Act (2 November; replaces the earlier "date passed, not verified" sentence), grid subsidy (6 November) appended as progress events.

### Reader comprehension check

Every number names its role: US brackets are taxable-income thresholds (example: USD 100,000 → 66,800 taxable → about USD 7,504 before credits, and explicitly not the tax saving versus 2026); Bremen fees are per cubic metre of water used, per square metre of sealed connected area, and per cubic metre pumped out (examples in both directions, drainage only, tenant allocation depends on the landlord); the tobacco correction names the period and which rates apply. Each pending card says what is still required (Bundesrat, Senate and parliament, ratification exchange). Each language was read alone and then compared for amounts, dates and stage.

## Grouping and dispositions

Added to existing groups: Ukraine adoption article; Albania final-votes page (also lists unrelated votes, which stay unrecorded); driving-school adoption article, government article and report 21/8979; FAG article and report 21/8946 to the tobacco matter (only Article 4 relates); hearing reports to income tax reform, Annual Tax Act and grid subsidy. New groups: eWA (federal cabinet article + joint Hamburg/BMDS release on the same ordinance), Swiss IV consultation notice, IR-2026-133. The Bremen release links to its explanation by URL and title, so it needs no group.

Unresolved candidates: BGBl. 2026 I Nr. 330 and Bundesrat agenda item 1069/43 (BR-Drs. 483/26) share the EBO § 32 title; the gazette page does not cite the Bundesrat paper, so they stay apart. S.I. 2026/1167 (Data Act commencement No. 10) kept as its own batch. Identical corrigendum titles not merged.

Dispositions (21 groups): BGBl. II DOCPER and technical cooperation notices; BGBl. I 328 (training ordinance) and 330 (rail technical rule); Saarland correction and professors' salary averages; Bremen office closure and rent-calculator release; Hesse social housing project funding; BW nature reserve; 13 Official Journal classes by title (rates, EFTA court action, state aid, GI, corrigenda, merger, EU-body decisions, sanctions notice, technical rules and recommendations, fund mobilisations, Romania VAT derogation, trade defence, customs together with the TAXUD electricity CCI item); UK S.I. 1161–1164, 1166, 1169; BOE housing plan monitoring order. **Weakest call**: Commission Recommendation 2026/2394 (non-binding cloud contract terms) dismissed by title.

Kept awaiting on purpose: BGBl. I 329 (seafarers); Saarland Laws 2216 (victims fund) and 2218 (gambling) and the childcare ordinance; Bundestag AfD motion 21/8903, Green motions 21/8578/8579, EmoG extension, FAG distribution part. EU: Implementing Regulation 2026/2467 (compensation for final consumers of fuels / ETS), Council first-reading position and reasons on the new Payment Services Directive. UK: S.I. 1144, 1167, 1168, pension trustees consultation, SAYE bonus rates. ES: Orden HAC/1161/2026, RD 957/2026. CH: two DTA protocols (apply from 1 January 2027). FR: A19126. US: IR-2026-132, FR Doc. 2026-22506.

## Open leads

- Spain: outcome of the Congress confirmation votes on RDL 28/2026 and 29/2026.
- Bundesrat 1070th plenary on 20 November: expected second round for the Ukraine/Albania acts, the driving-school act and the FAG/tobacco correction; agenda not yet published.
- Cash-register bill first reading on 6 November (sitting not over at review time); BW orchard call deadline 6 November.
- Cabinet results page of the 64th meeting; parental allowance lead and RED III biomass ordinance remain open from 2 November.

## Tool note

`data:coverage` exits 2 for every region (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window, as on 4 November; the Federal Law Gazette has no gap. EU: 6 of 7 incomplete, as on 4 November; the Official Journal is closed through 5 November. No newly failed tier-1 source. Tier-2 scans all partial; Italy not checked this round.

## Follow-up

9 November: third Bremen social-service closure. 20 November: Bundesrat plenary. 1 December: expected start of the eWA ordinance. 1 January 2027: US tax year 2027 amounts and the first tobacco tax step apply. 4 February 2027: Swiss IV consultation closes.
