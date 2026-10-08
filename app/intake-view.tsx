import {useState} from 'react';
import {explainsRecord} from '../lib/domain/listing.ts';
import {type RecordGroup} from '../lib/domain/topics.ts';
import {type IntakeRecord} from '../lib/domain/intake';
import {policyTags,type Policy} from '../lib/domain/model';
import {translator,languageTags,formatDate,regionName,type Locale} from '../lib/i18n/index';
import {contentText,type Localization} from '../lib/i18n/content';

type Context={policies:Policy[];open:(p:Policy)=>void;locale:Locale;localization:Localization};
function RecordContent({record:r,nested=false,policies,open,locale,localization}:Context&{record:IntakeRecord;nested?:boolean}){
 const tr=translator(locale),linked=policies.find(p=>explainsRecord(p,r));
 const Heading=nested?'h3':'h2';
 const language=locale!=='zh'&&localization.intake[r.id]==='current'?languageTags[locale]:r.titleZh?'zh-CN':localization.originalIntakeTitles[r.id]?(r.originalLanguage??localization.sourceLanguages[r.id]??'und'):'zh-CN';
 return <>
  <div className="card-top"><span className={'badge '+(r.stage==='adopted'?'green':'amber')}>{r.stage==='adopted'?tr('已确认通过或公布'):r.stage==='pending'?tr('待决'):tr('内容待核实')}</span><span>{regionName(r.region,locale)}</span></div>
  <Heading lang={language}>{r.titleZh??r.title}</Heading>
  {locale!=='zh'&&localization.intake[r.id]!=='current'&&<p className="translation-note">{tr('当前语言的解读待补充或更新，暂显示已有解读。')}</p>}
  {localization.originalIntakeTitles[r.id]&&r.titleZh&&r.titleZh!==r.title&&<p className="original-title" lang={r.originalLanguage??localization.sourceLanguages[r.id]??'und'}>{r.title}</p>}
  {r.officialId&&r.officialId!==r.title&&!/^https?:/.test(r.officialId)&&<p className="document-id">{r.officialId}</p>}
  <div className="policy-tags">{policyTags(r).map(t=><span key={t}>{contentText(t,locale,localization.messages)}</span>)}</div>
  <p>{r.note}</p>
  <p className="intake-date">{r.dateKind==='adopted'?tr('通过日期'):r.dateKind==='announced'?tr('公告发布日期'):tr('正式公布日期')}{formatDate(r.date,locale)}{r.effectiveDate&&tr(' · 本次改动开始生效：')+formatDate(r.effectiveDate,locale)}</p>
  {linked?<button className="quiet-button" onClick={()=>open(linked)}>{tr('查看政策解读')}</button>:<small>{tr('完整政策解读待补充 · 原始记录已保留')}</small>}
  <a className="intake-source" href={r.url} target="_blank" rel="noreferrer">{tr('打开原始文件（新标签页）')}</a>
 </>;
}

export function TopicDocuments({group,...context}:Context&{group:RecordGroup}){
 const tr=translator(context.locale);
 return <details className="topic-documents" key={group.records.map(r=>r.id).join('|')}>
  <summary>{tr('查看 {0} 条匹配的文件与进展',[group.records.length])}</summary>
  <p className="topic-explanation">{tr('各文件分别保留日期、法律阶段及核实状态；归组不代表整项政策已通过或生效。')}</p>
  <ol>{group.records.map(record=><li className="topic-document" key={record.id}><RecordContent {...context} record={record} nested /></li>)}</ol>
 </details>;
}

// Large countries have well over a thousand matters; rendering them all made every keystroke slow.
// Counts elsewhere still cover every match, and a new result list starts again from the first page.
export const intakePageSize=100;
export function IntakeView({groups,...context}:Context&{groups:RecordGroup[]}){
 const tr=translator(context.locale),languageIndex=context.locale==='zh'?0:1;
 const [shown,setShown]=useState({groups,limit:intakePageSize});
 const limit=shown.groups===groups?shown.limit:intakePageSize;
 return <><div className="policy-list">{!groups.length?<div className="empty"><h3>{tr('暂没有匹配的官方进展记录')}</h3><p>{tr('这不表示没有政策变化。未查完的来源会在“来源与更新”列明。')}</p></div>:groups.slice(0,limit).map(group=><article className="intake-card" key={group.id}>
  {group.title?<>
   <div className="card-top"><span>{regionName(group.records[0].region,context.locale)}</span><span>{tr('{0} 条官方记录',[group.records.length])}</span></div>
   <h2 lang={languageTags[context.locale]}>{group.title[languageIndex]}</h2>
   <p>{tr('最近匹配的记录：{0}',[formatDate(group.records.at(-1)!.date,context.locale)])}</p>
   <TopicDocuments {...context} group={group}/>
  </>:<RecordContent {...context} record={group.records[0]}/>}
 </article>)}</div>
 {groups.length>limit&&<button className="quiet-button show-more" onClick={()=>setShown({groups,limit:limit+intakePageSize})}>{tr('显示更多（还有 {0} 个事项）',[groups.length-limit])}</button>}</>;
}
