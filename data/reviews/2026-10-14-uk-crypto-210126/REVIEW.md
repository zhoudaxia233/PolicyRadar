# UK crypto-asset targeted update — 14 October 2026

This is the eighth pass in the owner's one-country-at-a-time crypto search. The window is 1 January to 13 October 2026. No UK crypto records existed before this pass.

## Result

Three new explanations, two intake rows and one partial legislation.gov.uk scan.

### `gb-carf-reporting-2026` (adopted; in force 1 Jan 2026; next date 31 May 2027)

- S.I. 2025/744 (made 24 Jun 2025) and the HMRC guidance (updated 3 Jun 2026).
- **Who is covered:** all users are due-diligenced. Reports cover UK residents and residents of other CARF countries. Including UK residents is a deliberate contrast with exchange-only regimes.
- **Dates:** the first report window runs from 1 Jan to 31 May 2027 and covers 2026. Platforms must notify users by 31 January after the first reporting year (reg. 8).
- **Penalties (regs. 11–14):**
  - platforms: up to £100 per user for failing to apply due diligence, £300 per user for failing to obtain a valid self-certification, and £5,000 for a late report;
  - users: a separate penalty of up to £300 (reg. 13) for not providing a self-certification deliberately or through lack of reasonable care. A secondary source presented this ambiguously; the regulation text confirms it.

### `gb-fsma-cryptoasset-regime-2027` (adopted; full commencement 25 Oct 2027; next date 28 Feb 2027)

- S.I. 2026/102 was made on 4 Feb 2026. Reg. 1(2) sets the full commencement day of 25 Oct 2027. Reg. 1(3) brings preparatory powers into force at the end of 21 days after making; no computed calendar date is stated.
- The FCA published its final rules on 30 Jun 2026 (policy statements including PS26/9).
- The transitional application window runs from 30 Sep 2026 to 28 Feb 2027.
- The current position (MLR registration since January 2020, financial promotions) is sourced to the FCA policy-statement page.

### `gb-defi-loans-pools-cgt-2027` (pending draft)

- The HMRC policy paper, impact note and draft legislation of 13 Jul 2026 propose a new TCGA 1992 Part 4A. It would apply no-gain-no-loss treatment to single-asset lending, borrowing and AMM pools from 6 Apr 2027 and affect about 700,000 people.
- Current law is stated first: CGT of 18% or 24% from 6 Apr 2026 and an annual exempt amount of £3,000.
- The Bills API (14 Oct) lists the Finance Act 2026 as the latest finance legislation; no Finance Bill 2026-27 has been introduced.
- Secondary claims that staking is covered are not adopted, because the draft lists only lending, borrowing and AMM pools.

## Not reviewed

- The Bank of England systemic stablecoin regime and FCA stablecoin issuance rules beyond the overview.
- The cryptoasset financial promotion regime changes.
- `data:coverage ... GB` exits 2; all channels remain incomplete.

## Validation

`data:topics`, `data:select`, 255 tests (including `tests/uk-crypto.test.ts`), TypeScript and build pass. All explanations have `current` English bindings.
