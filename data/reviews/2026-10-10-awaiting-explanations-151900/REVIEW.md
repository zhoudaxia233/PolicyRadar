# Clearing records awaiting explanation, 10 October 2026

Owner request: resolve the German "awaiting explanation" list first, then the EU list. The owner chose to (a) add a reviewed "no explanation needed" disposition for non-policy records and (b) write full explanations for measures affecting taxes, social security, benefits, work, housing and household costs, and concise but accurate ones for technical or sector-specific measures.

No new scan was run. Scan coverage, gaps and channel states are unchanged; this review works only on records already in intake. `fetch-ledger-DE.json` lists the sources fetched for this review; many explanations cite pages archived by earlier runs.

## Germany

**Before:** 199 matters / 209 records awaiting explanation. **After:** 0.

### Records reviewed as needing no explanation (95)

Each record was read; the reason is shown to readers in Chinese and English (`data/dispositions.json`):

| Disposition | Records | What they are |
| --- | --- | --- |
| `de-bt-debates-2026-10` | 15 | Government statements, question times, government Q&A, topical debates, items removed from the agenda, one KfW board election |
| `de-bt-motions-2026-10` | 19 | Opposition or cross-party motions (Anträge), including the adopted NIPT monitoring motion — non-binding |
| `de-bt-hearings-briefings-2026-10` | 13 | Expert discussions, agency-head hearings, report debates not tied to a bill |
| `de-bt-agenda-summaries-2026-10` / `-09` | 5 | Summary pages of items voted or referred without debate |
| `de-treaty-scope-notices-2026-10` | 8 | BGBl. II notices on which states joined treaties |
| `de-br-resolutions-2026-10` | 12 | Bundesrat resolution proposals (Entschließungen) |
| `de-br-eu-opinions-2026-10` | 12 | Bundesrat opinions on Commission proposals and communications |
| `de-single-projects-2026-10` | 5 | Bridge opening, dyke works, excellence-university selection, one investment-screening prohibition, a rail-project resolution |
| `de-information-campaigns-2026-10` | 2 | Animal-vaccination campaign; October round-up page of unrelated measures |
| `de-internal-administration-2026-10` | 3 | Bremen Gazette 98 (notary competence), 100 (e-file transition date), RLP committee minutes |
| `de-bt-commemorations-2026-10` | 1 | Babyn Yar commemoration |

### Leads from summary pages (not explained, recorded here)

The 8 October summary pages contain items that are separate matters and are not in intake as their own records: the Bundestag's final adoption of the DPI platform-income and CRS financial-account information-exchange agreements (Finanzausschuss 21/8425), and referrals of the ERP economic plan 2027, the electricity-system flexibility bill, the GVFG amendment, the abolition of the Distance Learning Protection Act (FernUSAG), the higher-education law clean-up and the air-navigation supervision bill. The 24 September summary page lists the sustainable aviation fuel bill (21/7871) and the aircraft-noise bill (21/7403). These remain leads for the next German run.

### New explanations (85) and linked records

Full depth (current law, proposal, dates, transition and a worked example): BAföG reform (21/8405), upgrading-training aid (21/8412), housing benefit cuts (21/8284), starter pension (21/7864), CO2 price corridor 2027 (21/7869), emergency care reform with the health-insurance savings follow-up amendments (21/6808), tobacco tax (21/7859), EEG 2027 (21/7867), childcare quality act (21/8239 / BR-Drs. 505/26), 2027 benefits-in-kind values (BR-Drs. 503/26), 2027 apprentice minimum pay (BGBl. I 287), care insurance reform PNOG (cabinet), Ukraine residence regulation (BGBl. I 288), RLP civil-servant pay 2026–2028.

Concise: all other bills, regulations and gazette entries, each with stage, who is affected and what is not yet decided. Records were grouped with their explanation by Bundestag/Bundesrat document number or by explicit reference to the same bill; cabinet "Gegenäußerung" items were grouped with the bill they answer.

Existing explanations newly linked: grid-fee subsidy (record of the government announcement added to `de-grid-subsidy-2027-2029`), income-tax reform (first-reading report added to `de-income-tax-reform-2027`), 2027 social-insurance ceilings (cabinet notice linked through a new explicit `explanations` link because the explanation's identifier is the regulation name). The BGBl. II 220 record turned out to be the GloBE minimum-tax information agreement, not the crypto (CARF) agreement, and received its own explanation.

### Policy-question completeness gate

- **Housing benefit:** current law (§ 12(6) WoGG heating amounts, § 43 biennial update) checked against bill 21/8284; transition (§ 42e) and the AfD motion 21/8386 for the 2027 update kept visible. The heating relief is explained as an amount added to the rent ceiling, not money paid, with a hypothetical example and no invented payment figure.
- **BAföG:** current § 13 amounts (475/380/59) vs the bill's three steps; the Bundesrat's criticism and the government's rejection both stated.
- **Starter pension:** eligibility by registered residence and tax ID, not nationality; cohort rule (born 2020 first); EUR 1,440 example labelled hypothetical.
- **Tobacco tax:** current § 2 TabStG rates vs the bill; the larger coalition amendment flagged as not adopted.
- **Emergency care:** the Greens' separate bill (21/2214) voted the same day is named as a different version.
- **Product liability:** passed by the Bundestag on 8 October; shown as pending Bundesrat second passage and publication, not in force.
- Opposition bills (AfD 21/8370, 21/8369) are explained as opposition proposals.

### Reader comprehension

Amounts were checked for role and period: BAföG figures are monthly statutory rates before income deductions; benefits-in-kind values are pay counted for contributions, not deductions; ceilings and heating amounts are calculation inputs. Each explanation was reviewed in Chinese and English separately and compared for amounts, dates and stage.

### Unresolved

- Concise explanations rely on official Bundestag/Bundesrat/government summaries rather than full bill texts; commencement dates are stated only where read in the source.
- PNOG: the exact care-allowance increases were not in the official summary read.
- Bundesrat explanations for items 47 and 50 returned 404; the Drucksachen were read instead.

## European Union

**Before:** 406 matters / 438 records awaiting explanation. **After:** 0.

### Records reviewed as needing no explanation (398)

| Disposition | Records | What they are |
| --- | --- | --- |
| `eu-corrigenda-2026-10` | 39 | Corrigenda, including language-version corrections |
| `eu-reference-rates-2026-10` | 11 | Exchange rates, ECB rate notice, EFTA recovery rates, molasses prices |
| `eu-company-competition-cases-2026-10` | 34 | Merger notifications and decisions, Kingspan fine |
| `eu-state-aid-cases-2026-10` | 21 | Individual State-aid decisions and notices |
| `eu-product-names-authorisations-2026-10` | 32 | Geographical indications, variety catalogues, individual biocide/feed authorisations, medicines summary, port listing |
| `eu-court-cases-2026-10` | 31 | Court of Justice, General Court and EFTA Court case notices |
| `eu-appointments-2026-10` | 27 | Appointments, elections, recruitment, contact points |
| `eu-sanctions-notices-2026-10` | 12 | Notices to listed persons and data subjects |
| `eu-parliament-records-2026-10` | 8 | October 2025 minutes and verbatim reports |
| `eu-infringements-2026-10` | 10 | Infringement package and referrals |
| `eu-parliament-resolutions-debates-2026-10` | 22 | RSP, INI and INL files |
| `eu-international-positions-2026-10` | 12 | EU positions in international bodies, joint-committee decisions |
| `eu-statements-events-consultations-2026-10` | 45 | News, statements, speeches, consultations, pre-enlargement reviews |
| `eu-budget-funding-2026-10` | 44 | Accounts, budgets, disbursements, project selections, EGF, Peace Facility |
| `eu-external-missions-2026-10` | 4 | CFSP missions and mechanisms |
| `eu-technical-administrative-2026-10` | 15 | Statistics, standards references, rail technical rules, CN notes, ESRB recommendation, EGTC notices |
| `eu-trade-defence-steps-2026-10` | 8 | Trade-defence review initiations, expiry notices, import registration |
| `eu-member-state-specific-2026-10` | 6 | Spain fuel excise, VAT derogations, Italian market support, France sea-turtle convention |
| `eu-parliament-objections-2026-10` | 3 | Rule 115 objections |
| `eu-research-cooperation-agreements-2026-10` | 3 | EU–Morocco PRIMA agreement documents |
| `eu-animal-health-zones-2026-10` | 9 | Import-list and restricted-zone measures for named non-EU countries and for Hungary, Poland, Bulgaria, France, Italy and Cyprus (none for Germany; the ASF act was read for this) |
| `eu-delegated-acts-scrutiny-2026-10` | 2 | Taxonomy-disclosure and trading-venue delegated acts under scrutiny |

Grouped matters were dismissed only as whole groups and only where no explanation covers them; the dispositions feature now enforces this.

### New explanations (31) and linked records

Full: amended air passenger rights (Regulation (EU) 2026/2202), read on EUR-Lex: compensation remains EUR 250/400/600 from a 3-hour arrival delay, with the long-haul halving rule, 96-hour information duty, 5-hour reimbursement, self-rerouting after 3 hours, 2-hour tarmac limit, free name correction and default display of hand-baggage fares; applies from 23 October 2027, so current rules apply until then.

Concise: Armenia trade liberalisation; Sudan, ISIL/Al-Qaida, Russia destabilisation, Ukraine territorial integrity, DRC and Burundi sanctions acts (renewal dates read from each act); the EU tax haven list update; VAT anti-fraud extension; two EPR authorised-representative suspension proposals (to 1 January 2035); EU–Korea PNR signing; SFDR/PRIIPs; European Business Wallets; truck-trailer CO2 tolling; consular protection; standardisation proposal (from rendered Commission press pages); AGILE; INSPIRE; two economic-governance alignment proposals; carcinogens directive; Erasmus+ 2028–2034 (EUR 40.827 billion indicative); DiscoverEU (deadline 15 October 2026, noon Brussels time); EU Critical Communication System (two linked proposals); NRMM hydrogen test fuel; two EU–INTERPOL agreements; TEN-E revision; Critical Raw Materials Act amendments. Legislative proposals were checked against the Legislative Observatory stage and the Commission proposal on EUR-Lex.

The €3 parcel-duty guidance record is linked to the existing `eu-low-value-parcels-2026` explanation through an explicit link.

### Unresolved

- Most proposal explanations are concise and based on the proposal's own objectives; amendments by Parliament or Council are not compared.
- Two Commission press pages are script-only; they were rendered with the local Chrome and archived as rendered evidence.
