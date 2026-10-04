export const countries = [
  {
    "id": "DE",
    "name": "德国",
    "de": "Deutschland",
    "en": "Germany",
    "national": "联邦",
    "subdivision": "州",
    "scope": "追踪范围：{0}联邦与全部 {1} 个州。",
    "note": ""
  },
  {
    "id": "FR",
    "name": "法国",
    "de": "Frankreich",
    "en": "France",
    "national": "全国层面",
    "subdivision": "大区",
    "scope": "追踪范围：法国全国层面及18个大区范围（本土13个、海外5个）。",
    "note": "法国是单一制共和国，大区不等同于德国联邦州。科西嘉、法属圭亚那、马提尼克和马约特具有特殊的地方机构安排；这里按18个大区地理范围归类。省、市镇及其他特殊海外属地尚未接入。"
  },
  {
    "id": "NL",
    "name": "荷兰",
    "de": "Niederlande",
    "en": "Netherlands",
    "national": "全国层面",
    "subdivision": "省",
    "scope": "追踪范围：荷兰全国层面及欧洲部分全部12个省。",
    "note": "荷兰的省（provincies）不是德国式联邦州。市镇、水务委员会和加勒比公共实体尚未接入；阿鲁巴、库拉索和圣马丁是王国内的其他构成国，不在本次范围内。"
  },
  {
    "id": "CH",
    "name": "瑞士",
    "de": "Schweiz",
    "en": "Switzerland",
    "national": "联邦",
    "subdivision": "州",
    "scope": "追踪范围：瑞士联邦及全部26个州。",
    "note": "瑞士是联邦国家，包含26个州（Kantone / cantons / cantoni / chantuns）。州政府、州议会、州法律及联邦投票入口已登记；市镇未独立接入。议会通过、公投结果和生效日期分别核实，原文语言按具体文件保留。"
  }
] as const;
