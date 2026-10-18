# EU update and backlog explanations (EU, Germany) — 18 October 2026

## Scope and result

Owner request: update the EU, then resolve part of the EU and German records awaiting explanation. Builds on the same-day run `2026-10-18-de-fr-it-144322`.

**EU, Official Journal 12–16 October**

- All 217 L- and C-series items were recorded as intake.
- Each issue is reconciled item by item, so each day has a **complete** scan.
- 10, 11 and 17 October showed no new issue; those days stay partial.
- 13 new explanations and 4 updated explanations.
- 199 items were reviewed as needing no explanation, in 16 disposition groups.

**EU backlog.** Linking the existing ESMA-supervision explanation to the two Council presidency notes brings records awaiting explanation to **0**.

**Germany**

- 20 new explanations: 16 Bundestag motion matters, Hamburg's inheritance-tax position, and Bundesrat motions 598/26, 599/26 and 600/26.
- 5 records reviewed as needing no explanation.
- Records awaiting explanation fell from 35 to 10.

No application code was changed.

- New regression test: `tests/october-18-eu-review.test.ts`.
- `tests/topics.test.ts` query changed from `PRIMA` to `Mediterranean Area (PRIMA)`. New journal titles legitimately contain "prima facie" and "PRIMARY"; the test's intent (finding original and translated titles) is unchanged.

## Evidence route

EUR-Lex document and PDF URLs return empty HTTP 202 responses to a plain client. No access restriction was bypassed.

- **Daily listings.** The OJ daily views were rendered with `npm run data:render`. They are recorded as rendered discovery evidence only (see `fetch-ledger.json`).
- **Legal texts.** These were obtained from the Publications Office, publisher of the Official Journal: `https://publications.europa.eu/resource/oj/<ID>` with `Accept: application/xhtml+xml`. The server redirects to the Cellar manifestation (`…/DOC_1`), which is fetched over https and archived byte for byte.
- **Repaired check.** The Council press-release PDF for the pharma package had a 403 on its last check (8 October). It was refetched successfully and its check updated.

## Source-located review

### Sanctions

Each matter is grouped as decision plus regulation.

| Matter | Acts (OJ) | Key point |
|---|---|---|
| Ukraine integrity, Russian military-industrial complex | Decision 2026/2279, Regulation 2026/2281 | Recitals 4–5: 826 entities and 743 executives, taken from the Russian government's own list of subsidised military-industrial firms. In force from publication on 12 October. |
| Ukraine integrity, Duma elections in occupied territories | Decision 2026/2291, Regulation 2026/2292 | 77 people |
| Ukraine integrity, 15 October listing | Decision 2026/2332, Regulation 2026/2333 | 3 people and 9 entities |
| North Korea | Decision 2026/2283, Regulation 2026/2278 | 3 people and 4 entities. Recitals cite DPRK–Russia cooperation |
| Libya | Decision 2026/2242, Regulation 2026/2259 | Deletes the high-seas inspection provisions after UN Security Council Resolution 2292's authorisation lapsed on 25 May 2026. The arms embargo stays |
| Nicaragua | 2026/2272 and 2026/2271 | Extended to 15 October 2027 |
| Niger | 2026/2277 | Extended to 24 October 2027 |
| Chemical weapons | 2026/2286 | Framework to 30 October 2031, listings to 30 October 2027 |
| Belarus | 2026/2312 and 2026/2313 | Two people delisted |
| Guinea | 2026/2317 and 2026/2318 | Extended to 27 October 2027; two people delisted |

### Return Regulation (EU) 2026/2280 (updated explanation)

- **Dates (Art. 50).** In force 16 October 2026. Listed provisions apply from 16 October 2026; the rest from 17 October 2027. Directive 2008/115/EC is repealed from 17 October 2027 (Art. 49).
- **Before/after**, against the archived Directive 2008/115/EC:

  | | Directive 2008/115/EC | Regulation 2026/2280 |
  |---|---|---|
  | Entry ban | In principle up to 5 years (Art. 11(2)) | Up to 10 years, exceptionally 20 (Art. 8(8)) |
  | Detention | 6 months plus up to 12 more (Art. 15(5)–(6)) | 12 months, extendable to 24, plus up to 6 more (Art. 30) |

- Return arrangements with third countries are in Art. 14 and Art. 3(3)(g); security risks in Art. 13.
- **Scope.** Denmark does not take part and Ireland is not bound (recitals 67–68). The Schengen associates' decisions were not checked. Holders of valid residence permits are outside the scope (Art. 2).

### Pharmaceutical reform (updated, still pending)

- **Sources.** Council statements of reasons C/2026/5270 (directive), paragraphs 12–20, and C/2026/5272 (regulation), paragraphs 12–21.
- **Content.**
  - 8 years of data protection, up to 11 years in total (12 with a voucher).
  - A member state can request market supply; market protection there lapses after 3 years if the request is not met.
  - Orphan exclusivity: 9 years, or 11 for breakthrough orphan medicines.
  - Supply disruptions must be notified at least 6 months ahead.
  - All antimicrobials become prescription-only.
  - Marketing authorisation review is capped at 180 days.
  - General transition period: 24 months.
- **Stage.** These are Council first-reading positions; Parliament's second-reading vote is needed. The SANT committee chair's letter indicates acceptance without amendment, but that is not a vote.

### Other EU explanations

- **AI Act harmonised standard.** Decision 2026/2274 publishes EN 18286:2026 (quality management) and creates a presumption of conformity under Art. 40. The standard itself is sold by CEN/CENELEC and was not read. AI Act application dates are not changed by this act.
- **Mobile driving licences.** Implementing Regulation 2026/2266 is in force from 3 November (Art. 10).
  - Under Directive 2025/2205, Art. 29, member states apply the directive from 26 November 2029.
  - Mobile licences become the default 54 months after the "first" relevant implementing act.
  - Whether this regulation is that first act was not confirmed, so no default date is calculated.
- **SIS Union-interest alerts.** Decision 2026/2284, Art. 1: alerts may be entered from 15 October 2026.
- **Updated: tax-haven list.** Conclusions C/2026/5413, Annex I, match the existing explanation (8 jurisdictions).
- **Updated: pig and poultry operating rules.** The OJ publication (2026/2260) of the existing C(2026) 6899 explanation was added to its group.

### Germany

| Group | Motions and outcome |
|---|---|
| Rejected → `closed` | Citizens' assembly 21/8189 (8 Oct); four Green food motions (8 Oct); Green biodiversity motion 21/8144 (16 Oct) |
| Mixed | AfD care motion 21/1549 rejected; 21/8553 referred |
| Dropped from the agenda | Gold storage 21/4739 (14 Oct); Green trade defence (15 Oct) |
| Referred → `pending` | Colonial history; family support; gas storage and coal; publishers' prize; electric-vehicle privileges; migration; home ownership and local land; Uniper/SEFE re-privatisation; memorial culture; organised crime |

Every motion explanation states that a motion changes no law by itself.

- Each explanation's `officialId` equals the record URL, as identity rules require for unnumbered Bundestag pages.
- **Hamburg.** Senate press release of 13 October. The Federal Constitutional Court hearing took place on 12–13 October; no judgment yet. Hamburg's EUR 857 million figure is marked as Hamburg's claim.
- **Bundesrat motions, all referred to committees on 16 October.**
  - 598/26, energy-price relief. The federal "direct payment mechanism" it mentions was not found in a federal legal text and is labelled as such.
  - 599/26, pension protection.
  - 600/26, Israel's association to the EU research programme.

**Reviewed as needing no explanation**

- Single projects or contractors: HAFUN research building, Obernkirchen GRW funding, LI Food contract.
- Information resource: Hesse care guides in seven more languages.
- Parliamentary speech: Schleswig-Holstein patient confidentiality.

## Unsourced statements removed before publication

Background figures not supported by an archived source were removed or reworded:

- naturalisation residence years;
- real estate transfer tax rates;
- the EUR 26 million inheritance-tax threshold;
- the 2020 start of generalist nursing training;
- the characterisation of the federal memorial concept.

## Reader comprehension check

- The home-ownership example states that a deduction lowers taxable income, not the tax bill.
- Sanction impacts say who is affected: listed parties and businesses screening them, not ordinary residents.
- The Return Regulation example compares a 10-year entry-ban ceiling with the current 5-year principle, and says who is outside its scope.
- Each language was read on its own, then compared for amounts, dates and stage.

## Gaps

- Germany still has 10 records awaiting explanation: 5 Lower Saxony gazette items whose text is unread, 3 Schleswig-Holstein items, and Bundesrat 601/26 and 602/26, whose PDFs are not at the expected path.
- Other EU channels were not scanned in this run: Commission news, Parliament OEIL, Council register, ESMA, TAXUD, and the recent-acts list.
- The OJ days 10, 11 and 17 October stay partial.
- `data:coverage` exits 2 (incomplete channels).

## Validation

`data:topics`, `data:select`, `npm test` (277 passing), `tsc` and `npm run build` all pass. All 37 changed or new policies and 217 intake rows have `current` English bindings.
