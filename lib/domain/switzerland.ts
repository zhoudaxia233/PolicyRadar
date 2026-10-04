import registry from '../../data/discovery-registry.json' with {type:'json'};
// ISO 3166-2 cantons. Multilingual names use und; each source records its own language.
export const swissCantons = [
  {
    "id": "CH-ZH",
    "name": "苏黎世",
    "de": "Zürich",
    "en": "Zurich",
    "originalName": "Zürich",
    "originalLanguage": "de"
  },
  {
    "id": "CH-BE",
    "name": "伯尔尼",
    "de": "Bern",
    "en": "Bern",
    "originalName": "Bern / Berne",
    "originalLanguage": "und"
  },
  {
    "id": "CH-LU",
    "name": "卢塞恩",
    "de": "Luzern",
    "en": "Lucerne",
    "originalName": "Luzern",
    "originalLanguage": "de"
  },
  {
    "id": "CH-UR",
    "name": "乌里",
    "de": "Uri",
    "en": "Uri",
    "originalName": "Uri",
    "originalLanguage": "de"
  },
  {
    "id": "CH-SZ",
    "name": "施维茨",
    "de": "Schwyz",
    "en": "Schwyz",
    "originalName": "Schwyz",
    "originalLanguage": "de"
  },
  {
    "id": "CH-OW",
    "name": "上瓦尔登",
    "de": "Obwalden",
    "en": "Obwalden",
    "originalName": "Obwalden",
    "originalLanguage": "de"
  },
  {
    "id": "CH-NW",
    "name": "下瓦尔登",
    "de": "Nidwalden",
    "en": "Nidwalden",
    "originalName": "Nidwalden",
    "originalLanguage": "de"
  },
  {
    "id": "CH-GL",
    "name": "格拉鲁斯",
    "de": "Glarus",
    "en": "Glarus",
    "originalName": "Glarus",
    "originalLanguage": "de"
  },
  {
    "id": "CH-ZG",
    "name": "楚格",
    "de": "Zug",
    "en": "Zug",
    "originalName": "Zug",
    "originalLanguage": "de"
  },
  {
    "id": "CH-FR",
    "name": "弗里堡",
    "de": "Freiburg",
    "en": "Fribourg",
    "originalName": "Fribourg / Freiburg",
    "originalLanguage": "und"
  },
  {
    "id": "CH-SO",
    "name": "索洛图恩",
    "de": "Solothurn",
    "en": "Solothurn",
    "originalName": "Solothurn",
    "originalLanguage": "de"
  },
  {
    "id": "CH-BS",
    "name": "巴塞尔城市",
    "de": "Basel-Stadt",
    "en": "Basel-Stadt",
    "originalName": "Basel-Stadt",
    "originalLanguage": "de"
  },
  {
    "id": "CH-BL",
    "name": "巴塞尔乡村",
    "de": "Basel-Landschaft",
    "en": "Basel-Landschaft",
    "originalName": "Basel-Landschaft",
    "originalLanguage": "de"
  },
  {
    "id": "CH-SH",
    "name": "沙夫豪森",
    "de": "Schaffhausen",
    "en": "Schaffhausen",
    "originalName": "Schaffhausen",
    "originalLanguage": "de"
  },
  {
    "id": "CH-AR",
    "name": "外阿彭策尔",
    "de": "Appenzell Ausserrhoden",
    "en": "Appenzell Ausserrhoden",
    "originalName": "Appenzell Ausserrhoden",
    "originalLanguage": "de"
  },
  {
    "id": "CH-AI",
    "name": "内阿彭策尔",
    "de": "Appenzell Innerrhoden",
    "en": "Appenzell Innerrhoden",
    "originalName": "Appenzell Innerrhoden",
    "originalLanguage": "de"
  },
  {
    "id": "CH-SG",
    "name": "圣加仑",
    "de": "St. Gallen",
    "en": "St. Gallen",
    "originalName": "St. Gallen",
    "originalLanguage": "de"
  },
  {
    "id": "CH-GR",
    "name": "格劳宾登",
    "de": "Graubünden",
    "en": "Grisons",
    "originalName": "Graubünden / Grischun / Grigioni",
    "originalLanguage": "und"
  },
  {
    "id": "CH-AG",
    "name": "阿尔高",
    "de": "Aargau",
    "en": "Aargau",
    "originalName": "Aargau",
    "originalLanguage": "de"
  },
  {
    "id": "CH-TG",
    "name": "图尔高",
    "de": "Thurgau",
    "en": "Thurgau",
    "originalName": "Thurgau",
    "originalLanguage": "de"
  },
  {
    "id": "CH-TI",
    "name": "提契诺",
    "de": "Tessin",
    "en": "Ticino",
    "originalName": "Ticino",
    "originalLanguage": "it"
  },
  {
    "id": "CH-VD",
    "name": "沃",
    "de": "Waadt",
    "en": "Vaud",
    "originalName": "Vaud",
    "originalLanguage": "fr"
  },
  {
    "id": "CH-VS",
    "name": "瓦莱",
    "de": "Wallis",
    "en": "Valais",
    "originalName": "Valais / Wallis",
    "originalLanguage": "und"
  },
  {
    "id": "CH-NE",
    "name": "纳沙泰尔",
    "de": "Neuenburg",
    "en": "Neuchâtel",
    "originalName": "Neuchâtel",
    "originalLanguage": "fr"
  },
  {
    "id": "CH-GE",
    "name": "日内瓦",
    "de": "Genf",
    "en": "Geneva",
    "originalName": "Genève",
    "originalLanguage": "fr"
  },
  {
    "id": "CH-JU",
    "name": "汝拉",
    "de": "Jura",
    "en": "Jura",
    "originalName": "Jura",
    "originalLanguage": "fr"
  }
];

// Official entry points; registration does not imply a completed scan.
export const swissDiscovery = registry.filter(s=>s.region==='CH'||s.region.startsWith('CH-'));
