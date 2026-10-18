# Switzerland update — 18 October 2026

Fifth run of the day. Owner request: update Switzerland, using the same process as the earlier runs.

## Result

| | New explanations | Joined existing explanations | Reviewed as needing no explanation | Awaiting |
|---|---|---|---|---|
| Federal | 14 | 2 (AEOI crypto, FINIG stablecoins) | 25 (incl. 13 new news items) | → 0 |
| Cantons | 12 | — | 46 | → 0 |

- Sixteen new federal news items (15–16 October) were recorded as intake. Three of them are explained: the jet fuel stock release, the customs end-use relief changes and the EFTA–Malaysia referendum.
- Five consultation notices from the Federal Chancellery were already grouped with their Federal Council releases. The new explanations attach to those existing groups through the release URL, so no duplicate groups were created.
- No application code was changed.
- New regression test: `tests/october-18-switzerland.test.ts`.

## Access and evidence

- `www.admin.ch` and `www.news.admin.ch` still return 403 to direct requests; this was not bypassed.
  - The same releases are served on the issuing office's own website at `/<lang>/newnsb/<id>` (for example bwl, bk, bakom, bazg, bj, seco, blv, bag, sif). Those pages returned 200 and are the archived sources.
  - The intake records keep the `admin.ch` URL as the official identifier.
- `cms.news.admin.ch` attachment PDFs returned 200 earlier but reset the connection in this run (recorded as errors in `fetch-ledger.json`). They were not used.
- All 58 cantonal pages were fetched directly (HTTP 200) and archived where explained.
- Rendered pages (`data:render`) were used for discovery only.

## Source-located review (federal)

- **Jet fuel**: up to 30,000 m³, about 6.5% of the compulsory stock, may be drawn from 15 October to 1 November inclusive. The cause is rail freight disruption toward Zurich Airport.
- **Protein feed**: a WBF ordinance in force from 15 October releases the compulsory stocks beyond the earlier 20% shortfall limit; 9.5% had been drawn since 1 September. The release gives no end date or new limit.
- **Customs end-use relief (BAZG page)**
  - From 1 November, one end-use commitment per business partner (GP-ID) replaces commitments per tariff number. Old commitments and database D-123 lapse.
  - Free-trade end-use preferences get code 30 in Tares. Hormone beef tariff numbers are excluded. Directive R-17 was not read line by line.
- **EFTA–Malaysia referendum**: 60,347 signatures filed on 5 October, of which 59,866 valid. It challenges the federal decree of 19 June 2026. No vote date is set.
- **Platform law (KomPG)**: the consultation draft is kept and youth protection added (risk assessment, no profiling ads to minors). The notice procedure extends to all allegedly illegal content. The dispatch is due by June 2027.
- **Consultations closing 27–28 January 2027**: customs ordinance package; political rights for people under general guardianship (Art. 136 BV, needs a double majority); the WTO e-commerce agreement; medical device shortage reporting (planned in force 1 August 2027); 16 food ordinances (bisphenols, PFAS in toys, honey origin, novel food testing).
- **Pet import ordinance**: adopted on 14 October. The release gives no commencement date or substantive changes, and the explanation says so.
- **Health insurers' capital income**: the postulate report keeps the voluntary mechanism. Status `existing`.
- **Winter vaccination**: Covid-19 advice is dropped for pregnant women without conditions; RSV high-risk advice now starts at 18. National vaccination weeks run 2–7 and 23–28 November.
- **Ukraine reconstruction agreement**: in force 9 October; the referendum period ended 8 October.
- **FINIG**: the SIF DLT page read today still lists the October 2025 consultation as the latest step. The existing explanation (no dispatch yet) stands.

## Source-located review (cantons)

- **BE Nods**: shooting of a single wolf; seven municipalities; valid until 12 December; an appeal has no suspensive effect.
- **VS Arolla-Ferpècle**: full-pack removal requested from FOEN; this is the sixth request. The Nanz and Augstbord full removals and the basic regulation of two packs are approved; Réchy-Anniviers is pending.
- **UR cold progression 2027**: CPI 116.5 (+0.43%). The table amounts were not transcribed.
- **JU political finance**: in force 1 November; donation lists from parties, committees and candidates; committees file 30 days before a vote.
- **SO biometric ID**: from 2 November; CHF 70 for adults and CHF 35 for minors; non-biometric cards remain.
- **BE property transfer tax**
  - The proposal keeps the CHF 800,000 allowance. Main residence for six months within four years would qualify, and partial letting would be allowed.
  - Consultation runs until 7 January 2027.
- **GE**
  - Status S → B permit: aid stays the same; the law is needed by 1 March 2027.
  - Rental value index: 127.5 (+1.8%); the tax is abolished from 2029.
  - Initiative 206: valid; the government recommends rejection plus a counter-proposal.
  - These are three separate records from one weekly communiqué and stay separate matters.
- **VD 12% initiative**
  - The tax cut costs CHF 272 million a year.
  - The government proposes CHF 100 million of savings and CHF 172 million of revenue. Parliament begins examining the budget on 1 December.
- **ZH police law**: in force 1 December. The Federal Supreme Court refused suspensive effect; it has not ruled on the merits.
- **NE e-voting**: from 29 November; the authorisation runs until 26 November 2028; registration is required.

## Not explained (dispositions)

- Federal: visits, dialogues, events, reports, statistics, newsletters, a campaign, form and manual updates, FATCA notices, the UN list update, and two single projects (SNP Vernayaz, Knifefish MoU).
- Cantonal: 13 digests, five consultation replies, 11 single projects or roadworks, 13 news or strategy items, two budgets, and two internal-procedure items.
  - Some digests contain items that may deserve their own explanation later, notably Geneva's 2027 cold-progression compensation and Bern's EFAS introductory-law consultation. The disposition basis says so.

## Coverage gaps

- The federal news portal's date filter did not apply in rendering, so the scan is partial.
- Cantonal channels were not scanned for items after 15 October in this run.
- `data:coverage` exits 2 as expected while coverage is incomplete.

## Gates

`data:topics`, `data:select`, `npm test` (295 pass), `tsc --noEmit` and `npm run build` all pass. Logs are in this directory.
