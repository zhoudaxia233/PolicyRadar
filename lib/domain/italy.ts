import registry from '../../data/discovery-registry.json' with {type:'json'};
// ISO 3166-2 regions; bilingual institutional names retain both languages.
export const italianRegions = [
  {
    "id": "IT-21",
    "name": "皮埃蒙特",
    "de": "Piemont",
    "en": "Piedmont",
    "originalName": "Piemonte",
    "originalLanguage": "it"
  },
  {
    "id": "IT-23",
    "name": "瓦莱达奥斯塔",
    "de": "Aostatal",
    "en": "Aosta Valley",
    "originalName": "Valle d’Aosta / Vallée d’Aoste",
    "originalLanguage": "und"
  },
  {
    "id": "IT-25",
    "name": "伦巴第",
    "de": "Lombardei",
    "en": "Lombardy",
    "originalName": "Lombardia",
    "originalLanguage": "it"
  },
  {
    "id": "IT-32",
    "name": "特伦蒂诺-上阿迪杰",
    "de": "Trentino-Südtirol",
    "en": "Trentino-Alto Adige/Südtirol",
    "originalName": "Trentino-Alto Adige / Südtirol",
    "originalLanguage": "und"
  },
  {
    "id": "IT-34",
    "name": "威尼托",
    "de": "Venetien",
    "en": "Veneto",
    "originalName": "Veneto",
    "originalLanguage": "it"
  },
  {
    "id": "IT-36",
    "name": "弗留利-威尼斯朱利亚",
    "de": "Friaul-Julisch Venetien",
    "en": "Friuli Venezia Giulia",
    "originalName": "Friuli Venezia Giulia",
    "originalLanguage": "it"
  },
  {
    "id": "IT-42",
    "name": "利古里亚",
    "de": "Ligurien",
    "en": "Liguria",
    "originalName": "Liguria",
    "originalLanguage": "it"
  },
  {
    "id": "IT-45",
    "name": "艾米利亚-罗马涅",
    "de": "Emilia-Romagna",
    "en": "Emilia-Romagna",
    "originalName": "Emilia-Romagna",
    "originalLanguage": "it"
  },
  {
    "id": "IT-52",
    "name": "托斯卡纳",
    "de": "Toskana",
    "en": "Tuscany",
    "originalName": "Toscana",
    "originalLanguage": "it"
  },
  {
    "id": "IT-55",
    "name": "翁布里亚",
    "de": "Umbrien",
    "en": "Umbria",
    "originalName": "Umbria",
    "originalLanguage": "it"
  },
  {
    "id": "IT-57",
    "name": "马尔凯",
    "de": "Marken",
    "en": "Marche",
    "originalName": "Marche",
    "originalLanguage": "it"
  },
  {
    "id": "IT-62",
    "name": "拉齐奥",
    "de": "Latium",
    "en": "Lazio",
    "originalName": "Lazio",
    "originalLanguage": "it"
  },
  {
    "id": "IT-65",
    "name": "阿布鲁佐",
    "de": "Abruzzen",
    "en": "Abruzzo",
    "originalName": "Abruzzo",
    "originalLanguage": "it"
  },
  {
    "id": "IT-67",
    "name": "莫利塞",
    "de": "Molise",
    "en": "Molise",
    "originalName": "Molise",
    "originalLanguage": "it"
  },
  {
    "id": "IT-72",
    "name": "坎帕尼亚",
    "de": "Kampanien",
    "en": "Campania",
    "originalName": "Campania",
    "originalLanguage": "it"
  },
  {
    "id": "IT-75",
    "name": "普利亚",
    "de": "Apulien",
    "en": "Apulia",
    "originalName": "Puglia",
    "originalLanguage": "it"
  },
  {
    "id": "IT-77",
    "name": "巴西利卡塔",
    "de": "Basilikata",
    "en": "Basilicata",
    "originalName": "Basilicata",
    "originalLanguage": "it"
  },
  {
    "id": "IT-78",
    "name": "卡拉布里亚",
    "de": "Kalabrien",
    "en": "Calabria",
    "originalName": "Calabria",
    "originalLanguage": "it"
  },
  {
    "id": "IT-82",
    "name": "西西里",
    "de": "Sizilien",
    "en": "Sicily",
    "originalName": "Sicilia",
    "originalLanguage": "it"
  },
  {
    "id": "IT-88",
    "name": "撒丁",
    "de": "Sardinien",
    "en": "Sardinia",
    "originalName": "Sardegna",
    "originalLanguage": "it"
  }
];

// Registered entry points do not imply a completed scan.
export const italianDiscovery = registry.filter(s=>s.region==='IT'||s.region.startsWith('IT-'));
