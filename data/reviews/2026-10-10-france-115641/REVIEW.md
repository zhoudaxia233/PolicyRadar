# France update, 9–10 October 2026

Owner request: run a round of French policy updates. Only France was reviewed; other countries' records and review markers are unchanged. Fetching took place on the evening of 9 October (Berlin), and the data was written on 10 October. Scans keep their actual fetch times, so 9 October stays a partial (then ongoing) day.

`fetch-ledger.json` lists every request with its time, kind, byte hash and size. "evidence" bytes are archived in `data/sources/`. "meta" requests (official RSS feed, National Assembly number searches, articles excluded as non-policy) are discovery metadata only. "fail" requests are not archived.

## Channels

- **Service-Public (individuals, businesses):** first listing pages plus the official business RSS feed. Every article dated 2–8 October was opened and either recorded or excluded with a reason. These scans are partial, because the listing shows only the latest ~20 items and has no paginated archive. 9 October is partial. The backfill picked up August–1 October articles found through the listings and through the "Ce qui change en octobre 2026" roundup (A18466).
- **National Assembly (legislative files):** the paginated listing orders same-day items unstably. Pages 1 and 2 overlapped by eight items, so eight files (3234–3237, 3267–3270) were missing from the paginated pass. Instead, numbers 3200–3300 were enumerated through the dossier search (`?numero=`).
  - **2–8 October is a complete scan of newly tabled files:** 67 files recorded, plus 11 numbers excluded (non-file documents, later reports on earlier files 446/533/2892, and the defence opinion 3279 on the finance bill). No. 3211 is dated 1 October and No. 3290 is dated 9 October.
  - **What the complete scan does not cover:** it does not claim coverage of progress on older files. The documents 3220, 3272 and 3274 are kept as unresolved leads.
- **Senate promulgated laws:** the latest item is Law 2026-813 of 24 August. Partial, because it could not be cross-checked against the Official Journal.
- **Légifrance (Official Journal):** blocked by a Cloudflare 403. `npm run data:render` also stopped at the verification page. It was not bypassed and is recorded as blocked. Decree texts are therefore known only through Service-Public explainers, and each explanation says so.
- **Regional channels (54):**
  - 28 portals answered and only their home or first listing pages were visited. They are partial, with no records.
  - 26 are blocked: all 18 prefecture portals, Bretagne (2), Normandie (2), La Réunion (2), the Auvergne-Rhône-Alpes cookie shell, and the Centre-Val de Loire redirect. 403 challenge pages were not archived.
  - Elapsed regional next steps were rechecked without a result: the Hauts-de-France carpool strategy (5 October plenary; the agenda page shows no outcome) and the Mayotte port takeover (1 September). Both stay unresolved.
- **Recent-coverage check (FR):** exits 2. All five national channels are incomplete for 3–9 October; the National Assembly now misses only 9 October.

## Policy-question completeness gate

### Draft 2027 finance bill (AN No. 3210), new explanation, pending

- **Instrument and stage:** government bill tabled on 1 October 2026 (dossier PLF_2027) and referred to the finance committee. The defence committee gave its opinion on 7 October (No. 3279); the finance committee report is listed as No. 3291. No vote has taken place.
- **Sources (bill PDF):** Art. 2 (al. 24–37 brackets and amounts, al. 41–46 withholding tables, al. 48 CSG, al. 49–50 fuel allowance, al. 51–52 commencement); Art. 3 (pension sub-cap); Art. 4 (temporary gift relief); Art. 33 (commencement); Art. 74 (APL and activity-bonus freeze); Art. 78 (students' APL option, from 1 September 2027).
- **Current-law baseline:**
  - The current amounts are taken from the bill's own amending formulas (11,600 / 29,579 / 84,577 / 181,917; 4,439 pension cap per its exposé).
  - PASS 2026 of EUR 48,060 comes from the Urssaf ceilings page (archived).
- **Worked examples (tariff only, no décote or household shares):**
  - Taxable income EUR 30,000: the EUR 421 above 29,579 would move from the 30% band to the 11% band, saving about EUR 80.
  - A retired couple with EUR 60,000 of pensions: the deduction falls from 4,439 to 3,000, so taxable income rises by EUR 1,439.
- **Not explained individually:** Art. 5–32 business and sectoral measures (the gift relief is summarised in the rules only).

### Draft 2027 social security financing bill (AN No. 3211), new explanation, pending

- **Instrument and stage:** tabled on 1 October and referred to the social affairs committee. The dossier shows 1,608 amendments and no vote.
- **Sources (bill PDF):**
  - Art. 35: banding by total monthly pension at 1,260 / 1,265–1,281 / 2,000–2,034; default coefficient 1 if no decree by 31 October 2027.
  - Art. 37: one-year residence requirement, listed exemptions, latest start 1 July 2027.
  - Art. 6: termination payments capped at PASS.
  - Art. 7: value-sharing bonus.
- **Unresolved:** the Art. 37 exposé says holders of resident cards and of work-authorising documents are exempt, and it also mentions housing aid. The operative wording is complex, so the explanation says the final text prevails.

### Fuel allowance (prime carburant), new explanation, pending, `disputed`

- **Sources:** Service-Public A18926 (9 October), which states that the regulatory texts are not yet published and quotes the BOSS tolerance; and PLF Art. 2 III-A/B as the legal vehicle (EUR 1,000 fuel / EUR 600 electric, 2026 income only).
- **Conflict kept visible:** Service-Public still lists three eligibility situations, while PLF III-B disapplies paragraphs 2–4 of L.3261-3 for 2026 and the exposé says the allowance is open to all private-car commuters.
- **Separate measure:** the EUR 100 "grands rouleurs" aid (existing pending policy) was rechecked. A18903 is still "mis à jour le 5 octobre", no renewal text has been found and the simulator date is 12 October. The policy is unchanged.

### Adopted decrees explained through official explainers

- **Work-accident and occupational-disease daily allowance cap** (Decree 2026-909, A19080): from 1 November the cap falls from 0.834% to 0.226% of PASS.
  - The euro conversion (400.82 → 108.62 per day) is our own and is labelled as such.
  - The decree title speaks of an "annual" limit; this is flagged.
  - The related pending PLF Art. 2 changes (full taxation of these allowances and the end of the reduced CSG rate) are shown as an active proposal.
- **Non-exempting ALD sick-pay duration** (Decrees 2026-866/867, A19066): from 15 October the maximum falls from three years to one, with the transition rule spelled out. PLF Art. 2 (50% taxation of ALD allowances) is noted as pending.
- **Medical deductible and flat-rate contribution caps** (Decree 2026-858, A17166): each cap rises from EUR 50 to EUR 70 from 1 October. Mid-2026 accounting is not stated by the source and is not calculated.
- **Integrated heat-pump offer** (A19085): available since 1 October. The legal or contractual basis was not separately verified, and EUR 9,800 is the government's stated average.

## Grouping

- **New reviewed group:** `fr-additional-birth-leave-2026` contains A18750 (entry into force; existing record and explanation) and A19077 (DSN reporting from 1 October). Both concern the same leave, and the reporting change is an employer procedure.
- **Kept separate:**
  - The fuel allowance (PLF Art. 2) is a different measure from the grands-rouleurs aid.
  - PLF and PLFSS are separate bills; they are cross-referenced in text only.
  - The AT/MP decree and the ALD decrees are different instruments; they are cross-referenced to the pending PLF Art. 2.
  - A16807 (APL +1.15% from 1 October) and PLF Art. 74 (no 2027 adjustment) are mentioned in each other's text but not grouped, because they are different years and instruments.
- `npm run data:topics` reported no French candidates.

## Reader comprehension and translation

- **How each explanation was reviewed:** each was reviewed in Chinese and in English on its own, then compared for amounts, units, periods and stage.
- **Ambiguities checked:**
  - The AT/MP cap is the pay counted per day, not the allowance paid. No allowance amount is computed, because the rate is not in the archived source.
  - The deductible caps are amounts deducted from reimbursements.
  - Fuel allowance figures are tax-free ceilings, not amounts employees are owed (the allowance is voluntary).
  - Bracket figures are taxable-income thresholds.
  - Pension banding uses total monthly pensions on 31 December 2026.
  - Every proposal is labelled as not yet voted on.
- **Bindings:** 392 catalog entries were added (intake titles and notes, policy texts, scan notes, exclusion reasons, the topic title and the FR review note). Bindings cover the 7 new policies and 93 new intake records, and all report `current`.

## Validation

- `npm run data:select` passed (history, revisions, archived citations, scans).
- `npm test`: 216 passing. `npx tsc --noEmit --incremental false`: clean. `npm run build`: passed (291 policies, 2,859 evidence files).
- Recent coverage (FR) exits 2. This is a partial update, not a clean monitoring result.
- Browser interaction was not re-tested. The grouping, count and preservation regression tests passed.
