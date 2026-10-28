import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const latest=(id:string)=>revision(id,store.tables.policies.find((p:any)=>p.id===id).version);
const keepsEvents=(id:string)=>{const v=store.tables.policies.find((p:any)=>p.id===id).version;const a=revision(id,v-1),b=revision(id,v);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);

test('promulgated Acts take their own commencement dates, not the parliamentary stage',()=>{
 const dates:Record<string,[string,number]>={'de-science-freedom-pay-2026':['2026-10-28',319],'de-asset-recovery-directive-2026':['2026-10-28',320],'de-product-liability-2026':['2026-12-09',321],'de-design-law-2026':['2027-12-09',322]};
 for(const [id,[date,n]] of Object.entries(dates)){const p=latest(id);keepsEvents(id);
  assert.equal(p.effectiveDate,date,id);assert(p.events.some(e=>e.kind==='published'&&e.date==='2026-10-27'),id);
  assert(topics.some(t=>t.policyIds.includes(id)&&t.recordIds.includes(`de-20261028-bgbl-${n}`)),id);}
 // Product liability section 23: products placed on the market by 8 December 2026 stay under the 1989 Act.
 assert.match(latest('de-product-liability-2026').impact,/2026年12月8日前已投放市场的产品，仍按1989年旧法/);
 // Design law Article 7(2): the Unfair Competition Act transition applies retroactively from 27 September 2026.
 assert.match(latest('de-design-law-2026').limits,/2028年9月27日失效/);
});

test('the Federal Police Act limits real-time biometric matching to court orders of at most 72 hours',()=>{
 const p=revision('de-federal-police-act-2026',1);
 assert.equal(p.effectiveDate,'2026-10-28');assert.match(p.after,/每次最长72小时/);assert.match(p.after,/不得读取存档录像/);assert.match(p.after,/禁止用生物特征识别身份/);
});

test('cabinet deployment extensions stay pending until the Bundestag votes',()=>{
 for(const id of ['de-irini-mandate-2027','de-sea-guardian-mandate-2027']){const p=revision(id,1);
  assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.match(p.statusNote!,/联邦议院尚未表决/);
  // URL-keyed explanations whose titles differ from the records must be linked explicitly, or the Bundestag record stays awaiting.
  const t=topics.find(x=>x.id===id)!;assert.equal(t.recordIds.length,2,id);assert.deepEqual(t.policyIds,[id]);}
 assert.deepEqual(topics.find(t=>t.id==='de-sabotage-protection-vetting-2026')!.policyIds,['de-sabotage-protection-vetting-2026']);
 assert.match(revision('de-sea-guardian-mandate-2027',1).after,/最多400人/);
});

test('the social security coordination reform separates entry into force from the 2028 application date',()=>{
 const p=revision('eu-social-security-coordination-reform-2026',1);
 assert.equal(p.status,'phased');assert.equal(p.effectiveDate,'2026-11-01');assert.equal(p.nextDate,'2028-11-02');
 assert.match(p.after,/22周/);assert.match(p.limits,/2031年11月2日/);
 assert.equal(topics.find(t=>t.id==='eu-social-security-coordination-reform-2026')!.recordIds.length,3);
});

test('sanctions renewals expire again unless extended, and the ETS2 decision sets no price cap',()=>{
 for(const id of ['eu-isil-sanctions-renewal-2027','eu-transnistria-sanctions-renewal-2027']){const p=revision(id,1);assert.equal(p.effectiveDate,'2026-10-28');assert.equal(p.nextDate,'2027-10-31');assert.equal(p.nextKind,'expiry');}
 const e=revision('eu-ets2-market-stability-reserve-2026',1);assert.equal(e.effectiveDate,'2026-11-17');assert.match(e.impact,/没有设价格上限/);
});

test('elapsed dates advance only to the next published milestone',()=>{
 const b=latest('de-bremen-social-services-closures-2026');keepsEvents('de-bremen-social-services-closures-2026');assert.equal(b.nextDate,'2026-11-02');
 const n=latest('de-backlog-20261015-37');keepsEvents('de-backlog-20261015-37');assert.equal(n.nextDate,null);assert.match(n.statusNote!,/没有核实展示期后是否有人起诉/);
});

test('Official Journal 26 and 27 October are reconciled and today stays partial',()=>{
 assert.equal(scan('eu-oj-20261028-1026').totalListed,103);assert.equal(scan('eu-oj-20261028-1027').totalListed,37);
 assert.equal(scan('eu-oj-20261028-1028').status,'partial');
});

test('new explanations and revisions are bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['de-federal-police-act-2026','de-irini-mandate-2027','de-sea-guardian-mandate-2027','de-sabotage-protection-vetting-2026','eu-social-security-coordination-reform-2026','eu-ets2-market-stability-reserve-2026','eu-isil-sanctions-renewal-2027','eu-transnistria-sanctions-renewal-2027','eu-drc-sanctions-criteria-2026','de-science-freedom-pay-2026','de-asset-recovery-directive-2026','de-product-liability-2026','de-design-law-2026','de-backlog-20261015-37','de-bremen-social-services-closures-2026'])assert.equal(l.policies[id],'current',id);
});
