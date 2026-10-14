# Netherlands crypto-asset targeted update — 14 October 2026

This is the sixth pass in the owner's one-country-at-a-time crypto search; the window is 1 January to 13 October 2026. It builds on the France, Germany, EU, Italy and Spain passes from the same day.

## Result

Two new explanations, three intake rows, one partial scan and one topic group.

### `nl-box3-actual-return-crypto` (pending; next date 31 Dec 2026, a government target)

- **Current law first:** the Belastingdienst 2026 box 3 page lists cryptocurrencies under "beleggingen en andere bezittingen" at a 6.00% deemed return (final), with an allowance of EUR 59,357 and a rate of 36%. The consolidated Wet IB 2001, art. 2.13, confirms 36%.
- **Bill 36.748 (Wet werkelijk rendement box 3):**
  - the Tweede Kamer adopted it on 12 Feb 2026;
  - the Eerste Kamer debated it on 30 Jun and postponed its vote until the announced novelle;
  - on 7 Jul the Senate rejected motion M (Schalk), which would have said it had no objection to withdrawal; the voting record is archived;
  - planned start: 1 Jan 2028.
- **Government direction:**
  - The 14 Sep letter (EK Q) asks the Senate to hold the bill and sets out four scenarios.
  - The 30 Sep letter (EK 37.020 / 36.748 B, pp. 2–4) chooses a novelle: capital gains tax for all financial instruments from 2028, with other assets following in 2030.
  - For 2027 it proposes cutting the allowance to EUR 30,846 and raising the "overige bezittingen" deemed return by 1.5 percentage points. From 2028 there is a EUR 1,000 tax-free return.
  - The government wants the novelle passed in the Senate by 31 Dec.
- **Crypto:** in the Tweede Kamer plenary of 1 Oct (uncorrected record), State Secretary Eerenberg said the novelle can only extend the existing start-up securities exception and that crypto "feitelijk niet" fits. Directly held crypto therefore stays under accrual taxation in 2028–2029 and moves to taxation on sale only in 2030.
- **Not claimed:**
  - The novelle text: the Senate dossier lists no novelle as of 14 Oct, and a secondary report of a "draft novelle of 2 October" was not used.
  - The outcome of the House motion against the 2027 measures.
  - Whether crypto ETPs are financial instruments.

### `nl-dac8-crypto-reporting-law-2026` (adopted; in force 11 Apr 2026, retroactive to 1 Jan 2026; next date 31 Jan 2027)

- Stb. 2026, 79 (Wet implementatie EU-richtlijn gegevensuitwisseling cryptoactiva):
  - it amends the WIB with CASP due-diligence and reporting duties and CARF reporting on non-EU residents, with fines up to the sixth category;
  - art. V puts it in force the day after issue (10 Apr), retroactive to 1 Jan 2026;
  - the first report on 2026 data is due by 31 Jan 2027.
- Stb. 2026, 93: the implementing decree under art. 10oa WIB, which act no. 79 inserts. It was issued on 23 Apr and is retroactive to 1 Jan.

## Grouping

`nl-dac8-crypto-reporting` groups Stb. 2026, 79 and Stb. 2026, 93, because the decree names the article of the act that it implements. The box 3 letter is kept as a standalone intake record.

## Gaps

- The novelle text and the Raad van State advice on it.
- The outcome of House motions on the 2027 box 3 measures (1 Oct debate).
- The Dutch MiCA transitional period ended on 30 Jun 2025, outside the window, so it is not explained.
- `data:coverage ... NL` remains incomplete.

## Validation

`data:topics`, `data:select`, 250 tests (including `tests/netherlands-crypto.test.ts`), TypeScript and build pass. Both explanations have `current` English bindings.
