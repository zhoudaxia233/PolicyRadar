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
const revision=(id:string,version=1)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);

test('the fuel tax relief cites its gazette basis in the insurance resolution Act, which keeps its own explanation',()=>{
 const p=revision('de-fuel-relief-2026',4);
 assert.equal(p.status,'temporary');assert.equal(p.nextKind,'expiry');assert.equal(p.nextDate,'2026-12-31');
 assert(p.sources.some(s=>s.url.includes('/bgbl/1/2026/275/')));assert.match(p.limits,/第11、12条/);
 assert(p.events.some(e=>e.kind==='correction'&&e.date==='2026-10-28'));
 // One Act, two unrelated matters: no topic group joins them.
 const insurance=revision('de-insurance-recovery-resolution-2026');
 assert.equal(insurance.effectiveDate,'2027-01-30');assert.match(insurance.impact,/第98条第2款/);
 assert(!topics.some(t=>t.policyIds.includes('de-fuel-relief-2026')&&t.policyIds.includes('de-insurance-recovery-resolution-2026')));
});

test('the shipping regulation and its correction are one matter with both explanations',()=>{
 const t=topics.find(x=>x.id==='de-shipping-bureaucracy-reduction-2026')!;
 assert.equal(t.recordIds.length,2);
 assert.deepEqual([...t.policyIds].sort(),['de-shipping-bureaucracy-reduction-2026','explain-de-shipping-correction-2026-284']);
});

test('the Lebanon office agreement is reviewed as needing no explanation; the Post explanation joins its existing group',()=>{
 const d=dispositions.find(x=>x.id==='de-lebanon-giz-kfw-offices-2026')!;
 assert.equal(d.recordIds.length,1);
 assert.deepEqual(topics.find(x=>x.id==='de-deutsche-post-successor-2026')!.policyIds,['de-deutsche-post-successor-2026']);
});

test('backlog explanations are bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['de-insurance-recovery-resolution-2026','de-mv-water-law-deviation-2026','de-high-seas-co2-export-2026','de-deutsche-post-successor-2026','de-defence-ministry-fees-2026','de-epa-medication-interoperability-2026','de-dora-audit-reports-2026','de-shipping-bureaucracy-reduction-2026','de-construction-procurement-vob-2026','de-eutb-funding-rules-2026','de-bachelor-professional-law-2026','de-insolvency-specialist-exam-2026','de-legal-it-marketing-specialist-exam-2026','de-wine-monitoring-regulation-2026','de-fuel-relief-2026'])assert.equal(l.policies[id],'current',id);
});
