import Link from "next/link";
import { CHANNELS, COMPANY, NAV, UTIL_NAV } from "@/content/ko/common";
import { href, type Concept } from "@/lib/site";
import Logo from "./Logo";
import { ArrowUpRight } from "./Icons";

export default function Footer({ concept }: { concept: Concept }) {
  const dark = concept === "concept-b";
  const t = dark
    ? { bg: "bg-deep text-white/65", head: "text-white", line: "border-white/12", link: "hover:text-white", strong: "text-white" }
    : { bg: "bg-mist text-muted", head: "text-ink", line: "border-line", link: "hover:text-navy", strong: "text-ink" };

  return (
    <footer className={`${t.bg} text-[14px]`}>
      <div className="wrap py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-[420px]">
            <Logo variant={dark ? "white" : "color"} className="h-8 w-auto" />
            <ul className="mt-8 flex gap-6 text-[13.5px]">
              {CHANNELS.map((ch) => (
                <li key={ch.key}>
                  <a href={ch.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${t.link}`}>
                    {ch.short}
                    <ArrowUpRight className="size-3" />
                    <span className="sr-only">{ch.label} (새 창)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="푸터 메뉴" className="hidden lg:block">
            <ul className="grid grid-cols-6 gap-8">
              {NAV.map((m) => (
                <li key={m.key} className="min-w-[96px]">
                  <Link href={href(concept, m.path)} className={`font-medium ${t.head} ${t.link}`}>
                    {m.label}
                  </Link>
                  {(m.children?.length ?? 0) > 1 && (
                    <ul className="mt-3 space-y-1.5 text-[13.5px]">
                      {m.children!.map((c) => (
                        <li key={c.key}>
                          <Link href={href(concept, c.path)} className={t.link}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={`mt-12 grid gap-6 border-t pt-8 md:grid-cols-2 ${t.line}`}>
          {COMPANY.sites.map((s) => (
            <address key={s.key} className="not-italic leading-[1.8]">
              <strong className={`block font-semibold ${t.strong}`}>{s.fullName}</strong>
              {s.address}
              <br />
              T. <a href={`tel:${s.tel}`} className={t.link}>{s.tel}</a> · F. {s.fax}
            </address>
          ))}
        </div>

        <div className={`mt-8 flex flex-col gap-4 border-t pt-6 text-[13px] md:flex-row md:items-center md:justify-between ${t.line}`}>
          <p className="leading-relaxed">
            {COMPANY.name} · 대표이사 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo} · E-mail{" "}
            <a href={`mailto:${COMPANY.email}`} className={t.link}>{COMPANY.email}</a>
            <br />© COPYRIGHT JP INNOVATION. ALL RIGHTS RESERVED.
          </p>
          <ul className="flex shrink-0 gap-5">
            {UTIL_NAV.map((u) => (
              <li key={u.key}>
                <Link href={href(concept, u.path)} className={`${u.key === "privacy" ? `font-semibold ${t.strong}` : ""} ${t.link}`}>
                  {u.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className={`inline-flex items-center gap-1 ${t.link}`}>
                시안 선택
                <ArrowUpRight className="size-3.5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
