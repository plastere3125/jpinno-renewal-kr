"""
2026-10-30 서브 페이지·사업분야 배경을 범용 스톡 이미지에서 클라이언트 실제 자료로 교체.

- 브랜드 영상(public/video/brand-film-1920.mp4, 클라이언트 제공): 자막이 없는 장면만 추출
- 동탄연구소 사진(261012/In Data/홈페이지용/COMPANY/소개/DJI_*.JPG, 3840px)
- 실행: python3 -I scripts/import-261030-visuals.py "<261012/In Data/홈페이지용 경로>"
"""

import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1])
OUT = ROOT / "public" / "img" / "visual"
FILM = ROOT / "public" / "video" / "brand-film-1920.mp4"

# 파일명: 영상 시점(초). 자막이 없는 구간만 골랐다(10/30 프레임 시트 확인)
FRAMES = {
    "real-epc.jpg": 30.6,  # 본사 공장 항공 촬영
    "real-construction.jpg": 0.3,  # 공장 정문·건물
    "real-battery.jpg": 23.2,  # 믹싱 탱크
    "real-cosmetics.jpg": 13.6,  # 화장품 제조
    "real-pharma.jpg": 8.2,  # 제약 설비
    "real-electronic.jpg": 26.4,  # 클린룸 설비
    "real-plant.jpg": 13.2,  # 반응기·탱크 설비
}
PHOTOS = {
    "real-office.jpg": "COMPANY/소개/DJI_20241210130813_0350_D.JPG",
    "real-lab-entrance.jpg": "COMPANY/소개/DJI_20241210130316_0339_D.JPG",
}


def save(im: Image.Image, name: str) -> None:
    im = im.convert("RGB")
    im.thumbnail((1920, 1920), Image.LANCZOS)
    im.save(OUT / name, "JPEG", quality=86, optimize=True, progressive=True)
    print(name, im.size)


def main() -> None:
    with tempfile.TemporaryDirectory() as t:
        for name, sec in FRAMES.items():
            f = Path(t) / name
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(sec), "-i", str(FILM), "-frames:v", "1", "-q:v", "1", str(f)], check=True)
            save(Image.open(f), name)
    for name, rel in PHOTOS.items():
        save(Image.open(SRC / rel), name)


if __name__ == "__main__":
    main()
