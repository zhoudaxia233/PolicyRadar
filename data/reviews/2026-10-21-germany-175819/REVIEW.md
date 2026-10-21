# Germany federal update — 21 October 2026

## Scope and result

Owner request: one German update round to see what is new. Scope is the nine federal (`DE`) channels. Window: 18–21 October for the ministries and the Bundestag; 14–21 October for the Federal Law Gazette, where Part I issues 290–294 had been missed in earlier runs. 21 October is the current day and is not closed. State channels were not checked. Every scan is `partial`, and `data:coverage` exits 2 (see coverage.log).

| Change | Count |
|---|---|
| New explanations | 20: 19 Federal Law Gazette acts, plus the 2026 Annual Tax Act bill |
| Revised explanations | 3: tobacco tax v3 → v4, oil reserve release v2 → v3, PNOG v2 → v3 |
| New intake rows | 39: 21 gazette issues, 11 cabinet items, 7 Bundestag previews |
| New topic groups | 4: oil release, Annual Tax Act, Foreign Trade Regulation, care structure commission |
| Extended topic groups | 2: tobacco gets BGBl 309; PNOG gets two documents |
| New disposition entries | 2 |

No application code changed. Two test changes:

- New regression file: `tests/october-21-germany.test.ts`.
- `tests/topics.test.ts`: the PNOG search test hard-coded two progress records. It now compares against the matter's reviewed record count, because later steps legitimately add records.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de, BGBl I | Issues 290–313 read issue by issue, with the PDF text of each. Issues 295–297 were already recorded. Part II was not scanned. |
| Federal cabinet | **62nd session (14 Oct):** the results page (rendered) was not in intake before this run; its items without debate were added. The sugary-drinks tax and the youth-media key points were already recorded. **63rd session (21 Oct):** no results were published when checked (news list rendered; latest items are the Investment Summit and the Berlin Global Dialogue). |
| Bundestag | **Weeks 43–44:** no sittings. **Week 45 (4–6 Nov):** previews published on 19 October were recorded. Question time and government Q&A pages were not recorded. |
| BMAS | Nothing after 13 October on page 1 of the press list. |
| BMG | Nothing after 15 October. |
| BMF | Only a commemorative stamp notice (19 Oct), excluded with its reason. |
| Bundesrat | The 1070th session agenda is not yet published (HTTP 404). |
| Monthly new-rules index | Not scanned. |

## Source-located review

### BGBl 2026 I Nr. 307 — child benefit without an application

- **Source:** EStG §§ 64(4), 67(1)–(2), 68(7) and 69, all new; Art. 4 sets commencement on 1 January 2027.
- **Current law:** EStG § 67 (gesetze-im-internet) requires a claim.
- **When a claim can be waived:** the family benefits office *may* waive it when the BZSt issues a tax ID because of a birth (§ 69 sentence 3). The notice date then replaces the claim date.
- **Benefit amount:** unchanged.
- **Not covered:**
  - children who move to Germany after birth;
  - adoptions;
  - parents who are not registered with the child.
- **No transitional rule** for births around the turn of the year. This is stated in the explanation rather than inferred.

### BGBl 2026 I Nr. 306 — DTZ B1 rule

- **Before and after:** compared with the current IntTestV § 10(1).
  - Before: speaking B1, plus B1 in either listening/reading or writing.
  - New: the remaining part must also reach at least A2.
- **Commencement:** 1 November 2026.
- **No transitional clause.** The explanation states that BAMF has not confirmed how certificates already issued are treated.

### BGBl 2026 I Nr. 309 — tobacco tax (existing matter)

- **Publication:** Signed 19 October, published 20 October, in force 21 October (Art. 3). The stage changes from "awaiting publication" to `phased`, with `nextDate` 2027-01-01.
- **Rates:** The yearly cigarette rates in the published text match the committee version already explained (21/8605).
- **Cigars and pipe tobacco:** The text keeps lower rates in January–February 2027; higher rates apply from 1 March. This confirms the earlier Bundestag statement.
- **Example:** The existing 2026 and 2027 example is unchanged and still valid.

### BGBl 2026 I Nr. 312 — oil reserve release (existing matter)

- **Legal text:** The only operative rule is that the oil stockholding agency may temporarily reduce its stock days from 90 to 82.
- **Commencement:** In force 22 October.
- **19.5 million barrels:** This figure comes from the Bundesrat submission, and the explanation now says so.
- **End date:** The regulation gives none.

### 2026 Annual Tax Act bill (new explanation; policy-question gate)

**Sources**

- BR-Drs. 447/26 (government bill of 14 August):
  - cover summary;
  - Art. 3 Nos. 6–7: EStG § 32(6) sentence 4 and § 33a(2) sentence 2;
  - application rules for open cases;
  - AO § 238(1a) as amended: 0.15% a month until 31 Dec 2026, then 0.3%;
  - transitional rule: applies to interest arising after 31 Dec 2026;
  - explanatory memorandum p. 95, citing the CJEU in C-328/20.
- Bundestag Finance Committee hearing page: hearing on 2 November covering 21/8283 and 21/3025.

**Current-law baseline**

- AO § 238: interest of 0.15% a month.
- EStG § 32(6) sentence 4: allowances are reduced for all children resident abroad.

**Stages**

| Instrument | Stage |
|---|---|
| Government bill BT 21/8283 | First reading 8 October, recorded earlier inside the income-tax debate record. The bill itself had no separate record before this run. |
| Cabinet formulation aids (14 Oct) | Two aids approved. Their content is not public and was not read. |
| Final vote | Reported as 13 November by secondary sources only; not used. |

**Leads not read, and stated in the reader text**

- the Bundesrat opinion;
- the AfD bill 21/3025 on the Fiscal Code;
- the formulation aids.

**Example:** a refund of EUR 2,000, interest running for 6 months: EUR 18 under current law, EUR 36 under the bill.

**Scope limits stated for the reader**

- Children outside the EU/EEA still receive the reduced allowance.
- Child benefit is unaffected.

### Other gazette acts

- Each explanation is based on the issue's own PDF. Where the text is long, only the provisions named in the source note were read:
  - 304: industrial emissions, about 50 pages;
  - 310: vehicle approval;
  - 311: farmer training;
  - 300: Foreign Trade Regulation annex.
- The limits field of each explanation says this.
- **BGBl 290, § 14(2):** the text reads "after 31 October 2026 and until 31 March 2026". This is contradictory. It is quoted and not corrected.

## Grouping and dispositions

**New topic groups**

| Group | Evidence |
|---|---|
| `de-oil-reserve-release-2026` | Same title. BR-Drs. 583/26 is the draft and BGBl 312 the published text. No explanation link is needed, because the draft record already carries the explanation's identity. |
| `de-annual-tax-act-2026` | The two cabinet formulation aids name the Annual Tax Act 2026 explicitly. |
| `de-foreign-trade-regulation-23` | The cabinet draft and BGBl 300 have the same title, and both are dated 14 October. |
| `de-care-structure-commission-2026` | The cabinet decision, linked to the existing BMG-based explanation. |

**Extended groups**

- Tobacco: BGBl 309 added.
- PNOG: the cabinet's NKR follow-up and the week-45 first-reading preview added.

**Dispositions**

- Two cabinet reports: the 2025 report on deleting child sexual abuse content, and the Youth Protection Act evaluation.
- The agreed NSU debate.

**Left awaiting explanation, as an honest backlog**

- the two budget counter-statements;
- the lizard-protection administrative rule;
- the climate-friendly shipping action plan;
- the Irini and Sea Guardian mandate extensions;
- the Green motions on skilled immigration (21/6346, 21/2248), the ICC (21/8562) and swimming.

`data:topics` reports no candidates involving the new records.

## Reader comprehension check

- **What each amount is:**
  - Kindergeld: the six-month back-payment limit is explained as the reason the notice date matters.
  - DTZ: a hypothetical score set (B1/B1/A1) shows the result before and after.
  - Tax interest: the 0.15% and 0.3% rates are monthly rates on the refund or back-tax amount. The example shows the input, the calculation and the result.
  - Enforcement flat fee (EUR 6): a charge between public bodies, not a debtor fee.
  - BA pension-fund percentage: no base is stated, so no amount is estimated.
- **Legal stage:** proposals are never worded as law. The Annual Tax Act is `pending`, with the cabinet amendments described as unpublished.
- **Each language:** read standalone and then compared for the same dates, rates, scope and stage.

## Gaps

- Every channel is partial. The monthly new-rules index and BGBl Part II were not scanned. Neither were the state channels.
- The results of the 21 October cabinet meeting were not available yet.
- Nine intake records remain awaiting explanation (listed above).

## Validation

These all pass, and their logs are in this directory:

- `data:topics`
- `data:select`
- `npm test`: 310 tests
- `tsc`
- `npm run build`

All 23 changed or new policies and all 39 intake rows have `current` English bindings in `dist/data.json`.
