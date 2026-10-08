import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy} from '../lib/i18n/content.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
// Fixed evidence date; later legislative outcomes may legitimately change.
const data=createStaticData(read('data/exports/2026-10-08-carf-vote-213500/policy-radar-export.json'));
const carf=data.policies.find(p=>p.id==='de-carf-agreement-2026')!;

test('CARF passage clears the scheduled homepage node without implying commencement',()=>{
 assert.equal(carf.officialId,'BT-Drs. 21/7195');
 assert.equal(carf.phase,'adopted');
 assert.equal(carf.effectiveDate,null);
 assert.equal(carf.nextDate,null);
 assert.equal(carf.nextLabel,'');
 assert(!data.policies.filter(p=>p.nextDate&&p.nextDate>='2026-10-08').some(p=>p.id===carf.id));
 assert(carf.events.some(e=>e.kind==='scheduled')); // Preserve the old plan as history.
 assert(carf.events.some(e=>e.kind==='adopted'&&e.date==='2026-10-08'));
 const green=data.policies.find(p=>p.id==='de-crypto-holding-proposal')!;
 assert.equal(green.phase,'closed');
 assert.equal(carf.politics!.votes![0].counts,null); // Never borrow another bill's roll-call totals.
});

test('both languages distinguish information exchange from changes to tax liability',()=>{
 const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
 for(const locale of ['zh','en'] as const){
  const p=localizePolicy(carf,locale,l);
  assert.match(p.summary,/21\/7195/);
  assert.match(p.summary,locale==='zh'?/不改变/:/does not change/);
  assert.match(p.summary,locale==='zh'?/生效日期仍待核实/:/Entry into force remains unverified/);
  assert.match(p.politics!.votes![0].note,/AfD/);
 }
});

test('CARF discoveries remain in one matter, distinct from holding-period proposals',()=>{
 const topics=resolveTopicRegistry(read('data/topics.json'),data);
 const topic=topics.find(t=>t.id==='de-crypto-information-exchange')!;
 assert(topic.recordIds.includes('de-carf-bundestag-passage-20261008'));
 assert(topic.recordIds.includes('de-carf-first-reading-context-20261008'));
 assert(!topic.policyIds.includes('de-crypto-holding-proposal'));
 assert(!data.intake.records.some(r=>r.id==='daily-de-20261008-carf-agenda'));
});
