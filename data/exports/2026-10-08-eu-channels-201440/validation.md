# Pre-publication validation

- `npm test`: 188 passed, 0 failed.
- TypeScript: passed with incremental compilation disabled.
- Candidate static build and selected default build: passed; 277 explanations, 359 revisions, 2,367 archived evidence entries validated.
- Data selection and old-to-new immutable-history regression: passed.
- Topic review: 17 added concrete matters; remaining generic corrigenda and geographical-indication candidates intentionally remain separate, as documented in review.md.
- Recent EU coverage: exit 2; all four channels retain gaps for 1–7 October. This is an expected incomplete-coverage result, not full coverage.
- Site size: 18 MB against the 700 MB guard.
- Preview browser: Chinese repair search gives one matter with two original children; keyboard Enter expands children; detail shows July 2026 old/new-contract transition and July 2027 platform deadline. English child search for 6899 returns one matter and three matching originals. At 390 × 844, document width equals viewport width; long original titles wrap and source links remain reachable.
- A historical crypto test now uses its preserved as-of topic fixture. Current reachability testing compares the entire current EU inventory instead of freezing the previous record count.

The PR must additionally pass CI and deploy to the exact merged main commit; live data identity and browser behaviour are checked after deployment.
