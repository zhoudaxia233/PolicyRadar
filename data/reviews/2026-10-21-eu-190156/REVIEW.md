# EU update — 21 October 2026

## Scope and result

The owner asked what in the EU is relevant to them and for an update. The window is 17–21 October. 21 October is the current day and is not closed. Every scan is `partial`, and `data:coverage` exits 2.

| Change | Policy | Detail |
|---|---|---|
| New explanation | `eu-passenger-rights-enforcement-2026` | 2023/0437(COD), pending |
| Revised | `eu-epr-authorised-representative-suspension` | v1 → v2: plenary vote held 20 October, result not listed |
| Revised | `eu-epr-waste-directives-suspension` | v1 → v2: plenary vote held 20 October, result not listed |
| Revised | `eu-erasmus-plus-2028-2034` | v1 → v2: vote rescheduled to 22 October |

New intake:

- the Parliament plenary preview on passenger rights;
- one ESMA item (20 October), awaiting explanation.

There are no new topic groups. `data:topics` reports no candidates for the new records. No application code changed. Regression test: `tests/october-21-eu.test.ts`.

## Evidence route

| Source | What happened |
|---|---|
| EUR-Lex | Returned empty HTTP 202 for every request: Official Journal daily views and Parliament texts adopted. Rendering the Official Journal page gave only the site shell. |
| Publications Office SPARQL endpoint | Public, read-only. Used to list Official Journal acts by `official-journal-act_date_publication` for 16–21 October. |
| Legislative Observatory | Procedure-file PDFs for 2023/0437, 2025/0395, 2025/0396 and 2025/0222 were fetched and archived. |
| Parliament plenary preview | Archived. |

From the SPARQL list:

- The delegated act C(2026)6694 for the EUR 2 handling fee is not in the list. The parcel explanation already says the fee only starts after publication, so it was not revised.
- The other acts were not recorded as intake (a stated gap). They include:
  - plant-protection residue limits and food additives;
  - trade-defence duties, including the repeal of the solar-glass duties on China;
  - Council decisions, among them lifting the Hungary rule-of-law measures;
  - merger notices.

## Source-located review

### Passenger rights enforcement (2023/0437(COD))

- **Content:** taken from the Parliament plenary preview for 20 October.
  - Intermediary bookings: a full refund including the intermediary fee, and disclosure of refund arrangements at booking.
  - Standard multilingual claim forms for all modes of transport.
  - A necessary accompanying person flies free.
- **Stage** (Legislative Observatory):
  - agreed text approved in committee on 2 September;
  - "Results of vote in Parliament" dated 20 October, with no outcome or text number listed;
  - status line still "Awaiting Parliament's position in 1st reading".
- **Next steps:** Council adoption and publication are still needed. The application date is unknown.
- **Related act:** the explanation states that this is separate from the already published air passenger rights reform (application on 23 October 2027).
- **Not read:** the agreed text itself.
- **Reader example:** a EUR 200 ticket plus a EUR 15 fee gives a EUR 215 refund under the new rule, marked as hypothetical and as not yet applying.

### EPR authorised-representative suspensions (2025/0395 and 2025/0396)

- **Procedure file:** debate on 19 October; "Results of vote in Parliament" on 20 October. No outcome is listed.
- **What changed in the records:** the elapsed `nextDate` (19 October) was cleared; the stage stays `pending`; no outcome was invented.

### Erasmus+ 2028–2034 (2025/0222)

- **Procedure file:** "Vote in plenary scheduled" on 22 October.
- **What changed in the record:** `nextDate` moved to 22 October.
- **Reader text:** a plenary vote would only set Parliament's position; negotiations with the Council follow.

## Reader comprehension check

- The refund amount is labelled as the ticket price plus the intermediary fee, in a hypothetical example.
- A vote that was held is never presented as adoption. Every revised record says the result is not published.
- Each language was read on its own and then compared for the same dates and stage.

## Gaps

- The vote results for 20–21 October could not be read (HTTP 202).
- Official Journal acts of 16–21 October are not recorded as intake.
- Not scanned:
  - the Commission press corner;
  - the Council register;
  - the elapsed DiscoverEU deadline (15 October).
- The DiscoverEU card already shows the elapsed-deadline label.

## Validation

These all pass, with logs in this directory:

- `data:topics`
- `data:select`
- `npm test`: 313 tests
- `tsc`
- `npm run build`

All four changed policies and both intake rows have `current` English bindings.
