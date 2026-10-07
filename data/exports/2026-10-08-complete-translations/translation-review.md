# Translation completion review

The selected baseline was `2026-10-07-spain-title-translations`. This pass
addresses missing reader translations across the current site, prompted by
untranslated EU titles. It does not claim to translate the full linked legal
instruments or complete their outstanding substantive review.

## Coverage

All 2,942 current discovery records now have Chinese display text and current
German/English translation bindings. The 1,874 new superseding records cover:

| Country or jurisdiction | Titles completed |
| --- | ---: |
| European Union | 185 |
| United Kingdom and constituent parts | 1,662 |
| Germany | 10 |
| France | 1 |
| Netherlands | 1 |
| Switzerland | 3 |
| Italy | 12 |
| Spain | 0; existing translations already current |

All 274 existing policy explanations have current translations, including
summaries, before/after descriptions, limits, rules, events, political context,
source labels and notes. Existing intake notes and tags were already covered.
Two missing German ministry source headings were added to the catalog.
The catalog gained 1,841 unique entries; repeated titles share entries.
No previously existing translation entry or binding was overwritten.

## Editorial checks

Compared missing titles with the stored official titles. EU titles distinguish
signing, provisional application, conclusion, proposed amendments, court
judgments and corrigenda. Concise reader titles retain the subject and relevant
qualification; the exact official title remains alongside them for traceability.

UK drafts were assisted by locally executed translation models, followed by
comparison and corrections. Repeated flight restrictions, road restrictions and
commencement instruments use consistent wording. Checks covered years, numbered
amendments and stages, territory, speed units, and explicit revoked status.
Proper names, road identifiers and product names remain recognizable.

Corrected recurring mistranslations, including saving provisions versus savings
accounts, commencement versus commencement of repair work, vapes versus vapour,
up-rating versus upgrading, revoked versus revocable, non-domestic rating,
visitor levies, fostering, election officers, and road abandonment. Source titles
about ordinary savings accounts still refer to savings; legal saving provisions
refer to preservation of existing rights. Commencement batches are not presented
as proof that the whole parent law is already effective.

## Preservation and cause

The intake workflow permits records before translation is complete; earlier
checks covered specific batches and policy explanations without requiring
translation coverage of every currently projected discovery. A new regression
suite now checks the complete current projection, nested policy text, and reader
source/review notes. This does not change the rule permitting honest incomplete
intake; newly selected untranslated data must be explicitly addressed when the
coverage regression fails.

The export appends superseding intake rows. Original rows, policy revisions,
source snapshots, checks, scan results, discovery dates, substantive stage,
coverage and factual-review timestamps remain unchanged. The manifest enumerates
every superseding row. Translation freshness is bound to projected content hashes.
No new evidence fetch or legal-effect verification is claimed.

## Validation

- Candidate and selected-export history/preservation checks passed.
- All 166 tests passed, including all-current translation coverage and UK
  identifier/qualifier regression checks.
- TypeScript passed with `--noEmit --incremental false`.
- Candidate and default static builds passed: 274 policies, 352 revisions,
  and 2,015 verified archived evidence files.
- Local browser rendered all 190 EU and 1,675 UK discovery cards; every Chinese
  card heading contained translated Chinese text. EU German and English titles
  and notes were inspected; no browser console errors were recorded.
- Chinese EU layout was visually checked at the browser's normal viewport.

This is a local prepared update. No commit, push or deployment was performed.
