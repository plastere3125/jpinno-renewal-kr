"""홍보센터 통합 목록 데이터 생성 → src/content/ko/news.data.json

입력(2026-10-19 수집 스냅샷, _research/):
- posts.json : 기존 사이트 새소식(news/updates)·뉴스레터(news/newsletter) 게시물
- blog.xml   : 네이버 블로그 RSS (https://rss.blog.naver.com/jpinno.xml)
- yt.xml     : 유튜브 채널 피드 (channel_id=UC1KZwclWKXRlUt_WOIGbfCQ)

국문 단계이므로 블로그·유튜브는 한글 제목 게시물만 사용한다. 외부 게시물은 이미지 없이 원문 링크로만 연결한다.
실행: python3 -I scripts/build-news.py
"""
import json
import os
import re
from email.utils import parsedate_to_datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(ROOT, "_research")
HANGUL = re.compile(r"[가-힣]")
URL = re.compile(r"^https?://\S+$")


def clean_title(t):
    return re.sub(r"\s+", " ", t).strip()


def main():
    items = []
    posts = json.load(open(os.path.join(RES, "posts.json"), encoding="utf-8"))
    for p in posts:
        board = p["board"]
        uid = p["uid"]
        body, links = [], []
        for line in p.get("body", []):
            line = line.replace("​", "").strip()
            if not line:
                continue
            # 링크드인 원문 게시물 주소는 하단 버튼으로, 그 외 주소(관련 기사 등)는 본문 위치 유지
            if URL.match(line) and "linkedin.com/feed" in line:
                links.append(line)
            else:
                body.append(line)
        has_img = bool(p.get("img_files"))
        ext = p["img_files"][0]["file"].rsplit(".", 1)[-1].replace("gif", "jpg") if has_img else None
        iframe = None
        for o in p.get("other", []) or []:
            m = re.search(r'src="(https://jpinno\.com/Newsletter/[^"]+)"', o)
            if m:
                iframe = m.group(1)
            m = re.search(r'src="https://www\.youtube\.com/embed/([\w-]+)"', o)
            if m:
                links.append(f"https://www.youtube.com/watch?v={m.group(1)}")
            m = re.search(r'href="(https://www\.linkedin\.com/[^"]+)"', o)
            if m and m.group(1) not in links:
                links.append(m.group(1))
        items.append({
            "id": f"{'news' if board == 'updates' else 'letter'}-{uid}",
            "type": "news" if board == "updates" else "newsletter",
            "title": clean_title(p["title"]),
            "date": p["date"],
            "image": f"news/{board}-{uid}.{ext}" if has_img else None,
            "thumb": f"news/thumb/{board}-{uid}.jpg" if has_img else None,
            "body": body,
            "links": links,
            "embedPage": iframe,  # 이미지가 아닌 HTML로 게시된 뉴스레터(16·17호)
            "source": f"https://jpinno.com/news/{board}/?mod=document&uid={uid}",
        })

    blog = open(os.path.join(RES, "blog.xml"), encoding="utf-8").read()
    for it in re.findall(r"<item>([\s\S]*?)</item>", blog):
        title = re.search(r"<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</title>", it).group(1)
        if not HANGUL.search(title):
            continue
        link = re.search(r"<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</link>", it).group(1).split("?")[0]
        date = parsedate_to_datetime(re.search(r"<pubDate>(.*?)</pubDate>", it).group(1)).strftime("%Y-%m-%d")
        items.append({"id": "blog-" + link.rsplit("/", 1)[-1], "type": "blog", "title": clean_title(title),
                      "date": date, "image": None, "thumb": None, "body": [], "links": [], "embedPage": None,
                      "source": link, "external": link})

    yt = open(os.path.join(RES, "yt.xml"), encoding="utf-8").read()
    for e in re.findall(r"<entry>([\s\S]*?)</entry>", yt):
        title = re.search(r"<title>(.*?)</title>", e).group(1)
        if not HANGUL.search(title):
            continue
        vid = re.search(r"<yt:videoId>(.*?)</yt:videoId>", e).group(1)
        date = re.search(r"<published>(.*?)</published>", e).group(1)[:10]
        url = f"https://www.youtube.com/watch?v={vid}"
        items.append({"id": "video-" + vid, "type": "video", "title": clean_title(title), "date": date,
                      "image": None, "thumb": None, "body": [], "links": [], "embedPage": None,
                      "source": url, "external": url, "videoId": vid})

    items.sort(key=lambda x: x["date"], reverse=True)
    out = os.path.join(ROOT, "src", "content", "ko", "news.data.json")
    json.dump(items, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    from collections import Counter
    print(len(items), Counter(i["type"] for i in items))


if __name__ == "__main__":
    main()
