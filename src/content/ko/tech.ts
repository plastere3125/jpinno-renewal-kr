import type { Certification, DeliveryRecord, EpcRecord, Project } from "@/lib/types";

/**
 * 인증·면허·확인서·특허
 * 출처: https://jpinno.com/company/certificate-patent/ 게시 목록 + 2026-10-19 클라이언트 제공 '홈페이지용/COMPANY/인증 및 특허' 원본
 * - 이미지는 모두 제공 원본(PDF/JPG)으로 교체. 법인등록번호는 가림 처리(건설업등록증은 클라이언트가 모자이크해 제공)
 * - 신규: 특정설비제조 등록증명서, 소재부품장비 전문기업 확인서, 특허 '믹싱 공정용 믹서 장치', 디자인등록 '건축 파일용 조인트'
 */
export const CERTIFICATIONS: Certification[] = [
  { id: "iso9001", group: "cert", name: "ISO 9001 품질경영시스템 인증서", image: "certs/hd/iso9001.jpg" },
  { id: "iso45001", group: "cert", name: "ISO 45001 안전보건경영시스템 인증서", image: "certs/hd/iso45001.jpg" },
  { id: "iso14001", group: "cert", name: "ISO 14001 환경경영시스템 인증서", image: "certs/hd/iso14001.jpg" },
  { id: "asme-u", group: "cert", name: "ASME U Certificate", image: "certs/hd/asme-u.jpg" },
  { id: "asme-u2", group: "cert", name: "ASME U2 Certificate", image: "certs/hd/asme-u2.jpg" },
  { id: "asme-u3", group: "cert", name: "ASME U3 Certificate", image: "certs/hd/asme-u3.jpg" },
  { id: "asme-pp", group: "cert", name: "ASME PP Certificate", image: "certs/hd/asme-pp.jpg" },
  { id: "asme-s", group: "cert", name: "ASME S Certificate", image: "certs/hd/asme-s.jpg" },
  { id: "license", group: "license", name: "건설업 등록증 (산업·환경설비공사업)", image: "certs/hd/license.jpg" },
  { id: "special-equipment", group: "license", name: "특정설비제조 등록증명서", image: "certs/hd/special-equipment.jpg" },
  { id: "inno-biz", group: "confirm", name: "기술혁신형 중소기업(Inno-Biz) 확인서", image: "certs/hd/inno-biz.jpg" },
  { id: "main-biz", group: "confirm", name: "경영혁신형 중소기업(Main-Biz) 확인서", image: "certs/hd/main-biz.jpg" },
  { id: "venture", group: "confirm", name: "벤처기업 확인서", image: "certs/hd/venture.jpg" },
  { id: "root", group: "confirm", name: "뿌리기업 확인서", image: "certs/hd/root.jpg" },
  { id: "sobujang", group: "confirm", name: "소재·부품·장비 전문기업 확인서", image: "certs/hd/sobujang.jpg" },
  { id: "pt-pouch", group: "patent", name: "2차 전지 파우치 제조장치 및 제조방법", image: "certs/hd/pt-pouch.jpg" },
  { id: "pt-filter-reactor", group: "patent", name: "복합기능 구현이 가능한 필터 리액터", image: "certs/hd/pt-filter-reactor.jpg" },
  { id: "pt-mill", group: "patent", name: "분체 분쇄 장치", image: "certs/hd/pt-mill.jpg" },
  { id: "pt-joint", group: "patent", name: "자동 체결 조인트", image: "certs/hd/pt-joint.jpg" },
  { id: "pt-temp", group: "patent", name: "가열 및 냉각 싸이클 분리식 반응기 온도 조절장치", image: "certs/hd/pt-temp.jpg" },
  { id: "pt-shaft", group: "patent", name: "누체 건조기의 교반축 조립체", image: "certs/hd/pt-shaft.jpg" },
  { id: "pt-preserve", group: "patent", name: "물품 가공 및 보존 처리용 장치", image: "certs/hd/pt-preserve.jpg" },
  { id: "pt-mixer", group: "patent", name: "믹싱 공정용 믹서 장치", image: "certs/hd/pt-mixer.jpg" },
  { id: "ds-pile-joint", group: "patent", name: "디자인등록 · 건축 파일용 조인트", image: "certs/hd/ds-pile-joint.jpg" },
];

export const CERT_GROUPS: { key: Certification["group"]; title: string }[] = [
  { key: "cert", title: "품질·기술 인증" },
  { key: "license", title: "면허·등록" },
  { key: "confirm", title: "기업 확인서" },
  { key: "patent", title: "특허·디자인" },
];

/**
 * 주요 수행실적 — 현장 사진이 있는 프로젝트
 * 출처: 기존 '건설산업 · 사업 실적'(사진 16) + 2026-10-19 클라이언트 제공 '홈페이지용/BUSINESS/건설산업'(사진 15, 파일명 = 연도 + 프로젝트명)
 * - 두 자료에 같은 프로젝트가 있으면 클라이언트 제공 사진·명칭 사용(7건)
 * - 연도: 제공 사진 파일명 기준. 기존 사진은 회사소개서 EPC 실적표(EPC_RECORDS)에서 같은 프로젝트의 연도
 * - 산업: EPC 실적표의 해당 고객사 산업 구분. 실적표에서 같은 프로젝트를 특정할 수 없으면 비움
 * - 사진 파일명과 실적표의 연도·명칭이 다른 항목은 내부 확인 목록에 기록
 * - 2026-10-30 클라이언트 회신: YCI·선진뷰티사이언스·에이에스텍 장항 2공장은 회사소개서 연도·명칭,
 *   유피케미칼(2·3공장)·대주전자재료(M4동)는 사진 명칭으로 통일
 */
export const PROJECTS: Project[] = (
  [
    ["IC바이오 천안2공장 신축", "projects/hd/site-15.jpg", "2025", "바이오"],
    ["에이에스텍 장항 2공장 신축", "projects/hd/site-12.jpg", "2025", "바이오"],
    ["선진뷰티사이언스 F2 믹서 등 장비 공급", "projects/hd/site-11.jpg", "2025", "바이오"],
    ["SK바이오텍 세종공장 증설 EPC", "projects/hd/site-09.jpg", "2024", "바이오"],
    ["에이에스텍 장항1공장 증설 EPC", "projects/hd/site-13.jpg", "2024", "바이오"],
    ["유피케미칼 2·3공장 증설 EPC", "projects/hd/site-14.jpg", "2024", "반도체"],
    ["대주전자재료 증설 M4동", "projects/hd/site-10.jpg", "2024", "2차 전지"],
    ["YCI 어드밴스드 울산공장 EPC", "projects/hd/site-08.jpg", "2024", "전자소재"],
    ["삼진제약 오송공장 증축 EPC", "projects/hd/site-07.jpg", "2021", "제약"],
    ["에이에스텍 장항 공장 신축 EPC", "projects/hd/site-06.jpg", "2020", "바이오"],
    ["에거슨바이오 공장 신축 EPC", "projects/hd/site-05.jpg", "2019", "바이오"],
    ["SK바이오텍 E-PROJECT 설비 공사", "projects/hd/site-04.jpg", "2018", "바이오"],
    ["명인제약 GMP 공장 신축 EPC", "projects/hd/site-03.jpg", "2017", "제약"],
    ["SK바이오텍 세종공장 신축", "projects/hd/site-01.jpg", "2016", "바이오"],
    ["미래파인켐 공장 신축", "projects/hd/site-02.jpg", "2016", "제약"],
    ["오리온 증설 Engineering", "projects/b3-05.png", "2016", "식품"],
    ["SK이노베이션 Engineering", "projects/b3-06.png", "2015", "전자소재"],
    ["쌍곰켐", "projects/b3-07.png", "2015", "정밀화학"],
    ["유피케미칼 2공장증설", "projects/b3-09.png", "2015", "반도체"],
    ["영진약품 증축", "projects/b3-02.png", "2013", "제약"],
    ["SK 바이오팜 CMS Plant 증설", "projects/b3-03.png", "2013", "바이오"],
    ["아토텍코리아", "projects/b3-04.png", "2013", "정밀화학"],
    ["LG 하우시스 청주공장", "projects/b3-01.png", "2010", "정밀화학"],
    ["동남석유공업 베트남 공장신축", "projects/b3-08.png", undefined, undefined],
  ] as [string, string, string | undefined, string | undefined][]
).map(([name, image, year, industry], i) => ({
  id: `p${String(i + 1).padStart(2, "0")}`,
  name,
  image,
  year,
  industry,
  source: image.startsWith("projects/hd/") ? "클라이언트 제공(2026-10-19)" : "https://jpinno.com/business/construction/",
}));

/** 카드·상세에 쓰는 보조 표기: '2024 · 바이오' */
export const projectMeta = (p: Project) => [p.year, p.industry].filter(Boolean).join(" · ") || "EPC";

/**
 * 납품 실적 표 — 출처: 회사소개서(제조시설).pptx 18~20쪽(클라이언트 메일 2026-10-19 '납품실적은 회사소개서 18~20P 참고')
 * 원문 그대로 옮김. 명백한 오탈자·열 뒤바뀜만 바로잡고 내부 확인 목록에 기록
 *  - PIOLT → PILOT, 미래파인캠 → 미래파인켐, 쌈곰켐 → 쌍곰켐, Precurser → Precursor
 *  - 2025 LTC·한켐: 원문에서 업체명/산업 칸이 뒤바뀌어 있어 바로잡음
 */
export const EPC_RECORDS: EpcRecord[] = (
  [
    ["2025", "LTC", "전자소재", "화성공장 증축"],
    ["2025", "한켐", "전자소재", "옥천공장 증축"],
    ["2025", "SK바이오텍", "제약", "세종공장 M5신축"],
    ["2025", "IC바이오", "바이오", "천안 2공장 신축"],
    ["2025", "선진뷰티사이언스", "바이오", "F2 생산 증설 / F4 ODM 공장 신축"],
    ["2025", "AS텍", "바이오", "장항 2공장 신축"],
    ["2025", "파마리서치", "제약", "4공장 원료 신규라인 증축 설계"],
    ["2025", "파마리서치", "제약", "5공장 원료 플랜트 공사"],
    ["2025", "탑머티리얼", "2차 전지", "라이텐 믹싱라인(전극)"],
    ["2025", "삼성 SDI", "2차 전지", "NMP 리사이클"],
    ["2025", "포스코퓨쳐엠", "2차 전지", "실리콘 음극재 - 에탄올 리사이클"],
    ["2025", "유티스", "2차 전지", "원액 탱크룸 이전설치"],
    ["2025", "케이지에이", "2차 전지", "절연재 공급라인 제작 설치"],
    ["2025", "엔플로우", "2차 전지", "전고체 생산설비 제작 설치"],
    ["2024", "YCIA", "전자소재", "울산공장 신축"],
    ["2024", "유피케미칼", "반도체", "2·3공장 증설"],
    ["2024", "삼진제약", "제약", "오송공장 연구소 PILOT 신축"],
    ["2024", "AS텍", "바이오", "장항 1공장 증설"],
    ["2024", "SK바이오텍", "바이오", "세종공장 증설"],
    ["2024", "TSI", "2차 전지", "LGES 배터리공장신축 (믹싱장비 43 Set)"],
    ["2024", "TSI", "2차 전지", "LGES 배터리공장신축 (믹싱장비 46 Set)"],
    ["2024", "TSI", "2차 전지", "LGES 배터리공장신축 (믹싱장비 46 Set)"],
    ["2024", "TSI", "2차 전지", "삼성SDI 배터리공장신축 (믹싱장비 2 Set)"],
    ["2024", "대주전자재료", "2차 전지", "증설 M4동"],
    ["2024", "KGA", "2차 전지", "AGING DRUM"],
    ["2023", "위메스", "반도체", "2공장 증축"],
    ["2023", "MFC", "제약", "1공장 증축"],
    ["2021", "삼진제약", "제약", "오송공장 API동 증축"],
    ["2020", "AS텍", "바이오", "장항1공장 신축"],
    ["2019", "에거슨바이오", "바이오", "공장신축"],
    ["2018", "SK바이오텍", "바이오", "E PROJECT 공장 신축"],
    ["2017", "명인제약", "제약", "GMP 공장 신축"],
    ["2016", "오리온", "식품", "공장 신축"],
    ["2016", "미래파인켐", "제약", "화성공장 신축"],
    ["2016", "SK바이오텍", "바이오", "세종공장 신축(M1)"],
    ["2015", "SK이노베이션", "전자소재", "PILOT PLANT 신축"],
    ["2015", "쌍곰켐", "정밀화학", "접착제 공장 신축"],
    ["2015", "유피케미칼", "반도체", "2공장 증축"],
    ["2013", "아토텍코리아", "정밀화학", "중합공장 신축"],
    ["2013", "영진약품", "제약", "API 합성공장 증축"],
    ["2013", "SK바이오팜", "바이오", "CMS 플랜트 증설"],
    ["2010", "LG하우시스", "정밀화학", "종합공장 신축"],
  ] as [string, string, string, string][]
).map(([year, client, industry, project]) => ({ year, client, industry, project }));

/** 10-1. Chemical Equipment (반응기·열교환기·증류탑 등). material 이 있으면 특수 재질 장비 */
export const CHEMICAL_RECORDS: DeliveryRecord[] = (
  [
    ["2025", "SK바이오텍", "2,000L", "반응기, 스토리지탱크"],
    ["2025", "SK바이오텍", "1,500L", "RECEIVER VESSEL"],
    ["2025", "SK바이오텍", "200㎡", "HEAT EXCHANGER"],
    ["2025", "SK바이오텍", "400㎡", "HEAT EXCHANGER"],
    ["2025", "CNS", "1,500L", "반응기"],
    ["2024", "에이에스텍", "20 H/C", "HEAT EXCHANGER"],
    ["2024", "IC바이오", "Φ600 × 2,400H", "에탄올회수 증류탑"],
    ["2023", "㈜경보제약", "15 H/C", "LN2 HEAT EXCHANGER"],
    ["2023", "에이에스텍", "2,000L", "반응기(GL)"],
    ["2022", "엔지켐생명과학", "5,000L", "반응기"],
    ["2022", "유피케미칼", "Φ108 × 1,000H", "반도체 Precursor 증류탑"],
    ["2021", "유티스", "1,000L", "반응기"],
    ["2020", "대영피엔씨", "3,000L", "반응기"],
    ["2020", "SK바이오텍", "3,000L", "FILTER DRYER", "HASTELLOY-C276"],
    ["2019", "이그린테크", "1,000L", "반응기"],
    ["2019", "이그린테크", "1,700L", "HIGH PRESSURE VESSEL"],
    ["2019", "대웅바이오", "Φ650 × 18,500H", "SR증류탑"],
    ["2019", "대웅바이오", "Φ300 × 9,000H", "Stripper증류탑"],
    ["2018", "파마리서치", "800L", "반응기"],
    ["2018", "SK바이오텍", "3,000L", "PADDLE DRYER", "HASTELLOY-C276"],
    ["2017", "덕산 네오룩스", "1,000L", "반응기"],
    ["2017", "덕산테코피아", "1,000L", "반응기"],
    ["2017", "SPC", "3,000L", "반응기", "HASTELLOY-C276"],
    ["2017", "SPC", "1,000L", "반응기", "HASTELLOY-C276"],
    ["2016", "미래파인켐㈜", "10 H/C", "HEAT EXCHANGER"],
    ["2016", "케미존", "3,000L", "반응기"],
    ["2016", "에스티팜", "1,500L", "반응기"],
    ["2016", "SK바이오텍", "10,000L", "반응기"],
    ["2016", "SK바이오텍", "8,000L", "반응기", "HASTELLOY-C276"],
    ["2016", "SK바이오텍", "4,000L", "반응기", "HASTELLOY-C276"],
    ["2015", "미주엔비켐", "9,000L", "반응기"],
    ["2015", "미주엔비켐", "20㎡", "HEAT EXCHANGER"],
    ["2015", "종근당바이오", "4,000L", "반응기"],
    ["2015", "JW중외제약", "5,000L", "반응기"],
    ["2015", "쌍곰켐", "10,000L", "반응기"],
    ["2014", "동방FTL", "3,000L", "반응기"],
    ["2014", "충남테크노파크", "5,000L", "반응기"],
    ["2013", "SK바이오팜", "1,000L", "반응기"],
  ] as [string, string, string, string, string?][]
).map(([year, client, capacity, equipment, material]) => ({ year, client, capacity, equipment, material }));

/** 10-2. Special Equipment (여과·건조·혼합·분쇄 장비) */
export const SPECIAL_RECORDS: DeliveryRecord[] = (
  [
    ["2025", "에이에스텍", "800L", "누체필터"],
    ["2025", "한켐", "1,000L", "진공사각건조기"],
    ["2025", "탑머티리얼", "100L", "PD믹서"],
    ["2024", "씨엠원", "1,500L", "진공사각건조기"],
    ["2024", "티에스아이", "2,000L", "바인더믹서"],
    ["2024", "씨엔에이치", "400L", "동결건조기"],
    ["2024", "환인제약", "1,500L", "진공사각건조기"],
    ["2023", "티에스아이", "2,000L", "바인더믹서"],
    ["2023", "에스켐", "2,000L", "진공사각건조기"],
    ["2023", "덕산 네오룩스", "200L", "누체필터"],
    ["2023", "대주전자재료", "", "로터리건조기"],
    ["2022", "에스피씨", "500L", "누체필터"],
    ["2022", "한서켐", "400L", "누체필터"],
    ["2022", "Pi첨단소재", "300L", "필터드라이어"],
    ["2022", "이앤지텍", "1,000L", "진공사각건조기"],
    ["2022", "위매스", "350L", "누체필터"],
    ["2021", "삼진제약", "50Kg", "임펙트밀"],
    ["2021", "씨앤비산업", "150L", "로터리드라이어"],
    ["2021", "셀트리온제약", "1,200L", "진공사각건조기"],
    ["2020", "대성미생물연구소", "", "동결건조기"],
    ["2020", "대주전자재료", "", "진공사각건조기"],
    ["2019", "성일바이오엑스", "10,000L", "리시버탱크"],
    ["2019", "CMDL", "2,000L", "누체필터"],
    ["2018", "엔지켐 생명과학", "3,000L", "진공사각건조기"],
    ["2018", "희성소재", "250L", "누체필터"],
    ["2017", "덕산테코피아", "1,000L", "누체필터"],
    ["2017", "유티스", "500L", "아지호모믹서"],
    ["2017", "CMDL", "2,000L", "진공사각건조기"],
    ["2016", "종근당바이오", "1,800L", "진공사각건조기"],
    ["2016", "미원상사", "4,000L", "필터드라이어"],
    ["2016", "대희화학", "300L", "누체필터"],
    ["2015", "한울엔지니어링", "2,000L", "진공사각건조기"],
    ["2015", "코오롱생명과학", "50Kg", "임펙트밀"],
    ["2014", "리켐주식회사", "300L", "트윈샤프트믹서"],
    ["2014", "삼진제약", "2,500L", "진공사각건조기"],
    ["2014", "에스티팜", "2,000L", "필터드라이어"],
    ["2013", "씨엔에스", "500L", "아지테이터"],
    ["2013", "동방에프티엘", "250L", "누체필터"],
    ["2013", "아이티켐", "100L / 500L", "누체필터"],
    ["2013", "영진약품", "1,200L", "진공사각건조기"],
    ["2013", "SPC", "2,000L", "필터드라이어"],
  ] as [string, string, string, string][]
).map(([year, client, capacity, equipment]) => ({ year, client, capacity, equipment }));

export const RECORD_TABS = [
  { key: "epc", label: "EPC", en: "EPC Engineering", count: EPC_RECORDS.length },
  { key: "chemical", label: "화학장비", en: "Chemical Equipment", count: CHEMICAL_RECORDS.length },
  { key: "special", label: "특수장비", en: "Special Equipment", count: SPECIAL_RECORDS.length },
] as const;
