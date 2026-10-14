# US crypto-asset targeted update — 14 October 2026

This is the ninth and last pass in the owner's one-country-at-a-time crypto search. The window is 1 January to 13 October 2026. No US crypto records existed before this pass.

## Result

Four new explanations, four intake rows, one partial Federal Register scan and one topic group.

### `us-clarity-act-market-structure` (pending; disputed)

- **House:** passage on 17 Jul 2025 by 294–134 (Roll No. 199), from CREC-2025-07-17 House.
- **Senate:** on 15 Sep 2026, cloture on the motion to proceed to H.R. 3633 (Calendar No. 423) failed 49–50 (Rollcall Vote No. 234). Senator Tillis entered a motion to reconsider. Source: CREC-2026-09-15 Senate.
- **Reader text:** the vote is presented as procedural; the Senate never debated or voted on the bill's content.
- **Dispute:** the ethics provision on officials' crypto interests is recorded as a dispute, from floor statements.
- **Content claims:** limited to the bill's long title as read in the cloture motion. Secondary descriptions of CFTC registration duties were removed because congress.gov and senate.gov returned 403 and the bill text was not archived.

### `us-genius-act-stablecoin-implementation` (adopted; effective 18 Jan 2027)

- **Statute (PL 119-27):**
  - § 20: the Act takes effect 18 months after enactment or 120 days after the primary federal payment stablecoin regulators issue final rules, whichever is earlier;
  - § 13: rules were due within one year;
  - § 3(b): the sale prohibition starts three years after enactment.
- **Rulemaking status:** a Federal Register API search found that, as of 13 Oct, the OCC, FDIC, Federal Reserve, NCUA, FinCEN/OFAC and Treasury § 3 rules are proposed rules. Treasury's interim final rule 2026-19966 is procedural, issued for the Stablecoin Certification Review Committee, which is not a primary regulator.
- **Effective date:** 18 Jan 2027 is therefore inferred, and the limits field says so. Any final primary rule issued from 14 Oct onward would trigger a date after 18 Jan 2027.

### `us-sec-crypto-asset-interpretation-2026` (adopted; effective 23 Mar 2026)

- FR Doc. 2026-05635 sets out the taxonomy.
- Digital commodities are not securities. Covered protocol staking and covered stablecoins involve no securities offering.
- It explains how a non-security asset can become subject to an investment contract.
- It does not replace Howey.

### `us-1099-da-cost-basis-2026` (adopted; from 1 Jan 2026)

- IRS Instructions for Form 1099-DA (2026):
  - gross proceeds are mandatory for every sale;
  - cost basis is mandatory for covered securities, meaning assets acquired after 2025 in the broker's custodial account;
  - de minimis rules: $10,000 for qualifying stablecoins and $600 for payment processor (PDAP) sales.
- Unsourced claims about Form 8949 and DeFi scope were removed before binding.

## Not reviewed

- The CFTC ANPRM of 13 Oct 2026 and the SEC crypto custody proposal of 6 Oct 2026, which are proposals near the end of the window.
- State-level rules and federal tax proposals such as a de minimis exemption; these were not searched.
- `data:coverage ... US` exits 2; all channels remain incomplete.

## Validation

`data:topics`, `data:select`, 259 tests (including `tests/us-crypto.test.ts`), TypeScript and build pass. All explanations have `current` English bindings.
