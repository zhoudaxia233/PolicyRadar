# All-country round — 16 to 20 November 2026

## Scope and result

Owner request: "全部更新一轮" (one full round). Read as in the previous all-country rounds: tier 1 (Germany federal and states, EU) in full, tier 2 national channels on the owner's standing topics. Frozen regional channels were not touched. Window: since the 16 November round (export `2026-11-16T22:34:47.551Z`) through Friday 20 November; scans ran from late 20 November into the early hours of 21 November Berlin time. 16–19 November are closed days. 20 November is closed only where the check time is after 00:00 Berlin and the listing was reconciled. Export time `2026-11-21T06:08:31.000Z`.

| Change | Count |
|---|---|
| New explanations | 15 (listed below) |
| Revised explanations | 49 (listed below) |
| New intake rows | 370 (EU 173, DE federal 92, DE states 58, tier 2 47) |
| New scan rows | 93 |
| New snapshots | 433 |
| New topic groups | 24; 14 documents added to existing groups |
| New disposition groups | 11 (EU 141 Official Journal items; DE 38) |

New: `de-electricity-tax-cut-2027`, `de-labour-law-package-2027`, `de-maintenance-advance-reform-2029`, `de-child-law-reform-2027`, `de-st-kita-sibling-rule-2027`, `de-rp-ivf-fifth-cycle-2027`, `de-th-civil-servant-pay-2026-2028`, `eu-consumer-credit-directive-2026`, `eu-lead-fishing-hunting-reach-2026`, `eu-uk-youth-experience-scheme`, `es-minimum-wage-2027`, `es-irpf-smi-2027-deduction`, `gb-immigration-asylum-bill-2026`, `gb-commonhold-leasehold-reform-bill-2026`, `ch-imputed-rent-abolition-ordinance-2026`.

Revised — Bundesrat 1070th plenary (20 November): `de-kita-quality-act-2027` (Mediation Committee called), `de-social-insurance-ceilings-2027`, `de-starter-pension-2027`, `de-eudi-wallet-2026`, `de-fiscal-equalisation-2026` (**headline corrected**), `de-tobacco-tax-2027`, `de-ukraine-tax-treaty-2026`, `de-albania-tax-protocol-2026`, `de-cyber-defence-act-2026`, `de-driving-school-reform-2026`, `de-car-label-penalty-reference-2026` (consent); `de-emergency-care-reform-2026`, `de-co2-price-corridor-2027`, `de-carf-agreement-2026`, `de-grid-support-proposal-2027` (no mediation); `de-care-insurance-reform-pnog`, `de-cash-register-digital-receipts-2028`, `de-tax-adviser-exam-2026`, `de-autobahn-financing-2026` (first-round opinions); `de-light-vehicle-60-kmh-proposal`, `de-br-israel-horizon-association-motion-2026`, `de-br-critical-infrastructure-video-motion-2026`, `de-autonomous-driving-model-regions` (resolutions adopted); `de-self-employed-maternity-proposals-2026` (new motion 669/26). Other DE: `de-elterngeld-reform-2027` and `de-strategic-gas-reserve-2027` (bill texts now read), `de-budget-accompanying-act-2027`, `de-pension-contract-information-ordinance-2027` (elapsed deadline cleared), `he-rent-protection-2025` (**repealed 20 November**), `he-rent-protection-proposal-2026` (**new ordinance in force 20 November**), `hh-property-tax-residential-location-2027`. EU: `eu-sfdr-priips-review`, `eu-pharma-package-council-2026`, `eu-vat-anti-fraud-tools-2030`. Tier 2: `nl-tax-plan-2027` (**work tax credit figure corrected**), `nl-box3-actual-return-crypto`, `es-social-protection-rdl-31-2026`, `es-single-parent-families-rdl-35-2026`, `es-minimum-wage-2026`, `fr-social-security-bill-2027`, `fr-finance-bill-2027`, `fr-plf2027-crypto-tax-amendments`, `it-school-decree-170-2026-foreign-pupils`, `gb-isa-changes-budget-2026`, `gb-hmrc-interest-rates-202611`, `gb-fsma-cryptoasset-regime-2027`, `us-uscis-prior-deference-removal-proposed`, `us-refugee-termination-notice-10-days`, `us-cftc-casino-gambling-not-swaps`.

No application code changed. New regression file `tests/november-20-all-countries.test.ts`. Three older tests checked the latest state of matters that changed this round and now check their own round instead: `status-detail` (Hesse 2025 ordinance at version 4), `november-07-all-countries` (Bundesrat items 13 and 15 may form their own matters, but never the crypto agreement's), `november-16-all-countries` (review stamps at or after that round).

## Channels checked

| Channel | Result |
|---|---|
| recht.bund.de | 16–20 November complete by issue number: Part I 340–343 (commemorative coins, 17 Nov), 343a (fuel-switch investment threshold), 343b (maritime pilots, 18 Nov), 344–345 (20 Nov); nothing dated 19 Nov; Part II 274–278 (18 Nov). The date search returns 403, so issues were reconciled by number and suffix probing. Checked again after 02:00 Berlin. |
| Bundesrat | 1070th plenary: final agenda of 74 items, every Beschlusstenor read and 27 decision documents (B); 67 records, 7 excluded. Next plenary 18 December; its agenda returns 404. |
| Bundestag | Not a sitting week. Text archive: only the latest 20 entries readable (paging returns a script shell). Agenda for 24–27 November read: budget accompanying act 2nd/3rd reading 27 November; Greens' sugary-drinks motion vote without debate 26 November. |
| Federal cabinet | 18 November: labour law package, maintenance advance reform, child law reform, waste-water ordinance draft. Coalition announcement on the household electricity tax (no draft). |
| BMF, BMAS, BMG | BMAS and BMG lists read in full (BMG readable again via its press list): no rule. BMF: BEPS-MLI draft of 6 November recorded late. Monthly new-rules index still ends with October. |
| Sixteen states | 52 channels. Hesse GVBl 78 (new tenant protection ordinance) and 79 (Vacancy Act amendment); Hamburg GVBl 35; BW GBl 100–102; Bremen GBl 111–114; Lower Saxony GVBl 104–107; RLP MinBl 50 and GVBl 39; Saarland Amtsblatt 45; SH GVOBl 111; Bavarian Landtag laws of 12 November (missed earlier). Seven gazette and press scans were reconciled through 20 November but checked at 23:56 Berlin, so they are saved as partial. Failures: Bremen Bürgerschaft 404, MV Landtag 403, MV GVOBl URL now redirects to a portal page without a gazette list (registry URL needs replacing), Saxony-Anhalt Landtag documents and press 404, NRW press timeout, Lower Saxony Landtag maintenance page, **thueringen.de press Link11 captcha** (not bypassed, not archived). |
| EU Official Journal | Rendered daily views: 16 November re-rendered (86 items, unchanged) and closed; 17 (28), 18 (26), 19 (67, of which 43 EEA Joint Committee decisions) closed; 20 November 39 items, partial. Titles from the render; item pages not fetched except the REACH texts (PDF). |
| OEIL, Commission, TAXUD, ESMA, Council | No plenary 17–20 November; next session 23–26 November. Commission news: consumer credit, SFDR agreement, grids permitting, EU–UK summit; pages 4, 5 and 8 (17–18 November) returned 429 and remain unread. TAXUD: CBAM for Norway and Iceland, EU–UK ETS linking. ESMA: nothing new. Council register blocked (403). |
| Tier 2 | GB (GOV.UK API, legislation.gov.uk; bills.parliament.uk 403, Parliament API used), ES (BOE section I, La Moncloa), NL (Tweede/Eerste Kamer), FR (Sénat, Assemblée), CH (news.admin.ch first page per day only), IT (Gazzetta Ufficiale, Camera; governo.it press list "pagina non trovata", senato.it render only), US (Federal Register, IRS). All partial by design. |

## Source-located review

### Policy-question gate

- **Bundesrat decisions are not promulgation.** For every law cleared on 20 November the card states that signing and BGBl publication remain; no effective date was set from the Bundesrat date. Bundesrat decisions carry no vote counts.
- **Kita act (BR-Drs. 653/26(B)).** The Bundesrat called the Mediation Committee for a "fundamental revision"; the states reject time-limited, falling federal funding (about EUR 9.2 billion 2027–2034). No meeting date. The card says the current KiQuTG continues and the 2027 start is uncertain.
- **Fiscal equalisation (642/26).** The earlier headline "states net +EUR 500 million" was wrong for the adopted text: Art. 1 raises the 2026 state amount by EUR 500 million but new § 1(4) moves EUR 625 million from the states in each of 2026 and 2027 as their share of the fuel-tax cut. The net (−125 / −625 million) is this site's sum of two official figures; section D of the committee report still says +500 million. Corrected with an appended `correction` event.
- **Tobacco tax.** The same law restores the old rates retroactively for 21 October–31 December 2026; 2027 increases unchanged.
- **Hesse tenant protection.** GVBl. 2026 Nr. 78 (ordinance of 17 November, published 19 November, in force 20 November) replaces the 2020 ordinance five days before its expiry. 71 municipalities (36 new, 35 continuing, 14 dropped; 5 opted out); 10% cap on new leases until 31 December 2029; other rules until 19 November 2031; 6-year waiting period with the § 2 transition (8 years for sales up to 19 November 2026 in the 49 old municipalities). The "33 new" figure from the GEWOS report, used in the 2025 card, is corrected to the ordinance's 36. The § 201a BauGB designation of the same municipalities is only planned. The Vacancy Act amendment (GVBl Nr. 79) now refers to the new ordinance; that its scope follows the 71 municipalities is this site's reading of the reference and is stated as such.
- **Electricity tax.** Only a coalition announcement: 2.05 → 0.1 ct/kWh for households from 1 January to 31 December 2027, and a three-month fuel price cap. No draft, no cabinet decision; current rate stated as current law.
- **Elterngeld (BR-Drs. 675/26).** The bill text replaces last round's gaps: 80% for each parent's first four months, 50% afterwards; 4+6+4 months; EUR 330–1,900; births from 1 November 2027 (births before stay on old law). The EUR 175,000 income limit was not found amended; not checked article by article.
- **Netherlands tax plan.** Letter EK 37022 B (18 November) and amendment 42: the work tax credit rise is EUR 133 in the bill and EUR 17 after amendment 42, not EUR 173 (from the September press release). Corrected with a `correction` event.
- **Spain.** BOE-A-2026-24292 and -24296: the Permanent Deputation confirmed RDL 31 and 35/2026 on 18 November (Cortes dissolved). RDL 38/2026 still needs confirmation within 30 days (17 December).
- **France.** Senate adopted the PLFSS on 18 November (201–124, 15 abstentions): article 35 deleted, amendment 323 restores the 2023 pension reform; these are Senate positions, not final. Re-tabled Senate crypto amendments are new proposals awaiting admissibility.
- **EU consumer credit (Directive 2023/2225).** Articles 2, 8, 18, 26, 29, 31, 36, 47, 48 read from the PDF. Applies from 20 November 2026 through national law; Germany's transposition of the articles other than Article 36 was not checked.
- **REACH lead.** Regulation 2026/2501 Annex paras 21–25, corrigendum (3 March → 3 June 2027), Regulation 2026/2530 Annex paras 14a, 28–36 read from the PDFs.
- **EU–UK Youth Experience Scheme.** Joint statement paras 39, 41, 50 and the UK explainer read. Negotiations concluded only; no signature; participating member states not verified.
- **VAT anti-fraud tools.** The Commission says the tools "were due to expire on 30 June 2026"; whether they could be used between July and adoption is not stated, and the card says so.

### Reader comprehension check

Social insurance ceilings: all amounts named as income used to calculate contributions, with an EUR 80,000 hypothetical showing EUR 6,750 more income subject to health and care contributions and no premium amount. Electricity tax: 3,000 kWh hypothetical, tax only, VAT pass-through stated as an assumption. Hesse: hypothetical rent cap and conversion-sale examples. Starter pension, Elterngeld, maintenance advance, Thuringia pay, Saxony-Anhalt Kita fees, RLP IVF and the EU items each carry a labelled hypothetical. Each language was reviewed alone and then compared for numbers, dates and stage (English drafted by a translation pass from the Chinese and bound only after the binding check).

## Grouping and dispositions

New groups: twelve Bundesrat agenda/decision pairs with identical Drucksache and title; the Saxony-Anhalt sibling-rule question (four competing bills and motion 9/62, each with its own stage); REACH lead (2501, corrigendum, 2530); and one group each linking the new explanations whose identifier is not a record's (child law, labour package, maintenance advance, Thuringia pay, ES minimum wage 2027, ES RDL 38, CH imputed rent, EU–UK youth scheme, two UK bills). Hesse: GVBl 78 and the ministry release join `he-rent-protection-2026-plan`; GVBl 79 stays separate. Bundesrat decision records were added to the existing matter of their agenda item where one existed. The maintenance-advance group excludes the Left motion rejected on 12 November (a different proposal).

Dispositions: OJ 16–20 November (institutional, mergers, exchange rates, trade defence, GIs, State aid, technical, corrigenda), BGBl II 274–278, commemorative coins, and 29 technical federal and state items. Kept awaiting on purpose: CFSP notices, Cyber Resilience Act guidance (C 202606013), platform and financial-account information treaties, the BW constitutional court pay ruling, Bremen supplementary budgets, Lower Saxony equality and infrastructure laws, Bavarian climate and adult-education laws, the RLP budget draft and teacher partial retirement, the Hesse Vacancy Act amendment, UK S.I. 2026/1207, the US automatic-enrollment rule.

## Open leads

- Mediation Committee date for the Kita act; signing and BGBl dates for the laws cleared on 20 November; Bundesrat agenda for 18 December.
- Bundestag 26–27 November (budget accompanying act, sugary-drinks motion); EP plenary 25 November (pharma package, VAT tools).
- Electricity tax draft; maintenance-advance bill text; the labour draft labelled "Referentenentwurf"; child law custody wording differs between the ministry page and the draft PDF.
- Brandenburg fee ordinance; Berlin § 201a ordinance; Hesse § 201a designation; Saarland 2025 taxi fares (official PDF 404).
- Netherlands Senate 24 November and 15 December; Spanish RDL 38/2026 confirmation by 17 December; Italian DL 170 conversion by 29 November and DL 207; French PLF Senate plenary until 9 December and PLFSS joint committee.
- Council register blocked; Thuringia press captcha; MV gazette URL changed; Commission news pages 4, 5, 8 unread.

## Tool note

`data:coverage` exits 2 for every region (reports saved). DE: 8 of 9 federal channels incomplete in the closed seven-day window; the Federal Law Gazette has no gap. EU: 7 of 7 incomplete; the Official Journal lacks only 20 November. Tier-2 scans are partial by design. Rendered pages were used for discovery only and are not registered as snapshots; maintenance and rate-limit pages were excluded from evidence.
