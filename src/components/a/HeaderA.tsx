"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { NAV } from "@/content/ko/common";
import { href, type Concept } from "@/lib/site";
import Logo from "@/components/shared/Logo";
import { ChevronDown, CloseIcon, MenuIcon } from "@/components/shared/Icons";
import { isActivePath, useMenuState } from "@/components/shared/useMenuState";

const C: Concept = "concept-a";

export default function HeaderA() {
  const pathname = usePathname();
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeDrawer = useCallback(() => setDrawer(false), []);
  useMenuState(drawer, closeDrawer);
  const navRef = useRef<HTMLDivElement>(null);
  const sectionKey = pathname.split("/")[2] ?? "";

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div
        ref={navRef}
        onMouseLeave={() => setMega(false)}
        onBlur={(e) => {
          if (!navRef.current?.contains(e.relatedTarget as Node)) setMega(false);
        }}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={href(C)} className="shrink-0" aria-label="JP이노베이션 홈">
            <Logo />
          </Link>

          <nav aria-label="주 메뉴" className="hidden h-full lg:block">
            <ul className="flex h-full">
              {NAV.map((m) => {
                const active = sectionKey === m.key;
                return (
                  <li key={m.key} className="h-full">
                    <Link
                      href={href(C, m.path)}
                      onMouseEnter={() => setMega(true)}
                      onFocus={() => setMega(true)}
                      aria-current={active ? "true" : undefined}
                      className={`relative flex h-full w-[112px] items-center justify-center text-[15.5px] font-medium tracking-[-0.01em] transition-colors xl:w-[128px] ${
                        active ? "text-ink" : "text-ink/70 hover:text-ink"
                      }`}
                    >
                      {m.label}
                      <span className={`absolute inset-x-7 bottom-0 h-[2px] bg-navy transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={href(C, "support/inquiry")}
              className="hidden h-10 items-center rounded-[2px] border border-ink/15 px-4 text-[13.5px] font-medium text-ink transition-colors hover:border-ink lg:inline-flex"
            >
              사업·제품 문의
            </Link>
            <button
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
              aria-label="전체 메뉴 열기"
              aria-expanded={drawer}
              aria-controls="drawer-a"
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* PC 메가 메뉴: 전 메뉴를 한 번에 펼침 */}
        <div
          className={`absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_18px_30px_-20px_rgba(20,23,43,0.25)] transition-[opacity,visibility] duration-150 lg:block ${
            mega ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="wrap flex justify-between gap-6">
            <div className="w-[212px] shrink-0 py-8">
              <p className="eyebrow">Precision &amp; Trust</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">정밀한 기술,
                <br />
                신뢰할 수 있는 파트너</p>
            </div>
            <ul className="flex">
              {NAV.map((m) => (
                <li key={m.key} className="w-[112px] py-8 xl:w-[128px]">
                  <ul className="space-y-1">
                    {(m.children ?? []).map((c) => (
                      <li key={c.key}>
                        <Link
                          href={href(C, c.path)}
                          onClick={() => setMega(false)}
                          className={`block px-2 py-1.5 text-center text-[14px] transition-colors hover:text-ink ${
                            isActivePath(pathname, C, c.path) ? "font-medium text-navy" : "text-muted"
                          }`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className="hidden w-[150px] shrink-0 xl:block" />
          </div>
        </div>
      </div>
    </header>

      {/* 모바일 드로어 (header 밖에 둠: fixed 기준 박스 문제 방지) */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawer ? "" : "pointer-events-none"}`} aria-hidden={!drawer}>
        <div className={`absolute inset-0 bg-ink/40 transition-opacity ${drawer ? "opacity-100" : "opacity-0"}`} onClick={closeDrawer} />
        <div
          id="drawer-a"
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white transition-transform duration-200 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-4">
            <Logo className="h-8 w-auto" />
            <button type="button" className="-mr-2 inline-flex size-11 items-center justify-center" aria-label="전체 메뉴 닫기" onClick={closeDrawer} tabIndex={drawer ? 0 : -1}>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="모바일 메뉴" className="flex-1 overflow-y-auto">
            <ul>
              {NAV.map((m) => {
                const single = (m.children?.length ?? 0) <= 1;
                const open = openKey === m.key;
                return (
                  <li key={m.key} className="border-b border-line">
                    {single ? (
                      <Link href={href(C, m.path)} onClick={closeDrawer} tabIndex={drawer ? 0 : -1} className="flex h-14 items-center px-5 text-[17px] font-medium">
                        {m.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="flex h-14 w-full items-center justify-between px-5 text-left text-[17px] font-medium"
                          aria-expanded={open}
                          tabIndex={drawer ? 0 : -1}
                          onClick={() => setOpenKey(open ? null : m.key)}
                        >
                          {m.label}
                          <ChevronDown className={`size-5 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        <ul className={`bg-mist px-5 py-2 ${open ? "block" : "hidden"}`}>
                          {m.children!.map((c) => (
                            <li key={c.key}>
                              <Link
                                href={href(C, c.path)}
                                onClick={closeDrawer}
                                className={`block py-2.5 text-[15px] ${isActivePath(pathname, C, c.path) ? "font-semibold text-navy" : "text-muted"}`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="shrink-0 border-t border-line p-4">
            <Link href={href(C, "support/inquiry")} onClick={closeDrawer} tabIndex={drawer ? 0 : -1} className="flex h-12 items-center justify-center rounded-[2px] bg-navy text-[15px] font-medium text-white">
              사업·제품 문의
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
