import type {Locale} from './index.ts';
import {policyStatusNote,type Policy} from '../domain/model.ts';
import type {IntakeRecord} from '../domain/intake.ts';
export type ContentCatalog=Record<string,string>;
export type TranslationState='current'|'missing'|'stale';
export type Localization={messages:ContentCatalog;policies:Record<string,TranslationState>;intake:Record<string,TranslationState>;sourceLanguages:Record<string,string>;originalIntakeTitles:Record<string,boolean>};
export const emptyLocalization:Localization={messages:{},policies:{},intake:{},sourceLanguages:{},originalIntakeTitles:{}};
export function contentText(text:string|undefined,locale:Locale,catalog:ContentCatalog):string {
 if(!text)return '';
 return locale==='zh'?text:catalog[text]??text;
}
// Only explanatory text is projected. Identifiers, original titles, dates, stages,
// status codes, tags, citations and evidence remain canonical, in every language.
export function policyTextFields(p:Policy):string[]{return [p.title,p.summary,p.before,p.after,p.impact,p.limits,p.nextLabel,p.dispute,p.dateExplanation??'',policyStatusNote(p)??'',...p.sources.flatMap(s=>[s.title,s.note,s.publisher]),...(p.rules??[]).flatMap(r=>[r.title,r.detail]),...p.events.flatMap(e=>[e.title,e.detail]),...(p.politics?.proposedBy?[p.politics.proposedBy.name,p.politics.proposedBy.party??'']:[]),...(p.politics?.votes??[]).flatMap(v=>[v.body,v.result,v.note])];}
export function localizePolicy(p:Policy,locale:Locale,l:Localization):Policy {
 if(locale==='zh'||l.policies[p.id]!=='current')return p;
 const t=(s:string)=>contentText(s,locale,l.messages);
 return {...p,...(policyStatusNote(p)?{statusNote:t(policyStatusNote(p)!)}:{}),title:t(p.title),summary:t(p.summary),before:t(p.before),after:t(p.after),impact:t(p.impact),limits:t(p.limits),nextLabel:t(p.nextLabel),dispute:t(p.dispute),dateExplanation:p.dateExplanation&&t(p.dateExplanation),sources:p.sources.map(s=>({...s,title:t(s.title),note:t(s.note),publisher:t(s.publisher)})),rules:p.rules?.map(r=>({...r,title:t(r.title),detail:t(r.detail)})),events:p.events.map(e=>({...e,title:t(e.title),detail:t(e.detail)})),politics:p.politics&&{...p.politics,proposedBy:p.politics.proposedBy&&{...p.politics.proposedBy,name:t(p.politics.proposedBy.name),party:p.politics.proposedBy.party&&t(p.politics.proposedBy.party)},votes:p.politics.votes?.map(v=>({...v,body:t(v.body),result:t(v.result),note:t(v.note)}))}};
}
export function localizeIntake(r:IntakeRecord,locale:Locale,l:Localization):IntakeRecord {
 if(locale==='zh'||l.intake[r.id]!=='current')return r;
 // title is the original document title, not a display translation. Keep it intact.
 return {...r,titleZh:contentText(r.titleZh??r.title,locale,l.messages),note:contentText(r.note,locale,l.messages)};
}
export function searchText(p:Policy|IntakeRecord,l:Localization):string {
 const localized='summary' in p?(['zh','en'] as const).map(locale=>localizePolicy(p,locale,l)): (['zh','en'] as const).map(locale=>localizeIntake(p,locale,l));
 const texts=localized.flatMap(p=>'summary'in p?[p.title,p.originalTitle,p.summary,p.officialId]:[p.title,p.titleZh??'',p.note,p.officialId??'']);
 for(const tag of p.tags??['topic'in p?p.topic:''])for(const locale of ['zh','en'] as const)texts.push(contentText(tag,locale,l.messages));
 return texts.join(' ').toLocaleLowerCase();
}
