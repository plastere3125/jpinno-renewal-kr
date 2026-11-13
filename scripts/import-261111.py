"""
2026-11-11 클라이언트 회신 자료(홈페이지 리뉴얼/261111) → public/img 반영.

- 리파이너: 제공 PNG(투명 배경, 1864×2141) — 카탈로그 추출본(436px) 교체
- 석유화학: 제공 JPG(4093×1521) — 카탈로그 추출본(799px) 교체
- 원본은 저장소에 넣지 않는다(웹용 변환 결과만 public/img 에 기록).
- 실행: python3 -I scripts/import-261111.py "<홈페이지 리뉴얼/261111 경로>"
"""

import sys
from pathlib import Path

from PIL import Image

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "img"


def trim(im: Image.Image, pad: int = 12) -> Image.Image:
    im = im.crop(im.getchannel("A").getbbox())
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))
    return canvas


def cover(im: Image.Image, w: int, h: int, focus_x: float = 0.5) -> Image.Image:
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    left = round((im.width - w) * focus_x)
    top = (im.height - h) // 2
    return im.crop((left, top, left + w, top + h))


def main() -> None:
    ref = trim(Image.open(SRC / "리파이너.png").convert("RGBA"))
    ref.thumbnail((1100, 1100), Image.LANCZOS)
    out = OUT / "products" / "hd" / "refiner.webp"
    ref.save(out, "WEBP", quality=88, method=6)
    print("product", out.name, ref.size)

    petro = Image.open(SRC / "제목 없음-1.jpg").convert("RGB")
    opts = dict(quality=86, optimize=True, progressive=True)
    cover(petro, 1920, 1050, focus_x=0.5).save(OUT / "visual" / "sub-petro-bg.jpg", "JPEG", **opts)
    cover(petro, 720, 960, focus_x=0.7).save(OUT / "visual" / "sec01-petro.jpg", "JPEG", **opts)
    print("visual sub-petro-bg.jpg, sec01-petro.jpg")


if __name__ == "__main__":
    main()
