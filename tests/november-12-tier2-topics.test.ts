import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema,lifecycle} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const setting=(k:string)=>store.tables.settings.find((s:any)=>s.key===k)?.value;

test('proposed UK rates are benefit amounts awaiting approval, with a worked example',()=>{
 const p=revision('gb-benefit-pension-rates-2027-28',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.summary,/250\.70英镑/);assert.match(p.summary,/443\.21英镑/);assert.match(p.summary,/拟议/);
 assert.match(p.statusNote!,/议会批准/);
 assert.match(p.impact,/13,036\.40英镑/);assert.match(p.impact,/不是收入门槛/);
 assert.match(p.after,/福利总额上限.*不变/);
});

test('the Spanish decree is in force with its certificate phase still ahead and confirmation pending',()=>{
 const p=revision('es-single-parent-families-rdl-35-2026',1);
 assert.equal(p.phase,'adopted');assert.equal(p.effectiveDate,'2026-11-12');
 assert.equal(p.nextDate,'2027-01-01');assert.equal(p.nextKind,'implementation');
 assert.equal(lifecycle(p,'2026-11-12'),'已生效 · 分步实施');
 assert.match(p.statusNote!,/30个工作日内经众议院确认/);
 assert.match(p.impact,/证书本身不发钱/);assert.match(p.limits,/非欧盟国籍/);
});

test('US retirement limits apply from 2027 and are not presented as taxes',()=>{
 const p=revision('us-retirement-plan-limits-2027',1);
 assert.equal(p.effectiveDate,'2027-01-01');assert.equal(p.effectiveDateKind,'application');
 assert.equal(lifecycle(p,'2026-11-12'),'已通过 · 待适用');
 assert.match(p.summary,/25,500美元/);assert.match(p.summary,/7,500美元/);assert.match(p.impact,/34,000美元/);
 assert.match(p.impact,/不是税款或补贴/);
});

test('tier-2 scans stay partial, pages already explained are not re-explained, and Italy is not reviewed',()=>{
 for(const id of ['t2-20261112-gov','t2-20261112-boe','t2-20261112-nltk','t2-20261112-ch','t2-20261112-usfr'])assert.equal(scan(id).status,'partial',id);
 assert.equal(scan('t2-20261112-it').status,'blocked');
 assert(scan('t2-20261112-gov').excluded.some((x:any)=>x.url.includes('earned-settlement')&&/gb-earned-settlement-2026/.test(x.reason)));
 assert.equal(setting('lastReviewAt:IT')<'2026-11-12',true);
 for(const cc of ['GB','ES','US','FR','NL','CH'])assert.match(setting(`lastReviewAt:${cc}`),/^2026-11-12T/,cc);
});
