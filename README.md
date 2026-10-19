# JP INNOVATION 홈페이지 리뉴얼 — 국문 디자인 시안 (A / B)

구조도 A안(기업 신뢰·전문성 중심형) 기준 국문 시안. 같은 콘텐츠 데이터로 디자인 방향 2종을 구현했다.

- 시안 A `Precision Clarity` — 화이트 기반, 실제 설비 사진·정보 위계 중심, 전체 펼침 메가메뉴
- 시안 B `Deep Engineering` — 딥 네이비 기반, 사업분야 대형 비주얼·몰입형, 전체메뉴 오버레이

현재 범위는 **국문만**. 영문은 국문 확정 후 번역해 같은 데이터 구조(`src/content/en`)로 추가한다. 영문 화면·번역 데이터·언어 전환 버튼은 구현하지 않았다.

## 스택
Next.js 16 static export + Tailwind CSS 4 (VISION HITECH 시안과 동일). 모든 경로가 정적 HTML로 생성되어 하위 경로 새로고침이 정적 호스팅에서도 동작한다.

## 구조
```
src/content/ko/   국문 콘텐츠·메뉴(단일 원본)   ← 기존 jpinno.com 공개 콘텐츠
src/components/   a/ 시안A 전용, b/ 시안B 전용, shared/·views/ 공용
src/app/[concept] concept-a | concept-b 라우트
public/img/       기존 사이트에서 확보한 이미지 (출처: docs/ASSET_SOURCES.md)
scripts/          organize-assets.py, build-news.py, visual-qa.py
```

## 명령
- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck`
- 배포·점검: `docs/DEPLOY.md`
- 데이터 구조·관리자 설계: `docs/DATA_MODEL.md`
