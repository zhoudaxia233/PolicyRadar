# US source registration

Added the federal level, 50 states and the District of Columbia. DC remains a
federal district; territories and freely associated countries in the USAGov
directory were excluded. State names and government links were read from the
USAGov directory and each linked state page; see source-directory.json. This
ledger records directory extraction, not archived policy evidence.

Federal entry points: White House presidential actions, Congress.gov, GovInfo
public/private laws and Federal Register collections, United States Code and eCFR.
The US Code returned a maintenance page; GovInfo's Federal Register collection
returned an empty extracted page. Neither is represented as successful document
evidence. Directory links do not prove state portal access.

No policy claim, intake record, factual-review timestamp or completed scan was
added. All US coverage remains open from 2026-01-01. Existing policy records,
revisions, scans, evidence and other countries' review settings are preserved.
No new matter relationships arise from source registration.

Chinese and English labels distinguish federal, state and DC scope and explicitly
state the unscanned status and excluded institutions. No amounts, eligibility
criteria, dates of legal effect or legal conclusions were introduced.

Validation: selection gate passed; 191 tests passed; TypeScript and the static
build passed; site size is 18 MB against the 700 MB limit. Browser verification
confirmed the Chinese US page, California region selection, and English source
headings with explicit unreviewed coverage. The country-wide recent coverage
report includes all 57 channels, all unscanned. The standard CLI with `US` checks
only exact federal-region channels; the saved country report uses the same
recentCoverage function with federal and US-* sources. No intake was changed,
so topic membership is unchanged. No commit or publication was performed.
