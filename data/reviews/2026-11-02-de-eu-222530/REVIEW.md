# Germany and EU update — 2 November 2026

## Scope and result

Owner request: one round for Germany and the EU, focused on the owner's topics (taxes, social contributions and benefits, pensions, housing, residence and migration, cryptoassets), leaving as few records awaiting explanation as possible. Window 30 October – 2 November; 2 November is the current day and stays partial. State channels got a list-level keyword sweep for the same days. `data:coverage` exits 2 for both regions (`coverage-DE.json`, `coverage-EU.json`); the Federal Law Gazette and the Official Journal have no gap in the closed seven-day window.

| Change | Count |
|---|---|
| New explanations | 6: DE 2, DE-RP 1, EU 3 |
| Revised explanations | 0 |
| New intake rows | 7: BGBl. I 327, BGBl. II 234 and 235 (missed on 22 October), Bundestag 21/8637, COM(2026) 1030 and 1037 (missed on 27 October), one Mecklenburg-Western Pomerania lead |
| New scan rows | 70 |
| New topic groups | 3 |
| New disposition groups | 9, 13 records |
| Awaiting explanation | DE 14 → 2, EU 3 → 0 |

New explanations: `de-budget-accompanying-act-2027`, `de-afd-minor-taxes-motion-2026`, `rp-social-rent-tiers-2026`, `eu-frontex-return-proposals-2026`, `eu-pet-spunbond-china-ad-2026`, `eu-hybrid-vehicles-safeguard-2026`.

Still awaiting: `kab63-top1-05` (RED III biomass and biofuel sustainability regulation; ordinance text not read) and `mv-20261029-elterngeld-reaction` (see open leads).

No application code changed. New regression file: `tests/november-02-de-eu.test.ts`.

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | Part I No. 327 (2 November) read; No. 328 is 404. Part II still ends at No. 239; No. 240 is 404. Nos. 234 and 235 (22 October) found unrecorded and added. 26–29 October closed by issue continuity (12 issues); 30 October – 1 November closed (No. 326 only). |
| Bundestag | Agenda for sittings 104–106, version of 2 November 13:45, compared by printed-paper number with the 30 October version: added 21/1748, 4941, 6355, 7404, 8629, 8637, 8652; removed 21/6926. Only 21/8637 is on the focus topics. |
| Federal cabinet | No meeting 30 October – 2 November. Results pages of the 62nd and 63rd meetings re-read for the backlog. |
| Bundesrat | 442/26 (government bill) and 442/26 (resolution) read; next plenary agenda not published. |
| BMF, BMAS, BMG | BMF: monthly VAT conversion rates of 2 November only (excluded). BMAS: labour-market figures and a victims' compensation campaign (excluded). BMG: nothing after 30 October. |
| Official Journal | Daily views requested for 30 October – 2 November all display the 30 October issue: 18 L and 22 C items, as recorded; 30 October closed. 31 October – 2 November left partial. Texts read through Publications Office cellar URLs (EUR-Lex returns empty 202 to plain requests). |
| ESMA, TAXUD | Nothing new after 29 and 30 October. |
| Commission (Migration and Home Affairs) | The 27 October Frontex and return digitalisation proposals had been missed; both proposal PDFs fetched. |
| Council register | 403; `blocked`. |
| Sixteen states | 52 channels fetched once and searched for 30 October – 2 November entries. Owner-topic hits: Rhineland-Palatinate Staatsanzeiger No. 41 (2 November, not opened) and the MV release of 29 October. Saarland inclusion funding guideline (projects, not individuals) not recorded. 403 for the MV Landtag; two 404 and two stub pages. |

## Source-located review

### Policy-question gate

- **2027 budget accompanying bill** — BR-Drs. 442/26 cover sheet A–F, Articles 1–10 and the general explanation: alcohol tax rates (Art. 1–3), immediate supplement (Art. 7 deletes section 6a(2) sentence 4 BKGG), pension top-up (Art. 8, section 287g SGB VI: 2.2 bn in 2027), basic-security update (Art. 9), commencement (Art. 10). Current law checked: section 6a BKGG on gesetze-im-internet (EUR 25). Bundesrat resolution points 1–4: emissions revenue and the request to delete Art. 7, 487,000 families / 1.21 million children (2024). The cabinet reply of 14 October was not found and is stated as unread; whether the government accepted the Bundesrat's request is stated as unknown. The coalition's sugary-drinks amendment is referenced to its own explanation. The bill itself says the equivalent supplements in SGB II, SGB XII and AsylbLG are to be adjusted when the Standard Needs Act is revised in 2026; that instrument was not checked and is named in the limits. The pension provision is described as federal money to the insurance, not a change to pensions or rates.
- **AfD motion 21/8637** — full advance text, Part II points 1–5; agenda item 6 (Wednesday, 30 minutes, referral to the Finance Committee). Current law: the published tobacco tax act (existing explanation) and the draft alcohol and sugary-drinks taxes. Stated that a motion changes no tax and is not voted on in substance on 4 November.
- **Frontex and returns** — Commission news of 27 October; COM(2026) 1030 cover page, explanatory memorandum (30,000 officers, Quick Reaction Force, 24-hour EUROSUR reporting); COM(2026) 1037 cover page and entry into force (20th day). The new Return Regulation is referenced to its existing explanation. Not read: the full articles, impact assessment, timetable and budget; stated.

### Other explanations

- **PET spunbond** (2026/2393) — Articles 1–4 and procedure recitals 1–14. Rates 39.8 / 48.1 / 47.1 / 48.1%. Duration not in the articles; stated.
- **Hybrid cars safeguard** (C/2026/5780) — full notice. Nine-month limit counted from 30 October gives 30 July 2027, extendable by two months; 15- and 21-day deadlines.
- **RLP social rent tiers** (MinBl. 2026 Nr. 46) — full two pages. The base rule with the euro amounts per tier was not read; the explanation gives no rent figure and says whether a lower tier lowers the permitted rent must be confirmed there.

### Reader comprehension check

Every amount names its role: alcohol tax per hectolitre of pure alcohol (example converts one 0.7-litre bottle, before VAT, and says shelf prices are set by sellers); the immediate supplement per child per month (example: two children, EUR 50 a month, EUR 600 a year, only if passed); the pension figure is federal money, not a pension amount; the anti-dumping example uses the free-at-frontier price. Proposals and drafts are labelled as not in force in the title or the first paragraph. Each language was read alone and compared for amounts, dates and stage.

## Grouping and dispositions

Groups: `de-budget-accompanying-act-2027` (cabinet item 1-02 with the bill's explanation), `eu-frontex-return-proposals-2026` (two proposals of 27 October), `de-industrial-emissions-ied-2026` (BGBl. 2026 I Nr. 304 plus cabinet items 1-06 and 1-07, whose titles state they transpose Directive (EU) 2024/1785). Cabinet item 1-05 (Directive 2023/2413, biomass) was kept apart: a different directive.

Dispositions: BGBl. I 327 corrigendum; BGBl. II 234/235 treaty notices; the 2027 Budget Act reply and the DRV Bund budget plan (budgets, no rule change; the tax and benefit changes are in the explained accompanying bill); the shipping action plan (strategy); the lizard-protection administrative rule; two Bundestag motions outside the focus topics; Hessen GVBl. 68 (planning procedure) and 69 (security vetting); Hessen GVBl. 65 (curriculum references only — the weakest call, since the curricula themselves were not read); ESMA draft technical standards on post-trade risk reduction.

## Open leads

- **Parental allowance (Elterngeld)**: on 29 October the MV social minister welcomed a "planned reversal of the Elterngeld cut". The detail page redirects to the MV home page; no federal document was found on the BMBFSFJ press list, the Bundestag agenda or the budget accompanying bill. Recorded as unverified and left awaiting.
- Rhineland-Palatinate Staatsanzeiger No. 41 (2 November) not opened.
- Government reply to the Bundesrat on the budget accompanying bill (BR-Drs. 442/26) not found.

## Follow-up dates

4 November: AfD motion debate. 6 November: cash-register bill first reading. 19 November: anti-money-laundering comments deadline. 20 November: hybrid-car safeguard submissions (21 days). 25 November: Hessen tenant protection ordinance expiry.
