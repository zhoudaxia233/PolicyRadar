// Archived evidence is linked from the repository instead of being published with the site:
// GitHub Pages caps a site at 1 GB. Files are named by their SHA-256 and never rewritten,
// so a main-branch URL keeps pointing at the same verified bytes.
export const archiveBase='https://raw.githubusercontent.com/zhoudaxia233/PolicyRadar/main/data/sources/';
export function archiveUrl(snapshotKey:string){return archiveBase+snapshotKey.split('/').at(-1);}
