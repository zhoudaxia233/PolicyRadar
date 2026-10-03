// ISO 3166-2 identifiers; INSEE region codes and French original names are separate metadata.
// Reference: https://www.insee.fr/fr/statistiques/8887938?sommaire=8887976
export const frenchRegions = [
  {
    "id": "FR-ARA",
    "name": "奥弗涅-罗讷-阿尔卑斯",
    "de": "Auvergne-Rhône-Alpes",
    "insee": "84",
    "fr": "Auvergne-Rhône-Alpes",
    "en": "Auvergne-Rhône-Alpes"
  },
  {
    "id": "FR-BFC",
    "name": "勃艮第-弗朗什-孔泰",
    "de": "Bourgogne-Franche-Comté",
    "insee": "27",
    "fr": "Bourgogne-Franche-Comté",
    "en": "Bourgogne-Franche-Comté"
  },
  {
    "id": "FR-BRE",
    "name": "布列塔尼",
    "de": "Bretagne",
    "insee": "53",
    "fr": "Bretagne",
    "en": "Brittany"
  },
  {
    "id": "FR-CVL",
    "name": "中央-卢瓦尔河谷",
    "de": "Centre-Val de Loire",
    "insee": "24",
    "fr": "Centre-Val de Loire",
    "en": "Centre-Val de Loire"
  },
  {
    "id": "FR-20R",
    "name": "科西嘉",
    "de": "Korsika",
    "insee": "94",
    "fr": "Corse",
    "en": "Corsica"
  },
  {
    "id": "FR-GES",
    "name": "大东部",
    "de": "Grand Est",
    "insee": "44",
    "fr": "Grand Est",
    "en": "Grand Est"
  },
  {
    "id": "FR-HDF",
    "name": "上法兰西",
    "de": "Hauts-de-France",
    "insee": "32",
    "fr": "Hauts-de-France",
    "en": "Hauts-de-France"
  },
  {
    "id": "FR-IDF",
    "name": "法兰西岛",
    "de": "Île-de-France",
    "insee": "11",
    "fr": "Île-de-France",
    "en": "Île-de-France"
  },
  {
    "id": "FR-NOR",
    "name": "诺曼底",
    "de": "Normandie",
    "insee": "28",
    "fr": "Normandie",
    "en": "Normandy"
  },
  {
    "id": "FR-NAQ",
    "name": "新阿基坦",
    "de": "Nouvelle-Aquitaine",
    "insee": "75",
    "fr": "Nouvelle-Aquitaine",
    "en": "Nouvelle-Aquitaine"
  },
  {
    "id": "FR-OCC",
    "name": "奥克西塔尼",
    "de": "Okzitanien",
    "insee": "76",
    "fr": "Occitanie",
    "en": "Occitanie"
  },
  {
    "id": "FR-PDL",
    "name": "卢瓦尔河地区",
    "de": "Pays de la Loire",
    "insee": "52",
    "fr": "Pays de la Loire",
    "en": "Pays de la Loire"
  },
  {
    "id": "FR-PAC",
    "name": "普罗旺斯-阿尔卑斯-蓝色海岸",
    "de": "Provence-Alpes-Côte d’Azur",
    "insee": "93",
    "fr": "Provence-Alpes-Côte d’Azur",
    "en": "Provence-Alpes-Côte d’Azur"
  },
  {
    "id": "FR-971",
    "name": "瓜德罗普",
    "de": "Guadeloupe",
    "insee": "01",
    "fr": "Guadeloupe",
    "en": "Guadeloupe"
  },
  {
    "id": "FR-972",
    "name": "马提尼克",
    "de": "Martinique",
    "insee": "02",
    "fr": "Martinique",
    "en": "Martinique"
  },
  {
    "id": "FR-973",
    "name": "法属圭亚那",
    "de": "Französisch-Guayana",
    "insee": "03",
    "fr": "Guyane",
    "en": "French Guiana"
  },
  {
    "id": "FR-974",
    "name": "留尼汪",
    "de": "Réunion",
    "insee": "04",
    "fr": "La Réunion",
    "en": "Réunion"
  },
  {
    "id": "FR-976",
    "name": "马约特",
    "de": "Mayotte",
    "insee": "06",
    "fr": "Mayotte",
    "en": "Mayotte"
  }
];

// Each portal is an entry point, not evidence that its documents have all been checked.
export const frenchDiscovery = [
  {
    "region": "FR-ARA",
    "url": "https://www.auvergnerhonealpes.fr/",
    "title": "奥弗涅-罗讷-阿尔卑斯：地方政府公告",
    "publisher": "Auvergne-Rhône-Alpes",
    "kind": "government"
  },
  {
    "region": "FR-ARA",
    "url": "https://edelib.auvergnerhonealpes.fr/webdelibplus/jsp/seances.jsp?role=usager",
    "title": "奥弗涅-罗讷-阿尔卑斯：地方决议及行政文件",
    "publisher": "Auvergne-Rhône-Alpes",
    "kind": "law"
  },
  {
    "region": "FR-ARA",
    "url": "https://www.prefectures-regions.gouv.fr/auvergne-rhone-alpes/",
    "title": "奥弗涅-罗讷-阿尔卑斯：国家驻区机构入口",
    "publisher": "Auvergne-Rhône-Alpes",
    "kind": "government"
  },
  {
    "region": "FR-BFC",
    "url": "https://www.bourgognefranchecomte.fr/",
    "title": "勃艮第-弗朗什-孔泰：地方政府公告",
    "publisher": "Bourgogne-Franche-Comté",
    "kind": "government"
  },
  {
    "region": "FR-BFC",
    "url": "https://abcdelib.bourgognefranchecomte.fr/",
    "title": "勃艮第-弗朗什-孔泰：地方决议及行政文件",
    "publisher": "Bourgogne-Franche-Comté",
    "kind": "law"
  },
  {
    "region": "FR-BFC",
    "url": "https://www.prefectures-regions.gouv.fr/bourgogne-franche-comte/",
    "title": "勃艮第-弗朗什-孔泰：国家驻区机构入口",
    "publisher": "Bourgogne-Franche-Comté",
    "kind": "government"
  },
  {
    "region": "FR-BRE",
    "url": "https://www.bretagne.bzh/",
    "title": "布列塔尼：地方政府公告",
    "publisher": "Bretagne",
    "kind": "government"
  },
  {
    "region": "FR-BRE",
    "url": "https://www.bretagne.bzh/region/decisions/",
    "title": "布列塔尼：地方决议及行政文件",
    "publisher": "Bretagne",
    "kind": "law"
  },
  {
    "region": "FR-BRE",
    "url": "https://www.prefectures-regions.gouv.fr/bretagne/",
    "title": "布列塔尼：国家驻区机构入口",
    "publisher": "Bretagne",
    "kind": "government"
  },
  {
    "region": "FR-CVL",
    "url": "https://www.centre-valdeloire.fr/",
    "title": "中央-卢瓦尔河谷：地方政府公告",
    "publisher": "Centre-Val de Loire",
    "kind": "government"
  },
  {
    "region": "FR-CVL",
    "url": "https://actes.centre-valdeloire.fr/webdelibplus/jsp/seances.jsp?role=usager",
    "title": "中央-卢瓦尔河谷：地方决议及行政文件",
    "publisher": "Centre-Val de Loire",
    "kind": "law"
  },
  {
    "region": "FR-CVL",
    "url": "https://www.prefectures-regions.gouv.fr/centre-val-de-loire/",
    "title": "中央-卢瓦尔河谷：国家驻区机构入口",
    "publisher": "Centre-Val de Loire",
    "kind": "government"
  },
  {
    "region": "FR-20R",
    "url": "https://www.isula.corsica/",
    "title": "科西嘉：地方政府公告",
    "publisher": "Corse",
    "kind": "government"
  },
  {
    "region": "FR-20R",
    "url": "https://www.isula.corsica/Recueils-des-actes-administratifs_r100.html",
    "title": "科西嘉：地方决议及行政文件",
    "publisher": "Corse",
    "kind": "law"
  },
  {
    "region": "FR-20R",
    "url": "https://www.prefectures-regions.gouv.fr/corse/",
    "title": "科西嘉：国家驻区机构入口",
    "publisher": "Corse",
    "kind": "government"
  },
  {
    "region": "FR-GES",
    "url": "https://www.grandest.fr/",
    "title": "大东部：地方政府公告",
    "publisher": "Grand Est",
    "kind": "government"
  },
  {
    "region": "FR-GES",
    "url": "https://www.grandest.fr/le-conseil-regional/deliberations/",
    "title": "大东部：地方决议及行政文件",
    "publisher": "Grand Est",
    "kind": "law"
  },
  {
    "region": "FR-GES",
    "url": "https://www.prefectures-regions.gouv.fr/grand-est/",
    "title": "大东部：国家驻区机构入口",
    "publisher": "Grand Est",
    "kind": "government"
  },
  {
    "region": "FR-HDF",
    "url": "https://www.hautsdefrance.fr/",
    "title": "上法兰西：地方政府公告",
    "publisher": "Hauts-de-France",
    "kind": "government"
  },
  {
    "region": "FR-HDF",
    "url": "https://www.hautsdefrance.fr/conseil-regional-hdf/les-actes-institutionnels/",
    "title": "上法兰西：地方决议及行政文件",
    "publisher": "Hauts-de-France",
    "kind": "law"
  },
  {
    "region": "FR-HDF",
    "url": "https://www.prefectures-regions.gouv.fr/hauts-de-france/",
    "title": "上法兰西：国家驻区机构入口",
    "publisher": "Hauts-de-France",
    "kind": "government"
  },
  {
    "region": "FR-IDF",
    "url": "https://www.iledefrance.fr/",
    "title": "法兰西岛：地方政府公告",
    "publisher": "Île-de-France",
    "kind": "government"
  },
  {
    "region": "FR-IDF",
    "url": "https://www.data.gouv.fr/datasets/actes-administratifs-de-la-region-ile-de-france",
    "title": "法兰西岛：地方决议及行政文件",
    "publisher": "Île-de-France",
    "kind": "law"
  },
  {
    "region": "FR-IDF",
    "url": "https://www.prefectures-regions.gouv.fr/ile-de-france/",
    "title": "法兰西岛：国家驻区机构入口",
    "publisher": "Île-de-France",
    "kind": "government"
  },
  {
    "region": "FR-NOR",
    "url": "https://www.normandie.fr/",
    "title": "诺曼底：地方政府公告",
    "publisher": "Normandie",
    "kind": "government"
  },
  {
    "region": "FR-NOR",
    "url": "https://www.normandie.fr/deliberations-normandie-et-ex-haute-normandie",
    "title": "诺曼底：地方决议及行政文件",
    "publisher": "Normandie",
    "kind": "law"
  },
  {
    "region": "FR-NOR",
    "url": "https://www.prefectures-regions.gouv.fr/normandie/",
    "title": "诺曼底：国家驻区机构入口",
    "publisher": "Normandie",
    "kind": "government"
  },
  {
    "region": "FR-NAQ",
    "url": "https://www.nouvelle-aquitaine.fr/",
    "title": "新阿基坦：地方政府公告",
    "publisher": "Nouvelle-Aquitaine",
    "kind": "government"
  },
  {
    "region": "FR-NAQ",
    "url": "https://www.nouvelle-aquitaine.fr/linstitution/le-conseil-regional/decisions-de-lassemblee-et-arretes-du-president",
    "title": "新阿基坦：地方决议及行政文件",
    "publisher": "Nouvelle-Aquitaine",
    "kind": "law"
  },
  {
    "region": "FR-NAQ",
    "url": "https://www.prefectures-regions.gouv.fr/nouvelle-aquitaine/",
    "title": "新阿基坦：国家驻区机构入口",
    "publisher": "Nouvelle-Aquitaine",
    "kind": "government"
  },
  {
    "region": "FR-OCC",
    "url": "https://www.laregion.fr/",
    "title": "奥克西塔尼：地方政府公告",
    "publisher": "Occitanie",
    "kind": "government"
  },
  {
    "region": "FR-OCC",
    "url": "https://www.laregion.fr/Portail-de-publication-des-Deliberations-et-autres-actes-administratifs-de-la-Region",
    "title": "奥克西塔尼：地方决议及行政文件",
    "publisher": "Occitanie",
    "kind": "law"
  },
  {
    "region": "FR-OCC",
    "url": "https://www.prefectures-regions.gouv.fr/occitanie/",
    "title": "奥克西塔尼：国家驻区机构入口",
    "publisher": "Occitanie",
    "kind": "government"
  },
  {
    "region": "FR-PDL",
    "url": "https://www.paysdelaloire.fr/",
    "title": "卢瓦尔河地区：地方政府公告",
    "publisher": "Pays de la Loire",
    "kind": "government"
  },
  {
    "region": "FR-PDL",
    "url": "https://www.paysdelaloire.fr/mon-conseil-regional/linstitution/les-actes-administratifs",
    "title": "卢瓦尔河地区：地方决议及行政文件",
    "publisher": "Pays de la Loire",
    "kind": "law"
  },
  {
    "region": "FR-PDL",
    "url": "https://www.prefectures-regions.gouv.fr/pays-de-la-loire/",
    "title": "卢瓦尔河地区：国家驻区机构入口",
    "publisher": "Pays de la Loire",
    "kind": "government"
  },
  {
    "region": "FR-PAC",
    "url": "https://www.maregionsud.fr/",
    "title": "普罗旺斯-阿尔卑斯-蓝色海岸：地方政府公告",
    "publisher": "Provence-Alpes-Côte d’Azur",
    "kind": "government"
  },
  {
    "region": "FR-PAC",
    "url": "https://actes.maregionsud.fr/actes/",
    "title": "普罗旺斯-阿尔卑斯-蓝色海岸：地方决议及行政文件",
    "publisher": "Provence-Alpes-Côte d’Azur",
    "kind": "law"
  },
  {
    "region": "FR-PAC",
    "url": "https://www.prefectures-regions.gouv.fr/provence-alpes-cote-dazur/",
    "title": "普罗旺斯-阿尔卑斯-蓝色海岸：国家驻区机构入口",
    "publisher": "Provence-Alpes-Côte d’Azur",
    "kind": "government"
  },
  {
    "region": "FR-971",
    "url": "https://www.regionguadeloupe.fr/",
    "title": "瓜德罗普：地方政府公告",
    "publisher": "Guadeloupe",
    "kind": "government"
  },
  {
    "region": "FR-971",
    "url": "https://www.regionguadeloupe.fr/Publication-des-actes-administratifs",
    "title": "瓜德罗普：地方决议及行政文件",
    "publisher": "Guadeloupe",
    "kind": "law"
  },
  {
    "region": "FR-971",
    "url": "https://www.guadeloupe.gouv.fr/",
    "title": "瓜德罗普：国家驻区机构入口",
    "publisher": "Guadeloupe",
    "kind": "government"
  },
  {
    "region": "FR-972",
    "url": "https://www.collectivitedemartinique.mq/",
    "title": "马提尼克：地方政府公告",
    "publisher": "Martinique",
    "kind": "government"
  },
  {
    "region": "FR-972",
    "url": "https://www.collectivitedemartinique.mq/actes-adminitratifs/",
    "title": "马提尼克：地方决议及行政文件",
    "publisher": "Martinique",
    "kind": "law"
  },
  {
    "region": "FR-972",
    "url": "https://www.martinique.gouv.fr/",
    "title": "马提尼克：国家驻区机构入口",
    "publisher": "Martinique",
    "kind": "government"
  },
  {
    "region": "FR-973",
    "url": "https://www.ctguyane.fr/",
    "title": "法属圭亚那：地方政府公告",
    "publisher": "Guyane",
    "kind": "government"
  },
  {
    "region": "FR-973",
    "url": "https://webdelib.ctguyane.fr/webdelibplus/jsp/seances.jsp?role=usager",
    "title": "法属圭亚那：地方决议及行政文件",
    "publisher": "Guyane",
    "kind": "law"
  },
  {
    "region": "FR-973",
    "url": "https://www.guyane.gouv.fr/",
    "title": "法属圭亚那：国家驻区机构入口",
    "publisher": "Guyane",
    "kind": "government"
  },
  {
    "region": "FR-974",
    "url": "https://regionreunion.com/",
    "title": "留尼汪：地方政府公告",
    "publisher": "La Réunion",
    "kind": "government"
  },
  {
    "region": "FR-974",
    "url": "https://regionreunion.com/la-region/les-actes-administratifs/article/commission-permanente-assemblee-pleniere",
    "title": "留尼汪：地方决议及行政文件",
    "publisher": "La Réunion",
    "kind": "law"
  },
  {
    "region": "FR-974",
    "url": "https://www.reunion.gouv.fr/",
    "title": "留尼汪：国家驻区机构入口",
    "publisher": "La Réunion",
    "kind": "government"
  },
  {
    "region": "FR-976",
    "url": "https://www.mayotte.fr/",
    "title": "马约特：地方政府公告",
    "publisher": "Mayotte",
    "kind": "government"
  },
  {
    "region": "FR-976",
    "url": "https://www.mayotte.fr/le-departement/transparence-administrative/publicite-des-actes",
    "title": "马约特：地方决议及行政文件",
    "publisher": "Mayotte",
    "kind": "law"
  },
  {
    "region": "FR-976",
    "url": "https://www.mayotte.gouv.fr/",
    "title": "马约特：国家驻区机构入口",
    "publisher": "Mayotte",
    "kind": "government"
  }
];

// Schema-v2 IDs and unversioned pre-release URLs only. Never apply to canonical v3 data.
export const legacyFrenchRegionIds:Record<string,string> = {
  "FR-84": "FR-ARA",
  "FR-27": "FR-BFC",
  "FR-53": "FR-BRE",
  "FR-24": "FR-CVL",
  "FR-94": "FR-20R",
  "FR-44": "FR-GES",
  "FR-32": "FR-HDF",
  "FR-11": "FR-IDF",
  "FR-28": "FR-NOR",
  "FR-75": "FR-NAQ",
  "FR-76": "FR-OCC",
  "FR-52": "FR-PDL",
  "FR-93": "FR-PAC",
  "FR-01": "FR-971",
  "FR-02": "FR-972",
  "FR-03": "FR-973",
  "FR-04": "FR-974",
  "FR-06": "FR-976"
};
export const legacyFrenchRegion = (id:string) => legacyFrenchRegionIds[id]??id;
