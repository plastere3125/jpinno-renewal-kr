// 7안 공통 동작: 메가메뉴(기존 국문 메뉴·동작 유지), 헤더 상태, 첫 화면 슬라이드, 사업분야 탭, 등장 효과
(function () {
  // 세부페이지 = 리뉴얼 사이트(concept-a). 로컬에서 열면 개발 서버, 공유 링크에서 열면 내부 공유 사이트. ?base= 로 바꿀 수 있음
  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var BASE = (new URLSearchParams(location.search).get("base") || (LOCAL ? "http://localhost:3210/concept-a/" : new URL("concept-a/", location.origin + location.pathname.replace(/[^/]*$/, "")).href)).replace(/\/?$/, "/");
  // 세부페이지 캐시 방지: GitHub Pages가 HTML을 10분간 저장 → 배포 직후에도 옛 세부페이지가 뜨지 않게 링크 뒤에 배포 버전 표시
  var V = "?v=261119";
  var to = function (p) { return BASE + p + V; };
  var MENU = [
    ["회사소개", "company/overview/", [["회사개요", "company/overview/"], ["CEO 인사말", "company/ceo/"], ["비전", "company/vision/"], ["연혁·조직", "company/history/"], ["주요 고객사", "company/clients/"], ["오시는 길", "company/location/"]]],
    ["사업분야", "business/epc-engineering/", [["EPC 엔지니어링", "business/epc-engineering/"], ["이차전지", "business/secondary-battery/"], ["화장품", "business/cosmetics/"], ["제약·바이오", "business/pharma-bio/"], ["전자소재", "business/electronic-materials/"], ["석유화학", "business/petrochemical/"], ["건설산업", "business/construction/"]]],
    ["제품소개", "products/reactor/", [["반응기", "products/reactor/"], ["여과기", "products/filter/"], ["건조기", "products/dryer/"], ["믹서", "products/mixer/"], ["밀링·리파이너", "products/milling/"]]],
    ["기술·실적", "tech/certifications/", [["인증 및 특허", "tech/certifications/"], ["주요 수행실적", "tech/projects/"]]],
    ["홍보센터", "news/", [["홍보센터", "news/"]]],
    ["고객지원", "support/inquiry/", [["사업·제품 문의", "support/inquiry/"], ["담당 연락처", "support/contact/"]]]
  ];
  [].forEach.call(document.querySelectorAll("[data-to]"), function (a) { a.href = to(a.getAttribute("data-to")); });
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var gnb = header.querySelector(".gnb"), cols = header.querySelector(".mega .cols"), drawer = document.querySelector(".drawer");
  MENU.forEach(function (m) {
    var li = document.createElement("li");
    li.innerHTML = '<a href="' + to(m[1]) + '">' + m[0] + "</a>"; gnb.appendChild(li);
    var ul = document.createElement("ul");
    ul.innerHTML = m[2].map(function (c) { return '<li><a href="' + to(c[1]) + '">' + c[0] + "</a></li>"; }).join("");
    cols.appendChild(ul);
    ["mouseenter", "focusin"].forEach(function (e) { ul.addEventListener(e, function () { li.classList.add("hot"); }); });
    ["mouseleave", "focusout"].forEach(function (e) { ul.addEventListener(e, function () { li.classList.remove("hot"); }); });
    var d = document.createElement("details");
    d.innerHTML = "<summary>" + m[0] + "</summary><div>" + m[2].map(function (c) { return '<a href="' + to(c[1]) + '">' + c[0] + "</a>"; }).join("") + "</div>";
    drawer.appendChild(d);
  });
  var align = function () { var w = header.querySelector(".mega .wrap"); var pad = parseFloat(getComputedStyle(w).paddingLeft); cols.parentNode.style.setProperty("--cols-x", gnb.getBoundingClientRect().left - w.getBoundingClientRect().left - pad + "px"); };
  var open = function () { align(); header.classList.add("open"); }, close = function () { header.classList.remove("open"); };
  gnb.addEventListener("mouseenter", open);
  header.addEventListener("mouseleave", close);
  header.addEventListener("focusin", function (e) { if (e.target.closest(".gnb, .mega")) open(); else close(); });
  header.addEventListener("focusout", function (e) { if (!header.contains(e.relatedTarget)) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); drawer.classList.remove("open"); } });
  window.addEventListener("resize", align);
  var btn = header.querySelector(".menu-btn");
  btn.addEventListener("click", function () { var o = drawer.classList.toggle("open"); btn.setAttribute("aria-expanded", o); header.classList.toggle("solid", o || scrollY > 10); });
  var onScroll = function () { header.classList.toggle("solid", scrollY > 10 || drawer.classList.contains("open")); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // 첫 화면 슬라이드: 3초 자동 전환 + 일시정지 버튼, 번호 클릭 이동. 동작 줄이기 설정이면 자동 전환 없음
  var slides = [].slice.call(document.querySelectorAll(".slide")), idx = [].slice.call(document.querySelectorAll(".hero-ctrl li"));
  var ctrl = document.querySelector(".hero-ctrl"), pauseBtn = document.querySelector(".hero-ctrl .pause");
  var cur = 0, timer = null, DUR = 3000, playing = !reduce && !/static/.test(location.search);
  var go = function (n) {
    slides[cur].classList.remove("on"); idx[cur].classList.remove("on"); idx[cur].querySelector("button").removeAttribute("aria-current");
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add("on"); void idx[cur].offsetWidth; idx[cur].classList.add("on"); idx[cur].querySelector("button").setAttribute("aria-current", "true");
    schedule();
  };
  var schedule = function () { clearTimeout(timer); if (playing) timer = setTimeout(function () { go(cur + 1); }, DUR); };
  ctrl.style.setProperty("--dur", DUR / 1000 + "s");
  idx.forEach(function (li, i) { li.querySelector("button").addEventListener("click", function () { go(i); }); });
  var setPlay = function (p) {
    playing = p; ctrl.classList.toggle("paused", !p);
    pauseBtn.textContent = p ? "❚❚" : "▶"; pauseBtn.setAttribute("aria-label", p ? "슬라이드 일시정지" : "슬라이드 재생");
    if (p) { idx[cur].classList.remove("on"); void idx[cur].offsetWidth; idx[cur].classList.add("on"); }
    schedule();
  };
  pauseBtn.addEventListener("click", function () { setPlay(!playing); });

  // 인트로(첫 진입 1회, PNT 문법): 둥근 카드 안에서 사진 3장이 차례로 올라오고 카드가 전체 화면으로 확장 → 1.9초에 헤더·문구·진행 표시 등장
  var root = document.documentElement, hero = document.querySelector(".hero");
  var autoplay = playing;
  var ready = function () { hero.classList.add("ready"); setPlay(autoplay); };
  if (root.classList.contains("js-intro")) {
    setPlay(false); ctrl.classList.remove("paused");
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add("intro-start"); }); });
    setTimeout(function () { root.classList.add("intro-done"); ready(); }, 2350);
  } else { setPlay(autoplay); ready(); }

  // 선언 구간: 첫 화면이 55% 이상 걷히면 1회 시작 + 수치 카운트
  var st = document.querySelector(".statement"), counted = false;
  var count = function () {
    if (counted) return; counted = true;
    [].forEach.call(st.querySelectorAll("[data-count]"), function (el) {
      var to = +el.getAttribute("data-count"), t0 = null;
      if (reduce || /static/.test(location.search)) { el.textContent = to; return; }
      el.textContent = "0";
      var step = function (t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      setTimeout(function () { requestAnimationFrame(step); }, 900);
    });
  };
  var stOn = function () { if (!st.classList.contains("on") && scrollY > hero.offsetHeight * 0.4) { st.classList.add("on"); count(); } };
  if (reduce || /static/.test(location.search)) { st.classList.add("on"); count(); }
  addEventListener("scroll", stOn, { passive: true }); stOn();

  // 사업분야 탭 (클릭·좌우 방향키)
  var tabs = [].slice.call(document.querySelectorAll(".biz-tabs button")), panels = [].slice.call(document.querySelectorAll(".biz-panel"));
  var sel = function (i, focus) {
    tabs.forEach(function (t, j) { t.setAttribute("aria-selected", j === i); t.tabIndex = j === i ? 0 : -1; panels[j].classList.toggle("on", j === i); });
    if (focus) tabs[i].focus();
  };
  // 자동 롤링: 3초 간격, 구간이 화면에 보일 때만, 마우스를 올리거나 키보드 포커스 중에는 멈춤. 동작 줄이기 설정이면 자동 전환 없음
  var bizBox = document.querySelector(".biz .wrap"), tabBar = document.querySelector(".biz-tabs");
  var BDUR = 3000, bCur = 0, bTimer = null, bInView = false, bHold = false, bAuto = !reduce && !/static/.test(location.search);
  tabBar.style.setProperty("--bdur", BDUR / 1000 + "s");
  var bRun = function () {
    clearTimeout(bTimer);
    var on = bAuto && bInView && !bHold;
    tabBar.classList.toggle("rolling", on);
    if (on) {
      var t = tabs[bCur]; t.classList.remove("prog"); void t.offsetWidth; t.classList.add("prog");
      bTimer = setTimeout(function () { go2((bCur + 1) % tabs.length); }, BDUR);
    }
  };
  var go2 = function (i, focus) { tabs[bCur].classList.remove("prog"); bCur = i; sel(i, focus); bRun(); };
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { go2(i); });
    t.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") go2((i + 1) % tabs.length, true); if (e.key === "ArrowLeft") go2((i - 1 + tabs.length) % tabs.length, true); });
  });
  bizBox.addEventListener("mouseenter", function () { bHold = true; bRun(); });
  bizBox.addEventListener("mouseleave", function () { bHold = false; bRun(); });
  bizBox.addEventListener("focusin", function () { bHold = true; bRun(); });
  bizBox.addEventListener("focusout", function (e) { if (!bizBox.contains(e.relatedTarget)) { bHold = false; bRun(); } });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { bInView = es[0].isIntersecting; bRun(); }, { threshold: 0.45 }).observe(document.querySelector(".biz .stage"));
  }

  // 섹션 등장(1회)
  var rv = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window) || /static/.test(location.search)) { document.documentElement.classList.add("no-motion"); }
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.15 });
    rv.forEach(function (el) { io.observe(el); });
  }
})();
