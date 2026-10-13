# France targeted update — 13 October 2026

Prepared locally; not committed, pushed or published. This pass preserves the earlier German and Swiss work and every pre-existing intake, revision, scan and snapshot row.

## Result

Three new bilingual explanations, two updated explanations, five new immutable revisions, thirteen new intake rows (one supersedes a rolling-page record), seventy-four new snapshot entries, and 118 partial/blocked scan rows. There are now 182 French explanations. Eighty-one successfully fetched URLs were accepted as documentary evidence; reused hashes are not counted as new snapshots. Eleven public dynamic entry points were rendered for discovery. No application code was changed in this France pass.

## Evidence and editorial decisions

Exact archived source locations and hashes are in `source-locators.json`. Fetch failures, readable pages and render evidence are separate in the ledgers.

- **November gas benchmark:** CRE release dated 12 October, paragraphs beginning “Seule la part approvisionnement” and “La CRE évalue”, plus the November GRDF price table. The aggregate tax-inclusive benchmark is EUR 194.90/MWh versus October EUR 182.88, an average 6.6% rise. The EUR 12 estimate concerns the average November bill of indexed customers, not a universal surcharge. The aggregate benchmark must not be substituted for a variable contractual kWh rate. Fixed-price contracts and local distribution networks are qualified. October events and the September CRE original remain immutable. The rolling Service Public A17956 record is explicitly superseded for its November version; its old payload and archive remain intact.
- **Commuter fuel aid:** compare Service Public A18903 (updated 5 October) with DGFIP’s 12 October update and its public simulator. DGFIP specifies 2024 reference income per tax share no greater than EUR 22,770, scheduled automatic payment on 16 October and applications from 22 October. The simulator was actually readable, without entering any personal information. DILA still states that formal renewal details await a text. Légifrance current consolidated-decree access failed in the web tool; no new decree commencement is claimed. The pending phase remains explicit. The prior EUR 50 describes three months whereas DGFIP’s EUR 100 covers April–September together. DGFIP prose says at least 15 km/8,000 km, while its questionnaire says more than; exact-boundary cases remain unresolved. The separate employer fuel-allowance tax-exemption proposal is not merged into this cash benefit.
- **Micro-entrepreneur turnover deadline:** DILA A19087, 7 October, explicit exception paragraph: September monthly/Q3 quarterly declarations must be filed by Saturday 31 October at 23:59, not Monday 2 November. Do not infer another tax’s payment date. The linked Urssaf original failed, which remains visible in both languages.
- **Agora:** DILA A19093, 9 October: high-school consultation opened 6 October, closes 23 October; late-October national feedback has no exact confirmed date. Anonymous contributions, regional/department fields, optional school identification and non-guaranteed adoption are distinguished from an enacted education reform.
- **French Guiana doctoral grants:** CTG notice dated 28 September, eligibility, payment and calendar sections. Four grants, Master 2 plus doctoral registration, specified Guyanese heritage/research themes. EUR 8,000 + EUR 6,400 conditional instalments, plus up to EUR 1,600 documented travel reimbursement, not an unconditional EUR 16,000 lump sum. Deadline 29 October. The notice makes individual awards subject to committee/budget decisions; these have not been independently verified.
- **Other intake:** renewable-heating guidance tool, Urssaf representation form, quarterly payroll-tax reminder, two Assembly resolution filings, Grand Est water/environment support and Guyana PMI clarification. Assembly files 3292 and 3293 explicitly say the full documents are not yet published; only filing metadata and pending stages are retained. The payroll-tax notice’s suspicious claim that a 0.2% penalty cannot exceed EUR 60 is not repeated as law. The underlying provision remains a follow-up. Urssaf form/notice connection failures prevent full mandate verification.

## Existing matters revisited

The 2027 Finance Bill dossier and Assembly notice still describe plenary consideration scheduled from 13 October; a scheduled debate is not a final vote or adoption. Property-tax sources confirm ordinary 15 October non-online and 20 October online deadlines, with separately dated assessments possible. Île-de-France DAEU guidance still gives the 20 October–22 February application window. These fetches do not by themselves refresh every policy’s factual-review date. The Réunion mobility source failed and its prior successful evidence was retained.

## Grouping and preservation

The gas group now has a neutral monthly heading, one explanation and three current records: October CRE, November CRE and the current November A17956 notice. Its older record/revision remains in history. The fuel-renewal group contains the earlier DILA notice and newer DGFIP announcement; their distinct evidentiary stages remain visible. The heating tool is separate from the existing integrated heat-pump offer, and the lycée consultation is separate from resolution 3292. No grouping rests on shared keywords alone. The gas regression was updated to cover both monthly originals, the superseding notice, one-matter counting and separation from courier income.

## Coverage and unresolved work

All 59 registered French national/regional channels were requested. Twenty-nine entry requests failed; eleven dynamic entry points were rendered. **All 59 remain incomplete for 6–12 October**, and 13 October is an ongoing partial day. National-only `data:coverage ... FR` exits 2; `coverage-all-fr.json` covers all 59, including the 18 registered regional geographic areas. Departments, municipalities and special overseas territories are not independently registered.

These counts establish access attempts, not exhaustive official-source scanning. National Gazette access, Urssaf originals, regional pagination, session attachments, prefectural records and underlying acts remain open. Assembly page two was retrieved, but all constituent documents and updates were not reconciled. Senate’s promulgated-law list does not establish Gazette completeness. Service Public highlights/briefs and Entreprendre’s first page do not close every recent announcement. Historical coverage from 1 January remains open; three targeted September records do not close those intervals. Additional fetched guidance, statistical reports and portal links remain discovery leads in the fetch ledger rather than silently being treated as reviewed policy outcomes.

Priority follow-up: verify the fuel renewal’s current formal instrument and distance boundaries; retrieve Urssaf originals; reconcile regional session attachments and the full recent announcement pages. The 2027 green-budget/SPAFTE publication found through official search was not substantively reviewed in this pass and remains an explicit lead: https://presse.economie.gouv.fr/publication-de-la-strategie-pluriannuelle-des-financements-de-la-transition-ecologique-spafte-et-du-budget-vert-2027/.

## Validation

- Preservation audit: PASS; old revisions, intake, scans, snapshots and unrelated policies/settings retained. Failed source requests preserve prior successful pointers.
- Topics validation, selected-store validation, TypeScript and static build: PASS.
- Existing test suite with updated monthly-gas regression: 236 passed, 0 failed.
- Browser: English gas explanation and three-document keyboard expansion verified; searching the October official ID yields one matter and one matching original. Chinese mobile turnover-deadline explanation verified at 390 × 844 with document width 390. Reload and language/region/stage checks are recorded in `validation.json`.
- No public release performed.
