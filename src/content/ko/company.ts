import type { Client } from "@/lib/types";

/** 출처: https://jpinno.com/company/introduce/ */
export const OVERVIEW = {
  identityImage: "company/identity-img.png",
  epcSteps: ["Initiation", "Planning", "Execution", "Monitoring & Control", "Closing"],
  lab: {
    title: "동탄연구소",
    since: "2011년 설립",
    address: "(주)⁠JP이노베이션 동탄연구소 경기도 화성시 동탄대로 21길 10 더퍼스트타워1차 1902호",
    photos: [
      // 2026-10-19 클라이언트 제공 원본(4K)으로 교체, 기존 게시 순서 유지
      "company/hd/institute-01.jpg",
      "company/hd/institute-03.jpg",
      "company/hd/institute-02.jpg",
      "company/hd/institute-04.jpg",
    ],
  },
};

/** 출처: https://jpinno.com/company/ceo-message/ */
export const CEO = {
  photo: "company/hd/ceo.webp",
  keywords: ["기술", "혁신"],
  paragraphs: [
    "JP이노베이션은 석유화학, 정밀화학, 제약, 바이오분야 제조설비 설계 및 제작기업으로 Business를 시작하여 현재는 2차전지, 전자재료 산업을 포함한 전 생산공정의 장비 설계, 플랜트 엔지니어링, 플랜트 건설 등의 솔루션을 제공하는 종합 엔지니어링 기업으로 성장 하였습니다.",
    "우리는 끊임없는 연구와 축적된 경험을 바탕으로 반응기, 여과기, 건조기, 믹서 등 핵심 공정장비를 자체 기술로 설계⁠·⁠제작하며, 고객의 생산 효율과 품질 경쟁력을 높이는 맞춤형 엔지니어링 서비스를 제공합니다.",
    "또한 고객의 더 큰 목표달성을 위한 플랜트 건설사업도 수행하며 많은 고객사와의 협업으로 다양한 사업 실적을 보유하게 되었습니다.",
    "JP이노베이션의 모든 구성원은 현장에서 검증된 실질적 기술력과 지속 가능한 혁신을 바탕으로, 고객의 가치 창출에 기여하며 함께 성장해 나가고 있습니다.",
    "앞으로도 기술과 신뢰를 기반으로 글로벌 엔지니어링 기업으로 도약하겠습니다.",
    "감사합니다.",
  ],
  sign: "대표이사 이제환",
  values: [
    {
      title: "고객의 핵심가치 실현",
      text: "고객의 다양한 Needs에 부합하여, 끊임없는 기술개발과 품질경영을 통해 차별화된 기술, 품질 및 서비스를 제공함으로써, 고객께서 추구하는 가치실현에 핵심역할을 담당하고 있습니다.",
    },
    {
      title: "기술기반 미래사회 공헌",
      text: "기술과 핵심인력중심의 사업경쟁력으로, 끊임없는 미래지향적 기술개발을 통한 선도적 제품 및 품질 서비스로, 고객과 사회발전에 공헌하도록 하겠습니다.",
    },
  ],
};

/** 출처: https://jpinno.com/company/vision/ */
export const VISION = {
  vision: "핵심 기술과 가치로 사회에 공헌하는 기업",
  mission: "2차전지 / 전자소재 플랜트 제조장비 Market Leader",
  values: [
    {
      en: "EXPERTISE",
      ko: "전문성",
      lines: ["최고의 기술력으로 완성하는 산업 솔루션", "이차전지부터 전자소재까지, 모든 공정에 최적화", "축적된 엔지니어링 경험이 곧 우리의 경쟁력입니다"],
    },
    {
      en: "CUSTOMER DRIVEN",
      ko: "고객중심",
      lines: ["고객의 니즈에서 시작해 해답까지 도달합니다", "맞춤형 설계와 유연한 대응으로 신뢰를 쌓아갑니다", "성공적인 파트너십이 우리의 목표입니다"],
    },
    {
      en: "OWNERSHIP",
      ko: "주인의식",
      lines: ["작은 부품 하나에도 책임을 다합니다", "제이피이노베이션의 이름으로 납품합니다", "책임 있는 자세가 곧 품질을 만듭니다"],
    },
    {
      en: "OPEN MIND",
      ko: "소통",
      lines: ["끊임없이 듣고, 함께 고민합니다", "현장의 목소리에 가장 가까운 기술 파트너", "열린 자세로 더 나은 방향을 함께 찾아갑니다"],
    },
  ],
};

/** 출처: https://jpinno.com/company/history/ (원문 그대로. 표기 확인 필요 항목은 내부 확인 목록) */
export const HISTORY: { year: string; items: string[] }[] = [
  { year: "2026", items: ["사랑의열매 '나눔명문기업' 가입", "파마리서치 제조라인 약86억원 수주", "경기도 장학사업 공로 경기도지사 표창 수상", "종합건설 면허 취득"] },
  {
    year: "2025",
    items: [
      "메인비즈 25년 혁신기업인 이제환 대표이사 선정",
      "Pre-⁠IPO 투자 유치 (코오롱인베스트먼트, IBK벤처투자, 삼성증권) 60억원",
      "선진뷰티사이언스 OTCM 공장 감사패 수여",
      'ASME "U,U2"갱신, U3, S, PP 신규인증획득',
      "경영혁신 유공기업 중소벤처기업부장관상 수상",
    ],
  },
  {
    year: "2024",
    items: [
      "IBK기업은행 IBK Family 기업 및 우수거래기업 선정",
      "5월 상장주관사⁠(삼성증권) 선정",
      "SI⁠(전략적 투자) 유치 46억원",
      "제79년 경찰의날 감사장 수여⁠(화성서부경찰서)",
      "연구개발전담부서 설립",
    ],
  },
  { year: "2023", items: ["특허등록 (10-⁠2487388)", 'ASME"U,U2" 인증', "사명변경 : (주)⁠JP이노베이션"] },
  { year: "2022", items: ["뿌리기업 인증", "소재부품장비 전문기업 인증", "삼진제약 오송 API 공장 준공 감사패 수여"] },
  { year: "2021", items: ["AS Tech 신축공장준공 감사패 수여"] },
  { year: "2020", items: ["특허출원 (10-⁠2019-⁠0035658) : 2차 전지 파우치 제조장치 및 제조방법", "기술역량우수기업인증서 취득"] },
  { year: "2019", items: ["디자인실용신안등록 (30-⁠0997684) : 건축파일용 조인트"] },
  { year: "2018", items: ["제이피이노베이션 ENG 연구소 확장 동탄이전", "특허등록 (10-⁠2017-⁠0154517) : 자동체결조인트", "반응기 용접 뿌리 기업 인정"] },
  { year: "2017", items: ["인재육성 전문기업 선정", "특허등록 (10-⁠2015-⁠0101658) : 분체 분쇄 장치"] },
  { year: "2016", items: ["베트남 법인 설립", "화성 바이오밸리 신공장 이전", "특허등록 (10-⁠2016-⁠0039966) : 누체 건조기의 교반축 조립체"] },
  { year: "2015", items: ["경영혁신형 중소기업⁠(MAIN-⁠BIZ) 선정"] },
  { year: "2014", items: ["유망중소기업 인증서 취득"] },
  { year: "2013", items: ["2공장 신축", "한국무역협회 회원사 등록", "기술혁신중소기업⁠(INNO-⁠BIZ) 인증", "기계설비건설업 등록"] },
  { year: "2012", items: ["특허등록 (PATENT NO. 10-⁠1147926) : FD 온도 컨트롤", "특정 설비 제조등록 허가⁠(고압가스)", "ASME”U,S,PP” 획득"] },
  { year: "2011", items: ["기술연구소 설립", "ISO 14001:2009 인증 획득"] },
  { year: "2010", items: ["벤처회사 지정", "1공장 신축"] },
  { year: "2009", items: ["JP innovation Co., Ltd 법인 전환"] },
  { year: "2008", items: ["Jeil ENC 설립", "ISO 9001:2000 인증 획득"] },
];

/** 출처: 2026-10-19 클라이언트 제공 '조직도 신규(홈페이지용).ai' (기존 사이트 조직도를 대체) */
export const ORG_CHART = "company/hd/organization-chart.jpg";

type OrgDivision = { name: string; units: { name: string; teams: string[] }[] };

/** 위 조직도 내용을 텍스트로 옮긴 것. 대표이사 2인(담당 영역별) 체계 */
export const ORG: { ceo: string; role: string; divisions: OrgDivision[] }[] = [
  {
    ceo: "C.E.O",
    role: "제조, 영업",
    divisions: [
      {
        name: "엔지니어링본부",
        units: [
          { name: "BM 부문", teams: ["기술영업팀"] },
          { name: "PM 부문", teams: ["프로젝트팀", "시공관리팀"] },
          { name: "EM 부문", teams: ["EPC설계팀", "연구개발전담부서"] },
        ],
      },
      {
        name: "제조본부",
        units: [
          { name: "", teams: ["장비설계팀", "장비영업팀", "품질경영팀"] },
          { name: "", teams: ["생산관리팀", "생산팀", "구매팀"] },
        ],
      },
    ],
  },
  {
    ceo: "C.E.O",
    role: "품질, 경영",
    divisions: [
      { name: "경영관리본부", units: [{ name: "", teams: ["경영관리팀"] }] },
      { name: "품질안전본부", units: [{ name: "", teams: ["환경안전팀"] }] },
    ],
  },
];

/** 출처: https://jpinno.com/company/partner/ (로고 이미지, 업체명은 로고 표기 기준) */
export const CLIENT_GROUPS: { title: string; clients: Client[] }[] = [
  {
    title: "바이오, 제약",
    clients: [
      { name: "삼진제약", logo: "clients/partner-bio01.jpg" },
      { name: "코오롱생명과학", logo: "clients/partner-bio02.jpg" },
      { name: "에스티팜", logo: "clients/partner-bio03.jpg" },
      { name: "inno.N", logo: "clients/partner-bio04.jpg" },
      { name: "종근당바이오", logo: "clients/partner-bio05.jpg" },
      { name: "SK biotek", logo: "clients/partner-bio06.jpg" },
      { name: "중외제약", logo: "clients/partner-bio07.jpg" },
      { name: "대웅바이오", logo: "clients/partner-bio08.jpg" },
      { name: "영진약품", logo: "clients/partner-bio09.jpg" },
      { name: "명인제약", logo: "clients/partner-bio10.jpg" },
      { name: "MFC", logo: "clients/partner-bio11.jpg" },
    ],
  },
  {
    title: "이차전지, 반도체 및 정밀화학",
    clients: [
      { name: "UP Chemical", logo: "clients/partner-materials01.jpg" },
      { name: "쌍곰", logo: "clients/partner-materials02.jpg" },
      { name: "DAEJOO", logo: "clients/partner-materials03.jpg" },
      { name: "티에스아이", logo: "clients/partner-materials04.jpg" },
      { name: "PI첨단소재", logo: "clients/partner-materials05.jpg" },
      { name: "SK innovation", logo: "clients/partner-materials06.jpg" },
      { name: "DS Neolux", logo: "clients/partner-materials07.jpg" },
      { name: "솔루스첨단소재", logo: "clients/partner-materials08.jpg" },
      { name: "HANCHEM", logo: "clients/partner-materials09.jpg" },
    ],
  },
  {
    title: "화장품, 뷰티",
    clients: [
      { name: "ASTECH", logo: "clients/partner-beauty01.jpg" },
      { name: "Pharma Research Products", logo: "clients/partner-beauty02.jpg" },
      { name: "SUNJIN BEAUTY SCIENCE", logo: "clients/partner-beauty03.jpg" },
      { name: "ICBIO", logo: "clients/partner-beauty04.jpg" },
    ],
  },
];

/** 출처: 기존 메인 'JP이노베이션은 다양한 파트너사들과 함께 합니다.' (회색 로고 12종) */
export const HOME_CLIENTS: Client[] = [
  { name: "SAMSUNG SDI", logo: "clients/sec04-partner01.png" },
  { name: "SK innovation", logo: "clients/sec04-partner02.png" },
  { name: "DAEJOO", logo: "clients/sec04-partner03.png" },
  { name: "금호석유화학", logo: "clients/sec04-partner04.png" },
  { name: "LX하우시스", logo: "clients/sec04-partner05.png" },
  { name: "SAMJIN", logo: "clients/sec04-partner06.png" },
  { name: "ST PHARM", logo: "clients/sec04-partner07.png" },
  { name: "영진약품", logo: "clients/sec04-partner08.png" },
  { name: "대웅바이오", logo: "clients/sec04-partner09.png" },
  { name: "ASTech", logo: "clients/sec04-partner10.png" },
  { name: "파마리서치", logo: "clients/sec04-partner11.png" },
  { name: "ORION", logo: "clients/sec04-partner12.png" },
];
