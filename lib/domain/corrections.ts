// Corrections append to the archive. Only the final entry in each chain is shown.
// Requiring an earlier target prevents dangling references, cycles and forks.
export function currentRecords<T extends {id:string;supersedes?:string}>(records:T[]) {
 const seen=new Set<string>(),replaced=new Set<string>();
 for(const record of records){
  if(seen.has(record.id))throw Error('Duplicate correction identity');
  if(record.supersedes){
   if(!seen.has(record.supersedes)||replaced.has(record.supersedes))throw Error('Correction must supersede an earlier, unreplaced record');
   replaced.add(record.supersedes);
  }
  seen.add(record.id);
 }
 return records.filter(r=>!replaced.has(r.id)).map(({supersedes,...record})=>record);
}
