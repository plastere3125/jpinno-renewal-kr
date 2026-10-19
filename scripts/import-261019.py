"""
2026-10-19 클라이언트 추가 자료(261012/In Data/홈페이지용) → public/img 반영.

- 원본은 _assets_raw 와 마찬가지로 저장소에 넣지 않는다(이 스크립트가 웹용으로 변환한 결과만 public/img 에 기록).
- 실행: python3 -I scripts/import-261019.py "<In Data/홈페이지용 경로>"
"""

import subprocess
import sys
import tempfile
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

Image.MAX_IMAGE_PIXELS = None
SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "img"


def fit(im: Image.Image, max_w: int, max_h: int) -> Image.Image:
    im = im.copy()
    im.thumbnail((max_w, max_h), Image.LANCZOS)
    return im


def trim(im: Image.Image, pad: int = 12) -> Image.Image:
    """투명 여백 제거 후 일정 여백만 남김"""
    box = im.getchannel("A").getbbox()
    im = im.crop(box)
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))
    return canvas


def knock_out_white(im: Image.Image, tol: int = 14) -> Image.Image:
    """가장자리에서 이어진 흰 배경만 투명 처리(제품 내부 흰색은 유지)"""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))
    mask = Image.new("L", (w, h), 255)
    mp = mask.load()
    while q:
        x, y = q.popleft()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        r, g, b, _ = px[x, y]
        if r < 255 - tol or g < 255 - tol or b < 255 - tol:
            continue
        mp[x, y] = 0
        if x > 0:
            q.append((x - 1, y))
        if x < w - 1:
            q.append((x + 1, y))
        if y > 0:
            q.append((x, y - 1))
        if y < h - 1:
            q.append((x, y + 1))
    # 경계 1px 부드럽게
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    im.putalpha(mask)
    return im


def flatten(im: Image.Image, bg=(255, 255, 255)) -> Image.Image:
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        base = Image.new("RGB", im.size, bg)
        base.paste(im, mask=im.getchannel("A"))
        return base
    return im.convert("RGB")


def save_webp(im: Image.Image, rel: str, q: int = 84):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    im.save(p, "WEBP", quality=q, method=6)
    print(f"{rel:48s} {im.size} {p.stat().st_size // 1024}KB")


def save_jpg(im: Image.Image, rel: str, q: int = 84):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    flatten(im).save(p, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{rel:48s} {im.size} {p.stat().st_size // 1024}KB")


def pdf_page(pdf: Path, dpi: int, page: int = 1) -> Image.Image:
    with tempfile.TemporaryDirectory() as d:
        subprocess.run(["pdftoppm", "-r", str(dpi), "-f", str(page), "-l", str(page), "-png", str(pdf), f"{d}/p"], check=True)
        f = next(Path(d).glob("p*.png"))
        return Image.open(f).convert("RGB").copy()


P = SRC / "제품이미지"
C = SRC / "COMPANY"
B = SRC / "BUSINESS"

# ── 1. 제품 컷(투명 배경, 고해상도) ─────────────────────────────
PRODUCTS = {
    "rt": ("반응기.jpg", True),
    "fr": ("FR(필터리액터).png", False),
    "nf": ("누체필터.png", False),
    "fd": ("FD(필터드라이어).png", False),
    "rd": ("로터리드라이어.png", False),
    "vt": ("사각건조기-2.png", False),
    "freeze": ("동결건조기.png", False),
    "dm": ("더블콘믹서.png", False),
    "pd": ("PD믹서.png", False),
    "comill": ("Co-Mill.png", False),
    "impact": ("임팩트밀.png", False),
    "v-type": ("V형 믹서.png", True),
}
for key, (name, white) in PRODUCTS.items():
    im = Image.open(P / name)
    if white:
        im = knock_out_white(fit(im.convert("RGB"), 2000, 2000))
    im = trim(im.convert("RGBA"))
    save_webp(fit(im, 1100, 1100), f"products/hd/{key}.webp")

# ── 2. 표준 도면(기술팀 표준화 이미지) ───────────────────────────
for key, name in {"fd": "FD.png", "fr": "FR.png", "nf": "NF.png", "rd": "RD.png", "rt": "RT.png", "td": "TD.png"}.items():
    im = flatten(Image.open(P / "스펙관련" / name))
    save_jpg(fit(im, 1400, 1400), f"products/hd/{key}-drawing.jpg", 86)

# ── 3. 대표이사 사진(기존 사이트와 동일 인물·동일 컷의 고해상도 원본) ──
ceo = Image.open(C / "CEO 인사말" / "대표님사진1.png").convert("RGBA")
ceo = ceo.crop(ceo.getchannel("A").getbbox())
save_webp(fit(ceo, 1200, 1400), "company/hd/ceo.webp", 86)

# ── 4. 동탄연구소 사진(4K 원본 → 1600) ────────────────────────
for i, name in enumerate(
    ["DJI_20241210130316_0339_D.JPG", "DJI_20241210130813_0350_D.JPG", "DJI_20241210130838_0353_D.jpg", "DJI_20241210130857_0354_D.JPG"], 1
):
    save_jpg(fit(Image.open(C / "소개" / name), 1600, 1600), f"company/hd/institute-{i:02d}.jpg", 82)

# ── 5. 조직도(신규) ──────────────────────────────────────────
save_jpg(fit(pdf_page(C / "조직도" / "조직도 신규(홈페이지용).ai", 200), 2000, 2000), "company/hd/organization-chart.jpg", 88)

# ── 6. 공정 모식도 ────────────────────────────────────────────
save_jpg(fit(Image.open(B / "2차전지" / "2차전지 공정 모식도.jpg"), 2000, 2000), "business/hd/battery-process.jpg", 86)
save_jpg(fit(pdf_page(B / "화장품" / "화장품 모식도(자외선 차단제-홈페이지용).pdf", 220), 1600, 2000), "business/hd/cosmo-flow.jpg", 86)

# ── 7. 인증·특허(원본 PDF/JPG → 세로 1200) ──────────────────────
CERT = C / "인증 및 특허"
CERT_FILES = {
    "iso9001": ("품질경영시스템_20251218.pdf", 1),
    "iso45001": ("안전보건경영시스템(ISO45001)_(24.12.27~27.12.26).jpg", 0),
    "iso14001": ("환경경영시스템 ISO 14001.jpg", 0),
    "license": ("종합건설업_산업환경설비공사업(모자이크).jpg", 0),
    "special-equipment": ("특정설비제조 등록증명서 (제이피이노베이션).pdf", 1),
    "inno-biz": ("기술혁신형 중소기업(inno-biz)확인서_(25.05.02~28.05.01).pdf", 1),
    "main-biz": ("메인비즈확인서(24.09.13~27.09.12).pdf", 1),
    "venture": ("벤처기업확인서_25.04.13~28.04.12.pdf", 1),
    "root": ("뿌리기업확인서_(2025.04.04~2028.04.03).pdf", 1),
    "sobujang": ("소재부품장비전문기업확인서_(2025.12.08~2028.12.07).pdf", 1),
    "pt-pouch": ("특허증_2차 전지 파우치 제조장치 및 제조방법.pdf", 1),
    "pt-filter-reactor": ("특허증_복합기능 구현이 가능한 필터 리액터.pdf", 1),
    "pt-mill": ("특허증_분체 분쇄 장치.pdf", 1),
    "pt-joint": ("특허증_자동 체결 조인트.pdf", 1),
    "pt-temp": ("특허증_가열 및 냉각 싸이클 분리식 반응기 온도 조절장치.pdf", 1),
    "pt-shaft": ("특허증_누체 건조기의 교반축 조립체.pdf", 1),
    "pt-preserve": ("특허증_물품 가공 및 보존 처리용 장치.pdf", 1),
    "pt-mixer": ("특허증_믹싱 공정용 믹서 장치.pdf", 1),
    "ds-pile-joint": ("디자인등록증_건축 파일용 조인트.pdf", 1),
}
for key, (name, page) in CERT_FILES.items():
    f = CERT / name
    im = pdf_page(f, 150, page) if page else Image.open(f)
    save_jpg(fit(im, 900, 1200), f"certs/hd/{key}.jpg", 82)
# 법인등록번호 가림(클라이언트가 건설업등록증에서 모자이크한 항목과 같은 정보, 특허증은 원본에서 이미 * 처리)
#  좌표는 위에서 저장한 849x1200 기준
MASK = {"special-equipment": [(625, 366, 795, 404)], "root": [(482, 404, 632, 442)]}
for key, boxes in MASK.items():
    p = OUT / f"certs/hd/{key}.jpg"
    im = Image.open(p).convert("RGB")
    for box in boxes:
        region = im.crop(box)
        small = region.resize((max(1, region.width // 10), max(1, region.height // 10)), Image.BILINEAR)
        im.paste(small.resize(region.size, Image.NEAREST).filter(ImageFilter.GaussianBlur(2)), box)
    im.save(p, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"masked certs/hd/{key}.jpg {boxes}")

# ASME 종합 PDF 5쪽 → 쪽마다 1장(쪽 순서: U, U2, PP, S, U3 — 각 쪽 인증 마크 하단 표기와 SCOPE 문구로 확인)
for i, key in enumerate(["asme-u", "asme-u2", "asme-pp", "asme-s", "asme-u3"], 1):
    save_jpg(fit(pdf_page(CERT / "ASME 인증서 종합.pdf", 150, i), 900, 1200), f"certs/hd/{key}.jpg", 82)

# ── 8. 건설산업 사업 실적 사진(파일명: 연도 + 프로젝트명) ─────────
#    파일명 정렬 순서대로 site-01 ~ site-15 (content/ko/tech.ts SITE_PHOTOS 와 같은 순서)
for i, f in enumerate(sorted((B / "건설산업").glob("*.jpg")), 1):
    save_jpg(Image.open(f), f"projects/hd/site-{i:02d}.jpg", 86)
    print(f"  site-{i:02d} = {f.name}")
