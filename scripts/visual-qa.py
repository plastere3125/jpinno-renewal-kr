"""시안 화면 점검 (Playwright)

사용: /usr/bin/python3 scripts/visual-qa.py <BASE_URL> [--shots DIR]
  예) 로컬:  http://127.0.0.1:4310/jpinno-renewal-kr
      배포:  https://plastere3125.github.io/jpinno-renewal-kr

점검 항목(PC 1440 / 모바일 390)
 1. 가로 넘침(document.scrollWidth > viewport)
 2. 깨진 이미지(스크롤 후 naturalWidth 0)
 3. Pretendard 서체 적용 여부(document.fonts.check)
 4. 콘솔 에러 / 페이지 에러
 5. 하위 경로 직접 진입(새로고침과 동일) HTTP 200
 6. 내부 링크 전수 크롤 → 모든 내부 링크 200
 7. 메뉴: A 모바일 드로어 열기/닫기(ESC), B 전체메뉴 오버레이 열기/닫기, PC 키보드 Tab 이동
 8. noindex 메타 존재
"""
import json
import re
import sys
import urllib.parse
import urllib.request
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip("/")
SHOTS = sys.argv[sys.argv.index("--shots") + 1] if "--shots" in sys.argv else None

PAGES = [
    "",
    "company/overview", "company/ceo", "company/vision", "company/history", "company/clients", "company/location",
    "business/epc-engineering", "business/secondary-battery", "business/pharma-bio", "business/electronic-materials", "business/construction",
    "products/reactor", "products/dryer/filter-dryer", "products/reactor/filter-reactor", "products/mixer-mill/pd-mixer",
    "tech/certifications", "tech/projects", "tech/projects/p15",
    "news", "news/news-55", "news/letter-41", "news/letter-74",
    "support/inquiry", "support/contact", "privacy", "sitemap",
]
VIEWPORTS = {"pc": (1440, 900), "mobile": (390, 844)}

results = {"pages": [], "links": {}, "menu": [], "errors": []}


def status(url):
    try:
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": "qa"})
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # noqa
        return str(e)


def check_page(page, url, vp_name, concept, path):
    errs = []
    page.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errs.append(str(e)))
    resp = page.goto(url, wait_until="networkidle")
    # 지연 로딩 이미지까지 불러오도록 끝까지 스크롤
    page.evaluate("""async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); }""")
    page.wait_for_timeout(500)
    info = page.evaluate("""() => {
      const imgs = [...document.images].filter(i => i.getAttribute('src') && !i.closest('[aria-hidden=true]'));
      const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
      const vw = document.documentElement.clientWidth;
      const overflow = document.documentElement.scrollWidth - vw;
      const wide = overflow > 0 ? [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > vw + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('.table-scroll,.overflow-x-auto,[class*=overflow-x]'); }).slice(0, 5).map(e => e.tagName + '.' + (e.className || '').toString().slice(0, 60)) : [];
      return {
        title: document.title,
        imgs: imgs.length, broken,
        overflow, wide,
        font: document.fonts.check('16px "Pretendard Variable"'),
        bodyFont: getComputedStyle(document.body).fontFamily.slice(0, 40),
        noindex: !!document.querySelector('meta[name=robots][content*=noindex]'),
        links: [...document.querySelectorAll('a[href]')].map(a => a.href),
      };
    }""")
    if SHOTS:
        name = f"{concept or 'root'}_{(path or 'home').replace('/', '_')}_{vp_name}.png"
        page.screenshot(path=f"{SHOTS}/{name}", full_page=True)
    return {"url": url, "vp": vp_name, "http": resp.status if resp else None, **{k: v for k, v in info.items() if k != "links"}, "console": errs}, info["links"]


def main():
    all_links = set()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for vp_name, (w, h) in VIEWPORTS.items():
            ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1 if vp_name == "pc" else 2)
            urls = [("", "", f"{BASE}/")] + [(c, path, f"{BASE}/{c}/{path + '/' if path else ''}") for c in ("concept-a", "concept-b") for path in PAGES]
            for c, path, url in urls:
                page = ctx.new_page()
                r, links = check_page(page, url, vp_name, c, path)
                results["pages"].append(r)
                all_links.update(links)
                page.close()
            ctx.close()

        # 메뉴 동작
        for c in ("concept-a", "concept-b"):
            ctx = b.new_context(viewport={"width": 390, "height": 844})
            page = ctx.new_page()
            page.goto(f"{BASE}/{c}/company/ceo/", wait_until="networkidle")
            page.get_by_role("button", name="전체 메뉴 열기").click()
            page.wait_for_timeout(350)
            panel = page.locator("#drawer-a" if c == "concept-a" else "#overlay-b")
            box = panel.bounding_box()
            opened = bool(box and box["height"] > 600 and box["x"] < 390 and box["x"] >= 0)
            if SHOTS:
                page.screenshot(path=f"{SHOTS}/{c}_menu_mobile.png")
            # 하위 메뉴 이동 (A: 아코디언 펼친 뒤)
            if c == "concept-a":
                page.get_by_role("button", name="제품소개").click()
            page.locator(("#drawer-a" if c == "concept-a" else "#overlay-b") + " a", has_text="건조기").first.click()
            try:
                page.wait_for_url("**/products/dryer/", timeout=8000)
                moved = True
            except Exception:  # noqa
                moved = False
            unlocked = page.evaluate("document.documentElement.style.overflow") != "hidden"
            # ESC 닫기
            page.get_by_role("button", name="전체 메뉴 열기").click()
            page.wait_for_timeout(300)
            page.keyboard.press("Escape")
            page.wait_for_timeout(350)
            box2 = panel.bounding_box()
            closed = (box2 is None) or box2["x"] >= 390 or not panel.is_visible()
            results["menu"].append({"concept": c, "mobile_open": opened, "navigate": moved, "scroll_unlocked_after_nav": unlocked, "esc_close": closed})
            ctx.close()

            # PC: 키보드 Tab 으로 주 메뉴 도달 + 펼침
            ctx = b.new_context(viewport={"width": 1440, "height": 900})
            page = ctx.new_page()
            page.goto(f"{BASE}/{c}/", wait_until="networkidle")
            seen = []
            for _ in range(3):
                page.keyboard.press("Tab")
                seen.append(page.evaluate("document.activeElement && (document.activeElement.textContent||'').trim().slice(0,20)"))
            page.wait_for_timeout(300)
            # '회사소개'에 포커스된 상태에서 하위 메뉴(CEO 인사말)가 보이는지
            dropdown_visible = page.locator("header").get_by_role("link", name="CEO 인사말").first.is_visible()
            if SHOTS:
                page.screenshot(path=f"{SHOTS}/{c}_menu_pc_keyboard.png")
            results["menu"].append({"concept": c, "pc_tab_sequence": seen, "pc_dropdown_on_focus": dropdown_visible})
            ctx.close()
        b.close()

    # 내부 링크 전수 확인
    origin = urllib.parse.urlsplit(BASE)
    internal = sorted({l.split("#")[0] for l in all_links if urllib.parse.urlsplit(l).netloc == origin.netloc and l.split("#")[0]})
    external = sorted({l for l in all_links if urllib.parse.urlsplit(l).netloc not in (origin.netloc, "") and not l.startswith(("mailto:", "tel:"))})
    for l in internal:
        results["links"][l] = status(l)
    results["external"] = external

    bad_pages = [r for r in results["pages"] if r["http"] != 200 or r["broken"] or r["overflow"] > 0 or not r["font"] or r["console"] or not r["noindex"]]
    bad_links = {k: v for k, v in results["links"].items() if v != 200}
    print(json.dumps({
        "checked_pages": len(results["pages"]),
        "problem_pages": bad_pages,
        "internal_links": len(results["links"]),
        "bad_internal_links": bad_links,
        "menu": results["menu"],
        "external_link_count": len(external),
    }, ensure_ascii=False, indent=1))
    json.dump(results, open((SHOTS or ".") + "/qa-result.json", "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
