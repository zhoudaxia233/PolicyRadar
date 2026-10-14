# Italy crypto-asset targeted update — 14 October 2026

This is the fourth pass in the owner's one-country-at-a-time crypto search; the window is 1 January to 13 October 2026. It builds on the France, Germany and EU passes from the same day.

## Result

Two new explanations, four intake rows, one partial scan and one topic group.

### `it-crypto-gains-tax-33-2026` (adopted; applies 1 Jan 2026; next step 1 Jan 2027)

- The text of L. 207/2024, art. 1(24), in force on 14 October 2026 ("Testo in vigore dal: 12-8-2026"), applies a 33% substitute tax to crypto gains realised from 1 January 2026.
- L. 199/2025, art. 1(28) added a 26% rate for euro-denominated e-money tokens. These must be stably pegged to the euro, with reserves held entirely in euro assets with EU-authorised entities. Euro ↔ euro-EMT conversion and redemption at par are not realisation events.
- Comma 25 removed the EUR 2,000 threshold from 2025. Commi 26–29 offered an 18% step-up (paid by 30 Nov 2025, up to three instalments).
- **Completeness gate:** a press-reported Milleproroghe amendment to postpone the increase to 2027 is not in the text in force on 14 October. The latest Normattiva version ("in vigore dal 1-1-2027") marks comma 24 as **repealed by D.Lgs. 19 giugno 2026, n. 117**. That decree approves a new income-tax consolidated text, in force from the day after publication (GU 3 July 2026). The annex provision carrying the crypto rate could not be retrieved: the AKN export returned only a portal page. The explanation therefore says the rule moves into the new code from 2027 and explicitly does not infer the 2027 rate.
- Non-euro stablecoins (for example USD EMTs) fall outside the 26% exception by the text's own wording.

### `it-isee-crypto-holdings-2026` (adopted provision; implementation pending)

- L. 199/2025, art. 1(32–34) adds foreign-currency deposits abroad, cryptocurrencies and remittances to ISEE assets.
- Implementation requires a ministerial decree amending DPCM 159/2013, issued after consulting the Conferenza unificata. Benefit bodies then adapt within 90 days, and existing benefits continue until then.
- The INPS DSU notice of 6 March 2026 (archived, D.M. 3/2026) does not mention cryptocurrencies. No implementing decree was found, so implementation is not claimed.
- The explanation is filed under social security, not tax.

## Grouping

- `it-crypto-gains-rate` groups L. 207/2024 c.24, L. 199/2025 c.28 (which expressly amends c.24) and D.Lgs. 117/2026 (which, per Normattiva, repeals c.24 from 2027).
- The basis states that D.Lgs. 117 covers many other provisions and that grouping implies no 2027 rate.
- The ISEE provision stays separate.

## Scan correction

The scan first referenced the 2024 and 2025 law records, which fall outside its 2026 window, and the selection gate rejected it. The scan now references only the in-window D.Lgs. 117 record; the historical records remain intake backfill.

## Gaps

- Annex text of the new consolidated income-tax code (crypto article and rate from 2027).
- The ISEE implementing decree.
- Italian DAC8 transposition and Italian MiCA transitional arrangements were not reviewed (the EU-level explanations cover the EU rules only).
- `data:coverage ... IT` exits 2; all channels remain incomplete.

## Validation

`data:topics`, `data:select`, 246 tests (including `tests/italy-crypto.test.ts`), TypeScript and build pass. All new records have `current` English bindings.
