# 콘텐츠 데이터 구조 (운영·관리자 설계 기준)

화면 코드(`src/components`)와 콘텐츠(`src/content/ko`)를 분리했다. 타입 정의는 `src/lib/types.ts`.
영문 추가 시 `src/content/en/` 에 같은 구조로 확정 번역본을 넣고 라우트에 언어 세그먼트를 추가한다(현재 미구현 — 국문 확정 후 진행).

## 공통
| 데이터 | 파일 | 비고 |
|---|---|---|
| 메뉴(헤더·모바일·푸터·사이트맵·하위 탭 공용) | `common.ts` `NAV` | 단일 원본. 숨김 메뉴는 `HIDDEN_NAV` |
| 회사 정보·사업장·채널·카탈로그 | `common.ts` `COMPANY` `CHANNELS` `CATALOG_URL` | |

## 관리자에서 등록·수정이 필요한 항목

### 제품 (`products.ts` → Product)
| 필드 | 설명 | 필수 |
|---|---|---|
| slug | 주소용 영문 ID | ● |
| category | 반응기/여과기/건조기/믹서·분쇄기/산업기기 | ● |
| name / nameEn | 국문·영문 제품명 | ● |
| image | 대표 컷(투명 배경 PNG 권장, 1000px 이상) | ● |
| summary | 목록 카드 한 줄 요약 | ● |
| intro[] | 소개 문단 | ● |
| features[] / featuresTitle | 특징 목록 | |
| extraLists[] | 옵션 등 추가 목록(제목+항목) | |
| uses[] / usesTitle | 용도(제목+설명) | |
| spec {columns, rows, drawing} | 모델별 스펙 표(제품마다 열 구성 다름) + 도면 | |
| steps[] / compare[] | 구동 과정·공정 비교 이미지 | |

### 주요 수행실적 (`tech.ts` → Project)
| 필드 | 설명 | 공개 여부 표시 |
|---|---|---|
| id, name, image | 프로젝트명·대표 사진 | |
| field | 사업 분야 | |
| period | 수행 연도/기간 | |
| overview | 개요 2~3문장 | |
| scope | 수행 범위(설계·제작·공급·설치·시운전) | |
| (추가 예정) client, result, gallery[], publicFlags | 고객사·현장명, 성과, 추가 사진, 항목별 공개 여부 | ● |

### 홍보센터 (`news.data.json` → NewsItem)
| 필드 | 설명 |
|---|---|
| id, type | news(새소식) / newsletter / video / blog |
| title, date | |
| image, thumb | 본문 이미지, 목록 썸네일(자동 생성) |
| body[] | 본문 문단(URL 줄은 링크로 표시) |
| links[] | 원문(LinkedIn·YouTube) 버튼 |
| external | 값이 있으면 카드 클릭 시 외부 원문으로 이동(블로그·유튜브) |
| embedPage | HTML 형식 뉴스레터 주소 |

### 인증·특허 (`tech.ts` → Certification)
group(cert/confirm/patent), name, image

## 후속 구현 목록 (이번 단계 미포함)
1. 관리자(CMS): 위 4종 데이터 등록·수정·정렬·공개 여부, 이미지 업로드 자동 리사이즈
2. 문의 폼 발송(수신 주소·스팸 방지·개인정보 동의 저장)
3. 기존 사이트 자료 이전: 게시물 원문·첨부, 다운로드 자료
4. 검색 연결: sitemap.xml, 301 리다이렉트(URL_MAP.md), hreflang, 서치콘솔
5. 영문: 확정 국문 번역 → `content/en`, 영문 라우트, 텍스트 길이 대응 레이아웃 검수, 언어 전환(대응 페이지 이동 + 누락 페이지는 영문 메인으로)
