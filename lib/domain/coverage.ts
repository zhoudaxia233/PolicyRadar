import {frenchDiscovery} from './france.ts';
// Official discovery entries for Germany and France.
// A registered entry is not a claim of exhaustive coverage or a successful fetch.
export const discovery = [
  ...frenchDiscovery,
  {region:'FR',url:'https://www.legifrance.gouv.fr/jorf/jo',title:'法国官方公报',publisher:'Légifrance',kind:'law'},
  {region:'FR',url:'https://www.service-public.gouv.fr/particuliers/actualites',title:'法国公共服务：个人政策动态',publisher:'DILA',kind:'government'},
  {region:'FR',url:'https://entreprendre.service-public.gouv.fr/actualites',title:'法国公共服务：企业政策动态',publisher:'DILA',kind:'government'},
  {region:'FR',url:'https://www.assemblee-nationale.fr/dyn/17/dossiers',title:'法国国民议会立法进程',publisher:'Assemblée nationale',kind:'parliament'},
  {region:'FR',url:'https://www.senat.fr/dossiers-legislatifs/lois-promulguees.html',title:'法国参议院已公布法律',publisher:'Sénat',kind:'parliament'},
  {
    "region": "DE",
    "url": "https://www.bundesregierung.de/breg-de/suche/gesetzliche-neuregelungen-442800",
    "title": "联邦政府每月新规索引",
    "publisher": "Bundesregierung"
  },
  {
    "region": "DE",
    "url": "https://www.recht.bund.de/de/home/home_node.html",
    "title": "联邦法律公报",
    "publisher": "Bundesministerium der Justiz"
  },
  {
    "region": "DE-NW",
    "title": "北威州法律与条例公报",
    "url": "https://recht.nrw.de/",
    "publisher": "Ministerium des Innern Nordrhein-Westfalen"
  },
  {
    "region": "DE-RP",
    "title": "莱法州官方公布平台",
    "url": "https://verkuendung.rlp.de/de/",
    "publisher": "Land Rheinland-Pfalz"
  },
  {
    "region": "DE-SL",
    "title": "萨尔州官方公报与最新期号",
    "url": "https://www.amtsblatt.saarland.de/jportal/portal/page/fpverksl.psml",
    "publisher": "Saarländische Staatskanzlei"
  },
  {
    "region": "DE-BW",
    "title": "巴符州法律公报",
    "url": "https://www.baden-wuerttemberg.de/de/service/gesetze-und-verordnungen/gesetzblatt",
    "publisher": "Staatsministerium Baden-Württemberg"
  },
  {
    "region": "DE-HE",
    "title": "黑森官方公布平台",
    "url": "https://verkuendung.hessen.de/",
    "publisher": "Hessische Staatskanzlei"
  },
  {
    "region": "DE-BY",
    "title": "巴伐利亚官方公布平台",
    "url": "https://www.verkuendung-bayern.de/",
    "publisher": "Bayerische Staatsregierung"
  },
  {
    "region": "DE-SH",
    "title": "石荷州官方法律与行政公报",
    "url": "https://verkuendungsportal.schleswig-holstein.de/home",
    "publisher": "Verkündungsportal Schleswig-Holstein"
  },
  {
    "region": "DE-HH",
    "title": "汉堡法规发布及立法程序入口",
    "url": "https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/veroeffentlichungen",
    "publisher": "Behörde für Justiz und Verbraucherschutz Hamburg"
  },
  {
    "region": "DE-HB",
    "title": "不来梅法律公报",
    "url": "https://www.gesetzblatt.bremen.de/",
    "publisher": "Gesetzblatt Bremen"
  },
  {
    "region": "DE-NI",
    "title": "下萨克森官方公报入口",
    "url": "https://www.niedersachsen.de/politik_staat/gesetze_verordnungen_und_sonstige_vorschriften/aktuelle_verkundungsblatter/download-verkuendungsblaetter-108794.html",
    "publisher": "Portal Niedersachsen"
  },
  {
    "region": "DE-MV",
    "title": "梅前州法律及条例公报",
    "url": "https://www.regierung-mv.de/Landesregierung/jm/service_justizministerium/verkuendungsblaetter/gesetz-verordnungsblaetter",
    "publisher": "Justizministerium Mecklenburg-Vorpommern"
  },
  {
    "region": "DE-BE",
    "title": "柏林法律与条例公报：2026年各期",
    "url": "https://www.berlin.de/sen/justiz/service/gesetze-und-verordnungen/2026/",
    "publisher": "Senatsverwaltung für Justiz und Verbraucherschutz Berlin"
  },
  {
    "region": "DE-BB",
    "title": "勃兰登堡2026年公报时间顺序目录",
    "url": "https://bravors.brandenburg.de/de/veroeffentlichungsblaetter_chronologisch/2026",
    "publisher": "BRAVORS / Land Brandenburg"
  },
  {
    "region": "DE-SN",
    "title": "萨克森州政府官方新闻与条例发布",
    "url": "https://www.medienservice.sachsen.de/",
    "publisher": "Sächsische Staatskanzlei"
  },
  {
    "region": "DE-SN",
    "title": "REVOSax：萨克森现行法规检索",
    "url": "https://www.revosax.sachsen.de/",
    "publisher": "Sächsische Staatskanzlei"
  },
  {
    "region": "DE-ST",
    "title": "萨克森-安哈尔特议会：文件与审议记录入口",
    "url": "https://www.landtag.sachsen-anhalt.de/dokumente/aktuelle-dokumente",
    "publisher": "Landtag Sachsen-Anhalt"
  },
  {
    "region": "DE-ST",
    "title": "萨克森-安哈尔特议会：最新政策与会议信息",
    "url": "https://www.landtag.sachsen-anhalt.de/",
    "publisher": "Landtag Sachsen-Anhalt"
  },
  {
    "region": "DE-TH",
    "title": "图林根州议会：已通过的新法律",
    "url": "https://www.thueringer-landtag.de/plenum/neue-gesetze-im-landtag/",
    "publisher": "Thüringer Landtag"
  },
  {
    "region": "DE-TH",
    "title": "图林根议会文件、公报及立法程序入口",
    "url": "https://www.thueringer-landtag.de/dokumente/parlamentsdokumentation/",
    "publisher": "Thüringer Landtag"
  },
  {
    "region": "DE-SH",
    "title": "石荷州议会决议记录",
    "url": "https://www.landtag.ltsh.de/infothek/wahl20/plenum/beschlusspro_seite/",
    "publisher": "Schleswig-Holsteinischer Landtag",
    "kind": "parliament"
  },
  {
    "region": "DE-SH",
    "title": "石荷州政府及各部新闻与决定",
    "url": "https://www.schleswig-holstein.de/DE/landesportal/presse/pressemitteilungen",
    "publisher": "Landesregierung Schleswig-Holstein",
    "kind": "government"
  },
  {
    "region": "DE-HH",
    "title": "汉堡州议会表决与决议记录",
    "url": "https://www.hamburgische-buergerschaft.de/recherche-info/protokolle",
    "publisher": "Hamburgische Bürgerschaft",
    "kind": "parliament"
  },
  {
    "region": "DE-HH",
    "title": "汉堡州政府各部门新闻与决定",
    "url": "https://www.hamburg.de/politik-und-verwaltung/senat/presseservice-des-senats/pressemeldungen-des-senats",
    "publisher": "Senat der Freien und Hansestadt Hamburg",
    "kind": "government"
  },
  {
    "region": "DE-HB",
    "title": "不来梅州议会决议记录",
    "url": "https://www.bremische-buergerschaft.de/index.php?id=480",
    "publisher": "Bremische Bürgerschaft",
    "kind": "parliament"
  },
  {
    "region": "DE-HB",
    "title": "不来梅州政府各部门新闻与决定",
    "url": "https://www.senatspressestelle.bremen.de/pressemitteilungen-1464",
    "publisher": "Pressestelle des Senats Bremen",
    "kind": "government"
  },
  {
    "region": "DE-NI",
    "title": "下萨克森州议会文书与表决简报",
    "url": "https://www.landtag-niedersachsen.de/dokumentensuche/",
    "publisher": "Niedersächsischer Landtag",
    "kind": "parliament"
  },
  {
    "region": "DE-NI",
    "title": "下萨克森州政府及公共机构公告",
    "url": "https://www.niedersachsen.de/startseite/service/presse/presseinformationen/",
    "publisher": "Portal Niedersachsen",
    "kind": "government"
  },
  {
    "region": "DE-MV",
    "title": "梅前州议会全体会议与决议记录",
    "url": "https://www.landtag-mv.de/plenum-und-ausschuesse/plenum/vergangene-plenarsitzungen",
    "publisher": "Landtag Mecklenburg-Vorpommern",
    "kind": "parliament"
  },
  {
    "region": "DE-MV",
    "title": "梅前州政府各部新闻与决定",
    "url": "https://www.regierung-mv.de/Aktuell/",
    "publisher": "Landesregierung Mecklenburg-Vorpommern",
    "kind": "government"
  },
  {
    "region": "DE-BE",
    "title": "柏林议会文献库：法律与议会决议",
    "url": "https://pardok.parlament-berlin.de/portala/start.tt.html",
    "publisher": "Abgeordnetenhaus von Berlin",
    "kind": "parliament"
  },
  {
    "region": "DE-BE",
    "title": "柏林州政府与市长办公厅新闻公告",
    "url": "https://www.berlin.de/rbmskzl/aktuelles/pressemitteilungen/",
    "publisher": "Senatskanzlei Berlin",
    "kind": "government"
  },
  {
    "region": "DE-BB",
    "title": "勃兰登堡州议会已通过法律目录",
    "url": "https://www.landtag.brandenburg.de/de/parlament/plenum_und_gesetze/beschlossene_gesetze/beschlossene_gesetze_der_8._wahlperiode/39257",
    "publisher": "Landtag Brandenburg",
    "kind": "parliament"
  },
  {
    "region": "DE-BB",
    "title": "勃兰登堡州政府新闻公告总入口",
    "url": "https://landesregierung-brandenburg.de/",
    "publisher": "Landesregierung Brandenburg",
    "kind": "government"
  },
  {
    "region": "DE-SN",
    "title": "萨克森州议会全体会议及决议",
    "url": "https://www.landtag.sachsen.de/de/aktuelles/plenarsitzungen/index.cshtml",
    "publisher": "Sächsischer Landtag",
    "kind": "parliament"
  },
  {
    "region": "DE-SN",
    "title": "萨克森州政府及各部门新闻公告",
    "url": "https://www.medienservice.sachsen.de/medien/",
    "publisher": "Sächsische Staatskanzlei",
    "kind": "government"
  },
  {
    "region": "DE-ST",
    "title": "萨克森-安哈尔特州议会全体会议与表决结果档案",
    "url": "https://www.landtag.sachsen-anhalt.de/archiv",
    "publisher": "Landtag Sachsen-Anhalt",
    "kind": "parliament"
  },
  {
    "region": "DE-ST",
    "title": "萨克森-安哈尔特州政府新闻公告",
    "url": "https://www.sachsen-anhalt.de/lj/politik-und-verwaltung/service/politik-aktuell/pressemitteilungen",
    "publisher": "Landesregierung Sachsen-Anhalt",
    "kind": "government"
  },
  {
    "region": "DE-TH",
    "title": "图林根州议会全体会议记录及决议检索入口",
    "url": "https://www.thueringer-landtag.de/plenum/protokolle/",
    "publisher": "Thüringer Landtag",
    "kind": "parliament"
  },
  {
    "region": "DE-TH",
    "title": "图林根州政府及各部门新闻公告",
    "url": "https://thueringen.de/medienservice/medieninformationen",
    "publisher": "Thüringer Staatskanzlei",
    "kind": "government"
  },
  {
    "region": "DE-NW",
    "title": "北威州议会全体会议决定与会议记录",
    "url": "https://www.landtag.nrw.de/cms/render/live/de/sites/landtag-r20/home/dokumente/dokumentensuche/ubersichtsseite-reden--protoko-1/protokolle-18-wahlperiode-2022-2.html?ausschuss=Plenum",
    "publisher": "Landtag Nordrhein-Westfalen",
    "kind": "parliament"
  },
  {
    "region": "DE-NW",
    "title": "北威州政府新闻与决定公告",
    "url": "https://www.land.nrw/pressemitteilungen",
    "publisher": "Landesregierung Nordrhein-Westfalen",
    "kind": "government"
  },
  {
    "region": "DE-RP",
    "title": "莱法州议会最新文件与决定记录",
    "url": "https://opal.rlp.de/portal/dokumente.tt.html",
    "publisher": "Landtag Rheinland-Pfalz",
    "kind": "parliament"
  },
  {
    "region": "DE-RP",
    "title": "莱法州政府新闻公告",
    "url": "https://www.rlp.de/service/pressemitteilungen",
    "publisher": "Staatskanzlei Rheinland-Pfalz",
    "kind": "government"
  },
  {
    "region": "DE-SL",
    "title": "萨尔州议会动态与表决结果",
    "url": "https://www.landtag-saar.de/aktuelles/",
    "publisher": "Landtag des Saarlandes",
    "kind": "parliament"
  },
  {
    "region": "DE-SL",
    "title": "萨尔州政府各部门新闻公告",
    "url": "https://www.saarland.de/DE/presse-informationen/medienservice/medieninfos",
    "publisher": "Landesregierung des Saarlandes",
    "kind": "government"
  },
  {
    "region": "DE-BW",
    "title": "巴符州议会全体会议决定",
    "url": "https://www.landtag-bw.de/de/aktuelles/beschluesse",
    "publisher": "Landtag Baden-Württemberg",
    "kind": "parliament"
  },
  {
    "region": "DE-BW",
    "title": "巴符州政府各部门新闻公告",
    "url": "https://www.baden-wuerttemberg.de/de/service/presse/pressemitteilungen",
    "publisher": "Landesregierung Baden-Württemberg",
    "kind": "government"
  },
  {
    "region": "DE-HE",
    "title": "黑森州议会已通过法律目录（第21届）",
    "url": "https://starweb.hessen.de/portal/browse.tt.html?action=link&searchgeneric1-parsed=%28WP%3D21+AND+SGEBES%3DANNAHME%29+NOT+NOWEB%3DX&type=generic1",
    "publisher": "Hessischer Landtag",
    "kind": "parliament"
  },
  {
    "region": "DE-HE",
    "title": "黑森州政府各部门新闻公告",
    "url": "https://hessen.de/presse",
    "publisher": "Hessische Landesregierung",
    "kind": "government"
  },
  {
    "region": "DE-BY",
    "title": "巴伐利亚州议会已通过法律目录（第19届）",
    "url": "https://www.bayern.landtag.de/parlament/dokumente/drucksachen/?anzahl_treffer=20&beschluss=zustimmung&dknr=&dlh=BeschlosseneGesetze19&dokumentenart=Drucksache&dokumentenart=Drucksache&erfassungsdatum%5Bend%5D=&erfassungsdatum%5Bstart%5D=&ist_basisdokument=off&q=&sort=date&suchverhalten=AND&suchvorgangsart%5B%5D=Gesetze%5C%5CGesetzentwurf&suchvorgangsart%5B%5D=Gesetze%5C%5CHaushaltsgesetz,+Nachtragshaushaltsgesetz&wahlperiodeid%5B%5D=19",
    "publisher": "Bayerischer Landtag",
    "kind": "parliament"
  },
  {
    "region": "DE-BY",
    "title": "巴伐利亚州政府各部门新闻公告",
    "url": "https://www.bayern.de/presse/pressemitteilungen/",
    "publisher": "Bayerische Staatsregierung",
    "kind": "government"
  },
  {
    "region": "DE",
    "title": "联邦议会文件与立法进程",
    "url": "https://www.bundestag.de/dokumente/parlamentsdokumentation",
    "publisher": "Deutscher Bundestag",
    "kind": "parliament"
  },
  {
    "region": "DE",
    "title": "联邦议会审议与表决新闻档案",
    "url": "https://www.bundestag.de/dokumente/textarchiv",
    "publisher": "Deutscher Bundestag",
    "kind": "parliament"
  },
  {
    "region": "DE",
    "title": "联邦内阁议题与决定",
    "url": "https://www.bundesregierung.de/breg-de/bundesregierung/kabinettsthemen",
    "publisher": "Bundesregierung",
    "kind": "government"
  },
  {
    "region": "DE",
    "title": "联邦参议院全体会议",
    "url": "https://www.bundesrat.de/DE/plenum/plenum-node.html",
    "publisher": "Bundesrat",
    "kind": "parliament"
  },
  {
    "region": "DE-BB",
    "title": "勃兰登堡基础设施与规划部公告",
    "url": "https://mil.brandenburg.de/mil/de/",
    "publisher": "Ministerium für Infrastruktur und Landesplanung Brandenburg",
    "kind": "government"
  }
];

// Resolve the calendar year during a request: Worker module initialization has no live clock.
export function discoveryForYear(year:number){return discovery.map(d=>d.url.includes('/2026')?{...d,title:d.title.replace('2026',String(year)),url:d.url.replace('/2026','/'+year)}:d);}
