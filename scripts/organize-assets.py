"""기존 jpinno.com 국문 사이트에서 내려받은 원본(_assets_raw)을 public/img 로 정리하고
출처 대장(docs/ASSET_SOURCES.md)을 만든다.

- 원본 내용은 바꾸지 않는다. 표시 크기보다 과도하게 큰 파일만 비율 유지 축소한다.
- 로고 스프라이트(logo.png, 흰색/컬러 상하 2단)는 잘라서 두 파일로 저장한다(픽셀 변경 없음).
- 외부 플랫폼(LinkedIn CDN 등) 이미지는 대상에서 제외한다.

실행: python3 -I scripts/organize-assets.py  (저장소 루트에서)
"""
import json
import os
import shutil
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "_assets_raw")
RES = os.path.join(ROOT, "_research")
OUT = os.path.join(ROOT, "public", "img")

# 원본 파일명 키워드 -> 하위 폴더
GROUPS = [
    ("b3-", "projects"),
    ("certificate-img", "certs"),
    ("partner-", "clients"),
    ("sec04-partner", "clients"),
    ("product-img", "products"),
    ("-floor", "products"),
    ("fd-flow-step", "products"),
    ("filter-reactor-", "products"),
    ("v-type-mixer", "products"),
    ("gas-petro-plant", "products"),
    ("prod-slide-img", "equipment"),
    ("greeting-fixed-img", "equipment"),
    ("sub-institute-img", "company"),
    ("ceo.jpg", "company"),
    ("identity-img", "company"),
    ("organization-chart", "company"),
    ("sub-about-img", "company"),
    ("vision-icon", "company"),
    ("battery-process", "business"),
    ("cosmo-flow", "business"),
    ("sub-business-", "visual"),
    ("sub-bio-bg", "visual"),
    ("sub-cosmo-bg", "visual"),
    ("sec01-bg", "visual"),
    ("esg-", "esg"),
    ("sns-", "brand"),
    ("f-logo", "brand"),
]
# 시안에 쓰지 않는 그룹(아이콘류·A안 범위 밖 메뉴 전용)
SKIP_KEYS = ["welfare-icon", "sub-recruitment", "re-img01", "location-icon", "business-icon", "sec03-icon", "esg-"]
MAX_W = {"certs": 1000, "news": 1600}


def group_of(fn):
    for key, g in GROUPS:
        if key in fn:
            return g
    return None


def save(src, dst, max_w=None):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src)
    w, h = im.size
    if src.lower().endswith(".gif"):
        # 애니메이션 GIF(76MB)는 첫 프레임 정지 이미지로 저장
        im.seek(0)
        fr = im.convert("RGB")
        if max_w and w > max_w:
            fr = fr.resize((max_w, round(h * max_w / w)), Image.LANCZOS)
        fr.save(dst, quality=85, optimize=True)
        return fr.size, (w, h)
    if max_w and w > max_w:
        nh = round(h * max_w / w)
        im = im.convert("RGB") if dst.lower().endswith((".jpg", ".jpeg")) else im
        im.resize((max_w, nh), Image.LANCZOS).save(dst, quality=88, optimize=True)
        return (max_w, nh), (w, h)
    if src.lower().endswith(".png") and dst.lower().endswith(".jpg"):
        im.convert("RGB").save(dst, quality=88, optimize=True)
        return (w, h), (w, h)
    shutil.copyfile(src, dst)
    return (w, h), (w, h)


def main():
    # video/ (유튜브 포스터)는 수동 추가분이므로 보존
    if os.path.isdir(OUT):
        for d in os.listdir(OUT):
            if d != "video":
                shutil.rmtree(os.path.join(OUT, d), ignore_errors=True)
    rows = []
    images = json.load(open(os.path.join(RES, "image_list.json"), encoding="utf-8"))
    for r in images:
        fn = r["file"]
        if any(k in fn for k in SKIP_KEYS):
            continue
        name = fn.split("_", 2)[-1]  # 2025_05_logo.png -> logo.png
        if name == "logo.png":
            im = Image.open(os.path.join(RAW, fn))
            w, h = im.size
            os.makedirs(os.path.join(OUT, "brand"), exist_ok=True)
            im.crop((0, 0, w, h // 2)).save(os.path.join(OUT, "brand", "logo-white.png"))
            im.crop((0, h // 2, w, h)).save(os.path.join(OUT, "brand", "logo-color.png"))
            for v in ("white", "color"):
                rows.append((f"brand/logo-{v}.png", r["url"], f"{w}x{h//2}", f"{w}x{h} 스프라이트에서 {'상단' if v=='white' else '하단'} 절반 잘라냄", "공통 헤더/푸터"))
            continue
        g = group_of(name)
        if not g:
            continue
        if g == "certs" and name.endswith(".png"):
            name = name[:-4] + ".jpg"
        dst_rel = f"{g}/{name}"
        (nw, nh), (ow, oh) = save(os.path.join(RAW, fn), os.path.join(OUT, dst_rel), MAX_W.get(g))
        note = "" if (nw, nh) == (ow, oh) else f"원본 {ow}x{oh} → 비율 유지 축소"
        rows.append((dst_rel, r["url"], f"{nw}x{nh}", note, ", ".join(r["pages"])))

    posts = json.load(open(os.path.join(RES, "posts.json"), encoding="utf-8"))
    for p in posts:
        for im in p.get("img_files", []):
            ext = im["file"].rsplit(".", 1)[-1].replace("gif", "jpg")
            dst_rel = f"news/{p['board']}-{p['uid']}.{ext}"
            (nw, nh), (ow, oh) = save(os.path.join(RAW, im["file"]), os.path.join(OUT, dst_rel), MAX_W["news"])
            note = "" if (nw, nh) == (ow, oh) else f"원본 {ow}x{oh} → 비율 유지 축소"
            if im["file"].endswith(".gif"):
                note = f"원본 애니메이션 GIF {ow}x{oh}(약 76MB) → 첫 프레임 정지 JPG"
            rows.append((dst_rel, im["url"], f"{nw}x{nh}", note, f"news/{p['board']} uid={p['uid']}"))
            # 목록 카드용 썸네일: 세로로 긴 뉴스레터는 상단 4:3 영역만 잘라 800px
            th = Image.open(os.path.join(OUT, dst_rel)).convert("RGB")
            tw, thh = th.size
            if thh > tw * 0.75:
                th = th.crop((0, 0, tw, round(tw * 0.75)))
            elif tw > thh * 4 / 3:
                cw = round(thh * 4 / 3)
                th = th.crop(((tw - cw) // 2, 0, (tw - cw) // 2 + cw, thh))
            if th.size[0] > 800:
                th = th.resize((800, round(th.size[1] * 800 / th.size[0])), Image.LANCZOS)
            os.makedirs(os.path.join(OUT, "news", "thumb"), exist_ok=True)
            th.save(os.path.join(OUT, "news", "thumb", f"{p['board']}-{p['uid']}.jpg"), quality=84, optimize=True)

    rows.sort()
    with open(os.path.join(ROOT, "docs", "ASSET_SOURCES.md"), "w", encoding="utf-8") as f:
        f.write("# 이미지 출처 대장 (국문 시안)\n\n")
        f.write("- 수집일: 2026-10-19 · 출처: 기존 국문 홈페이지 https://jpinno.com/ (HTTPS 200, http/www → https://jpinno.com/ 301)\n")
        f.write("- 수집 방식: HTML img·CSS background-image 의 원본 파일 직접 다운로드(스크린샷 아님). 기존 사이트에 srcset/축소본 없음 → 제공 파일이 곧 최대 크기\n")
        f.write("- 외부 플랫폼 이미지(LinkedIn CDN 등)는 재게시 권한 미확인으로 제외. 블로그·유튜브는 원문 링크만 사용\n")
        f.write("- 사용 위치는 `src/content/ko/*` 에서 경로로 검색 가능\n\n")
        f.write(f"총 {len(rows)}개\n\n| 로컬 경로 (public/img/) | 원본 URL | 픽셀 | 처리 | 기존 사이트 사용 페이지 |\n|---|---|---|---|---|\n")
        for r in rows:
            f.write("| " + " | ".join(r) + " |\n")
    print(len(rows), "files")


if __name__ == "__main__":
    main()
