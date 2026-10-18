# France and Italy backlog — 18 October 2026

Fourth run of the day. Owner request: clear the French (14) and Italian (19) records awaiting explanation, using the same process, then merge and publish.

## Result

| | New explanations | Updated | Reviewed as needing no explanation | Awaiting |
|---|---|---|---|---|
| Italy | 16 | — | 3 technical decrees | 19 → 0 |
| France | 6 | 1 (cadmium trajectory) | 3 | 14 → 4 |

- France also gets one new intake record: Service Public A19091 (cadmium) and its topic group.
- No application code was changed.
- New regression test: `tests/october-18-fr-it-backlog.test.ts`.

## France: what remains and why

Each remaining record lacks an accessible authoritative text, so no explanation was written for it:

- **Décret 2026-920** (annual injunction to retain connection data). Légifrance returns 403. No other official copy was found.
- **Brittany SPACE 2026 agricultural aid.** The press page returns 403, with both the Python client and curl.
- **Guadeloupe CP/26-498** (health and social study grants). The acts index now loads, using curl with the system trust store because of a TLS chain issue, but no longer lists CP/26-498.
- **National Assembly resolution motion no. 3289.** The Assembly page still says "Document non encore publié".

## Source-located review

### France

- **IRL, Q3 2026** (Service Public A17342): 148.06 mainland (+1.57%), 143.80 Corsica, 145.21 overseas departments. The explanation includes a hypothetical example (EUR 800 → at most EUR 812.56) and says that only leases with an indexation clause are affected.
- **Resolution motion no. 3292** (Assembly PDF, operative text)
  - Figures cited: 24 schools damaged, 891 lycées suspended, 715 police and gendarmes injured, over 6,000 arrests since 21 September.
  - It invites the government to prosecute, to seek damages under current law (including parents' liability) and to support those affected.
  - The explanation separates it from Senate bill no. 952.
- **Resolution motion no. 3293** (Assembly PDF): a five-year moratorium on non-sovereign data centres, public debates, and transparency.
- **AMF instruction DOC-2026-05**: a minimum liquid-asset buffer for open-ended OPCI and evergreen FCPR funds, set by redemption frequency (25% for monthly redemptions). Previously the AMF practice was 30–40% at authorisation. The full instruction was not read.
- **Grand Est**: EUR 2.57 million for water projects. The farm water-protection call is open from 28 September to 30 November.
- **Cadmium trajectory (updated explanation)**
  - Service Public A19091 (14 October): 60 mg/kg P₂O₅ from 2027, 40 mg from 1 January 2028, 20 mg from 1 January 2030.
  - The Agra trade report (6 October) says the trajectory order is under consultation until 9 November. That consultation text was not obtained, and the explanation says so.
  - Grouped as `fr-cadmium-trajectory-2026`.
- **Mon soutien psy** (ameli page, updated 16 September)
  - Up to 12 sessions at EUR 50; statutory insurance pays 60%, supplementary insurance 40%; listed groups have a mandatory no-up-front-payment rule; Carte Vitale billing is coming "soon".
  - Article 56 of Law 2025-1403 was not read (Légifrance 403). A general no-up-front-payment rule is not claimed.
- **Reviewed as needing no explanation**:
  - the Service Public monthly roundup (A18466);
  - the Guyane PMI clarification (no transfer of tasks or staff);
  - the Nouvelle-Aquitaine plenary summary (36 items; new reason text: one summary is not one policy).

### Italy

The cabinet communiqués for CdM no. 191 (2 October) and no. 192 (13 October) are archived and serve as the source. Most decree texts were not read, and the explanations say so.

- **Stage handling**
  - The ex-ILVA and Campi Flegrei decree-laws stay `pending`: the parliament listing of 18 October does not yet show their Gazette publication.
  - The environmental decree is listed by parliament as DL 8 October 2026 no. 177 (GU 234), so it is `adopted` and its 60-day conversion is noted.
  - Preliminary legislative decrees are explained as drafts: the Highway Code, the legal-profession reform, and the CRA, NZIA and Machinery implementations.
  - The anti-SLAPP decree passed final cabinet approval and awaits publication.
  - The pay agreements need presidential decrees or final signature. EUR 189 (police and armed forces) and EUR 152 (municipal staff) are averages.
- **Reviewed as needing no explanation** (technical): e-evidence completion, recycled-plastic food contact, and the tax-code coordination corrections.
- **DPB 2027**: net expenditure growth of 3.3%, 1.7% and 0.2% including the defence and energy escape clause, or 1.9%, 1.7% and 1.5% excluding it. This is a plan, not law.
- **Energy bills decree (DL 21/2026)**: a common understanding with the Commission before formal notification under the Middle East state-aid framework. It is not an approval.
- **Puglia**: intercultural-mediator vouchers for schools (Determination 156/2026), deadline 21 October at 12:00.
- **Veneto**: EUR 4 million for machine-safety grants. The deadline is computed as 30 days from 22 September, i.e. 22 October, and this is stated as a calculation.

## Reader comprehension check

- **Amounts and their role**
  - IRL: a cap, not a mandatory rise.
  - Mon soutien psy: the EUR 30 / EUR 20 reimbursement split.
  - Pay rises: averages.
  - Grand Est EUR 2.57 million: grants to listed projects, not an entitlement.
- **Stage wording.** Resolution motions are labelled non-binding. Cabinet approval is never worded as publication.
- Each language was read on its own, then compared with the other.

## Validation

`data:topics`, `data:select`, `npm test` (288 passing), `tsc` and `build` pass; `data:coverage` exits 2. All new and changed records have `current` English bindings.
