# France and UK update — 23 October 2026

## Scope and result

Owner request: one update round for the UK and France, after the same-day Germany/EU run. Scope is national channels: France `FR` (regional channels not scanned) and the UK `GB` channels, with Welsh and Northern Ireland instruments found through legislation.gov.uk. Window: 16–23 October for France and 14–23 October for the UK, continuing from each channel's last scan. 23 October is the current day. Every scan is `partial` or `blocked`; `data:coverage` exits 2.

| Change | France | UK |
|---|---|---|
| New explanations | 7 | 8 |
| Revised explanations | 1 (social security bill v2 → v3) | — |
| New intake rows | 10 | 50 (49 instruments + 1 HMRC) |
| Topic groups | — | 1 (`gb-trade-union-workplace-access-2026`) |
| Disposition groups | 1 | 4 |

No application code changed. New regression file: `tests/october-23-fr-gb.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| Service Public (individuals) | Homepage items dated 16–23 October read one by one. New: A15386, A19095, A19101, A19103 (explained), A14389 and A19097 (reminders, dismissed). Excluded with reasons: A15186 (mushrooms), A19096 (court ruling explainer), A15263 (winter time). Items already recorded (rent index, Agirc-Arrco, fuel aid, cadmium and others) were not duplicated. |
| Service Public Entreprendre | First page, 16–23 October: A19104 and A19098 explained; A17731 (Cybermois) and A19100 (court prevention service) excluded. The Net-entreprises redesign (A19076, updated 22 October) is an interface change and was not recorded. |
| Senate, promulgated laws | One new law: no. 2026-95 of 21 October (Official Journal 22 October). |
| National Assembly | Only the PLFSS and PLF files were checked. PLFSS rejected on 23 October (T.A. no. 358); the PLF first part is still in plenary. |
| AMF | Rendered list: nothing after 14 October. |
| Légifrance | HTTP 403; recorded as `blocked`. |
| legislation.gov.uk | `/new/all/<date>` for 14, 15, 16, 19, 20, 21 and 22 October: all 49 instruments recorded with territory (GB, GB-WLS, GB-NIR). The Scotland pages returned an abnormally short response (1,874 bytes), so no day is marked complete. The 21 October Act listing is a 2025 c. 36 correction slip only. |
| GOV.UK | HMRC news only: one reminder (23 October). General news (dozens a day) was not inventoried. |
| UK Parliament bills | HTTP 403; recorded as `blocked`. |
| Devolved government and parliament channels | Not scanned (Welsh and NI instruments were reached through legislation.gov.uk). |

## Source-located review

### FR — 2027 social security financing bill (policy-question completeness gate)

- **What changed:** the National Assembly rejected the bill at first reading on 23 October. Source: the Assembly file `PLFSS_2027` and T.A. no. 358, also listed in the Senate file `plfss2027`.
- **What still applies:**
  - Constitution Article 47-1, read on the Constitutional Council site: 20 days for the Assembly and 15 for the Senate, then the Article 45 procedure. If Parliament has not decided within 50 days, the provisions may be implemented by ordinance.
  - The current law described in the existing `before` field (full indexation of basic pensions on 1 January) is unchanged.
- **Reader text:**
  - The rejection does not end the reform question; the Senate continues.
  - The 50-day rule is stated without computing a date.
- **Unresolved:** the vote count, article votes and amendments were not read. No official statement was found on which text the Senate will examine; this is said in the limits and nothing is inferred.
- **Record:** v3. Phase `pending`; `nextDate` cleared; the earlier "20 October plenary" event is retained.

### FR — new explanations

| Record | Source | Notes |
|---|---|---|
| PASS 2027 | SP A15386 (citing BOSS) | EUR 48,900/yr, 4,075/month, 224/day; order not yet published, so `pending`. Example: EUR 60,000 salary, EUR 11,100 above the cap not counted for capped contributions. |
| AAH/ASS combination | SP A19095 | 10-year transition ends 31 December 2026; `temporary` with `nextKind: expiry`. |
| Riot short-time work | SP Entreprendre A19104 | Announced 20 October; 60% / 100% at SMIC; full State coverage under 250 employees; 30-day application; URSSAF deferral up to 12 months. The legal basis of the "exceptional aid" was not verified. |
| Decarb Flash Artisan | SP Entreprendre A19098 | 20–50%; EUR 5,000–200,000; open 30 September 2026 – 15 June 2027. The page's "at least 11 employees" clashes with the micro-enterprise definition and is flagged, not corrected. |
| School questionnaire | SP A19101 | From 2 November; decree of 14 October not read (403). |
| Survivor's pension | SP A19103 | Pre-filled form; conditions and limits restated; `existing`. |
| Law no. 2026-95 | Senate file and plain-language summary | Text not read (403); the summary describes the Senate text, adopted identically by the Assembly on 12 October. |

### UK — new explanations (each from the instrument PDF)

| Instrument | Key provisions checked |
|---|---|
| S.I. 2026/1101 | Regs 3–5: 15/25/55 (70) working days. Reg 7: fewer than 21 workers → refuse. Regs 23–24: 2-day (first visit 5-day) notice. Reg 25: GBP 75k / 150k / 500k. In force 30 October. Grouped with S.I. 2026/1103 (code of practice, same day). |
| S.I. 2026/1099 | All detriment prohibited; pay deductions unaffected; in force 30 October. |
| S.I. 2026/1082 | Loans and living accommodation become payrollable from 2027/28; in force 5 November. |
| S.I. 2026/1085 | EDMO vacancy period back to 6 months from 2 years; only applications from 5 November. |
| S.I. 2026/1092 | Nursery Milk Scheme extended to childminder-agency providers; 12 November (reg 10 from 1 April 2027, not checked). |
| S.I. 2026/1107 | South West Grid for Learning Trust (Revenge Porn Helpline) designated; 12 November. |
| S.R. 2026/181 | Abuse Redress Measure payments disregarded; in force 31 October or the later commencement of the Measure's section 12, not verified, so `effectiveDate` is null. |
| S.R. 2026/182 | No double payment with HSC Trusts; 1 December. |

**Not explained (20 awaiting), for example:**

- S.I. 2026/1096 teachers' pay: the pay figures are in a separate document this run did not read. A regression test keeps it from being dismissed.
- Building control charges (1094).
- Commencement orders (1090, 1105, W.S.I. 128, S.R. 180).
- Financial instruments (1115–1117).
- Welsh vape age-of-sale notices: W.S.I. 124, whose PDF returned 404.

**Grouping candidates from `data:topics`:**

- Earlier commencement orders of the same Acts (Crime and Policing Act 2026; Levelling-up and Regeneration Act 2023) cover different provisions, so they are not merged.
- The PLFSS rejection record shares the bill identifier with the existing explanation.

## Reader comprehension check

- **What each amount is:**
  - The PASS is the income counted, not a contribution.
  - The 60% short-time pay is of gross pay.
  - The UK penalties are maxima per CAC order.
  - The Child Funeral Fund example shows the remainder calculation.
- **Stage:**
  - The PASS stays `pending` until the order is published.
  - The PLFSS stays `pending` despite the rejection, with the remaining procedure explained.
  - UK instruments carry their own commencement dates.
- **Examples:** each is marked hypothetical.
- **Each language:** read standalone, then compared for amounts, dates and stage.

## Gaps

- **France:**
  - Légifrance is blocked (403), so decrees cited by Service Public were not read.
  - The French regional channels were not scanned.
  - National Assembly files other than PLFSS and PLF were not scanned.
- **UK:**
  - The Parliament bills site is blocked (403).
  - GOV.UK general news was not inventoried.
  - The Scottish legislation pages could not be confirmed, and the devolved government and parliament channels were not scanned.
  - The 2026 Budget is due on 28 October.
- **Not re-reviewed this run:** France's elapsed regional dates (FR-IDF, FR-974, FR-HDF application openings) and the elapsed national deadlines (property tax, payroll tax).

## Validation

These all pass, with logs in this directory:

- `data:topics`
- `data:select`
- `npm test`: 337 tests
- `tsc`
- `npm run build`

All 16 new or changed policies and 60 intake rows are `current` in `dist/data/FR.json` and `dist/data/GB.json`.
