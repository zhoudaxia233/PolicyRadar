# Germany and EU update, 9 October 2026 (evening)

Owner request: update Germany and the EU first — capture new policies and fill earlier gaps. Other countries were not reviewed; their records and review markers are unchanged.

`fetch-ledger.json` lists every request with time, status, content type and byte hash. HTML/PDF evidence is in the shared source archive. JSON endpoints (Bundestag sliders, Press Corner search/document API) served only as discovery metadata. Script-rendered shells (federal cabinet and government news pages, Legislative Observatory front page, Commission document register) were not archived as evidence.

## Germany

### Bundesrat: first substantive intake

Before this run the Bundesrat channel had scan rows but no retained records. The agenda for the 1069th plenary session on 16 October (version dated 9 October) lists 51 items. Each item's detail page was opened and archived. 44 policy items are retained with their Bundesrat document number as `officialId`, plus committee recommendations 507/1/26. Seven items are excluded with reasons: elections (1–4), appointments to EU bodies (44a, 44b), and Constitutional Court proceedings (45).

Records use the agenda date (9 October, `announced`) and the agenda item URL. The original date of each underlying Drucksache was not checked item by item, and earlier agenda versions are not archived, so the scan stays partial. Stage is `pending` for all: a Bundesrat agenda listing establishes neither adoption nor commencement. Notes distinguish second passage of Bundestag laws (objection law vs consent required, from the agenda's "Gesetzeskategorie"), first-round opinions on government bills, state bills and resolution motions, government ordinances and EU documents.

### Policy-question completeness gate: 2027 income tax reform (new explanation)

- Instrument: federal government bill "Entwurf eines Einkommensteuerreformgesetzes 2027", BR-Drs. 507/26 (cover dated 4 September, Chancellor's letter: particularly urgent under Art. 76(2) sentence 4 GG) = BT-Drs. 21/8235 (28 September; first page and summary identical). Stage: Bundestag first reading and committee referral on 8 October (Bundestag text archive report kw41-de-einkommensteuerreform); Bundesrat first-round opinion scheduled 16 October (agenda item 22). Enacting formula "mit Zustimmung des Bundesrates": consent law. No final vote date found.
- Current-law baseline: § 32a(1) EStG for 2026 from gesetze-im-internet.de (12,348 / 69,879 / 277,826; formulas) and § 32a(5) splitting. Current amounts for the employee lump sum (1,230), child allowance (3,414 per parent), tradesperson credit (20%, 1,200) and mini-job flat tax (2%) are taken from the bill's own explanatory notes (pp. 29–32).
- Proposed: Art. 1 no. 1–9 (§§ 3b, 9a, 32(6), 32a, 35a, 39b, 40a, 52, 66 EStG), Art. 2 (2028 schedule and amounts), Art. 4/5 (BKGG), Art. 7 (commencement 1 Jan 2027; Art. 2 and 5 on 1 Jan 2028). Wage withholding applies to pay periods ending after 31 December 2026.
- Worked example (single person, tariff income tax only; computed with the statutory formulas): taxable income 50,000 → 10,548 (2026) vs 10,482 (2027 draft); 300,000 → 115,529 vs 116,658. The 2027 schedule exceeds 2026 only from roughly 254,000. Raising the lump sum by 200 near 50,000 taxable income saves about 70. Solidarity surcharge, church tax and social insurance are excluded and stated as such.
- Alternative paths followed: BR-Drs. 507/1/26 (committee recommendations). Item 2 (finance committee) would abolish the 10-year holding period for private property sales under § 23(1) no. 1 EStG, applying where the period has not expired on promulgation; item 6 asks to examine reforming joint spousal taxation; items 3 and 5 (economic committee) would drop the tradesperson-credit cut and the mini-job rate increase. These are recommendations only and are presented as such; they are not in the government bill. The Bundestag report also covers the annual tax bill 21/8283 and Greens motion 21/8378; these are separate instruments and the multi-proposal report is not grouped with the bill.
- Unresolved: final Bundestag and Bundesrat votes; whether the Bundesrat adopts any recommendation; child amounts rest on the expected 16th subsistence-minimum report.

### Grid-subsidy bill (version 2)

BR-Drs. 509/26 and BT-Drs. 21/8236 have the identical title and problem statement (EUR 5.525 billion a year for 2027–2029 after EUR 6.5 billion in 2026). Added the 8 October Bundestag first reading (text archive report: referral to the economic affairs and energy committee) and the 16 October Bundesrat first round (Bundesrat explanation for item 24: economic committee recommends keeping EUR 6.5 billion a year; finance committee recommends no objections). Original events preserved; version advanced once; status remains pending.

### Other German channels

- Federal Law Gazette: 8–9 October date filter lists 6 items, all already recorded; today still only no. 289. Partial (today open).
- Bundestag text archive: front page and 20 slider links all already recorded or excluded by the afternoon run.
- BMAS, BMG, BMF: no items newer than 8 October, 30 September and 7 October respectively.
- Cabinet topics and government news: script shells; no conclusion that there were no cabinet decisions.
- Recent-coverage check (DE) exits 2 with the same five channels as the afternoon run (monthly summary, Bundestag documentation, text archive, cabinet, Bundesrat). No newly failed source.

## European Union

### Low-value parcels (new explanation)

- Council Regulation (EU) 2026/382 (EUR-Lex ELI page): Art. 1 removes the EUR 150 relief; Art. 2 sets EUR 3 per item from 1 July 2026 to 1 July 2028 where imports are VAT-exempt under IOSS or are postal consignments; Art. 3 monthly trade-diversion review from 1 October and the 1 December 2027 extension assessment; Art. 4 entry into force on the 20th day after publication (OJ 18.2.2026 → 10 March) and application from 1 July 2026. Recital: non-IOSS operators remain under the Common Customs Tariff.
- Commission guidance, version 5 October (announced 8 October): sections 1, 2.2, 3.2 — EUR 2 Union handling fee per item under Art. 20 of the new Union Customs Code (2026/2108, in force 20 September), applies to distance sales regardless of value, not temporary; amount fixed by delegated act C(2026)6694, "under scrutiny", expected to apply from 1 November. Section 5.2 — "item" definition and per-declaration-line charging.
- The handling fee is shown only as an expected next step (`scheduled`), not as applying. The register page for C(2026)6694 was a script shell and could not confirm the scrutiny outcome. The guidance is not legally binding; VAT is outside scope. Example: one coat plus two identical scarves (EUR 120, two lines) → EUR 6 duty, plus EUR 4 if the fee starts.

### Channels

- Official Journal: 8 October now closed — 10 L and 21 C items reconciled one to one with existing records (complete scan). 9 October: all 10 L and 15 C items recorded (partial, day open).
- Commission news pages 1–5 reach past 7 October. Two 8 October items were missing from the previous run: gas winter outlook (retained) and European Green Cities award (excluded). 9 October policy items retained: non-cooperative tax jurisdictions list (from the Commission news item; Council text not checked), VAT anti-fraud extension proposal, French fuel-price State aid, BG–GR–RO transport action plan. Press Corner (official search API): critical raw materials press release with its Q&A and factsheet (grouped — the press release links both), EU–China joint statement; speeches, remarks and daily digests excluded with reasons.
- Legislative Observatory front page returned a shell; no procedure list read today. EUR-Lex recent-legislation channel not separately paginated this run.
- Recent-coverage check (EU) exits 2: four channels incomplete; the Official Journal now misses only 2–7 October.

## Grouping

New reviewed groups: income tax bill + committee recommendations (507/26, 507/1/26); grid subsidy (509/26 + 21/8236, identical bill text); product liability (584/26 explicitly cites 21/4297); critical raw materials press release, Q&A and factsheet. Identical generic titles stay separate: non-English corrigenda, the two 9 October Combined Nomenclature explanatory notes, and the 6 vs 9 October Ukraine sanctions data-subject notices. The 9 October Russia/Ukraine sanctions notices relate to the 8 October implementing acts, but those acts are not in a reviewed group and existing groups were not modified; left unresolved. PVA registration (2026/2245) and the C-319/24 P implementation notice concern the same product but their procedural link was not verified; left separate.

## Reader comprehension and translation

Both explanations were reviewed in Chinese and English separately and then compared for amounts, units, stage and exceptions. Checked ambiguities: "taxable income" is defined as the amount after deductions, not gross pay; each tax amount is tariff income tax for a single person; the 45%/47% thresholds refer to taxable income; child benefit is monthly, allowances are per parent per year; the EUR 3 and EUR 2 are per item, not per parcel, and the EUR 2 fee is not yet in force. All new intake titles and notes, exclusion reasons, scan notes and both country review notes have English entries; bindings cover the 79 new records and the three changed policies. One existing catalog entry ("现在仍按什么规则办") was reused with its existing translation.

## Validation

- Candidate: 207 tests pass; TypeScript clean; candidate build passes.
- Selection gate passed (history, revisions, archived citations, scans); selected-export tests (207) and default build pass.
- Recent coverage: DE exit 2 (5 channels), EU exit 2 (4 channels) — partial update, not a clean monitoring result.
- Browser interaction was not re-tested; rendering, grouping, reachability and filter regression tests passed.
