"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CHANNELS, COMPANY, NAV } from "@/content/ko/common";
import { href, type Concept } from "@/lib/site";
import Logo from "@/components/shared/Logo";
import { ArrowUpRight, CloseIcon, MenuIcon } from "@/components/shared/Icons";
import { isActivePath, useMenuState } from "@/components/shared/useMenuState";

const C: Concept = "concept-b";

export default function HeaderB() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const close = useCallback(() => setOverlay(false), []);
  useMenuState(overlay, close);
  const sectionKey = pathname.split("/")[2] ?? "";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const solid = scrolled || drop !== null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${solid ? "bg-deep/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md" : "bg-transparent"}`}
        onMouseLeave={() => setDrop(null)}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={href(C)} className="shrink-0" aria-label="JP이노베이션 홈">
            <Logo variant="white" />
          </Link>

          <nav aria-label="주 메뉴" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1 xl:gap-3">
              {NAV.map((m) => {
                const active = sectionKey === m.key;
                const hasDrop = (m.children?.length ?? 0) > 1;
                return (
                  <li
                    key={m.key}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => setDrop(hasDrop ? m.key : null)}
                    onFocus={() => setDrop(hasDrop ? m.key : null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setDrop(null);
                    }}
                  >
                    <Link
                      href={href(C, m.path)}
                      aria-current={active ? "true" : undefined}
                      className={`flex h-full items-center px-3 text-[15px] font-medium transition-colors xl:px-4 ${active ? "text-white" : "text-white/65 hover:text-white"}`}
                    >
                      <span className={active ? "border-b-2 border-sky pb-1" : "border-b-2 border-transparent pb-1"}>{m.label}</span>
                    </Link>
                    {hasDrop && (
                      <div
                        className={`absolute left-1/2 top-full w-[200px] -translate-x-1/2 border-t-2 border-sky bg-deep-2 py-3 shadow-xl transition-[opacity,visibility] duration-150 ${
                          drop === m.key ? "visible opacity-100" : "invisible opacity-0"
                        }`}
                      >
                        <ul>
                          {m.children!.map((c) => (
                            <li key={c.key}>
                              <Link
                                href={href(C, c.path)}
                                onClick={() => setDrop(null)}
                                className={`block px-5 py-2 text-[14.5px] transition-colors hover:bg-white/5 hover:text-white ${
                                  isActivePath(pathname, C, c.path) ? "text-sky" : "text-white/70"
                                }`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOverlay(true)}
            aria-label="전체 메뉴 열기"
            aria-expanded={overlay}
            aria-controls="overlay-b"
            className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-white lg:mr-0"
          >
            <span className="hidden text-[13px] font-semibold tracking-[0.14em] lg:inline">MENU</span>
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* 전체 메뉴 오버레이 (PC 전체메뉴 + 모바일 메뉴) */}
      <div
        id="overlay-b"
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
        aria-hidden={!overlay}
        className={`fixed inset-0 z-[60] overflow-y-auto bg-deep text-white transition-[opacity,visibility] duration-200 ${overlay ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between">
          <Logo variant="white" />
          <button type="button" onClick={close} aria-label="전체 메뉴 닫기" tabIndex={overlay ? 0 : -1} className="-mr-2 inline-flex h-11 items-center gap-2 px-2">
            <span className="hidden text-[13px] font-semibold tracking-[0.14em] lg:inline">CLOSE</span>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="전체 메뉴 목록" className="wrap pb-16 pt-6 lg:pt-16">
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
            {NAV.map((m, i) => (
              <li key={m.key} className="border-t border-white/15 pt-4">
                <span className="text-[12px] tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <Link href={href(C, m.path)} onClick={close} tabIndex={overlay ? 0 : -1} className="mt-2 block text-[24px] font-semibold tracking-[-0.03em] lg:text-[28px]">
                  {m.label}
                </Link>
                {(m.children?.length ?? 0) > 1 && (
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 lg:block lg:space-y-1.5">
                    {m.children!.map((c) => (
                      <li key={c.key}>
                        <Link
                          href={href(C, c.path)}
                          onClick={close}
                          tabIndex={overlay ? 0 : -1}
                          className={`inline-block py-1 text-[15px] transition-colors hover:text-white ${isActivePath(pathname, C, c.path) ? "text-sky" : "text-white/65"}`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 text-[14px] text-white/60 lg:flex-row lg:items-center lg:justify-between">
            <p>
              {COMPANY.sites[0].fullName} · T. {COMPANY.sites[0].tel} · {COMPANY.email}
            </p>
            <ul className="flex flex-wrap gap-5">
              {CHANNELS.map((ch) => (
                <li key={ch.key}>
                  <a href={ch.url} target="_blank" rel="noopener noreferrer" tabIndex={overlay ? 0 : -1} className="inline-flex items-center gap-1 hover:text-white">
                    {ch.label}
                    <ArrowUpRight className="size-3.5" />
                    <span className="sr-only">(새 창)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
