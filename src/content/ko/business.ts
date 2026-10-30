import type { Business } from "@/lib/types";

/**
 * 출처: https://jpinno.com/business/* , 메인 요약은 https://jpinno.com/ 사업분야 섹션
 * 순서: EPC → 이차전지 → 화장품 → 제약·바이오 → 전자소재 → 석유화학 → 건설산업
 * 명백한 오탈자 수정 내역은 내부 확인 목록에 기록
 * 2026-10-30 클라이언트 회신: 제품 '석유화학 플랜트'를 사업분야 '석유화학'으로 이동(전자소재와 건설산업 사이).
 *   문구는 기존 석유화학 플랜트 제품 페이지 + 260323 카탈로그 10쪽(Gas & Petrochemical Plant) 원문
 */
export const BUSINESSES: Business[] = [
  {
    slug: "epc-engineering",
    name: "EPC 엔지니어링",
    nameEn: "EPC Engineering",
    summary: [
      "EPC (Turn-⁠Key방식) 사업수행 -\n엔지니어링설계, 장비제작, 시공 및 사후관리",
      "Global Standard Project 수행절차로 프로젝트 진행",
      "Business Partner 사와 협력을 통해 성공적인 투자성과 제공",
    ],
    intro: [
      "JP 이노베이션의 뿌리는 철저한 설계와 관리를 기반으로 한 기술력이라고 할 수 있습니다.\n항상 문제에서 도전의 이유를 찾고, 고객의 공정상의 어려움을 해결하며, 끝없는 연구로 기술력을\n발전 시켜온 JP이노베이션은 이제 EPC (Engineering Procurement Construction-⁠Turn Key방식)\nProject Engineering 분야에서 국내 최고수준의 업체로 성장하였습니다.",
      "그리고 지금도 이차전지, 반도체/전자소재, 제약, 바이오, 정밀화학, 석유화학 분야 등 다양한 분야에서\n기술을 통한 Engineering Solution을 통한 공정 혁신을 이뤄내고 있습니다.",
      "이제 JP 이노베이션과 함께 꿈꾸던 공정을 현실로 바꿔보십시오.",
    ],
    visual: "visual/real-epc.jpg",
    portrait: "visual/sec01-bg01.jpg",
    relatedProducts: ["reactor", "filter", "dryer", "mixer", "milling"],
  },
  {
    slug: "secondary-battery",
    name: "이차전지",
    nameEn: "Secondary Battery",
    summary: [
      "양극재 및 음극재 믹싱장비\n(Mixing Equipment -\nEngineering & Manufacturing)",
      "Global 고객사와 지속적인 사업 협업을 통한 다수의 Projects 수행",
      "믹싱 제조시설 엔지니어링 설계, 장비제작 및 시공",
    ],
    intro: [
      "여러제조산업에서 앞선 기술력을 선보이고, 그 품질을 인정 받고 있는 JP 이노베이션은\n이차전지 분야에서도 새롭게 주목을 받고 있습니다.\n어느 분야보다도 다양하고 정밀한 기술을 요구하는 이차전지 분야에서도 고객이 만족\n이상의 가치를 누릴 수 있는 완벽한 설계와 제작으로 그 입지를 넓혀가고 있습니다.",
      "JP 이노베이션은 PDH-⁠MIXER 나 BINDER MIXER 등 이차전지 공정의 양극재 및\n음극재 믹싱장비를 포함하여 각종 스토리지탱크, 믹싱 제조시설, 엔지니어링 설계까지\n폭넓은 분야의 공정을 완성할 수 있는 최고의 기술력을 보유하고 있습니다.",
      "현재 GLOBAL 고객사 및 국내 유수의 전문기업들과의 사업 협업을 통한\n다수의 PROJECT를 수행하였으며, 그 기술력을 인정 받고 있습니다.",
    ],
    visual: "visual/real-battery.jpg",
    portrait: "visual/sec01-bg02.jpg",
    relatedProducts: ["mixer", "milling", "reactor"],
  },
  {
    slug: "cosmetics",
    name: "화장품",
    nameEn: "Cosmetics",
    summary: [
      "공정의 특성에 맞는 특수한 기능과\n메커니즘을 반영하여\n믹서, 반응기, 여과기,\n건조기 등을 제안, 적용",
      "각 공정에 맞는 EPC Project 플랜트 설계 및 건설 수행",
    ],
    intro: [
      "전세계적으로 많은 관심을 받으며 지속적으로 성장 하고 있는 화장품 산업은 JP 이노베이션의\n성장 동력이라고할 수 있습니다. 저희는 창립 이래로 수많은 화장품 제조 공정에 솔루션을 제공하며\n그 기술력과 노하우를 축적해 왔습니다. 화장품 제조 공정에는 여러가지 주요 공정들이 있지만,\n제형 안정성⁠(크림의 분리 방지, 로션의 점도 유지 등)⁠이나 색조, 질감 등 화장품의 최종 품질을 결정 짓는\n혼합 및 용해, 반응 과정이 가장 핵심적이라고 할 수 있습니다.",
      "JP 이노베이션은 화장품 공정의 혼합 및 용해, 반응에 주로 사용되는 믹서⁠(Mixer), 반응기⁠(Reactor),\n여과기 (Filter), 건조기⁠(Dryer) 등을 제작하고 있으며 각각의 해당 공정의 특성에 따라 반응기의 재질,\n특수한 기능과 메커니즘을 반영하여 독특하고 효율적인 장비를 제안, 적용하고 있습니다. 더 나아가 고객의\n공정에 맞게 플랜트의 설계 건설까지 수행하는 EPC (Engineering Procurement Construction-⁠Turn Key방식)\n전문회사로 더욱 폭넓은 솔루션을 제공하고 있습니다.",
    ],
    visual: "visual/real-cosmetics.jpg",
    portrait: "visual/sec01-bg03.jpg",
    relatedProducts: ["mixer", "milling", "reactor", "filter", "dryer"],
  },
  {
    slug: "pharma-bio",
    name: "제약⁠·⁠바이오",
    nameEn: "Pharma & Bio",
    summary: [
      "합성, 반응, 정제, 건조 공정에 필요한\n모든 엔지니어링과 장비 구축",
      "공정 제안, 시스템 구축, 플랜트 건설 수행",
      "GMP 준수, 무균 청정 관리, 밸리데이션 제공",
    ],
    intro: [
      "제약, 바이오 산업은 그 어떤 산업보다 까다롭고 정밀하며, 고도의 전문성을 요구하는 산업입니다.\n생산 공정에서도 품질 일관성, 무균성, 규제 준수⁠(FDA, EMA, GMP등)⁠가 필수 적이며,\n이를 위해 특수한 설비⁠·⁠공정 관리가 요구됩니다.",
      "JP 이노베이션은 파일롯 생산 장비부터 대량 생산용까지 다양한 스케일의 장비를 보유하고 있으며,\n제약, 바이오 산업에서 주로 진행 하는 합성, 반응, 정제, 건조 공정에 필요한 모든 엔지니어링과\n장비 구축 가능합니다. 또한 풍부한 설계, 납품 이력과 경험을 바탕으로 고객이 원하는 공정의 제안,\n시스템 구축, 플랜트 건설까지 수행 할 수 있으며 제약 바이오산업의 필수 요소인\nGMP준수, 무균 청정 관리, 밸리데이션⁠(Validation) 등도 원활하게 제공해 드립니다.\n이처럼 JP 이노베이션은 다방면의 혁신적인 공정 개선으로 제약 바이오산업에서의 경쟁력을 높여드립니다.",
    ],
    visual: "visual/real-pharma.jpg",
    portrait: "visual/sec01-bg04.jpg",
    relatedProducts: ["reactor", "filter", "dryer"],
  },
  {
    slug: "electronic-materials",
    name: "전자소재",
    nameEn: "Electronic Materials",
    summary: [
      "고품질의 특수합금⁠(티타늄, 지르코늄)⁠소재를\n사용하여 제작 및 설치",
      "Global 고객사와 지속적인 사업 협업을 통한 다수의 Projects 수행",
      "정밀가공 및 고도의 제품 완성도를 자랑하는 전문성을 확보",
    ],
    intro: [
      "JP 이노베이션은 전자소재 생산공정에 특성에 맞춘 설계와 제작으로 효율적인 공정 혁신에\n필요한 모든 솔루션을 제공하고 있습니다.",
      "어떤 산업보다도 정밀하고 순도높은 재료 생산이 요구되는 전자재료 생산 공정은 반드시 전문 업체의\n솔루션과 시공이 필요합니다.",
      "JP 이노베이션은 전자재료 생산 공정에 주로 사용되는 여러 소재의 반응기⁠(Reactor),\n다양한 형태의 여과기 (Filter), 건조기⁠(Dryer) 등을 제작하고 있으며, 국내 및 Global 고객사와 지속적인\n사업 협업을 통한 다수의 Projects를 수행하고 있습니다.",
    ],
    visual: "visual/real-electronic.jpg",
    portrait: "visual/sec01-bg06.jpg",
    relatedProducts: ["reactor", "filter", "dryer"],
  },
  {
    slug: "petrochemical",
    name: "석유화학",
    nameEn: "Gas & Petrochemical Plant",
    summary: [
      "Gas, Petrol Chemical, Oil Refinery Plant\nEPC기반 엔지니어링 설계, 장비제작,\n시공 및 사업관리",
      "베트남 등 해외법인 설립, 해외시장 진출 및 사업 진행",
    ],
    intro: [
      "Gas, Petrol Chemical, Oil Refinery Plant 현장에서 EPC기반 엔지니어링 설계 장비제작 시공 및 사업관리를 수행하고 있으며 특히 베트남 등 해외법인을 설립, 해외시장에 적극적으로 진출, 사업 진행하고 있습니다.",
    ],
    visual: "visual/sub-petro-bg.jpg",
    portrait: "visual/sec01-petro.jpg",
    relatedProducts: [],
  },
  {
    slug: "construction",
    name: "건설산업",
    nameEn: "Construction",
    summary: [
      "EPC Project 엔지니어링과\nPlant 시공, 건설 수행",
      "이차전지, 반도체/전자소재, 제약, 바이오, 정밀화학, 석유화학 분야 국내외 고객사와 다양한 Plant 건설 실적 보유",
    ],
    intro: [
      "JP 이노베이션은 항상 스스로 한계를 뛰어넘기 위해 노력하고 있습니다.\n그동안 EPC PROJECT 엔지니어링 분야에서 쌓은 기술력과 노하우를 토대로\n고객의 완벽한 공정 완성을 위한 EPC 분야로 그 사업영역을 확대해 나가고 있습니다.",
      "그 결과 이차전지, 반도체, 전자소재, 제약, 바이오, 정밀화학, 석유화학 분야 등\n국내외 다양한 업체의 PLANT 건설 실적을 보유하게 되었습니다.",
      "이제 JP 이노베이션을 통해 엔지니어링 및 PLANT설계, 시공, 건설 수행까지\n고객이 필요한 공정의 모든 것을 한번에 해결 할 수 있습니다.",
    ],
    visual: "visual/real-construction.jpg",
    portrait: "visual/sec01-bg05.jpg",
    relatedProducts: [],
  },
];

/** EPC 수행 단계(출처: business/epc-enginerring). '- ' 로 시작하는 줄은 하위 항목 */
export const EPC_STEPS: { no: string; ko: string; en: string; lines: string[] }[] = [
  {
    no: "01",
    ko: "개시",
    en: "Initiation",
    lines: ["Project/Biz Study", "Project request by Int./external", "Business Premise", "Rough Cost estimate (±25%)", "Project charter", "- Purpose", "- Organization", "- Time schedule", "- Profit/Benefit", "- Legal & ESH"],
  },
  {
    no: "02",
    ko: "계획",
    en: "Planning",
    lines: [
      "Feasibility",
      "Business data",
      "Conceptual design/FEED",
      "- Process description(Recipe)",
      "- Block flow diagram",
      "- Overall layout",
      "- Schedule",
      "- Cost estimation(±30%)",
      "- PFD, P&ID",
      "- Mat'l & utility balance",
      "- Instrument & motor list",
      "- Plot plan, MSDS",
      "- Equipment data sheet (EDS)",
      "Cost estimation",
      "Financial data",
      "Option review",
      "Risk analysis",
      "Permit",
      "Legal & ESH",
      "Capex approval",
    ],
  },
  {
    no: "03",
    ko: "실행",
    en: "Execution",
    lines: ["Implementation", "Detail design", "Spec./scope", "Equip. datasheet", "RFQ", "Vendor selection", "PR/PO", "Contract", "Equip. delivery", "Permit & ESH", "Legal"],
  },
  {
    no: "04",
    ko: "관리",
    en: "Monitoring & Control",
    lines: ["Project Control", "Monitor/Control", "- Work progress", "- Schedule", "- Cost", "- Permit/ESH", "Work supervision", "Reporting", "Communication", "- LT/Stakeholders", "- Contractors"],
  },
  {
    no: "05",
    ko: "마무리",
    en: "Closing",
    lines: ["Finalization", "Test run", "- Mech/Electrical", "- On/Off load", "Training", "Commissioning", "ORI/Punch list", "Permit", "Vendor print", "Payment"],
  },
];

/** 분야별 상세 부가 콘텐츠 */
export const PROCESS_IMAGES: Record<string, { title: string; image: string }> = {
  "secondary-battery": { title: "이차 전지 MIXING PROCESS - JPI SCOPE", image: "business/hd/battery-process.jpg" },
  cosmetics: { title: "화장품원료 생산 공정 - JPI SCOPE", image: "business/hd/cosmo-flow.jpg" },
};

/** 석유화학 사업 주요 제품(기존 석유화학 플랜트 페이지·카탈로그 10쪽) */
export const PETRO_PRODUCTS = ["Heat Exchanger", "Pressure Vessel", "Storage Tank", "Reactor", "Drum", "Cooler"];

export const PHARMA_TABLE = {
  columns: ["구분", "제약 (화학 의약품)", "바이오 (바이오 의약품)"],
  rows: [
    ["주요 생산 공정", ["화학 합성 → 반응 (유기합성) → 정제 (결정화, 여과, 건조, 크로마토그래피 등)"], ["세포 배양 → 바이오리액터⁠(발효조)⁠에서 배양 → 단백질/항체 생산 → 수확 (Harvest)"]],
    ["정제/분리", ["결정화, 여과, 용매 교환", "고순도 API 확보"], ["단백질/항체 정제 → 크로마토그래피⁠(단백질 A, 이온교환 등) → 여과⁠·⁠한외여과⁠(UF/DF)"]],
    ["제형 (Formulation)", ["정제, 캡슐, 주사제, 연고, 흡입제 등 다양한 제형화", "부형제 혼합"], ["완제화⁠(Formulation)", "안정제, 보존제 첨가", "주사제⁠·⁠동결건조 제형 중심"]],
  ] as [string, string[], string[]][],
};

export const ELECTRONIC = {
  strengths: [
    { title: "다양한 스케일의 장비 라인업", text: "파일럿 스케일부터 생산 설비까지 폭넓은 스케일의 제품 라인을 보유하여 다양한 원료, 제품을 생산 하실 수 있습니다." },
    {
      title: "고부식성/고위험 화학물질 처리 가능",
      text: "HF, HCl, NMP 등 부식성과 독성이 강한 원료가 많이 사용되는 공정 특성상 특수 재질⁠(Hastelloy, 티타늄, 지르코늄 PTFE Lining 등)⁠적용과 안전 규정⁠(ASME, KS, KOSHA, 고압가스안전관리법, 화관법, PSM 등)⁠적용까지 원하시는 조건에 맞는 공정을 완성해 드립니다.",
    },
    { title: "풍부한 경험과 완벽한 기술, 독보적인 품질", text: "JP 이노베이션은 국내 및 Global 고객사와 지속적인 사업 협업을 통한 다수의 Projects를 수행하고 있으며, 정밀한 가공과 높은 제품 완성도로 어디서나 그 품질과 기술력을 인정 받고 있습니다." },
  ],
  scope: [
    { en: "Synthesis", ko: "소재생산장비", items: ["Reactor", "Filter", "Dryer", "Blender", "Mill", "Tank & Vessel"] },
    { en: "Distillation", ko: "정제설비", items: ["Distillation Column", "Re-boiler", "Condenser", "Pressure Vessel", "Heat Exchanger", "Packaging Cabinet"] },
    { en: "Blending & Packaging", ko: "CMP Slurry", items: ["Blend Tank(FRP+PP Lined)", "Auto Filling System​(200L Steel/PP Drum)"] },
    { en: "Utilities", ko: "Plant Utilities", items: ["Engineering", "Procurement", "Installation", "Maintenance"] },
  ],
};
