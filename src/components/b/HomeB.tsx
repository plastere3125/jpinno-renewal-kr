import Link from "next/link";
import { CATALOG_URL, COMPANY } from "@/content/ko/common";
import { CLIENT_GROUPS, HOME_CLIENTS } from "@/content/ko/company";
import { COMPANY_VIDEO, NEWS } from "@/content/ko/news";
import { CERTIFICATIONS, PROJECTS } from "@/content/ko/tech";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";
import { ButtonLink, NewsCard } from "@/components/shared/Widgets";
import YouTubeFacade from "@/components/shared/YouTubeFacade";
import { Channels } from "@/components/views/MiscViews";
import HeroB from "./HeroB";
import EpcTimelineB from "./EpcTimelineB";
import ProductTabsB from "./ProductTabsB";

/**
 * 시안 B — Industry Panorama (어두운 톤)
 * 사업분야 6개 확장 패널로 시작, EPC 인터랙티브 타임라인, 무대형 제품 쇼케이스,
 * 대형 회사소개 영상. 딥 네이비 바탕·원색 사진·스카이블루 포인트.
 */
const C: Concept = "concept-b";
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function Head({ en, title, light, more }: { en: string; title: string; light?: boolean; more?: { to: string; label: string } }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
      <div>
        <p className="eyebrow">{en}</p>
        <h2 className={`t-section mt-4 ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      </div>
      {more && (
        <Link href={more.to} className={`link-arrow shrink-0 ${light ? "text-white" : "text-ink"}`}>
          {more.label}
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}

export default function HomeB() {
  const clients = CLIENT_GROUPS.reduce((n, g) => n + g.clients.length, 0);
  const patents = CERTIFICATIONS.filter((c) => c.id.startsWith("pt-")).length;
  const stats = [
    { n: 5, u: "종", k: "ASME 인증", s: "U · U2 · U3 · S · PP" },
    { n: 3, u: "종", k: "ISO 경영인증", s: "9001 · 14001 · 45001" },
    { n: patents, u: "건", k: "특허", s: "인증 및 특허 게재 기준" },
    { n: clients, u: "곳", k: "주요 고객사", s: "주요 고객사 게재 기준" },
  ];
  const latest = NEWS.slice(0, 4);

  return (
    <main id="main">
      {/* 01 대표 비주얼: 사업분야 6 패널 */}
      <HeroB />

      {/* 02 EPC 수행 단계 */}
      <section className="bg-deep-2 text-white">
        <div className="wrap py-24 lg:py-32">
          <Head en="EPC Turn-Key Process" title="Global Standard Project 수행절차" light more={{ to: href(C, "business/epc-engineering"), label: "EPC 엔지니어링" }} />
          <EpcTimelineB />
        </div>
      </section>

      {/* 03 대표 제품 */}
      <section className="bg-deep text-white">
        <div className="wrap py-24 lg:py-32">
          <Head en="Products" title="핵심 공정장비" light more={{ to: href(C, "products/reactor"), label: "제품소개" }} />
          <ProductTabsB />
        </div>
      </section>

      {/* 회사소개 영상 */}
      <section className="bg-deep text-white">
        <div className="mx-auto max-w-[1760px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32" data-reveal>
          <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:items-end">
            <h2 className="t-section lg:col-span-7">{COMPANY_VIDEO.title}</h2>
            <p className="text-[15px] text-white/55 lg:col-span-4 lg:col-start-9">공식 유튜브 채널 게시 영상입니다. 재생 버튼을 누르면 시작됩니다.</p>
          </div>
          <YouTubeFacade id={COMPANY_VIDEO.id} title={COMPANY_VIDEO.title} poster={img("video/company-film.jpg")} />
        </div>
      </section>

      {/* 04 기술·수행실적 */}
      <section className="border-t border-white/10 bg-deep text-white">
        <div className="wrap py-24 lg:py-32">
          <Head en="Technology & Projects" title="기술·실적" light more={{ to: href(C, "tech/certifications"), label: "인증 및 특허" }} />
          <ul className="mt-14 grid grid-cols-2 border-t border-white/15 lg:mt-20 lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.k} className={`border-b border-white/15 py-8 lg:border-b-0 lg:py-10 ${i % 2 ? "border-l pl-5" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""}`} data-reveal style={d(i * 90)}>
                <p className="text-[56px] font-semibold leading-none tracking-[-0.05em] lg:text-[88px]">
                  <span data-count={s.n}>{s.n}</span>
                  <span className="ml-1.5 text-[18px] font-medium tracking-normal text-sky lg:text-[22px]">{s.u}</span>
                </p>
                <p className="mt-5 text-[15px] font-medium">{s.k}</p>
                <p className="mt-1 text-[13px] text-white/45">{s.s}</p>
              </li>
            ))}
          </ul>

          <div className="mt-24 flex items-end justify-between gap-4" data-reveal>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em] lg:text-[26px]">주요 수행실적</h3>
            <Link href={href(C, "tech/projects")} className="link-arrow shrink-0 text-white">
              전체 {PROJECTS.length}건 <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <ul className="no-scrollbar -mx-4 mt-8 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-10 lg:scroll-px-10 lg:px-10">
            {PROJECTS.map((p) => (
              <li key={p.id} className="w-[74vw] max-w-[380px] shrink-0 snap-start">
                <Link href={href(C, `tech/projects/${p.id}`)} className="group block">
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.image)} alt="" loading="lazy" className="aspect-[449/287] w-full object-cover opacity-90 transition-[transform,opacity] duration-700 group-hover:scale-[1.05] group-hover:opacity-100" />
                  </div>
                  <p className="mt-4 text-[15px] font-medium text-white/85 transition-colors group-hover:text-sky">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 고객사 */}
      <section className="bg-white">
        <div className="wrap py-16 lg:py-20" data-reveal>
          <div className="flex items-end justify-between gap-4">
            <p className="text-[15px] text-muted">JP이노베이션은 다양한 파트너사들과 함께 합니다.</p>
            <Link href={href(C, "company/clients")} className="link-arrow shrink-0 text-ink">
              주요 고객사 <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {HOME_CLIENTS.map((c) => (
              <li key={c.logo} className="flex h-12 items-center justify-center lg:h-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(c.logo)} alt={c.name} width={240} height={100} loading="lazy" className="max-h-full w-auto opacity-70 transition-opacity hover:opacity-100" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 홍보센터 */}
      <section className="bg-deep-2 text-white">
        <div className="wrap py-24 lg:py-32">
          <Head en="Newsroom" title="홍보센터" light more={{ to: href(C, "news"), label: "소식 전체" }} />
          <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {latest.map((n, i) => (
              <li key={n.id} data-reveal style={d(i * 90)}>
                <NewsCard concept={C} n={n} dark />
              </li>
            ))}
          </ul>
          <div className="mt-16" data-reveal>
            <Channels concept={C} />
          </div>
        </div>
      </section>

      {/* 06 문의·자료 */}
      <section className="relative isolate overflow-hidden bg-deep text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img("equipment/greeting-fixed-img.jpg")} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/85 to-deep/30" />
        <div className="wrap py-28 lg:py-40" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="t-display mt-5 max-w-[860px] text-[32px] lg:text-[54px]">JP이노베이션에 대해 궁금한 사항이 있으시다면 문의해 주세요.</h2>
          <p className="mt-6 text-[15px] text-white/65">
            T. {COMPANY.sites[0].tel} · F. {COMPANY.sites[0].fax} · {COMPANY.email}
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <ButtonLink to={href(C, "support/inquiry")} variant="light">
              사업·제품 문의
            </ButtonLink>
            <ButtonLink to={CATALOG_URL} variant="ghost-light" external>
              e-카탈로그
            </ButtonLink>
            <ButtonLink to={href(C, "support/contact")} variant="ghost-light">
              담당 연락처
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
