"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 스크롤 모션: [data-reveal] 요소가 화면에 들어오면 .is-in 부여,
 * [data-count] 숫자는 0부터 목표값까지 카운트. 동작 줄이기 설정 시 즉시 표시.
 */
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          const target = el.dataset.count;
          if (target && !reduce) {
            const end = Number(target);
            const t0 = performance.now();
            const step = (t: number) => {
              const k = Math.min(1, (t - t0) / 1400);
              el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
