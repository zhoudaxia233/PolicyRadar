import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,localizeIntake,policyTextFields} from '../lib/i18n/content.ts';
import {validateUpdate} from '../lib/update-data.ts';
const read=(path:string)=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const before=read('../data/exports/2026-10-04-weekly-integrated/policy-radar-export.json');
const after=read('../data/exports/2026-10-04-weekly-translated/policy-radar-export.json');
const data=createStaticData(after);
// This fixed historical export needs its reviewed bindings, not the latest versions.
const localization=createLocalization(data,read('../data/translations/content.json'),read('./fixtures/weekly-i18n-bindings.json'));
const ids=['hb-bremerhaven-advertising-storage-2026','de-verpflichtung-video-2026','de-xbasisdaten-transport-2026','he-hospital-service-groups-2026','he-kita-prize-2027','sh-investment-location-strategy-2026'];

test('weekly translations cover every explanation and announcement in English',()=>{
 for(const states of [localization.policies,localization.intake])assert(Object.values(states).every(s=>s==='current'));
 for(const id of ids){
  const p=data.policies.find(p=>p.id===id)!;
  for(const locale of ['en'] as const){
   const t=localizePolicy(p,locale,localization);
   assert.notEqual(t.title,p.title);assert(policyTextFields(t).every(s=>!/[\u3400-\u9fff]/u.test(s)),id);
   for(const key of ['originalTitle','effectiveDate','nextDate','phase','verifiedAt'] as const)assert.equal(t[key],p[key]);
  }
 }
 for(const id of [...ids,'de-shipping-correction-2026-284','hh-wittmoor-announcement-2026']){
  const r=data.intake.records.find(r=>r.id===id)!;assert.equal(localization.originalIntakeTitles[id],true);
  for(const locale of ['en'] as const){const t=localizeIntake(r,locale,localization);assert.equal(t.title,r.title);assert.equal(t.stage,r.stage);assert(!/[\u3400-\u9fff]/u.test(t.note+t.titleZh));}
 }
});

test('translation completion changes no policy facts, history, source coverage or factual-review dates',()=>{
 validateUpdate(before,after,new Date(after.exportedAt));
 for(const table of ['policies','revisions','intake','scan_runs','snapshots','checks'])assert.deepEqual(after.tables[table],before.tables[table]);
 for(const setting of before.tables.settings){
  if(['reviewNote','reviewNote:DE'].includes(setting.key))continue;
  assert.deepEqual(after.tables.settings.find((s:{key:string})=>s.key===setting.key),setting);
 }
 const note=data.status.settings['reviewNote:DE'];assert(!note.includes('译文尚未完成'));assert(localization.messages[note]);
 assert.equal(data.policies.find(p=>p.id==='he-hospital-service-groups-2026')!.phase,'pending');
 for(const id of ['de-shipping-correction-2026-284','hh-wittmoor-announcement-2026'])assert.equal(data.intake.records.find(r=>r.id===id)!.stage,'unverified');
});
