# Policy areas

The overview above each list ("What Germany is working on") counts explained
matters in 16 fixed policy areas. Each explanation belongs to exactly one area,
so a matter counts once. Areas are presentation metadata: they never change a
policy's `topic`, `tags`, legal stage or any other recorded fact.

The vocabulary (IDs, Chinese and English names, short column labels) is fixed in
`lib/domain/areas.ts`. Do not add, rename or merge areas during a data update;
that is a product decision for the owner.

| ID | Area | Includes |
|---|---|---|
| `tax` | 税务与财政 · Taxes & public finance | All taxes and duties (including energy, fuel, customs and crypto taxes), budgets, fiscal transfers, administrative fees |
| `work` | 劳动与就业 · Work & employment | Wages, minimum and apprentice pay, labour law, public-sector pay, occupational health, procurement wage rules |
| `social` | 社会保障与家庭 · Social security & families | Pensions, social assistance, unemployment insurance, contributions, child and family benefits, childcare fees, child protection, disability support |
| `health` | 医疗与照护 · Health & care | Health care, medicines, public health, long-term care and care insurance, care services |
| `housing` | 住房与建设 · Housing & construction | Rent, housing benefit, social housing, building rules and permits, heating rules for homes |
| `environment` | 能源、气候与环境 · Energy, climate & environment | Energy supply, prices and grids, climate policy, emissions, nature and animal protection |
| `transport` | 交通与出行 · Transport & mobility | Roads, rail, aviation, public transport, driving, mobility grants |
| `education` | 教育、科研与文化 · Education, research & culture | Schools, training, universities, research, culture, heritage, media, sport |
| `business` | 企业与经济 · Business & economy | Business procedures and support, investment, trade agreements, competition, public procurement, commercial leases |
| `finance` | 金融与消费者 · Finance & consumers | Financial and crypto-market regulation, payments, consumer rights, product and food safety |
| `agriculture` | 农业与乡村 · Agriculture & rural areas | Farming, fisheries, animal disease reporting, rural and mountain services |
| `digital` | 数字与通信 · Digital & telecoms | Platforms, data, AI, telecom networks, cybersecurity, minors' online protection |
| `security` | 安全、司法与应急 · Security, justice & emergencies | Police, criminal law, courts, law-enforcement cooperation, civil protection, disasters |
| `foreign` | 外交与国防 · Foreign affairs & defence | Sanctions, treaties between states, armed forces and deployments, consular protection |
| `migration` | 移民与融入 · Migration & integration | Residence, asylum, naturalisation, integration |
| `government` | 政府与公共服务 · Government & public services | Elections, constitutions, public administration and its digital services, local government |

## Boundary rules

- A tax, duty or fee belongs to `tax`, whatever it is levied on.
- Sanctions, troops and treaties between states are `foreign`; police and
  law-enforcement cooperation stay `security`.
- Care services and care insurance are `health`; pensions and other cash
  benefits are `social`.
- Childcare fees and family benefits are `social`, not `education`.
- Decide by what the measure changes for people, not by the ministry or the
  label the source uses.

## Maintaining `data/areas.json`

`topics` maps each policy `topic` label to its default area. `policies` lists
reviewed exceptions by policy ID, for items whose label is too generic
("公共服务", "公共安全", "补助") or does not fit the item.

After every intake update that adds or changes explanations:

1. Run `npm run build`. A new `topic` label without an area stops the build;
   add it to `topics` following the table above.
2. Read the title of every new explanation whose label is generic or spans
   several areas, and add an exception where the default is wrong. An exception
   that repeats the default, or names a policy that does not exist, stops the build.
3. Explanations grouped as one matter in `data/topics.json` must share one area;
   the build rejects a split.
4. Run `npm test`. `tests/areas.test.ts` checks that every bar and heatmap cell
   equals the list count its click produces.

A matter explained in several regions (for example two states running the same
pilot) counts once in the country's bars and once in each of those regions'
heatmap rows, matching the sidebar's region counts.
