# Record-stage presentation audit, 8 October 2026

Baseline: `data/exports/2026-10-08-bmf-timeline-213634/policy-radar-export.json`.
Scope: current record/policy stage consistency and presentation, including grouped
historical records and competing instruments. This is not a comprehensive refresh
of every country's legislation or a completion of discovery coverage. No source
verification timestamps, intake stages, policy facts or historical exports changed.

## Coverage

| Territory | Policy explanations | Current official records |
| --- | ---: | ---: |
| France | 37 | 31 |
| Netherlands | 37 | 27 |
| Switzerland | 38 | 20 |
| Italy | 52 | 63 |
| EU | 21 | 413 |
| UK | 13 | 1,675 |
| Spain | 10 | 874 |
| US | 5 | 120 |
| Total outside Germany | 213 | 3,223 |

Screened every current non-German policy and record, all resolved groups, direct
policy/record identity matches, pending policies with effective dates, normalized
phase/status conflicts and elapsed pending milestones. There are no non-German
pending policies with populated effective dates, no normalized phase/status
conflicts, and no mismatched verified stages on directly linked policy/record
identities. These structural results do not prove legal accuracy.

The shared official-record renderer now scopes every badge to its record's time
in Chinese and English. Rendering tests cover all groups, including singleton
records. The CARF case checks pending and adopted stages together. Closed-proposal
details no longer imply expected commencement or enacted changes. The rejected
Green proposal remains discoverable through all-policy searches.

## Four mixed-stage matters reviewed

- **US scholarship credit:** temporary regulation FR 2026-20264 and proposed
  regulation FR 2026-20277 are separate instruments, not contradictory statuses.
  Live official text confirms ACTION: Temporary regulations and 1 December 2026
  effectiveness in the former (Dates); the latter says ACTION: Notice of proposed
  rulemaking and public hearing, with a 1 December comment deadline. Preserve
  adopted/pending separately. Added a dedicated rendering regression.
  Sources: https://www.govinfo.gov/content/pkg/FR-2026-10-02/html/2026-20264.htm
  and https://www.govinfo.gov/content/pkg/FR-2026-10-02/html/2026-20277.htm.
- **French construction diesel aid:** the official guidance, updated 5 October,
  confirms the October extension and explicitly links Decree 2026-921. The
  unverified decree record and confirmed guidance represent different evidence
  states; do not silently upgrade the decree's verification. Source re-read:
  https://entreprendre.service-public.gouv.fr/actualites/A18905, introduction
  and legal references. No claim of renewed direct verification of Legifrance.
- **EU pig/poultry UCOL:** adopted implementing decision plus supporting annex,
  staff paper and news records with unverified intake states. The archived
  official news explicitly calls the UCOL rules adopted. Live web extraction
  failed; retained the existing evidence state. Archive:
  `data/sources/14931258c2ddb58d0a20a29f1e3b5422ff3a514a31dae0549b7a137bcc0d95c3.html`,
  fetched 8 October, opening announcement. No group-wide stage inferred.
- **EU RRF annual report:** published Commission report versus Parliament's
  preparatory procedure. Archived OEIL COM(2026)0546 says "Commission document
  (COM)" and "Preparatory phase in Parliament"; the Commission's 7 October
  release introduces the fifth annual report. These are distinct procedural
  facts, not a pending law replacing an adopted law. Live retrieval failed.
  Archives: `data/sources/cabff35390ccc5c1e73a0f33183f9f5b4f47dcd03ed23f60ced16cf7ca81e3b0.html`
  (Procedure type / Stage reached) and
  `data/sources/8e3ce6828ed8aa0cd73204f2b3a45703661b7459e16b1adb1b829a7f542701e3.pdf`
  (opening / Background), both captured 8 October.

## Elapsed pending milestones and remaining verification limits

- `fr-32-carpool-strategy`: scheduled 5 October consideration. Live source
  https://www.hautsdefrance.fr/le-5-octobre-suivez-en-direct-la-seance-pleniere/
  returned HTTP 403. Final outcome remains unverified, not assumed adopted.
- `fr-06-port-tariff`: 1 September operational handover is not evidence of final
  tariff commencement. The live Mayotte announcement still describes the
  board's 19 August adoption of a draft tariff and planned handover. It does not
  establish the definitive tariff's effective date. Source:
  https://www.mayotte.fr/actualite/le-port-de-longoni-prepare-une-nouvelle-etape-de-son-developpement,
  opening and "Garantir la continuité au 1er septembre". Retain uncertainty.
- `nl-nh-zoning-consultation-2026`: 7 October is the consultation opening, not
  adoption. The archived 6 October announcement says consultation lasts until
  17 November, with adoption expected at end-2026 and operation from February
  2027. Live extraction returned navigation/contact content only. Archive:
  `data/sources/3b5a83a89981e9e11fa37efc0211e540f3b92562d98a20949a857ad2f3f1e94b.html`,
  "Reageren op de voorgestelde wijzigingen". Do not infer passage from the date.

No additional factual stage correction was established in this pass. The shared
presentation repair applies to all countries. The blocked/insufficient live
sources above remain explicit follow-up limits rather than completed legal checks.
