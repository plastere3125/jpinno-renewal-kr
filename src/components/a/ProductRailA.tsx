"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/content/ko/products";
import { href, img } from "@/lib/site";
import { ChevronLeft, ChevronRight } from "@/components/shared/Icons";

/** 시안 A 대표 제품: 분류 필터 + 가로 슬라이드(스크롤 스냅) */
export default function ProductRailA() {
  const [cat, setCat] = useState<string>("all");
  const rail = useRef<HTMLUListElement>(null);
  const list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  const move = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.min(760, rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <div>
      <div className="wrap mt-12 flex items-center justify-between gap-6 lg:mt-16">
        <div role="tablist" aria-label="제품 분류" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {[{ slug: "all", name: "전체" }, ...PRODUCT_CATEGORIES].map((c) => {
            const on = c.slug === cat;
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setCat(c.slug);
                  rail.current?.scrollTo({ left: 0 });
                }}
                className={`h-10 shrink-0 rounded-full px-5 text-[14px] transition-colors ${on ? "bg-ink text-white" : "bg-white text-muted hover:text-ink"}`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" onClick={() => move(-1)} aria-label="이전 제품" className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-ink">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="다음 제품" className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-ink">
            <ChevronRight />
          </button>
        </div>
      </div>
      <ul
        ref={rail}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:gap-5 lg:px-[max(40px,calc((100vw-1320px)/2+40px))] lg:scroll-px-[max(40px,calc((100vw-1320px)/2+40px))]"
      >
        {list.map((p) => {
          const c = PRODUCT_CATEGORIES.find((x) => x.slug === p.category)!;
          return (
            <li key={p.slug} className="w-[78vw] max-w-[380px] shrink-0 snap-start">
              <Link href={href("concept-a", `products/${p.category}/${p.slug}`)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p.image)} alt={p.name} loading="lazy" className="absolute inset-0 m-auto max-h-[74%] max-w-[74%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                  <span className="absolute left-5 top-5 text-[12.5px] text-muted">{c.name}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.03em] text-ink">{p.name}</h3>
                    <p className="mt-1 text-[13px] text-muted">{p.nameEn}</p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
