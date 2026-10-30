"""
2026-10-30 클라이언트 회신 자료(홈페이지 리뉴얼/261030) → public/img 반영.

- 나우다 믹서·아지호모믹서: 제공 PNG(투명 배경)
- 리파이너·석유화학 사진: 제공 카탈로그 PDF(260323 카탈로그 24P)의 내장 이미지. 원본 해상도가 낮아(리파이너 436px, 석유화학 799px)
  고해상도 원본을 받으면 이 스크립트의 입력만 바꿔 다시 실행한다.
- 원본은 저장소에 넣지 않는다(웹용 변환 결과만 public/img 에 기록).
- 실행: python3 -I scripts/import-261030.py "<홈페이지 리뉴얼/261030 경로>"
"""

import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "img"
CATALOG = SRC / "260323_제이피이노베이션 카탈로그 24P (국문).pdf"


def fit(im: Image.Image, max_w: int, max_h: int) -> Image.Image:
    im = im.copy()
    im.thumbnail((max_w, max_h), Image.LANCZOS)
    return im


def trim(im: Image.Image, pad: int = 12) -> Image.Image:
    """투명 여백 제거 후 일정 여백만 남김"""
    im = im.crop(im.getchannel("A").getbbox())
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))
    return canvas


def cover(im: Image.Image, w: int, h: int, focus_x: float = 0.5) -> Image.Image:
    """비율 유지 확대 후 w×h 로 자르기"""
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    left = round((im.width - w) * focus_x)
    top = (im.height - h) // 2
    return im.crop((left, top, left + w, top + h))


def catalog_images(page: int, tmp: Path) -> list[Path]:
    subprocess.run(["pdfimages", "-f", str(page), "-l", str(page), "-png", str(CATALOG), str(tmp / f"p{page}")], check=True, capture_output=True)
    return sorted(tmp.glob(f"p{page}-*.png"))


def product(im: Image.Image, name: str) -> None:
    out = OUT / "products" / "hd" / f"{name}.webp"
    fit(trim(im.convert("RGBA")), 1100, 1100).save(out, "WEBP", quality=88, method=6)
    print("product", out.name, Image.open(out).size)


def main() -> None:
    product(Image.open(SRC / "NAUTA MIXER.png"), "nauta")
    product(Image.open(SRC / "아지호모믹서(스텐난간).png"), "agi-homo")

    with tempfile.TemporaryDirectory() as t:
        tmp = Path(t)
        # 카탈로그 21쪽(PDF 11쪽): 코밀·임펙트밀·V-Type·리파이너 순서, 각 이미지 뒤에 투명 마스크(smask)
        p11 = catalog_images(11, tmp)
        rgb = Image.open(p11[10]).convert("RGB")
        mask = Image.open(p11[11]).convert("L")
        assert rgb.size == mask.size == (436, 501), (rgb.size, mask.size)
        rgb.putalpha(mask)
        product(rgb, "refiner")

        # 카탈로그 10쪽(PDF 6쪽): 석유화학 플랜트 야경 사진(799×366)
        p6 = catalog_images(6, tmp)
        petro = next(Image.open(p).convert("RGB") for p in p6 if Image.open(p).size == (799, 366))
        cover(petro, 1920, 1050).save(OUT / "visual" / "sub-petro-bg.jpg", "JPEG", quality=86, optimize=True, progressive=True)
        cover(petro, 720, 960, focus_x=0.62).save(OUT / "visual" / "sec01-petro.jpg", "JPEG", quality=86, optimize=True, progressive=True)
        print("visual sub-petro-bg.jpg, sec01-petro.jpg")


if __name__ == "__main__":
    main()
