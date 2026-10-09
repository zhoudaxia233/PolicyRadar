# Move the selected data to an in-place store, 9 October 2026

Owner decision: option A — stop copying the whole dataset on every update.

- Before: each update wrote a full `data/exports/RUN/policy-radar-export.json` (12.4 MB on 9 October, growing about 2 MB a day). GitHub rejects files above 100 MB, and the CI history gate read each file through a 32 MB buffer, which would have failed first.
- Now: `data/store/` holds `meta.json` and per-table folders of consecutive 1,000-row chunks in original order (largest chunk about 1–3 MB). Updates edit it in place; git history keeps earlier versions.
- Migration is representation only: the store was written from `2026-10-09-rendered-channels-222019`, `data:select` validated it against that committed export, and the built `dist/data.json` is byte-identical before and after.
- The 50 existing per-run exports stay frozen for regression tests and historical builds; none were edited or moved.
- Gates: `data:select` compares the working tree with `HEAD`; the CI history gate validates every change to `data/store/`, keeps per-run files immutable and forbids moving the pointer back. Buffers raised to 512 MB.
- Regression tests: exact round trip, appending touches only the last chunk, missing chunks rejected, every chunk under 5 MB, pointer safety, selection gate on the store (corrupt archive and lost row rejected), and history-gate transitions (legacy → store accepted, lost policy and move back rejected).
