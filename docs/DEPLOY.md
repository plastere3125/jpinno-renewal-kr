# 시안 배포 방식

- 방식: GitHub Pages (Actions) — 기존 VISION HITECH 시안과 동일한 방식
- 저장소(예정): `plastere3125/jpinno-renewal-kr` (공개 저장소, 시안 코드·공개 이미지만 포함)
- 공개 주소(예정): https://plastere3125.github.io/jpinno-renewal-kr/ (시안 A `/concept-a/`, 시안 B `/concept-b/`)
- 운영 사이트 jpinno.com 의 도메인·DNS·호스팅은 변경하지 않음

## 저장소에 올리지 않는 것 (.gitignore)
- `_research/` 기존 사이트 수집 HTML·RSS, `_assets_raw/` 원본 이미지
- `docs/internal/` 내부 검토 문서(확인 필요 항목, URL 대응표, 보고서)
- `docs/screenshots/` 점검 화면

## 최초 배포
```bash
cd jpinno-renewal-kr
git add -A && git commit -m "JP INNOVATION 국문 시안 A/B"
gh repo create plastere3125/jpinno-renewal-kr --public --source . --push
gh api -X POST repos/plastere3125/jpinno-renewal-kr/pages -f build_type=workflow
gh workflow run "Deploy prototype to GitHub Pages"   # push 로도 자동 실행됨
```

## 수정 후 재배포
`main` 브랜치에 push 하면 자동 배포(typecheck → lint → build → Pages).

## 검색 노출 제외
- 전 페이지 `<meta name="robots" content="noindex, nofollow, nocache">`
- GitHub Pages 프로젝트 사이트는 도메인 루트 robots.txt·응답 헤더(X-Robots-Tag)를 설정할 수 없으므로 메타 태그로 적용

## 로컬 확인
```bash
npm install
npm run dev                     # http://localhost:3000/
# 배포와 동일한 하위 경로 점검
NEXT_PUBLIC_BASE_PATH=/jpinno-renewal-kr npm run build
mkdir -p /tmp/serve && ln -sfn "$PWD/out" /tmp/serve/jpinno-renewal-kr
python3 -m http.server 4310 -d /tmp/serve    # http://127.0.0.1:4310/jpinno-renewal-kr/
/usr/bin/python3 scripts/visual-qa.py http://127.0.0.1:4310/jpinno-renewal-kr --shots docs/screenshots/local
```
