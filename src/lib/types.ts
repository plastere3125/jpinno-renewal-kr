/**
 * 콘텐츠 데이터 타입.
 * 화면 코드는 이 타입만 바라보고, 실제 문구는 src/content/<locale>/ 에 둔다.
 * (현재 locale 은 ko 하나. 영문은 국문 확정 후 같은 구조로 추가 예정)
 * 운영 단계 관리자(CMS)에서 등록·수정할 항목도 이 필드 기준으로 설계한다 → docs/DATA_MODEL.md
 */

export type NavItem = {
  key: string;
  label: string;
  /** concept 루트 기준 경로. 예: "company/overview" */
  path: string;
  children?: NavItem[];
};

export type Spec = {
  /** 표 제목(제품마다 컬럼 구성이 다름) */
  columns: string[];
  rows: string[][];
  /** 도면 이미지 */
  drawing?: string;
};

export type ProductUse = { title: string; text?: string };

export type Product = {
  slug: string;
  category: string;
  name: string;
  nameEn?: string;
  image: string;
  summary: string;
  intro: string[];
  featuresTitle?: string;
  features: string[];
  extraLists?: { title: string; items: string[] }[];
  usesTitle?: string;
  uses: ProductUse[];
  spec?: Spec;
  /** 구동 과정 등 단계 이미지 */
  steps?: { title: string; image: string }[];
  compare?: { title: string; image: string }[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  nameEn: string;
  summary: string;
  /** 대표 이미지(제품 컷) */
  image: string;
};

export type Business = {
  slug: string;
  name: string;
  nameEn: string;
  /** 메인 카드용 요약(기존 메인페이지 문구) */
  summary: string[];
  intro: string[];
  visual: string;
  portrait: string;
  /** 연관 제품 카테고리 slug */
  relatedProducts: string[];
};

export type Certification = {
  id: string;
  group: "cert" | "license" | "confirm" | "patent";
  name: string;
  image: string;
};

/** 현장 사진이 있는 수행실적 */
export type Project = {
  id: string;
  name: string;
  image: string;
  /** 출처(기존 사이트 URL 또는 클라이언트 제공 자료) */
  source: string;
  year?: string;
  industry?: string;
};

/** 회사소개서 EPC 실적표 1행 */
export type EpcRecord = { year: string; client: string; industry: string; project: string };

/** 회사소개서 장비 납품 실적표 1행 */
export type DeliveryRecord = { year: string; client: string; capacity: string; equipment: string; material?: string };

export type NewsType = "news" | "newsletter" | "blog" | "video";

export type NewsItem = {
  id: string;
  type: NewsType;
  title: string;
  date: string;
  image: string | null;
  thumb: string | null;
  body: string[];
  links: string[];
  embedPage: string | null;
  source: string;
  /** 있으면 카드 클릭 시 외부 원문으로 이동 */
  external?: string;
  videoId?: string;
};

export type Client = { name: string; logo: string };
