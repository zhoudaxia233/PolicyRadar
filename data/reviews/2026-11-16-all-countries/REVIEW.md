# All-country round — 16 November 2026

## Scope and result

Owner request: "全部更新一轮" (one full round). Read as in the previous all-country rounds: tier 1 (Germany federal and states, EU) in full, tier 2 national channels on the owner's standing topics. Frozen regional channels were not touched. Window: since the 12 November rounds (exports `2026-11-12T19:26:11.488Z` and `2026-11-12T19:51:08.221Z`) through today, a Monday; 12–15 November are closed days, 16 November stays partial. Export time `2026-11-16T21:46:20.507Z` (22:46 Berlin).

| Change | Count |
|---|---|
| New explanations | 4: `de-elterngeld-reform-2027`, `de-private-pension-reform-2027`, `eu-digital-fairness-act-proposal-2026`, `gb-leasehold-service-charge-regulations-2027` |
| Revised explanations | 20 (listed below) |
| New intake rows | 275 (EU 195, DE states 47, DE federal 20, tier 2 13) |
| New scan rows | 89 |
| New snapshots | 151 |
| New topic groups | 7; 8 documents added to existing groups |
| New disposition groups | 10 (173 Official Journal items) |

Revisions — Bundestag results of 12–13 November: `de-annual-tax-act-2026` v5, `de-grid-support-proposal-2027` v6 (also Bundesrat 20 November, item 63), `de-academic-fixed-term-contracts-2026` v3, `de-intelligence-reform-august-2026` v2, `de-deforestation-free-products-2026` v2, `de-eu-mercosur-ratification-2026` v2, `de-guardianship-coercive-treatment-2026` v2, `de-criminal-mutual-legal-assistance-2026` v2; Bundesrat 20 November agenda: `de-kita-quality-act-2027` v5 (item 60), `de-cyber-defence-act-2026` v3 (item 61); `de-sugary-drinks-tax-2027` v3 (federal Q&A says the coalition will amend the bill; no new date); `de-pension-contract-information-ordinance-2027` v2 (points to the new parent-Act explanation); `de-bremen-social-services-closures-2026` v6; Spain `es-rent-renewal-compensation-2026` v3 (**repealed before it took effect**) and `es-housing-social-function-2026` v3 (confirmed); Netherlands `nl-tax-plan-2027` v3 and `nl-box3-actual-return-crypto` v3 (House adoption 12 November); France `fr-finance-bill-2027` v5 and `fr-plf2027-crypto-tax-amendments` v2 (Assembly rejection of 4 November, **missed by earlier rounds**); Italy `it-school-decree-170-2026-foreign-pupils` v2 (**wrong conversion bill number corrected**).

No application code changed. New regression file `tests/november-16-all-countries.test.ts`. Two older tests checked the latest card state of matters that changed this round; they now check the revision saved in their own round (`november-07-all-countries`: Spanish decrees v2; `november-12-de-eu`: three bills at their 12 November versions). Assertions are otherwise unchanged.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | 12 November closed (Part II 262–273 already recorded; no Part I issue). 13 November closed: Part I 337 (farm crisis aid ordinance). 14–15 November closed, no issue. 16 November partial: Part I 338 (road accident statistics) and 339 (maritime pilots); 340–345 and Part II 274–280 return 404. |
| Bundestag text archive | Latest 40 items via filter list and teaser JSON; each result read on its own page. 11 adoption records, 1 date/title correction for the AfD refugee-status motion preview; 4 exclusions with reasons. Parliamentary documentation not checked. |
| Federal cabinet | Rendered list 12–16 November: Elterngeld and maternity protection reform (cabinet by written procedure, page dated 13 November); sugary drinks tax Q&A updated; private pension Q&A updated 16 November. |
| Bundesrat | 1070th plenary agenda "Stand 13.11.2026": items 60–65 added (653, 654, 655, 656, 658, 657/26); items 1–59 unchanged (diffed). Annual Tax Act not listed. |
| BMF, BMAS, BMG | BMF legislative page still dated 6 November; BMAS two non-rule items; BMG list still unparseable after rendering. |
| Sixteen states | 52 channels plus the Bremen gazette. 47 records: Hesse GVBl 73–77 (73–74 **missed on 12 November**), Bavaria 6 items, Schleswig-Holstein GVOBl 98, 105, 106 (98 and 106 missed earlier), Lower Saxony 100–103 (100–101 missed), RLP 37–38, Saarland Amtsblatt 44, BW 98–99, Berlin GVBl 38, Brandenburg GVBl II 51, NRW GV 33, Hesse Landtag resolutions, Thuringia KAG bill (missed), four press items. Same failures as before (Saxony-Anhalt Landtag and press 404, Bremen Bürgerschaft 404, MV Landtag 403, NRW press timeout). **New failure: thueringen.de press returns a Link11 captcha**; not bypassed, not archived. Bremen gazette 12–15 November closed (no issue). |
| EU Official Journal | Rendered daily views: 12 November re-rendered (18 items, all existing) and closed; 13 November L 31 + C 72 = 103 recorded, closed; 14–15 November fall back to the 13 November issue, closed; 16 November L 21 + C 65 = 86 recorded, partial. Titles from the render; item pages not fetched. |
| OEIL, Commission, TAXUD, ESMA, Council | OEIL: Digital Fairness Act package of 11 November (COM(2026) 1100, 1110, 1120) recorded, 1100 explained from the proposal PDF. Home affairs: EU–Nigeria readmission agreement and the second migration management cycle (5 November, missed earlier) recorded. TAXUD: CBAM carbon-price rules, grouped with Regulation 2026/2498. ESMA nothing new. Council register and press page blocked (403 / access check). |
| GB | GOV.UK search API (HMT, HMRC first page, DWP, Home Office, MHCLG); legislation.gov.uk new list: S.I. 2026/1190 explained, 2026/1192 and youth Jobs Guarantee recorded. No draft 2027 up-rating order laid yet. |
| ES | BOE API section I 13, 14, 16 November (no BOE on Sunday 15th): repeal of RDL 28/2026 and confirmation of RDL 29/2026 (both 12 November). No confirmation yet for RDL 31 or 35/2026. Moncloa 13 November: urgent procedure for the 2027 pension revaluation decree. |
| NL | Tweede Kamer OData and Eerste Kamer pages: Tax Plan 2027 (76–74), 37023, 37024 and box 3 novelle 37053 adopted on 12 November; Senate finance committee procedure 17 November. |
| FR | Service Public: nothing on the standing topics. Assemblée: T.A. 362 (PLF rejection, 4 November) recorded; PLFSS in the Senate, sittings 17–18 November. |
| CH | news.admin.ch first page: nothing on the standing topics. |
| IT | governo.it still "pagina non trovata" (blocked). Gazzetta Ufficiale highlights: DL 205, DL 207 (electricity and gas costs), DLgs 208 (platform work); INPS: RED campaign and domestic-worker contributions; Parliament decree-law tracker read. |
| US | Federal Register 13 and 16 November and IRS newsroom: nothing on the standing topics; no final rule on USCIS prior deference or refugee termination notices. |

## Source-located review

### Policy-question gate

- **Bundestag results.** Read on each item's own text-archive page: Annual Tax Act 21/8283 adopted 12 November as amended by 21/9139 (CDU/CSU, SPD for; AfD, Greens against; Left abstained); grid subsidy 21/8236 adopted on 21/9154, EUR 5.525 billion a year (Bundesrat's EUR 6.5 billion not adopted); academic fixed-term contracts as amended 21/9179; guardianship 21/9135; mutual legal assistance 21/9144; deforestation-free products 21/9157; Mercosur ratification on 21/8634 (13 November); intelligence reform 21/9161(neu), roll call 308:190:71 (13 November). All remain `pending`: each still needs the Bundesrat and publication. Committee amendments were not read; every card says which figures still come from the government draft.
- **Bundesrat dates.** Only the Kita act (item 60), cyber security act (61) and grid subsidy (63) are on the 20 November agenda; the others have no Bundesrat date and no next date is set.
- **Sugary drinks tax.** The federal Q&A (updated 13 November) now says the coalition groups will amend the bill in Parliament; it gives no start date. The Lower Saxony report of a start in early 2028 remains unconfirmed; the card keeps 1 July 2027 from the cabinet text with the caveat.
- **Elterngeld reform.** Source: federal government page of 13 November. Current law from the family ministry's page (65%, EUR 300–1,800, 14 months with at least 2 per parent and at most 12 for one parent, one month of simultaneous receipt) and the government Q&A (EUR 175,000 income limit). Proposed: 4 reserved months per parent at 80%, other months at 50%, EUR 330–1,900, unrestricted simultaneous receipt, planned start 1 November 2027. **Gaps stated on the card:** bill text not read; income base for 80%/50%, the low-income rate, the income limit, ElterngeldPlus and the transition rule are unknown; the "at most 10 months for one parent" figure is the site's own arithmetic.
- **Private pension reform.** Closes the gap noted on 10 November (parent Act of the AltvKInfV draft had no explanation). Sources: government Q&A of 16 November and BGBl. 2026 I Nr. 156 (29 May 2026). Card date 1 January 2027 is marked as application (products available), not commencement. Articles not read item by item; tax deduction and payout taxation not stated.
- **Digital Fairness Act.** Proposal COM(2026) 1100, Articles 11–25, 35 and 40 read (page locators on the card). Current German baseline: § 312k BGB cancellation button (website-concluded contracts only; financial services excluded). Companion proposals 1110 and 1120 read on the cover page only.
- **Spain.** BOE-A-2026-23754: Permanent Deputation repealed RDL 28/2026 on 12 November, before its 15 November entry into force; the consolidated text is marked "derogada"; the link with RDL 29 final provision 5 lost effect. BOE-A-2026-23755: RDL 29/2026 confirmed. The RDL 28 card is now `closed` with no effective date and states the current LAU Art. 10 rule; its scheduled 15 November event stays in history. Whether a third rent-stability decree is planned is not known.
- **Netherlands.** Eerste Kamer pages: 37022 adopted by roll call 76–74, 37053 by show of hands, both 12 November; amendments (incl. Nos. 78 and 80) adopted but not read. Both cards remain `pending` with next step 17 November (procedure meeting, not a vote).
- **France.** T.A. 362: the Assembly rejected the whole PLF 2027 at first reading on 4 November; the bill goes to the Senate in the government text. The crypto amendment card now says the amendments have no legislative basis unless reintroduced; its historical 1 January 2027 scheduled event stays.
- **Italy.** The parliamentary decree-law tracker lists DL 170/2026's conversion bill as Senate S.2053 (in committee on 11 November); C.3133 is DL 177's. The card had cited C.3133 since 14 October; corrected with a `correction` event.
- **UK S.I. 2026/1190.** Regulation 1 and the Explanatory Note read: commencement 1 April 2027, 1 November 2027, social landlords 1 November 2028; England only. Response periods (reg. 9) and consequences not read.

### Reader comprehension check

Elterngeld: rates named as a share of previous income, amounts as monthly benefit paid; example EUR 2,000 net → EUR 1,300 now, EUR 1,600 / EUR 1,000 proposed, totals over 10 vs 12 months, labelled hypothetical. Private pension: subsidy computed for EUR 1,800 savings (EUR 180 + EUR 360 = EUR 540), child allowance added separately (total EUR 1,140), stated as subsidy, not return. Digital Fairness Act: free-trial and auto-renewal examples, stated as not yet in force. UK service charges: example of an information request, states no cap on charges. Spain: example states the old notice rule applies and no compensation is due. Each language was reviewed alone and then compared for numbers, dates and stage (English drafted by a translation pass and checked against the Chinese).

## Grouping and dispositions

Added to existing groups: the six Bundestag adoption records with an explanation group (annual tax, academic contracts, deforestation, Mercosur, guardianship, mutual legal assistance), the grid adoption record (`de-grid-subsidy-2027-2029`) and the sugary drinks Q&A update. New groups: `de-intelligence-reform-2026`, `de-elterngeld-reform-2027`, `es-rdl-28-2026-rent-renewal`, `es-rdl-29-2026-housing`, `fr-plf-2027` (both French explanations, one record), `de-seelotsgesetz-3` (BR-Drs. 563/26 and BGBl 339, identical title), `eu-cbam-carbon-price-recognition`. The private pension, Digital Fairness Act and S.I. 2026/1190 explanations link by identical official ID.

Dispositions (OJ 12–16 November): exchange rates, mergers, geographical indications, corrigenda, State aid, 55 agency final accounts, trade defence, institutional items, technical rules and court notices. Not disposed: CFSP sanctions (policy matters under TOPICS.md) and the items below.

Kept awaiting on purpose: REACH restriction on lead in fishing tackle (2026/2501); CJEU C-900/24 (energy price clauses), C-381/25 (withdrawal right), C-882/26 (BFH); EU–Nigeria readmission agreement; DFA companions 1110/1120; Saarland taxi fares from 2027, Brandenburg building fees and Hesse deaf-allowance bill (verified by the state scan, explanations not written this round); Hesse Vacancy Act amendment (adopted, unpublished); Italian DL 207 (energy costs); Spanish 2027 pension revaluation; UK S.I. 2026/1192 and Jobs Guarantee; the Bundesrat motion on self-employed teachers (658/26).

## Open leads

- Bundesrat 1070th plenary on 20 November (starter pension, social insurance ceilings, CARF, grid subsidy, Kita act and others).
- Hesse tenant protection: the current ordinance expires 25 November; no successor in GVBl up to No. 77 and no cabinet release.
- Berlin § 201a ordinance not yet in GVBl 38.
- Spain: RDL 31/2026 confirmation deadline 19 November; RDL 35/2026; exact text of RDL 29 final provision 5.
- Netherlands: Eerste Kamer schedule for 37022 and 36748/37053.
- Italy: DL 170 conversion by 29 November; DL 207 contents; 2027 budget bill stage.
- Elterngeld bill text; sugary drinks tax amendments; strategic gas reserve bill text (BMWE challenge page).
- Council register blocked; Thuringia press captcha; BMG list unparseable; Bundestag parliamentary documentation not checked.

## Tool note

`data:coverage` exits 2 for every region (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window, as on 12 November; the Federal Law Gazette has no gap. EU: 6 of 7 incomplete; the Official Journal is closed through 15 November. Tier-2 scans are partial by design. Two Hesse Landtag protocol URLs use plain http and were kept only in the fetch ledger (no check rows).
