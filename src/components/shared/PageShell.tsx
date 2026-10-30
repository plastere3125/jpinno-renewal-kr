import Link from "next/link";
import { NAV } from "@/content/ko/common";
import { href, img, type Concept } from "@/lib/site";
import { ChevronRight } from "./Icons";

const SECTION_EN: Record<string, string> = {
  company: "Company",
  business: "Business",
  products: "Products",
  tech: "Technology & Projects",
  news: "Newsroom",
  support: "Support",
  privacy: "Privacy",
  sitemap: "Sitemap",
};

/** 기존 사이트 섹션 슬로건(원문) */
const SECTION_SLOGAN: Record<string, string> = {
  company: "산업의 심장을 설계합니다.",
  business: "정밀함으로 완성하는 산업 솔루션.",
  products: "산업의 심장을 움직이는 기술.",
};

const SECTION_VISUAL: Record<string, string> = {
  company: "equipment/greeting-fixed-img.jpg",
  products: "visual/real-plant.jpg",
  tech: "visual/real-epc.jpg",
  news: "visual/real-office.jpg",
  support: "visual/real-lab-entrance.jpg",
  privacy: "visual/real-lab-entrance.jpg",
  sitemap: "visual/real-lab-entrance.jpg",
};

type Props = {
  concept: Concept;
  section: string;
  /** 현재 하위 메뉴 key (탭 활성) */
  current?: string;
  title: string;
  /** 탭/브레드크럼에 없는 하위 단계(상세 등) */
  trail?: { label: string; path?: string }[];
  lead?: string;
  visual?: string;
  children: React.ReactNode;
};

export default function PageShell({ concept, section, current, title, trail = [], lead, visual, children }: Props) {
  const menu = NAV.find((m) => m.key === section);
  const tabs = menu?.children && menu.children.length > 1 ? menu.children : [];
  const crumbs = [
    { label: "홈", path: "" },
    ...(menu ? [{ label: menu.label, path: menu.path }] : []),
    ...(menu && current && tabs.length ? [{ label: tabs.find((t) => t.key === current)?.label ?? "", path: tabs.find((t) => t.key === current)?.path }] : []),
    ...trail,
  ];
  const en = SECTION_EN[section] ?? "";

  const renderCrumbs = (dark?: boolean) => (
    <nav aria-label="현재 위치" className={`text-[13px] ${dark ? "text-white/60" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3 opacity-60" />}
            {i < crumbs.length - 1 && c.path !== undefined ? (
              <Link href={href(concept, c.path)} className={dark ? "hover:text-white" : "hover:text-navy"}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === crumbs.length - 1 ? "page" : undefined} className={dark ? "text-white/90" : "text-ink"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  const renderTabs = (dark?: boolean) =>
    tabs.length ? (
      <nav aria-label={`${menu!.label} 하위 메뉴`} className={dark ? "border-b border-white/10 bg-deep" : "bg-white"}>
        <ul className={`wrap no-scrollbar flex gap-7 overflow-x-auto lg:gap-10 ${dark ? "" : "border-b border-line"}`}>
          {tabs.map((t) => {
            const on = t.key === current;
            return (
              <li key={t.key} className="shrink-0">
                <Link
                  href={href(concept, t.path)}
                  aria-current={on ? "page" : undefined}
                  className={
                    dark
                      ? `relative flex h-14 items-center text-[14.5px] transition-colors ${on ? "font-medium text-white" : "text-white/45 hover:text-white"}`
                      : `relative flex h-14 items-center text-[14.5px] transition-colors ${on ? "font-medium text-ink" : "text-muted hover:text-ink"}`
                  }
                >
                  {t.label}
                  {on && <span className={`absolute inset-x-0 bottom-0 h-[2px] ${dark ? "bg-sky" : "bg-navy"}`} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    ) : null;

  const v = visual ?? SECTION_VISUAL[section] ?? "visual/real-lab-entrance.jpg";
  const slogan = lead ?? SECTION_SLOGAN[section];

  if (concept === "concept-b") {
    return (
      <>
        <section className="relative isolate overflow-hidden bg-deep text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(v)} alt="" className="absolute inset-0 -z-10 size-full scale-[1.02] object-cover opacity-75" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,17,36,0.92)_0%,rgba(13,17,36,0.6)_50%,rgba(13,17,36,0.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-deep to-transparent" />
          <div className="wrap flex min-h-[420px] flex-col justify-end pb-14 pt-[calc(var(--header-h)+48px)] lg:min-h-[560px] lg:pb-20">
            {renderCrumbs(true)}
            <p className="eyebrow mt-10" data-reveal>
              {en}
            </p>
            <h1 className="t-display mt-4 text-[40px] lg:text-[68px]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              {title}
            </h1>
            {slogan && (
              <p className="mt-5 max-w-[680px] text-[17px] leading-relaxed text-white/75 lg:text-[20px]" data-reveal style={{ ["--d" as string]: "160ms" }}>
                {slogan}
              </p>
            )}
          </div>
        </section>
        {renderTabs(true)}
        <main id="main">{children}</main>
      </>
    );
  }

  return (
    <>
      <section className="bg-white">
        <div className="wrap pt-8 lg:pt-10">
          {renderCrumbs()}
          {/* 카탈로그(260323) 제품·사업 페이지의 파란 세로 패널 + 큰 흰 제목을 웹 상단에 적용. 사진은 원색 그대로 */}
          <div className="mt-6 grid overflow-hidden rounded-[6px] lg:mt-8 lg:min-h-[440px] lg:grid-cols-[minmax(340px,36%)_1fr]">
            <div className="relative flex flex-col justify-between gap-10 bg-sky p-7 text-white sm:p-10 lg:p-12">
              <h1 className="text-[38px] font-bold leading-[1.15] tracking-[-0.04em] [word-break:keep-all] lg:text-[54px]" data-reveal>
                {title}
              </h1>
              {slogan && (
                <p className="max-w-[420px] text-[15.5px] leading-relaxed text-white/90 lg:text-[17px]" data-reveal style={{ ["--d" as string]: "120ms" }}>
                  {slogan}
                </p>
              )}
            </div>
            <div className="relative aspect-[16/9] bg-mist lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(v)} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {renderTabs()}
      <main id="main">{children}</main>
    </>
  );
}

/** 섹션 제목 (시안별 톤은 data-concept 토큰으로) */
export function SectionTitle({ eyebrow, title, desc, center }: { eyebrow?: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}>
      {eyebrow && <p className="eyebrow sub-eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-[24px] font-semibold leading-snug tracking-[-0.03em] text-[var(--c-heading)] lg:text-[32px]">{title}</h2>
      {desc && <p className="t-lead mt-4">{desc}</p>}
    </div>
  );
}
