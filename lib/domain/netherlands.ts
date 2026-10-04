import registry from '../../data/discovery-registry.json' with {type:'json'};
// ISO 3166-2 provinces of the European Netherlands. Caribbean public bodies are outside this initial scope.
export const dutchProvinces = [
  {
    "id": "NL-GR",
    "name": "格罗宁根",
    "de": "Groningen",
    "nl": "Groningen",
    "en": "Groningen"
  },
  {
    "id": "NL-FR",
    "name": "弗里斯兰",
    "de": "Friesland",
    "nl": "Fryslân",
    "en": "Friesland"
  },
  {
    "id": "NL-DR",
    "name": "德伦特",
    "de": "Drenthe",
    "nl": "Drenthe",
    "en": "Drenthe"
  },
  {
    "id": "NL-OV",
    "name": "上艾瑟尔",
    "de": "Overijssel",
    "nl": "Overijssel",
    "en": "Overijssel"
  },
  {
    "id": "NL-FL",
    "name": "弗莱福兰",
    "de": "Flevoland",
    "nl": "Flevoland",
    "en": "Flevoland"
  },
  {
    "id": "NL-GE",
    "name": "海尔德兰",
    "de": "Gelderland",
    "nl": "Gelderland",
    "en": "Gelderland"
  },
  {
    "id": "NL-UT",
    "name": "乌得勒支",
    "de": "Utrecht",
    "nl": "Utrecht",
    "en": "Utrecht"
  },
  {
    "id": "NL-NH",
    "name": "北荷兰",
    "de": "Noord-Holland",
    "nl": "Noord-Holland",
    "en": "North Holland"
  },
  {
    "id": "NL-ZH",
    "name": "南荷兰",
    "de": "Zuid-Holland",
    "nl": "Zuid-Holland",
    "en": "South Holland"
  },
  {
    "id": "NL-ZE",
    "name": "泽兰",
    "de": "Zeeland",
    "nl": "Zeeland",
    "en": "Zeeland"
  },
  {
    "id": "NL-NB",
    "name": "北布拉班特",
    "de": "Noord-Brabant",
    "nl": "Noord-Brabant",
    "en": "North Brabant"
  },
  {
    "id": "NL-LI",
    "name": "林堡",
    "de": "Limburg",
    "nl": "Limburg",
    "en": "Limburg"
  }
];

// Entry points are discovery channels, not claims of complete document review.
export const dutchDiscovery = registry.filter(s=>s.region==='NL'||s.region.startsWith('NL-'));
