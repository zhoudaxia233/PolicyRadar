import registry from '../../data/discovery-registry.json' with {type:'json'};
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
export const frenchDiscovery = registry.filter(s=>s.region.startsWith('FR-'));

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
