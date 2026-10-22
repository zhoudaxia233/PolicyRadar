# PolicyRadar working rules

- Explain a policy question, not just an isolated document's latest status.
  Before reporting rejection, withdrawal or adoption, apply the policy-question
  completeness gate in `data/UPDATE.md`: verify current law, follow referenced
  alternative proposals, distinguish each version's stage, and explain affected
  people, rates and old/new-case transition dates in Chinese and English. Never
  equate one failed bill with the end of a reform, a ministry draft with enacted
  law, or one supportive speech with consensus. Save source-located review
  evidence; passing technical checks alone does not complete this review.

- Present one concrete policy matter once. Keep its signing, agreement text,
  approval, implementation, amendment, correction and other related official
  records as expandable children. Apply this consistently to official progress,
  unexplained listings, related explanations and navigation counts.
- Read `data/AREAS.md` before changing policy areas or the area overview. Each
  explanation has one reviewed area in `data/areas.json`; every chart count must
  equal the list count its click produces.
- Read `data/TOPICS.md` before changing intake, grouping or listing behavior.
  Maintain reviewed relations in `data/topics.json` and run `npm run data:topics`
  after every intake update. Resolve candidates from source identities and
  explicit document relationships; title similarity alone is not evidence.
- Preserve every original record, source link, identifier, date, territory,
  legal stage, verification state and archived revision. Grouping is presentation
  metadata, not a factual review or a statement that the whole matter is in force.
- Maintain regression coverage for positive grouping, false-positive separation,
  child search/filter behavior, multilingual labels and consistent counts.
- Let the layout explain the UI. Add no subtitle, prefix, caption, slogan or
  hint that restates what headings, grouping, position, icons, counts or
  controls already show, and no "click to", "expand" or visible "new tab" text.
  Keep text only for facts the layout cannot show: a record's stage at the
  time, the kind of date, a coverage gap, an explanation not yet translated,
  or that an empty list does not mean no policy change.
- Follow `data/UPDATE.md` for data updates and existing authorization boundaries
  for commits, pushes, merges and publication.
