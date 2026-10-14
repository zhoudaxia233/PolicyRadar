# Germany crypto-asset targeted recheck — 14 October 2026

This is the second country in the owner's one-country-at-a-time crypto pass. The window runs from 1 January to 13 October 2026, and pending matters were revisited on 14 October. It builds on the France pass in `2026-10-14-france-crypto-162021`.

## Result

| Change | Record | Evidence |
|---|---|---|
| v2 → v3 | `de-bmf-crypto-tax-reform-2027` | hib 807/2026 (12 Oct); BMF draft page unchanged since 13 Oct (identical hash) |
| v8 → v9 | `de-carf-agreement-2026` | BR-Drs. 336/26 (B) of 10 July; Bundesrat agenda for the 1069th session (16 Oct) |
| new v1 | `de-kmanzv-2026` | KMAnzV full text: signed 20 May 2026, BGBl. 2026 I Nr. 153, in force 1 July 2026 (§ 9) |
| new intake | `de-bt-petition-crypto-holding-20261012` | Bundestag text archive, KW42 petitions page |
| new intake | `de-bgbl-2026-i-153-kmanzv` | federal law database |

`de-crypto-reporting-dac8` and the closed Green bill `de-crypto-holding-proposal` remain accurate and are unchanged.

## Completeness gate (holding-period question)

- **What applies now:** unchanged. The one-year rule in § 23 EStG still applies.
- **BMF draft:** at the Petitions Committee's public session on 12 October, a BMF representative said the draft is "aktuell in der Ressortabstimmung" and that the outcome "bleibt in der Sache abzuwarten". The BMF draft page bytes are identical to those of 13 October.
- **Cabinet date:** press reports of a cabinet decision on 14 October (cryptoticker, cointracking) were **not** confirmed officially. They are named as unconfirmed and not set as `nextDate`. A stock3 article claiming an earlier cabinet decision refers to the July budget draft.
- **Petition:** it asks to keep the holding period, has 44,439 co-signatures and is pending. The committee made no decision. It joins the reviewed `de-crypto-holding-period` matter because the official report explicitly responds to the BMF draft. The second petition on the same page (animal-testing law) is unrelated and is excluded from the explanation.
- **CARF (21/7195):** the Bundesrat's first round (10 July) raised no objections. The 16 October agenda, read on 14 October, does not list the bill. The second round, signature, promulgation and the date the agreement takes effect remain open. The Bundesrat document dates the agreement 8 June 2023, while the BMF page title uses 26 November 2024. Both remain visible; neither is used as a commencement date.

## Reader comprehension checks

- The KMAnzV explanation states that it binds supervised firms only, with no new duty for users.
- "Ressortabstimmung" is rendered as interministerial coordination, not cabinet approval.
- Chinese and English were reviewed separately for the same dates and stages.

## Tests

- Added `tests/germany-crypto-recheck.test.ts`. It checks that a petition statement is not treated as a cabinet decision, and that the petition is grouped with the holding-period matter, not with CARF.
- `tests/carf-vote.test.ts` checked a frozen 8 October export against live bindings, so it broke when CARF was legitimately revised. It is now pinned to `tests/fixtures/carf-vote-bindings.json` (the HEAD binding for version 8), following the existing fixture pattern. Its assertions are unchanged.

## Gaps

- A full search of Federal Law Gazette issues for 2026 crypto provisions was not performed. KMAnzV was found by targeted search. KMAG amendments reported for February and March 2026 (BGBl. 2026 I Nr. 33 and Nr. 81, art. 21) were not reviewed.
- The cabinet outcome for 14 October must be rechecked.
- `data:coverage ... DE` exits 2: all 9 federal channels remain incomplete. This targeted pass closes no date window.

## Validation

`data:topics`, `data:select`, 241 tests, TypeScript and build pass. The built data shows `current` English bindings for all changed and new records.
