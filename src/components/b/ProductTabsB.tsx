"use client";

import Link from "next/link";
import { useState } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/content/ko/products";
import { href, img } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";

/** 시안 B 제품 쇼케이스: 왼쪽 목록에서 선택 → 무대에 큰 제품 이미지·요약·모델 수 */
export default function ProductTabsB() {
  const [slug, setSlug] = useState(PRODUCTS[0].slug);
  const p = PRODUCTS.find((x) => x.slug === slug)!;
  const c = PRODUCT_CATEGORIES.find((x) => x.slug === p.category)!;
  return (
    <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-4">
        <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-7 lg:overflow-visible lg:px-0">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat.slug} className="contents lg:block">
              <p className="hidden text-[12px] uppercase tracking-[0.14em] text-white/40 lg:block">{cat.nameEn}</p>
              <ul className="contents lg:mt-2 lg:block">
                {PRODUCTS.filter((x) => x.category === cat.slug).map((x) => {
                  const on = x.slug === slug;
                  return (
                    <li key={x.slug} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setSlug(x.slug)}
                        onMouseEnter={() => setSlug(x.slug)}
                        className={`flex h-10 items-center gap-3 whitespace-nowrap rounded-full border px-4 text-[14px] transition-colors lg:h-auto lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-1.5 lg:text-[17px] ${
                          on ? "border-sky text-white" : "border-white/15 text-white/45 hover:text-white/80"
                        }`}
                      >
                        <span className={`hidden h-px bg-sky transition-[width] duration-300 lg:block ${on ? "w-6" : "w-0"}`} />
                        {x.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 lg:col-span-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[radial-gradient(ellipse_at_50%_45%,#ffffff_0%,#dfe4ee_45%,#1a2140_100%)] sm:aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={p.slug} src={img(p.image)} alt={p.name} className="absolute inset-0 m-auto max-h-[78%] max-w-[70%] animate-[stage_0.7s_cubic-bezier(0.2,0.7,0.2,1)] object-contain drop-shadow-[0_30px_40px_rgba(13,17,36,0.35)]" />
          <span className="absolute left-5 top-5 text-[12.5px] text-ink/60 lg:left-8 lg:top-7">{c.name}</span>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[13px] text-white/45">{p.nameEn}</p>
            <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.03em] lg:text-[36px]">{p.name}</h3>
            <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-white/65">{p.summary}</p>
          </div>
          <div className="flex items-end gap-8">
            {p.spec && (
              <p className="text-white/50">
                <span className="block text-[34px] font-semibold leading-none tracking-[-0.04em] text-white">{p.spec.rows.length}</span>
                <span className="text-[12.5px]">스펙 모델</span>
              </p>
            )}
            <Link href={href("concept-b", `products/${p.category}/${p.slug}`)} className="link-arrow shrink-0 text-white">
              제품 상세 <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes stage{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
