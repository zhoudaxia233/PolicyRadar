# Rendered channels, 9 October 2026 (second evening pass)

Owner request: fix channels that a plain HTTP client could only read as script shells. Builds on `2026-10-09-de-eu-update-215101`; other countries unchanged.

## Method

New `npm run data:render` renders a public page in the local headless Chrome as an anonymous visitor (no login, forms or CSRF endpoints). Renders are recorded as `rendered` entries in `fetch-ledger.json` and archived as rendered snapshots; linked server-rendered articles are fetched and archived as exact bytes. The rule is documented in `data/UPDATE.md` ("Script-rendered listings").

## Germany

- Federal cabinet (registered channel: Kabinettsthemen; listing: cabinet results index). The rendered index carries `<time>` stamps in descending order: 7 Oct (61st session), 30 Sep, 23 Sep … The 61st session results page (server-rendered) lists 4 main items and 26 items adopted without debate. Reconciled 30/30: three main items were already recorded (domestic violence, digital violence, Autobahn financing); the state-modernisation report and 22 no-debate items are added; the social insurance parameters ordinance (no-debate item 20) is recorded once via its dedicated page; four items are excluded (late regulatory-council opinion, three coin approvals). Scan for 2–8 October marked complete. Government replies (Gegenäußerungen) are recorded as steps of pending bills, not adoptions. List positions inside the page are given as `#top1-NN` fragments for identity; they are not official anchors.
- Social insurance parameters 2027 (cabinet article): health-insurance contribution income ceiling EUR 76,500/year (2026: 69,750), pension EUR 106,200 (2026: 101,400), compulsory-coverage threshold EUR 84,150; Bundesrat consent required. Recorded as pending; the existing explanation `de-social-insurance-ceilings-2027` was not changed in this pass.
- Monthly roundup: rendered list readable; October roundup (`<time datetime="2026-09-29T11:30:51Z">`) added. The list mixes months and archive years, so no closed window is claimed.
- Tax-adviser exam reform: the BMF page and the cabinet no-debate item name the same BMF bill; grouped. No parliamentary stage inferred.

## EU

- Legislative Observatory front page rendered: 36 of 40 procedures already recorded. Titles were taken from each rendered procedure page, not from list position (the list places the title after the reference; a positional reading would have mislabelled them). Added 2025/0395(COD) and 2025/0396(COD) (Omnibus VIII extended-producer-responsibility suspensions; committee vote 5 Oct, report tabled 9 Oct, indicative plenary 19 Oct; pending). Backfilled 2025/0385(COD) (Critical Raw Materials Act amendments; report tabled 2 Jul) outside the scan window. Excluded 2026/2925(RSP) (forecast date only).
- Commission register, C(2026)6694 (rendered): "Act not yet in force", adopted 21/09/2026; enters into force only absent objection; scrutiny generally two months after adoption. Parcels explanation advanced to version 2: summary, status note, limits and next-step label now state that the 1 November start assumes early end of scrutiny; adoption event added. Prior events and revisions preserved.

## Coverage

- DE recent coverage: 4 of 9 channels incomplete (was 5); cabinet closed for 2–8 October. Still open: monthly roundup, Bundestag documentation, Bundestag text archive, Bundesrat.
- EU: 4 of 4 incomplete; Official Journal misses 2–7 October only.

## Validation

Candidate and selected export: 210 tests pass (3 new render-tool tests); TypeScript clean; builds pass; selection gate passed. All new records and the parcels v2 explanation have current translation bindings. Browser interaction with the site itself was not re-tested.
