# United States update — 23 October 2026

## Scope and result

Owner request: update the United States as completely as possible. Scope is the whole US registry: seven federal channels and the 51 state/DC portals. Windows continue from each channel's last scan: Federal Register 9–23 October, White House 1–23 October, public laws 1 September–23 October, IRS 20–23 October, Congress and state portals 9–23 October. 23 October is the current day. `data:coverage -- data/store US` exits 2: most channels remain incomplete.

| Change | Count |
|---|---|
| New explanations | 32 (23 federal, 9 state) |
| Revised explanations | 3: GENIUS Act v1 → v2, premium tax credit v1 → v2, diesel relief v2 → v3 |
| New intake rows | 180 (93 Federal Register, 11 White House, 32 public laws, 4 IRS, 40 state) |
| Scan rows | 58, including the first two complete US scans (White House 1–22 October; IRS 20–22 October) |
| Topic groups | 3 new, 2 extended |
| Disposition groups | 4 |

No application code changed. New topic label `关税` mapped to `tax` in `data/areas.json`. New regression file: `tests/october-23-us.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| Federal Register (govinfo FR) | Official API, publication dates 9–23 October: 108 final rules, 66 proposed rules, 9 presidential documents, each classified. 93 recorded (including 3 presidential notices); 84 excluded with per-category reasons (24 airworthiness directives, 17 fishery actions, 16 Coast Guard zones, 13 airspace/route changes, 10 state plan approvals, 3 device classifications, 1 TV allotment); 6 presidential documents excluded as duplicates of the White House records. Notices were not inventoried, so `partial`. |
| White House presidential actions | Listing ordered by date. All 11 items of 1–22 October opened and recorded (the 5 October diesel order was already recorded): `complete`. 23 October (Canada vehicles proclamation) `partial`. The three national emergency continuation notices in the 19 October Federal Register are not in this listing and were recorded from the Federal Register channel. |
| Public laws (govinfo PLAW) | The web page is a script shell; the GovInfo and Library of Congress APIs were used. Public Laws 119-103 to 119-124 (2 September–15 October) recorded. |
| Congress | congress.gov returns 403. Through the Library of Congress API: Public Laws 119-125 to 119-134, signed 20 October, recorded with the GovInfo enrolled-bill PDFs (the public law prints are not yet on GovInfo). H.R. 3633 (CLARITY) has no action after 15 September, so its explanation is unchanged. |
| IRS newsroom | Current-month list: IR-2026-125 to 127 (20–22 October) opened and recorded, `complete`; IR-2026-128 (23 October) `partial`. The 2027 inflation adjustments are still not published. |
| US Code, eCFR | Not scanned. |
| State governor news pages | First list page read for 37 jurisdictions; 14 (AK, AZ, CO, KS, KY, MI, NH, NY, OR, RI, SC, TN, TX, WI) returned 403/access denied, also when rendered in local Chrome as an anonymous visitor: `blocked`. In 9 readable states (IN, LA, MN, MT, NJ, OH, PA, SD, WY) the list is script-loaded or undated and no item for the window could be identified. 253 dated items parsed in 28 states: 40 recorded, the rest excluded with reasons (appointments, commemorations, named-project grants, statistics, statements on litigation, reminders, hurricane situation updates, navigation links, site notices). |

Rendered pages (`npm run data:render`) are listed in `fetch-ledger.json` as discovery evidence only; no policy cites a render.

## Source-located review

### Revised

- **GENIUS Act (v2).** FR Doc. 2026-21706 (OCC final rule, 23 October), “DATES” and the effective-date discussion: because this is the first final rule from a primary federal regulator and 120 days after it is later than 18 January 2027, the Act and the rule take effect on 18 January 2027. The date is unchanged but no longer inferred; a correction event says so. § 15.12: redemption within two business days, notice and extension above 10% of a brand in 24 hours. § 15.10(c)(4): no interest or yield for holding. Federal Reserve (2026-19860/19899), FDIC, NCUA and Treasury § 3 rules remain proposals; the reader text says the OCC rule covers only its own issuers. FR 2026-21706 added to `us-genius-act-implementation-rules`, which now links the explanation.
- **Premium tax credit (v2).** FR Doc. 2026-21056 (REG-101576-26): comments and requests to speak by 30 November, telephone hearing 8 December. Section V: the eligible-alien limit (OBBBA § 71301) applies to tax years beginning after 31 December 2026; section VII: the repayment cap was removed (§ 71305) for tax years after 2025; pre-enrollment verification (§ 71303) for tax years after 2027. The statutory categories of “eligible alien” (§ 36B(e)(2)(B)) are not listed in the notice and were not checked; the limits say so. Grouped with IR-2026-121 as `us-premium-tax-credit-2027`.
- **Diesel relief (v3).** IR-2026-125: no challenge to failures to file Form 720, report or keep records solely for § 4041(a) liability from dyed diesel used 1 October–31 December; no catch-up filing; residual-dye grace period under consideration. Added to the existing diesel group. The White House order page was re-archived; its operative text is byte-for-byte identical in extracted text to the earlier snapshot.

### Policy-question completeness gate

- **Graham Act.** Public Law 119-111 (signed 18 September) provides 500% duties on Russian goods and 100% on top buyers/facilitators; the 16 October order § 4 waives all duties under §§ 112–113 and the listed sanctions provisions, leaving earlier Russia sanctions in place. Title and impact say the duties are not collected; the waiver has no end date.
- **ROAD to Housing Act § 1001.** Statute (PL 119-101 § 1001(a), (b), (d), (f)): 350-home threshold, statutory exceptions, no forced sale, penalty up to USD 1 million or 3× price, effective 180 days after 11 July 2026 = 7 January 2027, repeal after 15 years. Treasury's FR 2026-21675 is a proposal (comments 23 November) and by statute cannot change the threshold or exceptions. Card: adopted statute with the proposal as next step.
- **Housing costs order.** Every measure is conditional on the FHFA head's determination; no pilot start or rate cut size is set. Card stays adopted with no effective date; next step is the 180-day task force deadline (20 April 2027).
- **Wind turbine § 232.** The proclamation imposes no tariff (items (1)–(5) only negotiations, a report within 180 days and monitoring; existing § 232 tariffs unchanged). Title says so.
- **Canada vehicle duties.** Effective 30 October; Annexes I/II not read, so no products are named.
- **Florida Amendment 3.** Sourced only from the governor's campaign release; the ballot text, vote date and threshold could not be read (Florida elections site 403). Kept `pending`, `disputed`, no next date.
- **EAD automatic extension.** The change has applied since 30 October 2025 (IFR); the 14 October final rule confirms it unchanged. Effective date 30 October 2025 with an explanation.
- **Clergy and Romance Scam Acts.** Signing (20 October, PL 119-125 and 119-129) is from the Library of Congress API recorded in the fetch ledger; the cited evidence is the enrolled bill. Clergy Act window: second tax year beginning after 31 December 2028 (2030 for calendar-year taxpayers, stated as an interpretation). Romance Scam Act effective one year after enactment (20 October 2027).
- **State diesel measures.** VA (ED 5, 16 October–31 December, state tax still payable via DMV), WV (60-day emergency from 20 October; the release's 20.5-cent saving and “fuel excise tax remains in effect” are both reported without inferring which applies), MO (EO 26-20 until 31 December), NV (conditional on the federal relief, continues for an unspecified period). Each is a separate state instrument and is not grouped with the federal matter.

Other new explanations: refugee termination notice (10 days), USCIS deference removal (proposal), immigration civil penalties final rule, SNAP chip/tap EBT proposal, OPM time-in-grade and administrative leave, CFTC gambling exclusion (IFR) with the event contract proposal grouped, IRS card payments, SSA identity theft contact (effective 5 April 2027), FY2027 continuing appropriations (§ 106: until 11 December 2026), IRS EPCRS/ICRS (ICRS 1 May 2027), Medicare CAA 2026 proposal, postal formal-entry compliance date (20 January 2027), FDA salt substitutes, women's health order, Maryland chip EBT results, Delaware note on the federal USD 500 Marketplace refund (federal legal basis not found), Connecticut CEAP supplement, Virginia Premium Savings.

### Grouping and dispositions

- New groups: `us-premium-tax-credit-2027`, `us-graham-sanctions-act-2026`, `us-cftc-swap-definition-2026-10`. Extended: `us-genius-act-implementation-rules` (+FR 2026-21706, explanation link), `us-diesel-emergency-relief-2026` (+IR-2026-125).
- `data:topics` candidates left separate: NRC AP1000 final rule 2026-21030 and proposal 2026-21031 (companion status not read), two DOJ Privacy Act proposals 2026-21060/21063 and two PRC “Periodic Reporting” notices 2026-20865/21000 (different dockets not checked). The Maryland EBT results and the federal SNAP proposal are different jurisdictions and stay separate.
- Dispositions: four White House commemorations; IR-2026-127/128 reminders; three national emergency continuations; twelve naming/land/memorial laws. PL 119-108 (disaster casualty losses), the Lisa Cook inquiry and other recorded items remain awaiting explanation.

## Reader comprehension check

- **Amounts:** the ROAD Act penalty is a maximum per violation; the Florida USD 2,500 and the West Virginia 20.5 cents are labelled as the governors' estimates; the Connecticut USD 93,681 is a gross-income eligibility limit for a family of four; the PTC example separates the excluded premium share from full repayment of excess advance credit.
- **Stage:** proposals (USCIS, SNAP, CFTC event contracts, Medicare, ROAD rules, PTC rules) are pending or shown as the next step; IFRs are adopted with comment deadlines; the Graham Act and the wind proclamation are adopted but explicitly without the duties.
- **Examples:** all marked hypothetical; Chinese and English were read separately and compared for amounts, dates and stage.

## Gaps

- Federal Register notices; US Code and eCFR; congress.gov (403) beyond the API checks.
- 14 blocked state portals; 9 readable but script-loaded state lists; only the first list page elsewhere; no state legislature, agency or gazette channels.
- Federal records still awaiting explanation, including PL 119-108, the Lisa Cook inquiry, the DPA petroleum determination, the GHG reporting extension, TCE and RFS proposals, and the Canada annexes.
- Not re-reviewed: earlier state application deadlines (ND LIFT 9 November, HI 23 November, CT SBA 1 December) remain future-dated; the scholarship tax credit 1 December step.
- Social Security COLA 2027 and Medicare Part B 2027 premiums: SSA pages returned 403; CMS was not checked.

## Validation

These pass, with logs in this directory: `data:topics`, `data:select`, `npm test` (345 tests), `tsc`, `npm run build`. All 35 new or changed policies and 180 intake rows are `current` in `dist/data/US.json`.
