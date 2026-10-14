# Spain crypto-asset targeted update — 14 October 2026

This is the fifth pass in the owner's one-country-at-a-time crypto search; the window is 1 January to 13 October 2026. It builds on the France, Germany, EU and Italy passes from the same day.

## Result

Two new explanations, two intake rows and one partial BOE scan.

### `es-dac8-tax-bill-121-60` (pending)

- Government bill 121/000060 transposes DAC8: "criptoactivo" replaces "moneda virtual", crypto service providers get due-diligence and reporting duties, and crypto-assets can be seized.
- **Parliamentary record:**
  - BOCG A-60-1 (13 Jun 2025): bill text; amendment period to 1 Sep 2025.
  - A-60-2 (7 Oct 2025): one amendment to reject the whole text.
  - A-60-3 (5 Nov 2025): article amendments.
  - A-60-4 (3 Dec 2025): the plenary takes back the final debate and vote.
  - A-60-5 returned HTTP 404 on 14 October 2026.
- **Not law:** queries to the BOE consolidated-legislation API (title "criptoactivos"; full text "criptoactivos" from 2026-01-01 to 2026-10-13; title "Ley 58/2003") found no 2026 law transposing DAC8. The AEAT 2026 control plan (BOE 12 Mar 2026) still refers to the "futura transposición de la DAC8". The JSON API responses are recorded in the ledger but are not archivable snapshot types.
- **Completeness gate:** Sumar amendment no. 5 (A-60-3, pp. 6–7) would move gains on non-financial-instrument crypto-assets from the savings base to the general base. Its text states no rate. The press figure of 47% is labelled unverified. No outcome of the amendment exists because the bill has not been reported or voted. Current law (savings base) is stated first.
- **Regional lead:** Bizkaia's Decreto Foral Normativo 3/2026 (BOB 3 Jul 2026, in force 4 Jul) was seen only in a secondary source (Iberley). It is named as unverified and not explained.

### `es-rdl-25-2026-casp-aml` (adopted; in force 1 Oct 2026)

- The first final provision of RDL 25/2026 amends AML Law 10/2010:
  - MiCA definitions of crypto-asset and CASP;
  - authorised CASPs become obliged entities (art. 2.1.z), with crypto-asset advice excluded;
  - self-hosted address defined by reference to Regulation (EU) 2023/1113;
  - correspondent-relationship rules extended to crypto.
- In force under the ninth final provision. Congressional convalidation under Constitution art. 86 is pending; no result was found, and the reader text says so.

## Editorial decisions

- The AEAT control plan is a multi-topic administrative plan, so it is kept as a separate intake record and not grouped into the bill's matter.
- RDL 25/2026's other measures (VAT, fuel taxes) are not explained; the intake note says the explanation covers only the crypto provision.
- The CNMV internal-rules resolution (BOE-A-2026-14432) is excluded in the scan, with a reason.

## Gaps

- Bizkaia DFN 3/2026 original text, and other forales.
- Whether RDL 25/2026 has been convalidated.
- Spanish MiCA transitional dates. Secondary sources say 1 July 2026; the EU explanation covers the EU-wide end date.
- `data:coverage ... ES` exits 2; all channels remain incomplete.

## Validation

`data:topics`, `data:select`, 248 tests (including `tests/spain-crypto.test.ts`), TypeScript and build pass. Both explanations have `current` English bindings.
