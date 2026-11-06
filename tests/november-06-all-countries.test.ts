import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
const grouped=new Set(topics.flatMap(t=>t.recordIds));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const keepsEvents=(id:string,from:number,to:number)=>{const a=revision(id,from),b=revision(id,to);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};

test('a Bundestag vote on a treaty is appended without claiming the treaty is in force',()=>{
 for(const id of ['de-ukraine-tax-treaty-2026','de-albania-tax-protocol-2026']){
  const p=revision(id,4);keepsEvents(id,3,4);
  assert.equal(p.phase,'pending',id);assert.equal(p.effectiveDate,null,id);assert.equal(p.nextDate,null,id);
  assert(p.events.some(e=>e.id==='bt-adopted-20261105'&&e.kind==='adopted'),id);
  // The scheduled vote stays in the history; the card still names the remaining steps.
  assert(p.events.some(e=>e.id==='bt-vote-20261105'&&e.kind==='scheduled'),id);
  assert.match(p.statusNote!,/第二轮审议/,id);assert.match(p.statusNote!,/交换批准书后才生效/,id);
 }
});

test('the driving licence reform passed the Bundestag but is not presented as current law',()=>{
 const p=revision('de-driving-school-reform-2026',2);keepsEvents('de-driving-school-reform-2026',1,2);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.title,/联邦议院已通过/);assert.match(p.statusNote!,/尚须联邦参议院同意/);
 assert.match(p.limits,/现在还不是现行法/);assert.match(p.limits,/仅为要求，不是法律内容/);
 assert(topics.find(t=>t.id==='de-driving-school-reform-2026')!.recordIds.includes('bt-21-8979-driving-school-report'));
});

test('the tobacco tax correction is recorded without rewriting the promulgated steps',()=>{
 const p=revision('de-tobacco-tax-2027',5);keepsEvents('de-tobacco-tax-2027',4,5);
 assert.equal(p.effectiveDate,'2026-10-21');assert.equal(p.nextDate,'2027-01-01');assert.equal(p.status,'phased');
 const c=p.events.find(e=>e.id==='bt-correction-20261105')!;assert.equal(c.date,'2026-11-05');assert.match(c.detail,/尚待联邦参议院/);
 assert.match(p.statusNote!,/10月21日至12月31日继续适用10月20日以前的税率/);
 // Actual collection before the correction is unverified and says so.
 assert.match(p.limits,/本站未核实/);
 // The Fiscal Equalisation Act also changes federal-state VAT shares; it joins the tobacco matter only through Article 4.
 const t=topics.find(x=>x.id==='de-tobacco-tax-2027')!;assert(t.recordIds.includes('bt-21-8946-fag-report'));
});

test('a first reading and a minister’s statements do not change the care bill',()=>{
 const p=revision('de-care-insurance-reform-pnog',4);keepsEvents('de-care-insurance-reform-pnog',3,4);
 assert.equal(p.phase,'pending');assert.equal(p.nextDate,null);
 assert(p.events.some(e=>e.id==='bt-first-reading-1105'&&e.kind==='scheduled'));
 assert(p.events.some(e=>e.id==='bt-first-reading-20261105'&&e.kind==='proposal'));
 assert.match(p.limits,/这些是发言表态，草案文本尚未改动/);
});

test('hearings are progress, not decisions',()=>{
 for(const [id,v,event] of [['de-income-tax-reform-2027',3,'hearing-20261104'],['de-annual-tax-act-2026',3,'hearing-held-20261102'],['de-grid-support-proposal-2027',4,'hearing-20261106']] as const){
  const p=revision(id,v);keepsEvents(id,v-1,v);assert.equal(p.phase,'pending',id);assert(p.events.some(e=>e.id===event&&e.kind==='proposal'),id);
 }
 // The annual tax card no longer says the hearing was unverified, because it is now confirmed.
 assert.doesNotMatch(revision('de-annual-tax-act-2026',3).limits,/的日期已过/);
});

test('US tax year 2027 amounts are thresholds, with a worked example',()=>{
 const p=revision('us-tax-inflation-adjustments-2027',1);
 assert.equal(p.effectiveDate,'2027-01-01');assert.equal(p.effectiveDateKind,'application');
 assert.match(p.summary,/33,200美元/);assert.match(p.summary,/2,300美元/);
 assert.match(p.impact,/66,800美元/);assert.match(p.impact,/7,504美元/);assert.match(p.impact,/不是应缴税额/);
 // 2026 single and head-of-household amounts are not in the source and are not invented.
 assert.match(p.before,/没有写明/);
});

test('Bremen drainage fees stay a proposal and every number names what it measures',()=>{
 const p=revision('hb-wastewater-fees-2027',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.match(p.statusNote!,/尚须市政府/);
 assert.match(p.before,/每立方米用水2\.93欧元/);assert.match(p.before,/每平方米已硬化并接入下水道的面积0\.83欧元/);
 assert.match(p.impact,/少7欧元/);assert.match(p.impact,/多37\.20欧元/);assert.match(p.impact,/不含自来水费/);
});

test('an elapsed confirmation deadline is cleared without claiming the decree-laws lapsed or were confirmed',()=>{
 for(const id of ['es-rent-renewal-compensation-2026','es-housing-social-function-2026']){
  const p=revision(id,2),old=revision(id,1);
  assert.equal(p.nextDate,null,id);assert.equal(p.verifiedAt,old.verifiedAt,id);assert.equal(p.phase,old.phase,id);
  assert.match(p.limits,/没有找到确认或否决的结果/,id);assert.match(p.limits,/是否仍有效未核实/,id);
 }
 const nl=revision('nl-vocational-civic-education-bill-202610',2);assert.equal(nl.nextDate,null);assert.match(nl.limits,/的日期已过，本轮没有核实是否按期进行/);
});

test('the Swiss consultation gains its published deadline',()=>{
 const p=revision('ch-iv-integration-reform-2026',2);
 assert.equal(p.nextDate,'2027-02-04');assert.equal(p.nextKind,'deadline');assert.equal(p.phase,'pending');
 assert.deepEqual(topics.find(t=>t.id==='ch-iv-integration-reform-2026')!.policyIds,['ch-iv-integration-reform-2026']);
});

test('gazette days are closed only where the listing is reconciled',()=>{
 const b=scan('de-20261106-bgbl-1104-1105');assert.equal(b.status,'complete');assert.equal(b.totalListed,22);assert.equal(b.recordIds.length,22);
 assert.equal(scan('de-20261106-bgbl-1106').status,'partial');
 for(const [id,n] of [['eu-oj-20261106-1104',25],['eu-oj-20261106-1105',16]] as const){const s=scan(id);assert.equal(s.status,'complete',id);assert.equal(s.totalListed,n,id);assert.equal(s.recordIds.length,n,id);}
 assert.equal(scan('eu-oj-20261106-1106').status,'partial');
 assert.equal(scan('de-20261106-hb-gbl-1104-1105').status,'complete');
 assert.equal(scan('eu-20261106-council').status,'blocked');
 assert(store.tables.scan_runs.filter((r:any)=>r.id.startsWith('de-20261106-state-')).every((r:any)=>JSON.parse(r.data).status!=='complete'));
});

test('routine records leave the awaiting list only through reviewed dispositions',()=>{
 for(const id of ['de-20261105-bgbl2-257','de-20261106-bgbl1-328','eu-oj-c-202605537','eu-oj-l-202602495','gb-20261105-uksi-1169','es-boe-a-2026-23270','de-hb-20261104-youth-service-closure'])assert(dismissed.has(id),id);
 // Records that may change households' costs or rights stay open.
 for(const id of ['eu-oj-l-202602467','eu-oj-c-202605934','de-20261106-bgbl1-329','de-sl-abl-2026-43-2216','es-boe-a-2026-23176','gb-20261105-uksi-1167','bt-kw45-afd-health-spending-motion'])assert(!dismissed.has(id)&&!grouped.has(id),id);
 // A shared title is not evidence of one matter.
 assert(!topics.some(t=>t.recordIds.includes('de-20261106-bgbl1-330')&&t.recordIds.includes('br-1069-top-43')));
 assert(topics.find(t=>t.id==='de-albania-tax-protocol-2026')!.recordIds.includes('bt-kw45-final-votes-albania'));
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['de-care-insurance-reform-pnog','de-ukraine-tax-treaty-2026','de-albania-tax-protocol-2026','de-driving-school-reform-2026','de-tobacco-tax-2027','de-income-tax-reform-2027','de-annual-tax-act-2026','de-grid-support-proposal-2027','ch-iv-integration-reform-2026','es-rent-renewal-compensation-2026','es-housing-social-function-2026','nl-vocational-civic-education-bill-202610','us-tax-inflation-adjustments-2027','hb-wastewater-fees-2027'])assert.equal(l.policies[id],'current',id);
 for(const id of ['de-20261105-bgbl2-257','bt-kw45-fag-tobacco-correction','eu-oj-l-202602467','gb-20261104-uksi-1144','es-boe-a-2026-23176','ch-20261105-iv-consultation-opened','us-irs-ir-2026-133','fr-20261105-a19126'])assert.equal(l.intake[id],'current',id);
});
