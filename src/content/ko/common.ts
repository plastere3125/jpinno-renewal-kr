import type { NavItem } from "@/lib/types";

/**
 * 메뉴 단일 원본. 헤더·모바일 메뉴·푸터·사이트맵·하위 탭이 모두 이 데이터를 사용한다.
 * 구조 근거: 2026-10-12 구조도 A안 + 2026-10-19 클라이언트 회신
 *  - 기술·실적 > '기술 및 연구개발' 숨김 (HIDDEN_NAV 참고, 공개 메뉴·사이트맵·홈에서 제외)
 *  - 홍보센터: 새소식·뉴스레터·홍보자료 하위 메뉴 없이 통합 카드 목록 1개
 */
export const NAV: NavItem[] = [
  {
    key: "company",
    label: "회사소개",
    path: "company/overview",
    children: [
      { key: "overview", label: "회사개요", path: "company/overview" },
      { key: "ceo", label: "CEO 인사말", path: "company/ceo" },
      { key: "vision", label: "비전", path: "company/vision" },
      { key: "history", label: "연혁·조직", path: "company/history" },
      { key: "clients", label: "주요 고객사", path: "company/clients" },
      { key: "location", label: "오시는 길", path: "company/location" },
    ],
  },
  {
    key: "business",
    label: "사업분야",
    path: "business/epc-engineering",
    children: [
      { key: "epc-engineering", label: "EPC 엔지니어링", path: "business/epc-engineering" },
      { key: "secondary-battery", label: "이차전지", path: "business/secondary-battery" },
      { key: "cosmetics", label: "화장품", path: "business/cosmetics" },
      { key: "pharma-bio", label: "제약·바이오", path: "business/pharma-bio" },
      { key: "electronic-materials", label: "전자소재", path: "business/electronic-materials" },
      { key: "construction", label: "건설산업", path: "business/construction" },
    ],
  },
  {
    key: "products",
    label: "제품소개",
    path: "products/reactor",
    children: [
      { key: "reactor", label: "반응기", path: "products/reactor" },
      { key: "filter", label: "여과기", path: "products/filter" },
      { key: "dryer", label: "건조기", path: "products/dryer" },
      { key: "mixer-mill", label: "믹서·분쇄기", path: "products/mixer-mill" },
      { key: "industrial-machinery", label: "산업기기", path: "products/industrial-machinery" },
    ],
  },
  {
    key: "tech",
    label: "기술·실적",
    path: "tech/certifications",
    children: [
      { key: "certifications", label: "인증 및 특허", path: "tech/certifications" },
      { key: "projects", label: "주요 수행실적", path: "tech/projects" },
    ],
  },
  {
    key: "news",
    label: "홍보센터",
    path: "news",
    children: [{ key: "news-all", label: "홍보센터", path: "news" }],
  },
  {
    key: "support",
    label: "고객지원",
    path: "support/inquiry",
    children: [
      { key: "inquiry", label: "사업·제품 문의", path: "support/inquiry" },
      { key: "contact", label: "담당 연락처", path: "support/contact" },
    ],
  },
];

/** 숨김 메뉴: 데이터 구조만 유지. 사례가 생기면 NAV 의 tech.children 에 옮기고 페이지를 추가한다. */
export const HIDDEN_NAV: NavItem[] = [{ key: "rnd", label: "기술 및 연구개발", path: "tech/rnd" }];

export const UTIL_NAV: NavItem[] = [
  { key: "privacy", label: "개인정보처리방침", path: "privacy" },
  { key: "sitemap", label: "사이트맵", path: "sitemap" },
];

export const COMPANY = {
  name: "(주)JP이노베이션",
  nameKo: "제이피이노베이션",
  nameEn: "JP INNOVATION",
  ceo: "이제환",
  bizNo: "124-86-87267",
  email: "jeil@jpinno.com",
  /** 기존 메인 h1 문구 */
  tagline: "제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업",
  sites: [
    {
      key: "hq",
      name: "본사",
      fullName: "(주)JP이노베이션 본사",
      address: "경기도 화성시 마도면 청원산단 8길 138",
      tel: "031-366-6713",
      fax: "031-366-6714",
      transit: ["(60023) 바이오단지종점 정류장에서 440m"],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.256894859267!2d126.75896777628289!3d37.17036544674533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b0dea8c7a63bf%3A0xe7efc643b0a5baaa!2z6rK96riw64-EIO2ZlOyEseyLnCDrp4jrj4TrqbQg7LKt7JuQ7IKw64uoOOq4uCAxMzg!5e0!3m2!1sko!2skr!4v1747793415288!5m2!1sko!2skr",
    },
    {
      key: "lab",
      name: "동탄연구소",
      fullName: "(주)JP이노베이션 동탄연구소",
      address: "경기도 화성시 동탄대로 21길 10 더퍼스트타워1차 1902-1904호",
      // 오시는길 페이지 기준. 기존 푸터에는 Tel 031-366-6713 으로 표기되어 있어 확인 필요(내부 확인 목록)
      tel: "070-4616-0751",
      fax: "070-4009-6222",
      transit: ["(36463) 상록.테크노밸리.GS자이 정류장에서 239m", "(SRT) 동탄역에서 1.5km"],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3177.6769832629298!2d127.09520687628404!3d37.207901044611035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b45bb48139d2f%3A0x8db26089664c2311!2z6rK96riw64-EIO2ZlOyEseyLnCDrj5ntg4TrjIDroZwyMeq4uCAxMA!5e0!3m2!1sko!2skr!4v1747794929549!5m2!1sko!2skr",
    },
  ],
};

export const CHANNELS = [
  { key: "blog", label: "네이버 블로그", short: "Blog", url: "https://blog.naver.com/jpinno" },
  { key: "youtube", label: "유튜브", short: "YouTube", url: "https://www.youtube.com/@jpinnovation-epc" },
  { key: "linkedin", label: "링크드인", short: "LinkedIn", url: "https://www.linkedin.com/company/jp-inno" },
] as const;

/** 기존 메인 'Catalog Download' 연결 대상(공개 e-카탈로그) */
export const CATALOG_URL = "https://jpinno.com/ebook/KOR/kor/";

/** 기존 견적문의 양식의 개인정보 수집 안내(원문) */
export const PRIVACY_COLLECTION = [
  "수집항목 : 성명, 전화번호, 이메일주소, 지역(시도군)",
  "수집목적 : 문의내용에 대한 답변 제공의 목적 이외의 다른 목적으로 사용되지 않습니다.",
  "보유 및 기간: 답변이 종료된 이후의 개인정보는 3개월 이내 폐기됩니다.",
];

/** 기존 메인 '사업 수행' 요약 */
export const EPC_SUMMARY = [
  "EPC (Turn-Key방식) 사업수행 - 엔지니어링설계, 장비제작, 시공 및 사후관리",
  "Global Standard Project 수행절차로 프로젝트 진행",
  "Business Partner 사와 협력을 통해 성공적인 투자성과 제공",
  "Project KPI 목표달성 - Safety, Delivery, Cost, Quality & Legal Compliance",
];
