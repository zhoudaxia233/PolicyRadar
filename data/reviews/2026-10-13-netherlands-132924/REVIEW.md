# Netherlands country update — 13 October 2026

Local update only. No commit, push, pull request, merge or publication was performed. Existing German, Swiss, French and unrelated local work was preserved against the export captured immediately before this pass.

## Result

- Three new bilingual explanations: Zeeland labour-shortage innovation grant round, Friesland nature-land sale framework, and the proposed national zoo-licensing reform.
- Two existing explanations updated: regional employment centres (bill 37039) and the Overijssel N337 bus trial.
- Twelve immutable intake records added, five new policy revisions, 76 scan records and 86 new snapshot keys. Ninety-two official URLs had accepted documentary captures; a reused snapshot is not counted as a new snapshot.
- The export now contains 651 policies and 752 revisions across all countries. The Netherlands has 99 explanations, up from 96.
- One reviewed matter groups bill 37039 and the government's 12 October employment-centre announcement. Existing identities, dates and original stages remain intact.

## Coverage and access

All 38 registered national and provincial entry points were requested. HTTP 200 alone was not treated as success. Flevoland's provincial-state portal remained empty after anonymous rendering; Flevoland's main page and Rijksoverheid's news endpoint returned application shells. Rendered government news was used for discovery and date reconciliation, not substituted for original server bytes in the source archive. Utrecht's news page and the RRReis operator page returned verification challenges; neither challenge was bypassed or accepted as documentary evidence. Previously successful checks retain their hash, snapshot and success time when the current response is unusable.

The government-news first page is date-descending, spans 13 October through 9 October and beyond, and therefore crosses the 11–12 October interval. Its four entries for that interval were read and reconciled: employment centres, zoo reform and the preparedness campaign were retained; the weekly asylum-inflow statistical bulletin was excluded with a recorded reason. There were no visible 11 October entries between the dated 12 and 9 October records. Together with the prior complete 3–10 October scan, this completes this channel's recent closed-day window of 6–12 October. Today, 13 October, remains partial. Attempts at additional page parameters reproduced the first page and are not claimed as successful pagination.

The other 37 channels remain incomplete. National gazette and law databases, parliamentary catalogues, provincial-state sites, local regulations, attachments and historical intervals have not been fully reconciled. `coverage-all-nl.json` reports all 38 channels, rather than only the six national channels considered by the country CLI. `data:coverage -- data/store NL` exits 2 as expected. This is incomplete coverage, not a no-change result. Entry-point HTTP failures are zero, but documentary access failures and coverage gaps remain as above.

## Policy-question review

Source identities, hashes and section locators are in `source-locators.json`; originals are in `data/sources`. The government-news discovery rendering is retained separately as `government-news-render.html`.

### Zeeland grants

Read the 13 October announcement, application portal and chapter 17A of the current consolidated subsidy decision (version valid from 9 October 2026). The new round runs from 16 October at 09:00 through 23 April 2027 at 17:00, subject to exhaustion, with a €500,000 ceiling. It is not an award to every employer. Articles 17A.1–17A.4 require an eligible consortium, sector and project, and exclude awards of €10,000 or less. Article 17A.7 caps aid at 50% of eligible costs and €50,000 per project. Article 17A.8 ranks complete applications and provides a same-day lottery when oversubscribed. Decision and project timing were checked in 17A.10–17A.11. Both languages distinguish total budget, individual cap, illustrative calculation and unverified remaining funds. The application date is a scheduled step, not an invented legal commencement date.

### Friesland nature-land sales

Read the province's announcement and sale catalogue. The revised framework replaces selection by the best development/management plan with minimum ecological conditions followed by price comparison. The first plots were already offered before the 13 October announcement; parcels 6065 and 6066 were listed on 23 September. No agricultural/building conversion, guaranteed eco-scheme subsidy, uniform start day or minimum price is inferred. The complete 2026 framework, parcel contracts and tender attachments remain explicit follow-ups.

### Zoo licensing

Read the official 12 October vision announcement. Existing indefinite licences, reassessment when facilities change and the proposed different enforcement approach are distinguished. A ministerial vision sent to parliament is not an enacted regime. The full vision-letter attachment and any subsequent legislation remain unverified; no new licence term, penalty amount or implementation date is invented. Possible withdrawal in extreme cases is described as under consideration.

### Regional employment centres

Read the 12 October government notice and current Tweede Kamer dossier 37039. The notice concerns the same joint service, structural funding and cooperation proposal submitted on 9 October. Added the operational explanation while preserving the existing bill explanation, privacy limitations and conditional July 2027 target. Parliamentary passage and universal opening of all centres are not asserted. The dossier's procedural-date labels conflict, so no exact next date was inferred. Grouping is supported by the proposal identity and concrete service arrangement, not title similarity.

### Overijssel bus trial

Read the province's original announcement and detailed application conditions. Added the exclusion for existing RRReis subscriptions and journeys solely on Zwolle–Wijhe or Deventer–Olst, the free subscription's automatic continuation and the passenger's liability for trips after November. The €105 reimbursement cap, advance payment, 50 places and November trial period remain. Advanced the next scheduled date from the elapsed opening date to the 18 October 17:00 deadline, subject to earlier exhaustion. The new event is an editorial correction, not a newly invented official announcement. The operator challenge prevents confirmation of live quota or form availability; the undated provincial conditions page was not assigned a fabricated publication date or new intake identity.

### Additional intake and pending follow-ups

Eight broader announcements remain available without pretending their full underlying frameworks were reviewed: 2027 nature-management funding (€56m national plus €44m provincial), starter-home/NHG arrangements, the 72-hour preparedness campaign, Indonesian restitution, four strategic critical-materials projects, Brabant poultry-permit negotiations, Overijssel water-link consultation responses and the draft mobility vision.

The housing notice covers two distinct arrangements and was not hidden behind a narrower NHG explanation. Its €164m NFBK headline combines €64m remaining in the earlier fund and €100m for 2029–2034, not one immediately available personal grant. NHG figures are retained as the government's announced 2027 parameters; full lender/guarantee conditions remain unreviewed. Critical-material designation is not a permit or grant. Poultry negotiations and an intended appeal are not final permit revocation or a verified stay of judgment. The underlying court judgment, committee advice and EU designation annex remain follow-ups. The mobility consultation closes on 23 November; planned January 2027 finalisation is not an outcome. The water-link response note does not grant construction approval.

Rechecked green-gas and CABR parliamentary pages. Lower-house passage and scheduled Senate procedure/input are distinct; 13 October agenda entries do not prove a completed vote. The separate Archives Act 35968 is not confused with CABR bill 36889. Other targeted application notices with unchanged dates were not given artificial new factual-review dates.

## Validation

- Baseline preservation audit PASS: all pre-existing revisions, intake records, scans, snapshots, unrelated policies, country review markers and untouched checks remain unchanged. Only the two named Dutch policies changed among pre-existing policies.
- Export selection and schema/integrity validation PASS; topic review completed, with one explicit new grouping and no title-only merges.
- 236 tests passed; TypeScript passed; static build passed, linking 4,895 archived evidence files. `git diff --check` passed.
- Browser: Dutch country selection, Zeeland English/Chinese detail content, scheduled opening label, 50%/€50,000 cap and lower award threshold verified. At a 390×844 viewport, document width remained 390 pixels and text wrapped without horizontal overflow. Viewport restored afterward.
- Browser: employment-centre records expand by keyboard and retain separate original dates/stages and links. Search `37039` shows one matter with two records; search `Kabinet zet werk centraal` shows one matter with one matching record. Navigation counts agree; country, query and language survive reload. Browser warning/error log empty. Temporary preview stopped.

This review completes the bounded local update, not national historical completeness or public deployment.
