# German backlog round — 28 October 2026

Fourth German run of the day, after `2026-10-28-de-eu-213846` and `2026-10-28-tier2-topics-221818`. Owner request: reduce Germany's records awaiting explanation by explaining them. No new scan; coverage gaps are unchanged.

## Result

| | Count |
|---|---|
| Awaiting explanation before | 26 matters / 27 records |
| New explanations | 14 |
| Revised explanations | 1: fuel tax relief v3 → v4 |
| Reviewed as needing no explanation | 1 (BGBl. 2026 II Nr. 236) |
| New topic group | 1 (shipping regulation + its correction) |
| Superseding intake rows | 15 (note updated to "explained") |
| Newly archived sources | 6 (BGBl. 2026 I Nos. 70, 113, 114: notice page and PDF each) |
| Awaiting explanation after | 11 matters / 11 records |

No application code changed. Test changes: `tests/october-26-de-eu.test.ts` now follows superseded records and expects the 15 September issues to be explained; new `tests/october-28-de-backlog.test.ts`.

## Source-located review

All gazette texts were read from the archived PDFs of the 26 October backfill unless stated.

- **No. 275 Insurance recovery and resolution (VSAAG)** — read: contents; Art. 1 (VSAG) § 3 (BaFin is the resolution authority), § 12 (recovery plans, 6 + 6 months), § 46 (four objectives of equal weight), § 98 (write-down exclusions; para. 3 no. 3 allows premium and terms adjustment for substitutive private health/care insurance), § 127 (no creditor worse off); Art. 13: Art. 2 on 29 January 2027, Art. 1, 3–7 on 30 January 2027, Art. 11–12 on 1 October 2026, the rest the day after promulgation (1 October). Arts. 2–3 (VAG, Solvency II review) not read; stated in limits.
- **Fuel tax relief (`de-fuel-relief-2026`)** — the explanation said the gazette number was missing. Art. 11 of No. 275 inserts "1 October to 31 December 2026" next to "1 May to 30 June 2026" in § 68(1)–(4) EnergieStG and makes 1 July–30 September and from 1 January 2027 use the normal rate; Art. 12 does the same for § 109a EnergieStV. Added the gazette source, a published event and a correction event; `before` now notes the May–June period (its size not read). Status moved from the legacy text to `temporary` with `nextKind: expiry`. § 68 itself (BGBl. 2026 I Nr. 116) not read. Not grouped with the insurance matter: one Act, unrelated matters.
- **No. 280 MV deviating water law** — only the notice: LWaKüG M-V § 28(3), § 68(1) sentence 3, GVOBl. M-V 2026 p. 230, Art. 72(3) sentence 1 no. 5 GG, from 1 August 2026. State law not read; the explanation says the content is unknown.
- **No. 274 High Seas Dumping Act** — notice (in force 9 June 2026) plus the amending Act No. 70, newly archived: Art. 1 §§ 4, 5(5), 5a, 6a, 7(2), 8(4); Art. 2 commencement condition. BGBl. 2026 II Nr. 172 not read. No export agreement checked.
- **Nos. 254/255 Deutsche Post** — regulations Nos. 113 and 114 newly archived and read in full. Explanation keyed to No. 255, so it attaches to the existing `de-deutsche-post-successor-2026` group by identity. Pension payment service (§ 2 nos. 1, 3 PostAufgÜV) and civil servants (§ 2 DPAGPNUBestV). Pensioner-facing changes not checked; stated.
- **No. 268 BMVg fees** — §§ 1–5 and Annexes 1–3 in full. No comparison with previous fees; stated.
- **No. 259 IOP governance** — full text: Annex 1 nos. 003 (deadline 31 December 2026) and 004 (30 September 2027). Guide 1.3.0 not read. `nextDate` set to 31 December 2026 as `deadline`.
- **No. 256 DORA audit reports** — full text; first applies to financial years beginning after 31 December 2024.
- **No. 257 Shipping red tape** — Art. 1 §§ 4, 5, 12; Art. 2 § 64; Art. 4; Art. 6 (Kiel Canal dues, from 1 January 2027; deleted provisions not read); Art. 8. Grouped with correction No. 284, which explicitly corrects this regulation; both explanations stay accessible.
- **No. 250 Procurement** — full text: only the referenced VOB/A edition changes (BAnz AT 24.08.2026 B6). VOB/A 2026 not read; stated.
- **No. 247 EUTB** — full text; in force on the first day of the quarter after promulgation (4 September) → 1 October. No date for the next funding period, so no deadline computed.
- **Nos. 244–246 Further-training exams for law-office staff** — §§ 1–3, transition and commencement of each. No. 244 replaces the 2001 Rechtsfachwirt regulation (expired end of 2 September; old exams to 31 December 2029; registration by 31 December 2026 under old rules on request). Nos. 245 and 246 have no transition provisions. Kept as three explanations, not one group: separate qualifications, admission rules and levels.
- **No. 243 Wine** — Art. 1 contents, §§ 1, 31; Arts. 5–6. Amendments to the Wine Regulation and Wine Promotion Regulation not read; stated.
- **BGBl. 2026 II Nr. 236** — exchange of notes of 4 April 2024 establishing GIZ and KfW offices in Beirut. Dismissed: no rights or obligations in Germany.

## Reader checks

- Each language read on its own and compared for dates, amounts, stage and scope. Amounts name their role: museum prices per person, hourly rates for services, funding per post per year, fees per approval.
- The insurance explanation says ordinary policies do not change and resolution applies only in a crisis; exclusions and the premium-adjustment power are both stated, so it neither overstates nor understates protection.
- Pending or future steps (insurance main commencement, ePA deadlines, Kiel Canal dues, wine reporting) are scheduled events, not presented as done.

## Still awaiting explanation (11)

- Cabinet 63 TOP 1-05, 1-06, 1-07 (biomass sustainability and two IED regulations), 1-13 (DRV Bund budget 2027); cabinet 62 TOP 1-01, 1-02, 1-03 and the shipping action plan: the results page lists titles only; drafts not obtained in this run.
- Bundestag week 45: skilled immigration debate, ICC motion, swimming motion: not fetched in this run.

## Follow-up

- 31 December 2026: ePA practice/hospital/pharmacy deadline; fuel relief ends; last day to register under the old Rechtsfachwirt rules.
- 1 January 2027: Kiel Canal dues amendment. 29–30 January 2027: insurance resolution Act.
