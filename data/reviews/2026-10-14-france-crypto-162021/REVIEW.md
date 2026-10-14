# France crypto-asset targeted update — 14 October 2026

The owner requested a crypto-asset-only pass across supported countries, one country at a time, within the tracking window (1 January to 13 October 2026). This directory covers **France only**.

## Result

Four new bilingual explanations (version 1, with revisions), six new intake rows, two partial or blocked scan rows, two reviewed topic groups and one regression test file. Fourteen source requests are recorded in `fetch-ledger.json`: eleven succeeded (archived bytes; the bill PDF and Senate fraud-law dossier reused existing hashes) and three failed.

| Explanation | Stage | Key evidence |
|---|---|---|
| `fr-plf2027-crypto-tax-amendments` | pending (committee only) | I-CF1826, I-CF798, I-CF1822, I-CF821, I-CF1564 PDFs; bill no. 3210 art. 28; PLF 2027 dossier |
| `fr-crypto-gains-social-levy-2026` | adopted | LFSS 2026 final text (T.A. 199) art. 12; Senate dossier |
| `fr-mica-casp-transition-end-2026` | adopted, applies 1 July 2026 | AMF notice of 5 February 2026 |
| `fr-fraud-law-crypto-2026` | adopted | T.A. 279 arts 20 quinquies and 20 sexies A; Senate dossier |

## Policy-question completeness gate

**The owner's question: "France will tax 30%+ when you convert crypto into stablecoins."**

- *Current law:* crypto-to-crypto swaps, stablecoins included, defer tax under article 150 VH bis. The I-CF1826 explanatory statement and the I-CF798 statement (losses offset only within the same year) confirm the baseline. The consolidated article on Légifrance returned HTTP 403, so the 305 EUR threshold and the progressive-scale option are not claimed.
- *The "30%+":* this is the existing flat rate. LFSS 2026 art. 12 (T.A. 199, p. 14–15) raises CSG on capital income from 9.2% to 10.6%, from the taxation of 2025 income. That takes the flat rate from 30% to 31.4% (12.8% income tax + 18.6% social levies). The 12.8% and the other levy components were not retrieved from Légifrance; the reader text says so. The rate applies to the **gain**, not the amount swapped.
- *Instrument and stage:* I-CF1826 (Sansu, GDR) was adopted by the Finance Committee on 2026-10-07T21:11:59+02:00 (open-data `dateSort`). It removes deferral for swaps into MiCA e-money tokens and switches to weighted-average cost per asset, with two transition options for pre-2027 holdings. It would apply to sales and swaps from 1 January 2027. **It is not in the government's bill.** For finance bills, the plenary debates the government's text, so committee amendments must be re-tabled. The dossier read on 14 October shows the part-one plenary from 13 October and no result for these provisions. A press claim of a 20 October solemn vote was not confirmed officially and is not used as a date.
- *Other active versions:* the government bill's art. 28 II B (p. 96, explained on p. 98) only aligns the 150 VH bis definition with MiCA and excludes MiCA art. 2(3)–(4) assets. Companion committee amendments: I-CF798 (10-year loss carry-forward, adopted 7 Oct), I-CF1822 (crypto exit tax above EUR 800,000 for moves from 2027, adopted 8 Oct), I-CF821 (reporting of self-custody wallets ≥ EUR 100,000, adopted 9 Oct, no first year stated). I-CF1564 (EUR 1,000 purchase exemption) was rejected on 9 Oct. No other alternative bill was found in this pass.
- *Worked example (hypothetical):* buy BTC for EUR 1,000 in 2026 and swap all of it into USDC at EUR 3,000 in March 2027. That is no tax under current law, versus about EUR 628 if I-CF1826 is enacted unchanged at 31.4%.

## Reader comprehension checks

- Every rate names its base (gain, not swap amount).
- Committee adoption is never called adoption.
- "E-money token" is first explained as "a stablecoin pegged to a fiat currency".
- The 31.4% composition states which parts were verified.
- The AMF notice date is distinguished from platforms' status after 1 July.
- NFT article numbers are flagged as T.A. 279 numbering.
- Chinese and English were reviewed separately for the same amounts, dates and stages.

## Grouping

- `fr-plf2027-crypto-tax`: the four committee-adopted amendments to bill no. 3210. The wider budget record `fr-an-3210` and explanation `fr-finance-bill-2027` stay separate because they cover many unrelated measures.
- `fr-fraud-law-2026-534`: the existing general explanation of Act 2026-534 and the new crypto explanation, both identified by that Act. Each keeps its own commencement.
- The LFSS 2026 record and the MiCA transition remain standalone.
- No grouping relies on keyword similarity.

## Gaps and unresolved leads

- **Légifrance** (JORF articles 54310089/54310086 and the consolidated 150 VH bis) returned Cloudflare verification or HTTP 403. This was not bypassed. Final article numbers of Act 2026-534 and the current codified rates remain unverified.
- **AMF** is not a registered discovery channel, so the MiCA explanation has no intake row. Adding a recurring AMF channel is a registry change and is left for the owner. The AMF's full-year news, warnings and authorised-list changes were not reviewed. The 117/83 PSAN figures in the press are not used.
- The DAC8 French implementing decree (reported as décret 2025-1276) was not retrieved and is not explained here. EU-level DAC8 is to be handled in the EU pass.
- Only the located committee amendments were read, not all 3,891 part-one amendments. Plenary outcomes must be rechecked.
- `data:coverage ... FR` exits 2: all five national channels remain incomplete. This targeted search closes no date window.

## Validation

`data:topics`, `data:select`, 239 tests (including the new `tests/france-crypto.test.ts`), TypeScript and the static build pass. Built `dist/data.json` contains all four policies with `current` English bindings.
