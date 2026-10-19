"use client";

import Link from "next/link";
import { useState } from "react";
import { BUSINESSES } from "@/content/ko/business";
import { href, img } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";

/**
 * 시안 B 대표 비주얼: 사업분야 6개 세로 패널.
 * PC: 마우스/포커스한 패널이 넓어지며 요약 노출. 모바일: 2열 타일.
 */
export default function HeroB() {
  const [active, setActive] = useState(0);
  return (
    <section aria-label="사업분야" className="relative flex min-h-[760px] flex-col bg-deep text-white lg:h-svh lg:max-h-[1080px] lg:min-h-[760px]">
      <div className="wrap pb-10 pt-[calc(var(--header-h)+44px)] lg:pb-12 lg:pt-[calc(var(--header-h)+56px)]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h1 className="t-display text-[34px] sm:text-[48px] lg:col-span-8 xl:text-[60px]" data-reveal>
            제약 바이오 및 이차전지,
            <br />
            석유 정밀화학 <span className="text-sky">플랜트 전문기업</span>
          </h1>
          <p className="text-[15.5px] leading-relaxed text-white/60 lg:col-span-4 lg:pb-2" data-reveal style={{ ["--d" as string]: "120ms" }}>
            EPC (Turn-Key방식) 사업수행 — 엔지니어링설계, 장비제작, 시공 및 사후관리
          </p>
        </div>
      </div>

      {/* PC 패널 */}
      <ul className="hidden flex-1 gap-[2px] px-[2px] pb-[2px] lg:flex" onMouseLeave={() => setActive(active)}>
        {BUSINESSES.map((b, i) => {
          const on = i === active;
          return (
            <li
              key={b.slug}
              className="relative min-w-0 overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              style={{ flexGrow: on ? 3.2 : 1, flexBasis: 0 }}
              onMouseEnter={() => setActive(i)}
            >
              <Link href={href("concept-b", `business/${b.slug}`)} onFocus={() => setActive(i)} className="group absolute inset-0 block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(b.portrait)}
                  alt=""
                  className={`absolute inset-0 size-full object-cover transition-[transform,opacity] duration-700 ${on ? "scale-100 opacity-100" : "scale-[1.08] opacity-70"}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-deep/10" />
                <span className="absolute inset-x-0 bottom-0 p-6 xl:p-8">
                  <span className="block text-[12.5px] tabular-nums text-white/55">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-2 block text-[19px] font-semibold leading-tight tracking-[-0.03em] xl:text-[24px]">{b.name}</span>
                  <span className={`grid transition-[grid-template-rows,opacity] duration-700 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden">
                      <span className="mt-3 block max-w-[420px] text-[14.5px] leading-relaxed text-white/75">{b.summary[0]}</span>
                      <span className="link-arrow mt-5 text-white">
                        자세히 보기 <ArrowRight className="size-3.5" />
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 모바일 타일 */}
      <ul className="grid grid-cols-2 gap-[2px] px-[2px] pb-[2px] lg:hidden">
        {BUSINESSES.map((b, i) => (
          <li key={b.slug} className="relative aspect-[4/5] overflow-hidden">
            <Link href={href("concept-b", `business/${b.slug}`)} className="absolute inset-0 block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(b.portrait)} alt="" className="absolute inset-0 size-full object-cover opacity-80" />
              <span className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block text-[11.5px] tabular-nums text-white/55">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 block text-[17px] font-semibold">{b.name}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
