export const CONCEPTS = ["concept-a", "concept-b"] as const;
export type Concept = (typeof CONCEPTS)[number];

export const CONCEPT_LABEL: Record<Concept, { name: string; title: string; desc: string; points: string[] }> = {
  "concept-a": {
    name: "시안 A",
    title: "Brand Film",
    desc: "브랜드 영상으로 시작해 이야기처럼 흐르는 밝은 톤. 스크롤에 따라 사업분야 카드가 겹쳐 올라옵니다.",
    points: ["첫 화면 브랜드 영상 자동 재생(무음)", "사업분야 6개 겹침 스크롤 카드", "제품 가로 슬라이드 · 분류 필터", "화이트 바탕 · 네이비 포인트"],
  },
  "concept-b": {
    name: "시안 B",
    title: "Industry Panorama",
    desc: "여섯 개 산업을 한 화면에 펼치는 어두운 톤. 인터랙션으로 공정과 제품을 탐색합니다.",
    points: ["첫 화면 사업분야 6개 확장 패널", "EPC 5단계 인터랙티브 타임라인", "무대형 제품 쇼케이스", "딥 네이비 바탕 · 스카이블루 포인트"],
  },
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** public/img 기준 이미지 경로 → basePath 가 붙은 실제 URL */
export function img(path: string) {
  return `${BASE}/img/${path}`;
}

/** public 기준 파일 경로(영상 등) → basePath 가 붙은 실제 URL */
export function asset(path: string) {
  return `${BASE}/${path}`;
}

/**
 * 내부 공유용 메인 지정: 빌드·개발 서버 실행 시 NEXT_PUBLIC_HOME_URL 을 주면 concept-a 의 '홈'(헤더 로고·브레드크럼)이 그 주소로 감
 * (예: 디자인 7안 정적 시안). 값이 없으면 기존처럼 /concept-a/ — 클라이언트 링크 빌드에는 넣지 않음
 */
export const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL || "";
export function homeUrl(concept: Concept) {
  return concept === "concept-a" && HOME_URL ? HOME_URL : "";
}

/** concept 루트 기준 내부 링크 (next/link 가 basePath 를 붙이므로 여기선 붙이지 않음) */
export function href(concept: Concept, path = "") {
  const p = path.replace(/^\/+|\/+$/g, "");
  return p ? `/${concept}/${p}/` : `/${concept}/`;
}

export function isConcept(v: string): v is Concept {
  return (CONCEPTS as readonly string[]).includes(v);
}

/** 세 단어 이상인 짧은 제목의 마지막 두 단어를 붙여 끝 단어 하나만 다음 줄로 떨어지지 않게 */
export function keepLast(text: string) {
  return text.split(" ").length >= 3 ? text.replace(/ (?=\S+$)/, " ") : text;
}
