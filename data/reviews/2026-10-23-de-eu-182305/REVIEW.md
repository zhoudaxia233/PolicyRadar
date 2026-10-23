# Germany and EU update — 23 October 2026

## Scope and result

Owner request: one update round for Germany and the EU. Scope is the nine federal (`DE`) channels and the seven `EU` channels. Window: 21–23 October, plus 19–22 October for the Official Journal, whose days after 16 October had not been recorded. 23 October is the current day and is not closed. German state channels were not checked. `data:coverage` exits 2 (see coverage.log).

| Change | Count |
|---|---|
| New explanations | 11: 4 German gazette items, 7 EU acts |
| Revised explanations | 6: parcels v2 → v3, passenger rights v1 → v2, the two EPR suspensions v2 → v3, Erasmus+ v2 → v3, methane delay v1 → v2 |
| New intake rows | 218: 5 German, 196 Official Journal items, 15 Parliament press releases, 1 ESMA, 1 TAXUD |
| New topic groups | 5 |
| New disposition groups | 22 (18 Official Journal classes, 3 news groups, 1 German) |

No application code changed. New regression file: `tests/october-23-de-eu.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de, BGBl I | Nos. 314–317 (22–23 October) read issue by issue with each PDF. Part II (for example II No. 235 of 22 October) was not scanned. |
| Federal cabinet | The rendered results index still ends at the 62nd meeting (14 October). The 63rd meeting's results are not published. The topics page has no new item; the starter pension it features was already recorded. |
| Bundestag text archive | Rendered list unchanged since the last run; weeks 43–44 have no sittings. |
| Bundesrat | The 1070th session agenda still returns HTTP 404. |
| BMAS / BMG | Nothing after 13 October / 15 October. |
| BMF | Laws directory: nothing after 12 October. Press: the 171st tax estimate (22 October), recorded and dismissed. |
| Monthly new-rules index, Bundestag documentation | Not scanned. |
| Official Journal | L and C daily views for 19–23 October rendered with `data:render`. Every item recorded: 19 Oct 64, 20 Oct 47, 21 Oct 29, 22 Oct 32, 23 Oct 24 (current day, partial). 19–22 October are `complete` scans with reconciled counts. 17–18 October stay open. Legal texts fetched from the Publications Office (`/resource/oj/<ID>`, Accept `application/xhtml+xml`) and archived from the https Cellar manifestation. |
| Legislative Observatory | Procedure-file PDFs of 2023/0437, 2025/0395, 2025/0396 and 2025/0222 (23 October versions). Parliament press room rendered: all 15 releases dated 20–23 October recorded. |
| ESMA / TAXUD | One new item each (22 October). |
| Commission law-making portal, Council register | Not scanned. |

## Source-located review

### BGBl 2026 I Nr. 314 — price-indication fines

- **Text:** Art. 1 replaces sections 2–3 of the Price Indication Act; new section 3(3) sets the maximum at EUR 100,000; section 3(2) adds offences for AFIR Art. 5(4) subparas 2–3 and Art. 5(5) sentence 2. Art. 2 deletes WiStG § 3(1) sentence 1 No. 2; Art. 4: in force 1 January 2027.
- **Current-law baseline:** WiStG § 3(2), EUR 25,000 (gesetze-im-internet, archived); PAngV § 20 refers to WiStG.
- **Not read:** the explanatory memorandum. The explanation says so.

### BGBl 2026 I Nr. 315 — High Seas Protection Act in force

- **Notice:** under section 24, the Act enters into force on 22 October with the BBNJ agreement.
- **Act read (BGBl. 2026 I Nr. 117):** sections 3–7, 13, 21, 22, 24. Six-month advance notice (section 5), 11-month post-collection notice (section 6), permits (section 13), fines up to EUR 50,000 (section 22).
- **Unresolved:** no ordinance under section 21 defining "minor or transitory" thresholds was found; stated in the limits.

### BGBl 2026 I Nr. 316 — digital driving licence

- **Notice:** technical prerequisites exist since 14 October; Arts. 2, 4 and 7 of the Fifth StVG amendment (BGBl. 2026 I Nr. 142) took effect that day.
- **Act read:** StVG § 2(1a)–(1b), § 2d, § 65(4); FeV § 4(2a)–(2b), § 48a(5), § 75 Nos. 4a–4c; Art. 9 commencement.
- **Key facts for readers:** valid "im Inland" only; card licences issued from 1 January 1999; eID required; photo may be missing until retrieval works; the card stays valid.
- **Not read:** the KBA standard and app details.

### BGBl 2026 I Nr. 317 — Allendorf/Eder procedures

Value and obstacle-clearance corrections; in force 21 January 2027.

### Union handling fee (Delegated Regulation (EU) 2026/2152) — existing parcels matter

- **Text:** Art. 1: EUR 2 per item; Art. 2: in force on publication (22 October), applies from 1 November 2026.
- **Record change:** v3 states the confirmed application date. `nextDate` stays 2026-11-01 with `nextKind` changed from `scheduled` to `implementation`. The 21 September "under scrutiny" event and the "expected" event are kept unchanged; a published event and a scheduled application event are appended.
- **Example re-checked:** EUR 6 duty + EUR 4 fee = EUR 10, VAT excluded.

### Battery removability (Delegated Regulation (EU) 2026/1770 and Notice C/2026/5531)

- **Text:** Art. 1 replaces Battery Regulation Art. 11(2) with eight derogations; the safety condition applies to all but point (b); Art. 2: in force on the 20th day (11 November).
- **Guidelines:** Art. 11 applies from 18 February 2027; "readily removable" definition. The guidelines say they are not binding.
- **Grouping:** both records in `eu-battery-removability-2027`.

### Hungary conditionality measures lifted (Council Implementing Decision (EU) 2026/2324)

- **Text:** Arts. 1–4; recitals on the 2022 measures (55% suspension in three programmes, ban on commitments with public interest trusts) and on remedial measures (PIT law, Integrity Authority, anti-corruption, judicial review, EPPO).
- **No invented date:** effect on notification; the Official Journal gives no notification date, so `effectiveDate` is null.
- **Policy-question gate:** other restrictions on EU funds for Hungary (horizontal enabling conditions, RRF milestones) are separate mechanisms. This site did not check them, and the reader text says so.

### Trade defence

| Act | Content | Record |
|---|---|---|
| 2026/2314 + 2026/2310 | Solar glass from China: AD and CVD repealed, refunds since review initiation, no interest | One explanation; both acts grouped in `eu-solar-glass-china-duties-2026` |
| 2026/2311 | Heavyweight thermal paper from Korea: 15.8% after expiry review | Explanation with a hypothetical EUR 100,000 example |
| 2026/2327 | Preserved mandarins from China: EUR 361.4–531.2 per tonne | Explanation with a hypothetical 20-tonne example |
| 2026/2319 | Ceramic tiles: one Indian exporter's name updated | Dismissed (rate unchanged) |

The earlier rates of the continued duties and the measures' duration were not checked; the explanations say so.

### Sanctions lists

- 2026/2384: ISIL/Al-Qaida, two entries' identifying data updated; nobody added or removed.
- 2026/2388: one entity removed from the Iraq list (in force 24 October).

### Parliament votes (Legislative Observatory and press releases)

| Procedure | Outcome on file | Record change |
|---|---|---|
| 2023/0437 passenger rights | First-reading position T10-0347/2026, 20 October; "Awaiting Council's 1st reading position" | v2; new event, statusNote and limits; still `pending` |
| 2025/0395 and 2025/0396 EPR | Partial votes T10-0345 and T10-0344, referred back for interinstitutional negotiations. Position: EU small and micro enterprises only, until 2035 or a circular economy act. Votes 616/9/39 and 612/8/39 | v3 each; vote metadata; the shared press release grouped in `eu-epr-authorised-representative-2026` |
| 2025/0222 Erasmus+ | Partial vote T10-0361/2026 on 22 October, mandate 454/34/93; Parliament asks EUR 47.39 bn vs Commission EUR 40.8 bn | v3; the elapsed 22 October `nextDate` is cleared and the scheduled events are kept |
| 2026/0325 methane delay | Parliament position 22 October, 341/225/6, urgent procedure: three-year delay, deadlines 31 May 2031 and 5 August 2031, sanctioned-origin exception | v2; the press release is grouped in `eu-methane-importer-delay-2026` |

No vote is presented as adoption of law.

## Grouping and dispositions

**New topic groups**

- `eu-union-handling-fee-2026`
- `eu-battery-removability-2027`
- `eu-solar-glass-china-duties-2026`
- `eu-epr-authorised-representative-2026`
- `eu-methane-importer-delay-2026`

**Dispositions.** The 18 Official Journal classes are: corrigenda, rates, company cases, court, State aid, products, appointments, EP records, advisory opinions, animal health, international positions, agreements, missions, budget, single member state, technical, sanctions notice and a trade-defence company update. The news groups cover Parliament events, budget items and non-binding resolutions, plus the ESMA Q&A notice and the counterfeit report. The German entry is the BMF tax estimate.

**`data:topics` candidates involving new records**

- Corrigenda with identical titles and geographical-indication notices: separate documents, not grouped.
- The Erasmus+ press release shares 2025/0222(COD) with the earlier procedure record. Both are already covered by the same explanation.

**Awaiting explanation:** unchanged at 9 German and 1 EU record from earlier runs. No new record awaits explanation.

## Reader comprehension check

- **Amounts:**
  - EUR 25,000 → 100,000 is a maximum fine, not a typical fine.
  - EUR 2 is per item, separate from the EUR 3 duty and from VAT.
  - 15.8% is levied on the free-at-frontier price.
  - The mandarin duties are per tonne of net product weight.
  - EUR 47.39 bn is Parliament's position, not an adopted budget.
- **Examples:** each is marked hypothetical and shows input, calculation and result (fine, parcels, thermal paper, mandarins, digital licence, sample collection).
- **Stage:** every Parliament vote is described as a position or mandate. The Hungary decision has no invented effective date.
- **Each language:** read on its own, then compared for the same amounts, dates and stage.

## Gaps

- All non-OJ scans are partial. Not scanned:
  - BGBl Part II;
  - the monthly new-rules index;
  - Bundestag documentation;
  - German state channels;
  - the Commission law-making portal;
  - the Council register.
- Official Journal 17–18 October remain open, and 23 October is partial.
- The 63rd cabinet meeting results and the Bundesrat 1070th agenda are not published yet.
- Not re-reviewed this run: the elapsed PFHxA (10 October) and DiscoverEU (15 October) dates.

## Validation

These all pass, with logs in this directory:

- `data:topics`
- `data:select`
- `npm test`: 333 tests
- `tsc`
- `npm run build`

All 17 new or changed policies and all 218 intake rows are `current` in `dist/data/DE.json` and `dist/data/EU.json`.
