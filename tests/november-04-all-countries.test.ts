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

test('a cabinet ordinance with an expected start date is not presented as in force',()=>{
 const p=revision('de-ewa-online-registration-2026',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.equal(p.nextDate,'2026-12-01');assert.equal(p.nextKind,'scheduled');assert.match(p.statusNote!,/尚未在联邦法律公报公布/);
});

test('location changes and income limits name what each number measures',()=>{
 const h=revision('hh-property-tax-residential-location-2027',1);
 assert.equal(h.effectiveDate,'2027-01-01');assert.equal(h.effectiveDateKind,'application');
 // The example is the living-space part only, and both directions are shown.
 assert.match(h.impact,/700欧元.*525欧元/);assert.match(h.impact,/土地部分不变/);
 const b=revision('hb-social-housing-income-limits-2026',1);
 assert.equal(b.effectiveDate,'2026-10-14');assert.match(b.after,/20,400欧元/);
 assert.match(b.before,/不是工资毛额/);assert.match(b.limits,/无法说明每类家庭是否都适用/);
});

test('parliamentary outcomes are appended without rewriting the scheduled debate',()=>{
 const a1=revision('de-afd-minor-taxes-motion-2026',1),a2=revision('de-afd-minor-taxes-motion-2026',2);
 assert.equal(a2.nextDate,null);assert(a2.events.some(e=>e.id==='referred-20261104'));
 assert.deepEqual(a2.events.find(e=>e.id==='debate'),a1.events.find(e=>e.id==='debate'));
 const g=revision('de-green-skilled-immigration-motions-2026',2);
 assert.equal(g.phase,'pending');assert.match(g.summary,/否决这项动议不等于名额已被削减/);
 const w=revision('de-housing-benefit-cuts-2027',2);assert.equal(w.phase,'pending');assert(w.events.some(e=>e.id==='hearing-20261104'));
});

test('the Dutch amending bill keeps current law, both bills and the crypto exception apart',()=>{
 const p=revision('nl-box3-actual-return-crypto',2);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.statusNote!,/2029年1月1日/);assert.match(p.statusNote!,/2028年仍按视同收益/);
 assert.match(p.before,/6\.00%/);assert.match(p.after,/若只有原法案通过/);
 // Crypto in a wallet and a crypto ETF can be taxed differently; the ETF point stays unverified.
 assert.match(p.impact,/ETF/);assert.match(p.limits,/加密ETF是否属于金融工具.*未核实/);
 assert.match(p.limits,/是否已放弃，本轮未在其他文件中核实/);
 const t=topics.find(x=>x.id==='nl-box3-novelle-2026')!;assert.deepEqual(t.policyIds,['nl-box3-actual-return-crypto']);
});

test('UK and Swiss proposals stay proposals',()=>{
 const s=revision('gb-earned-settlement-2026',1);
 assert.equal(s.phase,'pending');assert.equal(s.effectiveDate,null);assert.match(s.limits,/实施日期、具体移民规则条文和过渡细节尚未公布/);
 assert.match(s.after,/12,571英镑/);assert.match(s.after,/125,141英镑/);
 assert.equal(revision('gb-guided-retirement-2026',1).nextDate,'2026-12-22');
 assert.equal(revision('gb-visitor-levy-bill-2026',1).phase,'pending');
 const ae=revision('gb-auto-enrolment-thresholds-2027',1);assert.equal(ae.status,'existing');assert.match(ae.impact,/23,760英镑/);
 const iv=revision('ch-iv-integration-reform-2026',1);assert.equal(iv.phase,'pending');assert.match(iv.summary,/0\.2个百分点/);assert.match(iv.impact,/只是提案/);
});

test('elapsed dates are cleared or advanced without claiming the step happened',()=>{
 for(const id of ['de-bgbl-2026-302-evpg-regulation-expiry','fr-construction-diesel-aid-october-2026','fr-micro-turnover-october-deadline-2026','ch-climate-public-sector-2026','ch-customs-end-use-relief-nov-2026','ch-jet-fuel-stock-release-2026','rp-teacher-trainee-cap-geography-2026','fr-gas-benchmark-october-2026','ch-respiratory-vaccination-2026','de-annual-tax-act-2026','nl-vacancy-enforcement-bill-202610']){
  // Pinned to the revision written by this round; later rounds may advance the same card with evidence.
  const v=Number(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.recorded_at==='2026-11-04T21:13:22.816Z').version),p=revision(id,v),old=revision(id,v-1);
  assert.equal(p.nextDate,null,id);assert.match(p.limits,/的日期已过，本轮没有核实是否按期进行/,id);assert.equal(p.verifiedAt,old.verifiedAt,id);
 }
 assert.equal(revision('rp-teacher-trainee-cap-geography-2026',2).status,'adopted');
 const b=revision('de-bremen-social-services-closures-2026',4);assert.equal(b.nextDate,'2026-11-09');assert.match(b.limits,/2026-11-02/);
 const w=revision('fr-winter-eviction-pause-2026',2);assert.equal(w.nextDate,'2027-03-31');assert.equal(w.nextKind,'expiry');
 const e=revision('eu-low-value-parcels-2026',4);assert.equal(e.nextDate,'2028-07-01');assert.equal(e.nextKind,'expiry');
});

test('gazette days are closed only where the listing is reconciled',()=>{
 const oj=scan('eu-oj-20261104-1103');assert.equal(oj.status,'complete');assert.equal(oj.totalListed,92);assert.equal(oj.recordIds.length,92);
 assert.equal(scan('eu-oj-20261104-1031-1102').totalListed,0);assert.equal(scan('eu-oj-20261104-1104').status,'partial');
 assert.equal(scan('de-20261104-bgbl-1102-1103').status,'complete');assert.equal(scan('de-20261104-bgbl-1104').status,'partial');
 const hb=scan('de-20261104-hb-gbl-1004-1103');assert.equal(hb.status,'complete');assert.equal(hb.recordIds.length,7);
 assert(store.tables.scan_runs.filter((r:any)=>r.id.startsWith('de-20261104-state-')).every((r:any)=>JSON.parse(r.data).status!=='complete'));
});

test('routine records leave the awaiting list only through reviewed dispositions',()=>{
 for(const id of ['de-20261104-bgbl2-240','de-20261104-bgbl2-256','de-hb-gbl-2026-110','hh-20261103-steuerschaetzung','eu-oj-c-202605179','gb-20261104-uksi-1159','es-20261104-boe-a-2026-22790'])assert(dismissed.has(id),id);
 // Not reviewed as routine: substantive laws stay awaiting.
 for(const id of ['de-hb-gbl-2026-103','eu-oj-l-202602381','eu-oj-l-202602383','es-20261104-boe-a-2026-22792','gb-20261104-uksi-1148','gb-20261104-uksi-1152'])assert(!dismissed.has(id)&&!grouped.has(id),id);
 // Same title, different notices: not merged.
 assert(!topics.some(t=>t.recordIds.includes('de-20261104-bgbl2-256')&&t.recordIds.includes('de-20261028-bgbl-2-237')));
 assert(topics.find(t=>t.id==='de-care-insurance-reform-pnog')!.recordIds.includes('bt-21-8869-pnog'));
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['de-ewa-online-registration-2026','hh-property-tax-residential-location-2027','hb-social-housing-income-limits-2026','gb-earned-settlement-2026','gb-child-trust-fund-capacity-2026','gb-guided-retirement-2026','gb-auto-enrolment-thresholds-2027','gb-visitor-levy-bill-2026','ch-iv-integration-reform-2026','nl-box3-actual-return-crypto','de-afd-minor-taxes-motion-2026','eu-low-value-parcels-2026'])assert.equal(l.policies[id],'current',id);
 for(const id of ['de-20261104-bgbl2-240','eu-oj-l-202602482','gb-20261104-uksi-1156','nl-20261103-novelle-box3-37053','es-20261103-cm-rd-cume'])assert.equal(l.intake[id],'current',id);
});
