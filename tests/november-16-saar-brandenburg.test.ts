import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema,lifecycle} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));

test('Saarland taxi fares are adopted from 2027, without inventing the size of the increase',()=>{
 const p=revision('de-sl-taxi-fares-2027',1);
 assert.equal(p.phase,'adopted');assert.equal(p.effectiveDate,'2027-01-01');
 assert.equal(lifecycle(p,'2026-11-16'),'已通过 · 待生效');
 assert.match(p.summary,/5\.30欧元/);assert.match(p.impact,/31\.00欧元/);assert.match(p.impact,/29\.45至37\.20欧元/);
 // The old fares were not verified, so no increase is claimed.
 assert.match(p.before,/不计算涨幅/);assert.doesNotMatch(p.summary,/上涨|涨价/);
});

test('Brandenburg building fees stay announced until the fee ordinance is published',()=>{
 const p=revision('de-bb-building-fees-2027',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.nextDate,'2027-01-01');
 assert.match(p.statusNote!,/尚未在州法律公报公布/);assert.match(p.impact,/1,505欧元/);
 assert.match(p.impact,/不是建筑造价/);assert.match(p.limits,/新闻稿示例/);
 assert(p.events.some(e=>e.kind==='published'&&e.date==='2026-11-13'));
});
