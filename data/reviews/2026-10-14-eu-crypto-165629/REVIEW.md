# EU crypto-asset targeted update — 14 October 2026

This is the third pass in the owner's one-country-at-a-time crypto search; the window is 1 January to 13 October 2026. It builds on the France and Germany passes from the same day.

## Result

Three new bilingual EU explanations, stored once under `EU` and not copied into national views:

| Explanation | Stage | Evidence |
|---|---|---|
| `eu-dac8-crypto-reporting-2026` | adopted; applies from 1 Jan 2026; next date 30 Sep 2027 (deadline) | Commission DAC8 page, "Background" and "Scope" sections |
| `eu-mica-transition-end-2026` | adopted; applies from 1 Jul 2026 | ESMA statement ESMA75-113276571-1679 (17 Apr 2026), pp. 1–3; ESMA MiCA register page (last updated 7 Oct) |
| `eu-misp-casp-esma-supervision` | pending | Council steering notes 8367/26 (24 Apr) and 9891/26 (8 Jun) |

No intake rows were added. The Commission taxation site, ESMA and Council documents are not registered EU discovery channels, so these are standalone explanations. Adding such channels is a registry decision for the owner.

## Editorial checks

- **DAC8:** application of a directive is distinguished from national transposition, and the passing of the deadline is not treated as proof of transposition. The explanation states that it changes no tax rate. The first exchange deadline (30 Sep 2027) is a `deadline`, not a commencement date. Platforms' national reporting dates may be earlier.
- **MiCA:** 1 July 2026 is the date the licensing requirement applies, not MiCA's entry into force. The explanation notes that ESMA's statement sets supervisory expectations while enforcement stays with national authorities, and that some national periods ended earlier. The French national MiCA explanation stays separate.
- **ESMA supervision package:** the Presidency notes are not a Council position. The explanation records the 5 May ministerial preference for "significant CASPs only" and the European Council aim of agreement by the end of 2026, which is not an adoption date. The exception for already-regulated financial institutions, reported by secondary sources, was not verified and is not stated as fact.

## Gaps

- EUR-Lex returned an empty HTTP 202 response again. The DAC8 legal text is not archived; the reader text says so.
- An ESMA statement of 23 June 2026, reported by secondary sources, was not retrieved.
- European Parliament progress on the supervision package was not checked, and the Commission proposal text was not read.
- AMLR (Regulation (EU) 2024/1624), which bans anonymous crypto accounts, starts to apply in 2027 and was adopted in 2024. It is outside this window and not explained here; it is a lead for a later pass.
- `data:coverage ... EU` exits 2: all EU channels remain incomplete.

## Validation

`data:topics`, `data:select`, 243 tests (including the new `tests/eu-crypto.test.ts`), TypeScript and build pass. All three explanations have `current` English bindings.
