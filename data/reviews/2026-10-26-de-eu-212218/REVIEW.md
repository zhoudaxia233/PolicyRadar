# Germany and EU update — 26 October 2026

## Scope and result

Owner request: update more German and EU content and, where nothing new exists, extend coverage backwards. The recent pass (25–26 October) found almost nothing new, so the run backfilled the Federal Law Gazette Part I for September and the Official Journal from 24 September to 11 October. 26 October is the current day and is not closed. `data:coverage` exits 2 for both regions (see `coverage-DE.json`, `coverage-EU.json`); the Official Journal no longer has a gap in the recent seven-day window.

| Change | Count |
|---|---|
| New explanations | 15: 10 German, 5 EU |
| Revised explanations | 0 |
| New intake rows | 306: 39 Federal Law Gazette, 1 BMF, 265 Official Journal, 1 TAXUD |
| New scan rows | 28 |
| New topic groups | 5 |
| New disposition groups | 22 |
| New area label | `武器管制` → `foreign` |

No application code changed. New regression file: `tests/october-26-de-eu.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de, BGBl I | Recent: newest still I No. 317 (23 October); No. 318 returns 404. Backfill: Nos. 243 (1 September) to 281 (30 September) read issue by issue with each PDF; No. 242 is dated 31 August and No. 282 is in October, so these are all Part I issues of September. Part II not scanned, so the September scan is `partial`. |
| Federal cabinet | Topics page has no new item; results index not rendered this run. |
| Bundesrat | Plenary page readable; 1070th agenda still 404. |
| BMAS / BMG | Nothing after 13 / 15 October. The 2027 average supplementary contribution rate is still unpublished. |
| BMF laws directory | A 21 October item (draft ninth amendment of the CbCR Extension Regulation) was missed by the 23 and 25 October runs; recorded now. |
| Official Journal | L and C daily views rendered with `data:render` for 21 September–11 October, 25 and 26 October. New: 24 Sep (60), 25 Sep (32), 28 Sep (69), 26 Oct (103, partial). Reconciled against existing intake: 29 Sep (56), 30 Sep (30), 1 Oct (28), 2 Oct (18), 5 Oct (54, one missed item 2026/2199 added), 6 Oct (23), 7 Oct (27), 9 Oct (25). Weekends 26–27 Sep, 3–4 Oct, 10–11 Oct and 25 Oct return the previous issue: complete with zero items. 21–23 September rendered but not recorded (302 items in 21–28 Sep in total; 21–23 Sep left for a later run). Legal texts from the Publications Office (`/resource/oj/<ID>`, Accept `application/xhtml+xml`), archived from the https Cellar manifestation. |
| ESMA / TAXUD | ESMA: nothing after 22 October. TAXUD: one item on 26 October (NCTS Phase 6). |
| Parliament press room | Rendered; nothing new after the recorded releases. Not a registered channel. |
| Not scanned | BGBl Part II, Bundestag documentation and text archive, monthly new-rules index, all sixteen state channels, Commission law-making portal, Council register, Legislative Observatory, EUR-Lex recent acts. |

## Source-located review

### Germany (Federal Law Gazette Part I, September)

- **No. 262 Artists’ social insurance levy 2027** — Art. 1: 5.0% in 2027; Art. 3: from 1 January 2027. Baseline: existing explanation `de-artists-social-levy-2026` (4.9% for 2026). Separate year, separate matter; not grouped.
- **No. 276 E-scooter liability** — Art. 1 inserts small electric vehicles into the exception-to-the-exception in § 8 no. 1 StVG and replaces § 65(4) (accidents before 1 October 2026 under the old rule); Art. 2: in force 1 October. Current § 8 on gesetze-im-internet already shows the new text. Not read: liability caps and other § 7 exceptions (stated in limits).
- **No. 263 Winter levy** — Ninth amendment Art. 1–4; baseline eighth amendment (BGBl. 2025 I No. 303): 1% only for 2026, § 3a deleted from 1 January 2027. Current § 3: 2% (1.2/0.8). Example uses EUR 3,000 levy-liable gross pay; the levy base and exclusions are named.
- **No. 279 RSV** — adds clesrovimab to § 1(1); baseline: original regulation BGBl. 2024 I No. 278 (one dose of nirsevimab, under one year). gesetze-im-internet has no page for this regulation (404), recorded as a failed check.
- **No. 278 Emissions sticker** — Annex 3 item 11 (vehicles with the § 11 FZV electric marking); current Annex 3 shows items 1–11. In force on the first day of the next quarter: 1 October.
- **No. 266 Pharmacy rules** — Art. 1 no. 11 (new § 23, from 1 January 2027), Art. 2 no. 6 (§ 7a AMPreisV, EUR 5), Art. 4. Baselines: current § 23 ApBetrO, § 48a and § 48b AMG. § 48b needs a separate regulation; BfArM recommendations due by 2 July 2027, stated as not yet usable. Who bears the EUR 5 is not in the text and is stated as unknown. Status `phased`, next step 1 January 2027.
- **No. 248 Wine crisis distillation** — §§ 2–5, 9–10. Status `application_closed`, closed event dated 15 October and sourced to § 3(3) of the regulation itself; next step 30 November (`deadline`, decisions). The regulation expires on 4 March 2027 while its proof and payment deadlines run to 1 April and 31 May 2027; the text does not explain this and the explanation says so. EU Delegated Regulation 2026/1913 not read.
- **No. 249 War weapons general permits** — full text read; previous wording not compared (stated). Ukraine destinations and reporting duty are additions in the amendment text itself.
- **No. 267 Federal Convention** — the 16 numbers sum to 630; Art. 54 GG (archived) gives composition and timing. Convention date not in the notice and not invented.
- **No. 281 GrESteAV** — §§ 1–3; current §§ 18 and 22a GrEStG read. How filing worked before is not verified (stated).

### EU

- **Pea protein (2026/2101)** — Art. 1–4: 40.5% (Sanjia group, other cooperating), 67.1% (Yantai Shuangta, all others); in force 26 September. Provisional rates and measure duration not checked; stated.
- **EU–Switzerland PNR (2026/2360, 2026/2361)** — decision recitals and footnotes (signature 5 March, consent 16 September, entry-into-force notice to follow), agreement Art. 1, 11, 12, 19, 21. Not in force; `effectiveDate` null with an explicit status note. Annex data elements not read.
- **Sanctions** — 2026/2164–2165 (1 person, RT France), 2026/2184–2185 (10 persons, 17 entities, transfer of Ukrainian children), 2026/2192–2193 (10 persons: judges, prosecutors, a CEC official). Counts from the recitals and annexes.

## Policy-question and reader checks

- Nothing was reported as rejected, withdrawn or newly adopted beyond what the gazettes publish. The PNR agreement and the BMF CbCR draft are not presented as in force.
- Amounts: the KSA rate is a levy on fees paid by the commissioning party (example EUR 10,000 → EUR 500 vs 490), explicitly not the artist’s contribution; the winter levy example splits worker and employer shares; the pea protein example names the duty base (net free-at-Union-frontier price); the wine example shows pro-rata reduction.
- Chinese and English were read separately and compared for dates, rates, scope and stage. During review the September counts in the scan note and German review note were corrected from 13/16 to 14 dismissed / 15 awaiting.

## Grouping and dispositions

- New groups: three sanctions decision/regulation pairs, the PNR decision and agreement text, and the two Deutsche Post commencement notices (Nos. 254–255, both citing commencement on 1 September upon the commercial register entry; not yet explained).
- `data:topics` candidates added only by title similarity (corrigenda, GI notices, two identical sanctions notices): not merged.
- Not grouped: No. 257 (maritime bureaucracy regulation) with the existing explanation of its correction No. 284; that explanation covers the correction only and would misrepresent the whole regulation. No. 257 stays awaiting explanation.
- Dispositions reuse the existing reasons for court cases, mergers, exchange rates, State aid, corrigenda, opinions, appointments, sanctions notices, trade defence steps, product authorisations, single-member-state decisions, animal disease zones, mission mandates, agreement signing, technical acts and information notices. New reasons: EEA incorporation decisions (31), a refused European citizens’ initiative, German flight procedure regulations (5), and the CbCR exchange-partner draft. German internal-administration items: Nos. 251, 258, 260, 261, 264, 271, 272, 273; corrigendum No. 265.
- Awaiting explanation (German, 15 records): Nos. 243–247, 250, 254–257, 259, 268, 274, 275, 280.

## Follow-up

- Official Journal 21–23 September and earlier; BGBl Part II and Part I before September.
- BMG must publish the 2027 average supplementary contribution rate by 1 November.
- 30 November: wine distillation decisions; PNR entry-into-force notice; 1 January 2027: pharmacy opening duties and the 2027 KSA rate.
