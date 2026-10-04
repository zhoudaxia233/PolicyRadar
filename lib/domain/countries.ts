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
  },
  {
    "id": "IT",
    "name": "意大利",
    "de": "Italien",
    "en": "Italy",
    "national": "全国层面",
    "subdivision": "大区",
    "scope": "追踪范围：意大利全国层面及全部20个大区。",
    "note": "意大利包含20个大区，其中5个实行特别自治。特伦蒂诺-上阿迪杰由特伦托和博尔扎诺两个自治省组成；自治省、省和市镇尚未独立接入。已登记全国渠道、大区政府入口及国家公报的大区法律栏目；大区议会和地方公报尚未逐一接入，登记来源不代表已完成核查。"
  },
  {
    "id": "EU",
    "name": "欧盟",
    "de": "Europäische Union",
    "en": "European Union",
    "national": "欧盟层面",
    "subdivision": "",
    "scope": "追踪范围：欧盟层面的法规、指令和决定。",
    "note": "欧盟是超国家层级。法规、指令与各国落实措施分别核实；通过、生效、开始适用和转化期限不等同。第一批为历史补录，尚未完成逐日扫描及各成员国转化核查。瑞士等非成员国不自动纳入适用范围。"
  }
] as const;
