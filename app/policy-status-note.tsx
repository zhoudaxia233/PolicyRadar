import {lifecycle,policyStatusNote,type Policy} from '../lib/domain/model';
import {translator,type Locale} from '../lib/i18n/index';
import {contentText,type ContentCatalog} from '../lib/i18n/content';

// Detail-only context. Hide repeated labels and keep saved, possibly dated
// prose visibly separate from the badge computed for today.
export function PolicyStatusNote({policy,locale,messages,today}:{policy:Policy;locale:Locale;messages:ContentCatalog;today:string}){
 const text=policyStatusNote(policy);
 const label=lifecycle(policy,today);
 if(!text||text===label)return null;
 const rendered=contentText(text,locale,messages);
 if(rendered===translator(locale)(label))return null;
 const translated=locale==='zh'||!!messages[text];
 return <p className="status-note">
  <span>{translator(locale)('上次核实时的说明：')}</span>{' '}
  <span lang={translated?(locale==='zh'?'zh-CN':locale):'zh-CN'}>{rendered}</span>
 </p>;
}
