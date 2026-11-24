# Germany and EU round — 16 to 23 November 2026

## Scope and result

Owner request: "更新一下德国和欧盟" (tier 1: Germany federal and all sixteen states, EU). Window: everything since the 21 November round (export `2026-11-21T06:08:31.000Z`), with 16–22 November as closed days and 23 November as an ongoing day. Scans ran on 23 November from 21:45 to about 23:10 Berlin; the explanation drafts and a few source checks were finished on 24 November. Export time `2026-11-24T09:57:53.000Z`.

| Change | Count |
|---|---|
| New explanations | 8 |
| Revised explanations | 5 |
| New intake rows | 48 (DE federal 8, DE states 26, EU 14) |
| New scan rows | 109 (38 complete, 62 partial, 9 blocked) |
| New snapshots | 257 |
| New topic groups | 5; 4 documents added to existing groups |
| New disposition groups | 4 (DE 5 records, EU 5 records) |

New: `de-standard-rates-freeze-2028`, `de-consumer-credit-transposition-2026`, `eu-plastic-waste-export-ban-non-oecd-2026`, `eu-indonesia-cepa-ipa-signed-2026`, `he-tight-housing-market-201a-2027`, `sh-anti-discrimination-act-2026`, `rp-foreign-school-certificates-recognition-2026`, `sh-short-term-rental-registration-bill-2026`.

Revised: `de-budget-accompanying-act-2027`, `de-sugary-drinks-tax-2027`, `eu-methane-regulation-importer-delay-proposal`, `he-rent-protection-proposal-2026` (correction only: the § 201a designation is now published), `he-cadastral-survey-fees-2026`.

No application code changed. New regression file `tests/november-23-de-eu.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | **Blocked.** Every request returned nginx 403 (548 bytes) on 23 and again on 24 November; issue probing (Part I 345a–356, Part II 278a–285) unread. Not bypassed. Whether the laws the Bundesrat cleared on 20 November were signed and published could not be checked. |
| Bundesrat | 16–22 November complete (the 74 items of the 1070th plenary from last round; no late decision documents). New Drucksachen 671/26 (GLP rules) and 678/26 (ETS cancellation notice) disposed as technical; 679/26 and 680/26 are Commission proposals. 18 December agenda: draft due 1 December. |
| Bundestag | Sitting week 24–27 November. Agenda of 23 November 13:15 read; committee report 21/9241 (dated 16 November, missed last round) recorded; hearings on AI in migration administration (21/8275) and Autobahn financing (21/8868) on 23 November. Text archive and DIP not read day by day: partial. |
| Federal cabinet, monthly index | No meeting 16–23 November beyond last round's 18 November items; cabinet list page 2 needs a script call (partial). Monthly new-rules index still ends with October. |
| BMAS, BMG, BMF | BMAS (5 items) and BMG (1) complete for 16–22 November, nothing explained; BMF list complete (no item dated in the window); BMF BürMoG draft listed on 23 November. |
| Sixteen states | 52 channels. Gazettes complete for 16–22 November in BW, HE, BY, HH, HB, BE, BB, MV, NI, NRW, RP, SL, SH. New on 23 November: Hesse GVBl 80–85, Brandenburg GVBl II 52–53, NRW MB 334, RP Staatsanzeiger 44. First scan of the new MV gazette channel (latest issue Nr. 31 of 6 November; history 1 January–15 November still uncovered). Blocked: Bremen Bürgerschaft 404, MV Landtag 403, Saxony-Anhalt Landtag documents and government press 404, NRW press fetch and render failed, Thuringia press Link11 captcha (not bypassed). |
| EU Official Journal | Rendered daily views 16–22 November complete (246 items, unchanged against last round; 20 November closed with 39 items; 21 and 22 November had no issue — the daily view falls back to 20 November). 23 November: 60 items, partial, 8 recorded. |
| Commission, OEIL, TAXUD, ESMA, Council | Commission news pages 0–10 read, including the 17–18 November pages that returned 429 last round; still partial (items repeat across pages). Press corner under maintenance (its maintenance page was excluded from evidence). EP agenda PDFs returned empty 202. TAXUD and ESMA complete for 16–22 November. Council register and press releases 403. |

## Source-located review

### Policy-question gate

- **Budget accompanying act (BT-Drs. 21/9241, pp. 1–3, 36–42, 47–51).** The committee recommendation is not adoption. Versus the government bill: the child-supplement Sofortzuschlag is kept (Art. 7 deleted), the sugar tax is added as Art. 1, intermediate products 184/122 EUR/hl, sparkling wine no longer raised, alcopop surcharge scope 10–<15 % with the rate written as 3,025 EUR/hl pure alcohol (Art. 4 — stated as written, not recalculated), AsylbLG Sofortzuschlag ends after December 2026 (approved ones until 31 May 2027), pension top-up reduction 4.2 billion in 2027. The 23 November agenda and Bundestag article: plenary vote on referral back to the Budget Committee on 24 November, special committee session 25 November, the 27 November reading stays on the agenda with recommendation number "21/…". No reason is given; the cards say so and do not speculate (e.g. about the electricity tax).
- **Sugar tax.** The committee text (§ 3(1), § 26(1)–(2), Art. 15) sets 0.25/0.30/0.35 EUR per litre for 5–<7, 7–<9, ≥9 g sugar per 100 ml from tax events after 31 December 2027. This replaces the Lower Saxony minister's remark as evidence for the 2028 start (appended correction event). The exemption list (§ 18) was not compared with the cabinet text.
- **Standard rates (Art. 10, §§ 28a, 134 SGB XII).** New amounts from the 2023 survey apply from 1 April 2027 but, higher or lower, the 31 December 2026 amounts continue until 30 June 2028; next update 1 July 2028; AsylbLG amounts likewise (Art. 11). That SGB II (Grundsicherung/Bürgergeld) is frozen too is this site's reading of § 20(1a) SGB II (archived), which takes the SGB XII amounts; the committee report names only SGB XII and AsylbLG. The AfD's remark that the explanatory memorandum only mentions protection against a decrease is recorded.
- **Consumer credit (DE).** Only the federal government page of 20 November was read ("zum 20. November 2026 … in Kraft getreten"); law title, BGBl number and transition rules unverified because the gazette is blocked.
- **Hesse § 201a (GVBl. Nr. 83).** In force 1 January 2027 to 31 December 2031; 71 municipalities, identical to the tenant-protection ordinance. Effects follow §§ 25, 175, 176 BauGB (archived); no rent effect. Differences from the 2022 list and the § 250 conversion-permit rule not verified. The rent card's "designation only planned" wording was replaced, with an appended correction event.
- **Hesse fees (GVBl. Nr. 84).** New Staffel C by building value from 1 December 2026; the old Staffel C amounts were not found, so no higher/lower claim.
- **SH anti-discrimination act.** Adopted unchanged by the Landtag on 13 November (Drs. 20/5029, provisional minutes TOP 5); not promulgated, so no effective date. The easier burden of proof (§ 9) applies only to damages claims in ordinary courts. Municipalities, courts and prosecutors are outside its scope.
- **RP foreign school certificates.** The annex lists 14 countries plus one row for ZAB-assessed degrees (the scanner's "15 countries" is corrected). The 24 November effective date and the 24 December objection deadline are this site's reading of the notification rule and are labelled as such.
- **SH short-term rental bill (Drs. 20/5013).** First reading 12 November, referred to committee together with SPD draft 20/4958 (not read).
- **EU methane.** Provisional agreement of 19 November; ENVI/ITRE approval 23 November (OEIL, archived 24 November). Plenary date unconfirmed. The original reporting date differs between the Commission (August 2028) and paragraph 4 of the EP release (5 August 2029); kept as an unresolved difference.
- **EU plastic waste.** Regulation (EU) 2024/1157 Art. 39(1)(d) and Art. 86(3)(c) (PDF archived): application from 21 November 2026; Art. 42(4): no earlier than 21 May 2029 for requests by non-OECD countries.
- **EU–Indonesia.** Signed 21 November (IP/26/2532); not in force; Parliament consent needed; provisional application "likely in early 2027" is the Commission's estimate.

### Reader comprehension check

Standard rates: the amount is named as the monthly amount paid for daily needs, with a hypothetical "X euros" example and no invented figure. Sugar tax: per-litre tax on a 10 g and a 6 g drink, explicitly not a retail price. Budget act: three labelled hypotheticals (child supplement family, a 0.7 l bottle, an AsylbLG recipient). Hesse § 201a: a vacant plot in Frankfurt, showing that the pre-emption right needs a municipal bylaw. Fees: two labelled examples by building value. LADG, RP certificates and the short-term rental bill each carry one labelled hypothetical. English was drafted from the Chinese by a translation pass and bound only after the binding check; each language was read alone and then compared for numbers, dates and stage.

## Grouping and dispositions

Added to existing groups: BT-Drs. 21/9241 (both records) to `de-budget-accompanying-act-2027`; the DG ENER agreement news to `eu-methane-importer-delay-2026`; the Autobahn hearing to `de-autobahn-financing-2026`. The AI-migration hearing (21/8275) links to its explanation by number and stays outside the URL-based group (a record-number link and an explicit link cannot both point at one explanation). New groups: German consumer credit, EU plastic waste, EU–Indonesia, Hesse fee ordinances 67 + 84, RP certificates. `de-standard-rates-freeze-2028` is not linked to the budget group: it belongs to the social area while the act is a tax matter, and a group must share one area. The sugar tax keeps its own group although the tax is now part of the act.

Dispositions: technical federal and state items (BR-Drs. 671/26, 678/26, Hesse GVBl 81 and 85, Brandenburg GVBl II 52); OJ 23 November trade defence (2579, C 6056, C 6060), the WCO position (2608) and the juice processing aids (2597). Kept awaiting on purpose: the terrorism sanctions listing (2616/2605), the Brandenburg casino-municipality share (GVBl II 53), NRW MB 334, the Hesse energy act amendment (GVBl 80), the SH hospital, school and nursing-assistant laws adopted 11–13 November, the Saarland volunteer-event VAT note, the BMF BürMoG draft, the RP motions and drafts, the Thuringia return-counselling motion.

## Open leads

- Federal Law Gazette blocked: signing and publication of the laws cleared on 20 November; the BGBl number of the consumer credit law.
- Bundestag 24–27 November: referral back, the 25 November committee session, the 27 November readings of the budget act and the budget law.
- EP plenary 25 November: pharma package, VAT anti-fraud tools (2026/0292(CNS)) and the separate reverse-charge report 2025/2261(INI); methane plenary date.
- Mediation Committee date for the Kita act; electricity tax draft (none found by 23 November).
- Berlin § 201a ordinance and Brandenburg building fee ordinance still unpublished; SH GVOBl 107–110 missing from the listing; MV gazette history before 16 November.
- Council register 403; Thuringia press captcha; Saxony-Anhalt and Bremen parliament pages 404.

## Tool note

`data:coverage` exits 2 for DE and EU (reports saved). Run on 24 November, so 23 November now counts as a closed day and shows as missing everywhere (it was only scanned as an ongoing day). DE: the Federal Law Gazette lacks 21–23 November (blocked); Bundesrat, BMAS and BMG lack only 23 November. EU: the Official Journal lacks only 23 November; the Council register is blocked. Rendered pages are logged in the ledger as discovery evidence only and are not registered as snapshots; script shells and a maintenance page served with HTTP 200 were excluded from evidence.
