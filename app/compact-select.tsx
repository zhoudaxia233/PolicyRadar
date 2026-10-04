import {useEffect,useRef} from 'react';
import {Check,ChevronDown} from 'lucide-react';
type Option<T extends string>={value:T;label:string;short?:string;accessibleLabel?:string;lang?:string};

export function CompactSelect<T extends string>({value,label,options,onChange,align='right'}:{value:T;label:string;options:Option<T>[];onChange:(value:T)=>void;align?:'left'|'right'}){
 const selected=options.find(option=>option.value===value);
 const root=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{
  const outside=(e:PointerEvent)=>{if(root.current&&!root.current.contains(e.target as Node))root.current.open=false;};
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'&&root.current?.open){e.preventDefault();e.stopPropagation();root.current.open=false;root.current.querySelector('summary')?.focus();}};
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape,true);
  return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape,true);};
 },[]);
 return <details className="compact-select" data-align={align} ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))e.currentTarget.open=false;}} onKeyDown={e=>{
  if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
  e.preventDefault();if(!root.current)return;root.current.open=true;
  const buttons=[...root.current.querySelectorAll('button')];const current=buttons.indexOf(document.activeElement as HTMLButtonElement);
  const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:e.key==='ArrowDown'?(current+1)%buttons.length:(current<=0?buttons.length:current)-1;
  buttons[next]?.focus();
 }}>
  <summary aria-label={`${label}: ${selected?.accessibleLabel??selected?.label??value}`} title={label}><span>{selected?.short??selected?.label??value}</span><ChevronDown size={13}/></summary>
  <div className="compact-options" role="group" aria-label={label}>{options.map(option=><button key={option.value} type="button" lang={option.lang} aria-label={option.accessibleLabel??option.label} title={option.accessibleLabel??option.label} aria-pressed={value===option.value} onClick={()=>{onChange(option.value);if(root.current){root.current.open=false;root.current.querySelector('summary')?.focus();}}}><span>{option.label}</span>{value===option.value&&<Check size={13}/>}</button>)}</div>
 </details>;
}
