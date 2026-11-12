# Germany and EU round — 12 November 2026

## Scope and result

Owner request: "更新一轮" (one round). Read as the standing tier-1 scope in `data/UPDATE.md`: Germany (federal and all sixteen states) and the EU. Tier-2 countries were not scanned (they are updated only on request); their review markers are unchanged. Window: since the 10 November round (export `2026-11-10T20:11:11.722Z`) through today, a Thursday; 10 and 11 November are closed days, 12 November stays partial. Export time `2026-11-12T19:26:11.488Z` (20:26 Berlin).

| Change | Count |
|---|---|
| New explanations | 2: `de-strategic-gas-reserve-2027`, `bw-tenant-protection-2027` |
| Revised explanations | 9 (listed below) |
| New intake rows | 80 (EU Official Journal 44, Federal Law Gazette 14, Bundestag 16, cabinet 1, Baden-Württemberg 4, Lower Saxony 1) |
| New scan rows | 68 |
| New snapshots | 110 |
| New topic groups | 8; 7 documents added to existing groups |
| New disposition groups | 10 |

Revisions: Bundestag adoptions — `de-kita-quality-act-2027` v4 (12 November, 457:132:1), `de-customs-financial-crime-2026` v3, `de-cyber-defence-act-2026` v2, `de-bundeswehr-infrastructure-2026` v3 (all 12 November), `de-knockout-drops-penalty-2026` v2 (6 November, **missed by the 7 and 10 November rounds**); vote removed from the agenda — `de-agriculture-bureaucracy-2026` v3; successor and related matters — `bw-rent-cap-2026` v3 (successor ordinance published), `de-gas-storage-levy-end-2026` v2 (points to the proposed new reserve levy), `de-sugary-drinks-tax-2027` v2 (unconfirmed report of a later start).

No application code changed. New regression file `tests/november-12-de-eu.test.ts`. `tests/status-detail.test.ts` changed its selection only: it counted rent ordinances by the legacy status label `已生效`; `bw-rent-cap-2026` now uses the status code `adopted` as UPDATE.md requires for edited policies, so the filter also accepts that code (with an expiry next step and an effective date on or before the test date). The assertion is unchanged (453 tests pass).

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | 10 November closed: no issue (Part I 334 is 9 November, 335 is 11 November; Part II 262 is 12 November). 11 November closed: Part I 335–336 recorded; 337 returns 404. 12 November partial: Part II 262–273 recorded; Part I 337–339 and Part II 274 return 404. Parallel requests failed with "fetch failed"; sequential requests succeeded. |
| Bundestag text archive | Latest 60 items via filter list and per-item teaser JSON; 16 recorded, 8 excluded with reasons. Votes held after the check (Annual Tax Act 20:25, grid subsidy 22:30, academic contracts, Mercosur, guardianship coercive treatment, mutual legal assistance) still showed previews; left for the next round. Parliamentary documentation not checked. |
| Federal cabinet | Rendered list: 11 November meeting — strategic gas reserve bill (recorded, explained); raw-materials foreign policy report and integration report excluded. |
| Bundesrat | 1070th plenary agenda marked "Stand 12.11.2026", but all 60 items and numbers are identical to the 10 November version (diffed). |
| BMF, BMAS, BMG | BMF legislative page still dated 6 November; BMAS one non-rule item (social summit); BMG list still not parseable. |
| BMWE | Returned a Radware browser verification page; not bypassed, not archived (ledger entries flagged `challenge`). |
| Sixteen states | 52 channels fetched; keyword sweep 10–12 November. Failed again, same set as 4, 6, 7 and 10 November: Saxony-Anhalt Landtag documents and press (404), Bremen Bürgerschaft (404), MV Landtag (403), NRW press (fetch failed). Bremen gazette 10–11 November closed (no issue). Recorded: Baden-Württemberg gazette Nos. 95–97 and the housing ministry release; Lower Saxony sugar tax statement. |
| EU Official Journal | Rendered daily views: 10 November re-rendered, still L 20 + C 3, all matching existing records (closed). 11 November L 18 + C 8 = 26, all recorded (closed). 12 November L 11 + C 7 = 18 recorded (partial). |
| ESMA, TAXUD, Council | ESMA nothing new since 9 November; TAXUD one programme agreement (EU–Armenia), excluded; Council register not checked. |

## Source-located review

### Policy-question gate

- **Bundestag results of 12 November.** Read on each item's own text-archive page: Kita act 21/8239 adopted 457:132:1 on committee recommendation 21/9153 (minor changes, not read); customs act 21/8282 adopted on 21/9136 (CDU/CSU, SPD, AfD for; Left against; Greens abstaining); cyber security act 21/6585 adopted on 21/9159 with an accompanying resolution; Bundeswehr infrastructure act 21/8409 adopted as amended (21/9140). All stay `pending`: each still needs the Bundesrat and publication; none is on the 20 November agenda, so no next date is set. Committee amendments were not read; each card says so.
- **Knockout drops (21/7560).** Adopted on 6 November as amended (21/8947). The previous two rounds missed it because the item was never in their list window as a new URL. What happened to the Bundesrat's own bill 21/551 is not verified; the card says so.
- **Agriculture bureaucracy (21/8408), Building Code upgrade (21/6588).** Votes removed from the agenda without reason or new date; recorded as `correction`/unverified, not as withdrawal.
- **Strategic gas reserve.** Source: Federal Government Q&A of 11 November (cabinet decision). Bill text not read (BMWE challenge page). Facts used: 24 TWh, ~10% of storage capacity, 30 days, THE builds it over three years from 2027, levy 0.03–0.05 ct/kWh and EUR 4–7 per household per year (government estimates), storage filling rules expire 31 March 2027, the reserve is not a price hedge. Current-law baseline: the former gas storage levy was abolished on 1 January 2026 (`de-gas-storage-levy-end-2026`, which now mentions the proposed new levy so a reader of the old card sees the active proposal).
- **Baden-Württemberg tenant protection 2027–2029.** Gazette 2026 Nos. 95, 96, 97 (signed 10 November, published 12 November, PDF SHA-256 equal to the hash shown on each gazette page). In force 1 January 2027 to 31 December 2029. The three ordinances list the same 133 municipalities (compared programmatically). Compared with gazette 2025 No. 144 (130 municipalities): Mannheim, Konstanz and Kehl added, none removed; confirmed by the housing ministry release of 11 November. KappVO: 15% within three years (BGB § 558(3)); KSpVO: five years (BGB § 577a(2)). The current 2026 versions of the cap and notice ordinances were not checked; stated in the card. The 2026 rent brake card now points to its successor and no longer says the successor is only at consultation.
- **Sugary drinks tax.** Lower Saxony's health minister stated on 12 November that the federal coalition decided in budget negotiations to delay the tax to early 2028. No federal document found (Bundestag hib list rendered; the budget committee's clean-up session was still running). The card keeps 1 July 2027 from the cabinet text and shows the report as unconfirmed in status, limits, next-step label and a `correction` event.

### Reader comprehension check

Gas reserve: the levy is named as a charge per kilowatt hour passed on by suppliers, not a tax; example 14,000 kWh → EUR 4.20–7.00 a year, matching the government's EUR 4–7, labelled hypothetical; the 0.3–0.5% figure is attributed to the government. Baden-Württemberg: each rule names its base (starting rent vs. local comparable rent; increase over three years; waiting period after conversion and sale) and the general federal rule it departs from (20%, three years); examples: Konstanz EUR 900 comparable rent → at most EUR 990 for a 2027 contract, none for a 2026 contract; EUR 800 → at most EUR 920 within three years and never above the comparable rent; limits state the 15% is not annual. Bundestag adoptions: every card says the Bundestag adopted it and that it is not current law until the Bundesrat and publication. Each language was read alone and then compared for numbers, dates and stage.

## Grouping and dispositions

Added to existing groups: the four Bundestag adoption records and the agriculture removal notice to their explanations; BAföG hearing to `de-bafoeg-reform-2027`; knockout-drops adoption to `de-knockout-drops-penalty-2026`. New groups: preview + result for the Greens' EEG bill, the Left's maintenance advance and education cooperation motions, the Greens' heating-cost motions and the Building Code upgrade; `de-strategic-gas-reserve-2027`; `bw-tenant-protection-2027` (three gazette records and the ministry release, with both the new explanation and `bw-rent-cap-2026`, which the 2026 No. 95 memorandum names as its predecessor); `de-sugary-drinks-tax-2027` (cabinet record and the Lower Saxony statement). Three result records had their official ID omitted because an identical ID on the card would link the explanation implicitly and conflict with the explicit group link; their URL and title identify them.

Dispositions: OJ exchange rates, mergers, geographical indications, corrigenda, technical product rules, anti-dumping duties, CFSP measures and institutional items (11–12 November); BGBl II DOCPER notices 262–271 and the BBNJ scope notice 272.

Kept awaiting on purpose: BGBl I 335–336; BGBl II 273 (tax assistance convention notice); Bundestag votes without debate (incl. Biomass Ordinance), aviation noise, patient rights and waste shipment hearings; OJ AI sandbox regulation 2026/2487, Article 11 asylum and migration decision 2026/2522, 2027 investment gold coin list, European Disability Card QR regulation 2026/1436, AI Act Article 50 transparency guidelines.

## Open leads

- Bundestag results of 12 November evening (Annual Tax Act, grid subsidy, academic contracts, Mercosur, guardianship, mutual legal assistance) and 13 November (intelligence services, Sea Guardian).
- Federal confirmation of the sugary drinks tax start (budget committee clean-up session, Haushaltsbegleitgesetz).
- Strategic gas reserve bill text (BMWE site behind a browser check).
- Bundesrat dates for the bills adopted on 6 and 12 November.
- Schleswig-Holstein Housing Protection Act amendment outcome; Hesse tenant protection ordinance before 25 November.
- BMG press list still unparseable; Council register and Bundestag parliamentary documentation not checked.

## Tool note

`data:coverage` exits 2 for DE and EU (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window, as on 10 November; the Federal Law Gazette has no gap. EU: 6 of 7 incomplete, as on 10 November; the Official Journal is closed through 11 November. No newly failed tier-1 source.
