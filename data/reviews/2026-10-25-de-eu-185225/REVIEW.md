# Germany and EU update — 25 October 2026

## Scope and result

Owner request: one formal update round for Germany and the EU. It records the scan of 23–25 October, closes the Official Journal for 23 October, and reviews four explanations whose next date had passed. 25 October is the current day and is not closed. `data:coverage` exits 2 for both regions (see `coverage-DE.json` and `coverage-EU.json`). The EU Official Journal channel no longer has gaps in the recent seven-day window.

| Change | Count |
|---|---|
| New explanations | 0 |
| Revised explanations | 4: PFHxA v2 → v3, DiscoverEU v1 → v2, Bremen police appearance v2 → v3, Baden-Württemberg feed aid v1 → v2 |
| New intake rows | 0 |
| New scan rows | 13: 6 German federal, 7 EU (4 of them complete Official Journal days) |
| New topic groups / dispositions | 0 |

No application code changed. New regression file: `tests/october-25-de-eu.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de, BGBl I | Latest entry is still I No. 317 of 23 October (recorded). Part II not scanned. |
| Federal cabinet | Rendered results index still ends at the 62nd meeting (14 October); the 63rd meeting's results are still unpublished. Topics page unchanged. The federal government's news feed for 23 October has speeches, a culture-funding release and the press conference, no cabinet decisions. |
| Bundesrat | Plenary page readable; no agenda for the 1070th session. |
| BMAS | Nothing after 13 October. |
| BMG | Registered search page renders without results; the press list page (`/presse/pressemitteilungen.html`) ends at 15 October. The 2027 average supplementary contribution rate (due by 1 November, tracked in `de-gkv-average-supplement-2027`) is not yet published. |
| BMF | Laws directory ends at 12 October; press ends at 22 October (recorded). |
| Official Journal | Daily views rendered. 17, 18 and 24 October: the requested date returns the previous issue (16 or 23 October) and the access page lists no 24 October issue, so these days are `complete` with zero items. 23 October: 19 L + 5 C items, matching the 24 recorded intake rows one to one, now `complete`. 25 October (today) not scanned. |
| Parliament press room | Nothing after 23 October; the 23 October release (`ep-20261023-ipr48287`) is already recorded. Legislative Observatory procedures not scanned. |
| ESMA, TAXUD | Latest items still 22 October (recorded). |
| Not scanned | Bundestag text archive and documentation, monthly new-rules index, Commission law-making portal, Council register, all sixteen state channels. |

## Source-located review of elapsed next dates

### eu-pfhxa-consumer-2026 (v3)

- **Source:** Regulation (EU) 2024/2462, obtained for the first time from the Publications Office (`/resource/celex/32024R2462`, Accept `application/xhtml+xml`, archived from the https Cellar manifestation `c50bce2f-76e8-11ef-bbbe-01aa75ed71a1.0006.03/DOC_1`). EUR-Lex itself still returns empty HTTP 202.
- **Text:** Annex XVII entry 79. Para. 1: from 10 October 2026, 25 ppb (PFHxA and salts) / 1 000 ppb (related substances) in homogeneous material for (a) textiles, leather, furs and hides in clothing and accessories for the general public, (b) footwear for the general public, (c) food-contact paper and cardboard, (d) mixtures for the general public, (e) cosmetics. Para. 2: from 10 October 2027 for other textiles, leather, furs and hides for the general public. Para. 3: exemptions (category III PPE listed points, medical devices, IVD devices, construction textiles). Para. 4: firefighting foams for training/testing and public fire services from 10 April 2026. Para. 5: civil-aviation foams from 10 October 2029. Para. 6: C6F13–S substances under the POPs regulation. Paras. 7–8: items placed on the market before the respective date are not covered.
- **Decision:** status `phased`, next step 10 October 2027 (`implementation`). The card date stays 10 October 2026 as an application date. The earlier events stating "not yet reached" are kept unchanged; a correction event records that the legal text is now available. Firefighting-foam details are named but not expanded.

### eu-discovereu-autumn-2026 (v2)

- **Source:** European Youth Portal (`youth.europa.eu/discovereu_en`), title "DiscoverEU - applications closed": "The application round is currently closed"; next round spring 2027, for applicants born 1 July 2008 – 30 June 2009; the UK joins Erasmus+ including DiscoverEU from 2027.
- **Decision:** status `application_closed`, closure event dated 15 October (the published deadline) and sourced to the portal's closed state. No date is invented for the spring round or for selection results; the reader text says both are unknown. The portal does not say from which round UK residents can apply; that stays explicit.

### explain-doc-57be003982e82ac753a52394 (v3)

- **Source:** archived Bremen Gazette No. 105 (15 October 2026), § 8: "tritt am Tag nach ihrer Verkündung in Kraft".
- **Decision:** in force since 16 October; `effective` event appended; next step cleared. No other content changed.

### bw-drought-feed-aid-2026 (v2)

- **Sources:** VwV Futtermittelhilfe of 15 October 2026 (Az. 27-8581): 7.2.1 forms on the agricultural info service, written or scanned e-mail submission; 7.2.2 application by 30 November 2026 (Ausschlussfrist); 7.2.3 evidence from 1 July 2026 until 31 January 2027 (Ausschlussfrist); 11 in force on publication, expires 31 December 2027. The funding portal's forms page lists the application form, Anlage 1 Excel calculator and guidance notes.
- **Correction:** the press release and portal text give the evidence deadline once as "31. Januar 2026"; the VwV settles it as 2027. The earlier "confirm with the authority" caveat is replaced by the legal reference.
- **Decision:** remains `application_announced`; next step 30 November (`deadline`). The publication date of the VwV is not stated in the PDF and is not invented.

## Policy-question and reader checks

- No instrument was reported as rejected, withdrawn or newly adopted. PFHxA: the text states it is not a ban on all PFAS and names the remaining stages. DiscoverEU: closure of one round, not the end of the programme. Bremen and Baden-Württemberg: no change to substance.
- Amounts: PFHxA limits are concentrations in material, with ppb explained (25 ppb = 0.025 mg/kg) and a hypothetical jacket example showing the effect of the placed-on-market date. Feed aid amounts (EUR 2,500–100,000 eligible net loss, up to 50 %) keep their existing roles; dates distinguish application deadline and evidence deadline.
- Chinese and English were read separately and compared for dates, limits, scope and stage. Two existing catalog entries were reused (`欧盟出版局`, `条例生效`). Publisher names added to `verbatim`: European Youth Portal, Ministerium Ländlicher Raum Baden-Württemberg, Infodienst Landwirtschaft – Ernährung – Ländlicher Raum Baden-Württemberg.

## Follow-up

- BMG must publish the 2027 average supplementary contribution rate by 1 November.
- 26 October: Bremen social services closures and the Lower Saxony planning display deadline; 31 October: old EVPG regulation expires; 1 November: EU parcel handling fee; 2 November: annual tax act hearing.
- The 63rd cabinet meeting results and the 1070th Bundesrat agenda remain unpublished.
