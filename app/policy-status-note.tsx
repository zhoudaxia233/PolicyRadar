import {policyStatusNote,type Policy} from '../lib/domain/model';
import {translator,type Locale} from '../lib/i18n/index';
import {contentText,type ContentCatalog} from '../lib/i18n/content';

// Used by both cards and details. The review label makes saved, possibly dated
// prose distinguishable from the badge computed for today.
export function PolicyStatusNote({policy,locale,messages}:{policy:Policy;locale:Locale;messages:ContentCatalog}){
 const text=policyStatusNote(policy);
 if(!text)return null;
 const translated=locale==='zh'||!!messages[text];
 return <p className="status-note">
  <span>{translator(locale)('上次核实时的说明：')}</span>{' '}
  <span lang={translated?(locale==='zh'?'zh-CN':locale):'zh-CN'}>{contentText(text,locale,messages)}</span>
 </p>;
}
