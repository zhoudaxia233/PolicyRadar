# One matter, multiple documents

A reader should see one concrete matter with expandable official documents and
steps. For example, an EU agreement's signing decision, agreement text and
conclusion decision are three documents about one matter, not three independent
policies. An explanation of benefit eligibility and a reminder of that same
benefit's deadline can also belong together; preserve both explanations.

`topics.json` is reviewed presentation metadata. Each entry includes a stable ID,
a Chinese/English title, an English explanation of the relationship and
explicit document references. Numbered references use region plus official ID;
unnumbered references require region, exact URL **and original title**. References
resolve against the current projection so translation corrections do not break
membership. Existing immutable exports are not rewritten or copied to add groups.
The build validates every reference and emits resolved groups in `data.json`.

## Required review on intake updates

1. Run `npm run data:topics -- <candidate-export>` (or omit the path for the
   selected export). Inspect all new documents against existing matters and
   explanations, including originals and explicit cross-references. The command
   surfaces exact titles, document numbers, named corrections, commencement
   series and case numbers as candidates. It does not establish semantic identity.
2. Add documents to an existing matter where a shared concrete change is
   established. Otherwise create a reviewed group once two related current
   records exist. Record the reason and accurate titles in both languages.
   Preserve source-derived evidence for the relationship; do not infer a legal
   effect or commencement date from grouping.
3. Do not merge merely because texts share a topic, parent law, gazette issue,
   source URL, generic title, product category or translation. Different cases,
   addressees, territories and time windows can be separate matters. For a
   commencement series, verify the exact Act and jurisdiction, and keep each
   numbered batch. A document affecting multiple unrelated Acts must not silently
   pull those matters into one group. Unknown relations remain independent and
   are documented as unresolved, with the reason.
4. If two explanations describe the same matter, put their records in one group
   and retain access to each explanation. Do not use a narrow explanation to
   represent a broader law or other territories. Never combine a proposal's
   stage with the final text's stage or infer an aggregate adopted status.
5. Run tests, TypeScript and the static build. Verify native expand/collapse,
   keyboard operation, mobile wrapping, both languages, child searches,
   tag/region/stage filters, reload behavior and navigation counts. Every current
   original must remain reachable exactly once within the official-progress view.

## Display semantics

For competing proposals explicitly addressing the same concrete change, a
reviewed matter may use the reader's question as its neutral heading. Keep each
proposal as a separate child with its own identity, sponsor, dates and stage;
never treat them as successive versions of one bill or give the group one legal
status. Establish the relationship from the actual operative provisions and
explicit source references, not a shared broad topic. Each explanation must
state current law and the material alternative even when a stage filter hides
the other child. Record rate, scope and transition differences under the
policy-question completeness gate in UPDATE.md.

The official-progress view counts matters and separately reports matched records.
A group is sorted by its latest **matching** record date; children are ordered
chronologically by their own stored date. Record stage badges must explicitly say they describe the stage at the time of
that record, including inside adopted-policy listings. A pending first-reading
record and a later adoption record are historical steps, not conflicting current
statuses. Preserve their original stages; do not infer that another proposal in
the same matter has advanced.

The date label stays document-specific;
publication is not adoption or commencement. A query matching the matter title
can return the matter's documents; a query matching one file returns that file
inside its matter, with an explicit matching-record count. Other child filters
are also applied before grouping, so unrelated stages/regions do not leak in.

One explanation plus its related raw records counts once and keeps its matching
documents expandable beside that explanation. Multiple explanations of one
reviewed matter appear as one dated card with separate explanation buttons, in
the same upcoming/past sections as other cards. The card takes its date and
badge from the first matching explanation that is not closed, so a rejected
version never labels a matter as ended while another version is active. The shared policy timeline retains its individual dated events.

`resolveTopics` rejects missing references, duplicate matter IDs, overlapping
membership and cross-country grouping. These checks protect identity and
reachability, not the correctness of the editorial judgment.

The registry's `appliesFromExport` anchors when these presentation judgments
become applicable. Builds of older snapshots omit the newer groups. Candidate
and current builds at or after that timestamp must resolve every reference;
the anchor is not a policy/source verification timestamp.

When adding groups later, keep the registry anchor unchanged and set
`appliesFromExport` on each new group to its first export. This preserves prior
groups in historical builds while requiring all references once the new group
applies. Resolve the registry, including these dates, before displaying groups.

Closed proposals without an effective date must not use detail labels suggesting
that commencement is awaited or that proposed changes became operative. Retain
any recorded effective date for other kinds of closed matters.
