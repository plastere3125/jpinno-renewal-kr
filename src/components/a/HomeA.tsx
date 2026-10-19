import Link from "next/link";
import { BUSINESSES } from "@/content/ko/business";
import { CATALOG_URL, COMPANY } from "@/content/ko/common";
import { CLIENT_GROUPS, HOME_CLIENTS } from "@/content/ko/company";
import { NEWS } from "@/content/ko/news";
import { CERTIFICATIONS, PROJECTS, projectMeta } from "@/content/ko/tech";
import { asset, href, img, type Concept } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/shared/Icons";
import { ButtonLink, NewsCard } from "@/components/shared/Widgets";
import BackgroundVideo from "@/components/shared/BackgroundVideo";
import { Channels } from "@/components/views/MiscViews";
import ProductRailA from "./ProductRailA";

/**
 * 시안 A — Brand Film (밝은 톤)
 * 큰 헤드라인 + 자동재생 브랜드 영상, 스크롤에 따라 겹쳐 올라오는 사업분야 카드,
 * 제품 가로 슬라이드. 화이트 바탕·원색 사진·네이비 포인트.
 */
const C: Concept = "concept-a";
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function Head({ en, title, lead, more }: { en: string; title: React.ReactNode; lead?: string; more?: { to: string; label: string } }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7" data-reveal>
        <p className="eyebrow">{en}</p>
        <h2 className="t-section mt-4 text-ink">{title}</h2>
      </div>
      <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-9" data-reveal style={d(120)}>
        {lead && <p className="t-lead">{lead}</p>}
        {more && (
          <Link href={more.to} className="link-arrow text-ink">
            {more.label}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function HomeA() {
  const patents = CERTIFICATIONS.filter((c) => c.id.startsWith("pt-")).length;
  const clients = CLIENT_GROUPS.reduce((n, g) => n + g.clients.length, 0);
  const stats = [
    { n: 5, u: "종", k: "ASME 인증", s: "U · U2 · U3 · S · PP" },
    { n: 3, u: "종", k: "ISO 경영인증", s: "9001 · 14001 · 45001" },
    { n: patents, u: "건", k: "특허", s: "인증 및 특허 게재 기준" },
    { n: clients, u: "곳", k: "주요 고객사", s: "주요 고객사 게재 기준" },
  ];
  const latest = [...NEWS.filter((n) => n.type === "news" || n.type === "newsletter").slice(0, 3), NEWS.find((n) => n.type === "video")!];

  return (
    <main id="main">
      {/* 01 대표 비주얼: 헤드라인 + 브랜드 영상 */}
      <section className="bg-white">
        <div className="wrap pt-12 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow" data-reveal>
                JP Innovation · Since 2008
              </p>
              <h1 className="t-display mt-6 text-[36px] text-ink sm:text-[52px] xl:text-[68px]" data-reveal style={d(80)}>
                제약 바이오 및 이차전지,
                <br />
                석유 정밀화학 <span className="text-navy">플랜트 전문기업</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3" data-reveal style={d(200)}>
              <p className="t-lead">엔지니어링설계, 장비제작, 시공 및 사후관리까지 EPC(Turn-Key) 사업을 수행합니다.</p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <ButtonLink to={href(C, "business/epc-engineering")}>사업분야</ButtonLink>
                <ButtonLink to={href(C, "support/inquiry")} variant="outline">
                  사업·제품 문의
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 px-4 sm:px-6 lg:mt-14 lg:px-10" data-reveal style={d(260)}>
          <div className="relative mx-auto aspect-[4/3] max-w-[1760px] overflow-hidden rounded-[8px] sm:aspect-[16/9] lg:aspect-[21/9]">
            <BackgroundVideo src={asset("video/brand-film-1920.mp4")} srcMobile={asset("video/brand-film-960.mp4")} poster={img("video/brand-film-poster.jpg")} label="JP이노베이션 브랜드 영상" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            <a
              href="https://www.youtube.com/watch?v=c_vkTfblDaE"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[13px] font-medium text-ink backdrop-blur-sm transition-colors hover:bg-white lg:bottom-6 lg:left-6"
            >
              소리와 함께 영상 보기 <ArrowUpRight className="size-3.5" />
              <span className="sr-only">(유튜브 새 창)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 회사 소개 문장 + 수치 */}
      <section className="wrap py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3" data-reveal>
            About
          </p>
          <div className="lg:col-span-9">
            <p className="text-[24px] font-medium leading-[1.55] tracking-[-0.03em] text-ink sm:text-[30px] lg:text-[40px]" data-reveal>
              우리는 끊임없는 연구와 축적된 경험을 바탕으로 <span className="text-navy">반응기, 여과기, 건조기, 믹서</span> 등 핵심 공정장비를 자체 기술로 설계·제작합니다.
            </p>
            <Link href={href(C, "company/overview")} className="link-arrow mt-10 text-ink" data-reveal>
              회사개요 <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
        <ul className="mt-20 grid grid-cols-2 border-t border-ink lg:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <li key={s.k} className={`border-b border-line py-8 lg:border-b-0 lg:py-10 ${i % 2 ? "pl-5" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""}`} data-reveal style={d(i * 90)}>
              <p className="text-[56px] font-semibold leading-none tracking-[-0.05em] text-ink lg:text-[80px]">
                <span data-count={s.n}>{s.n}</span>
                <span className="ml-1 text-[18px] font-medium tracking-normal text-navy lg:text-[22px]">{s.u}</span>
              </p>
              <p className="mt-5 text-[15px] font-medium text-ink">{s.k}</p>
              <p className="mt-1 text-[13px] text-muted">{s.s}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 02 사업분야: 스크롤 시 겹쳐 올라오는 카드 */}
      <section className="bg-mist pb-24 pt-24 lg:pb-36 lg:pt-32">
        <div className="wrap">
          <Head en="Business" title="공정의 모든 것을 한번에" lead="엔지니어링 및 PLANT 설계, 시공, 건설 수행까지 고객이 필요한 공정을 완성합니다." more={{ to: href(C, "business/epc-engineering"), label: "사업분야 전체" }} />
          <ol className="mt-14 lg:mt-20">
            {BUSINESSES.map((b, i) => (
              <li key={b.slug} className="sticky mb-6 lg:mb-10" style={{ top: `calc(var(--header-h) + 20px + ${i * 14}px)` }}>
                <Link href={href(C, `business/${b.slug}`)} className="group relative isolate flex min-h-[460px] overflow-hidden rounded-[8px] bg-deep text-white shadow-[0_-12px_40px_-20px_rgba(15,18,34,0.45)] lg:h-[min(68vh,600px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(b.visual)} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                  <span className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(15,18,34,0.88)_0%,rgba(15,18,34,0.55)_45%,rgba(15,18,34,0.05)_100%)]" />
                  <div className="flex w-full flex-col justify-between p-7 sm:p-10 lg:p-14">
                    <p className="flex items-center gap-3 text-[13px] text-white/60">
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")} / 06</span>
                      <span className="h-px w-8 bg-white/40" />
                      {b.nameEn}
                    </p>
                    <div className="max-w-[640px]">
                      <h3 className="t-display text-[36px] lg:text-[60px]">{b.name}</h3>
                      <ul className="mt-6 space-y-1.5 text-[15px] leading-relaxed text-white/75 lg:text-[16px]">
                        {b.summary.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <span className="link-arrow mt-8 text-white">
                        자세히 보기 <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 대표 제품 */}
      <section className="overflow-hidden bg-[#eef0f4] py-24 lg:py-32">
        <div className="wrap">
          <Head en="Products" title={<>핵심 공정장비를 자체 기술로 <span className="whitespace-nowrap">설계·제작</span></>} more={{ to: href(C, "products/reactor"), label: "제품소개" }} />
        </div>
        <ProductRailA />
      </section>

      {/* 04 기술·수행실적 */}
      <section className="wrap py-24 lg:py-36">
        <Head
          en="Technology & Projects"
          title="현장에서 검증된 기술력"
          lead="ASME 인증과 ISO 경영시스템, 자체 특허를 바탕으로 설계·제작합니다."
          more={{ to: href(C, "tech/certifications"), label: `인증 및 특허 ${CERTIFICATIONS.length}건` }}
        />
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <dl className="border-t border-ink lg:col-span-5" data-reveal>
            {[
              ["ASME", "U · U2 · U3 · S · PP Certificate"],
              ["ISO", "9001 품질 · 14001 환경 · 45001 안전보건"],
              ["면허", "건설업(산업·환경설비공사업) · 특정설비제조"],
              ["확인서", "기술혁신·경영혁신 중소기업, 벤처기업, 뿌리기업, 소재·부품·장비 전문기업"],
              ["특허", `필터 리액터 외 ${patents - 1}건`],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[80px_1fr] gap-4 border-b border-line py-5">
                <dt className="text-[14px] font-semibold text-ink">{k}</dt>
                <dd className="text-[15px] text-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="grid grid-cols-3 gap-3 lg:col-span-6 lg:col-start-7 lg:gap-5">
            {["asme-u", "iso9001", "pt-filter-reactor"].map((id, i) => {
              const c = CERTIFICATIONS.find((x) => x.id === id)!;
              return (
                <li key={id} data-reveal style={d(i * 100)}>
                  <Link href={href(C, "tech/certifications")} className="group block rounded-[6px] bg-mist p-3 lg:p-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(c.image)} alt={c.name} loading="lazy" className="aspect-[340/479] w-full bg-white object-contain shadow-[0_14px_30px_-16px_rgba(15,18,34,0.4)] transition-transform duration-500 group-hover:-translate-y-1.5" />
                  </Link>
                  <p className="mt-3 text-[13px] leading-snug text-muted">{c.name}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-28 flex items-end justify-between gap-4 border-b border-line pb-5" data-reveal>
          <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-ink lg:text-[26px]">주요 수행실적</h3>
          <Link href={href(C, "tech/projects")} className="link-arrow text-ink">
            전체 {PROJECTS.length}건 <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-5">
          {PROJECTS.slice(0, 4).map((p, i) => (
            <li key={p.id} data-reveal style={d(i * 90)}>
              <Link href={href(C, `tech/projects/${p.id}`)} className="group block">
                <div className="overflow-hidden rounded-[6px] bg-mist">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p.image)} alt="" loading="lazy" className="aspect-[449/287] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                </div>
                <p className="mt-4 text-[15.5px] font-medium text-ink transition-colors group-hover:text-navy">{p.name}</p>
                <p className="mt-1 text-[13px] text-muted">{projectMeta(p)}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-28" data-reveal>
          <div className="flex items-end justify-between gap-4">
            <p className="text-[15px] text-muted">JP이노베이션은 다양한 파트너사들과 함께 합니다.</p>
            <Link href={href(C, "company/clients")} className="link-arrow shrink-0 text-ink">
              주요 고객사 <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-3 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-6">
            {HOME_CLIENTS.map((c) => (
              <li key={c.logo} className="flex h-20 items-center justify-center border-b border-r border-line px-4 lg:h-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(c.logo)} alt={c.name} width={240} height={100} loading="lazy" className="max-h-[56%] w-auto opacity-75 transition-opacity hover:opacity-100" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 홍보센터 */}
      <section className="bg-mist">
        <div className="wrap py-24 lg:py-32">
          <Head en="Newsroom" title="홍보센터" more={{ to: href(C, "news"), label: "소식 전체" }} />
          <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {latest.map((n, i) => (
              <li key={n.id} data-reveal style={d(i * 90)}>
                <NewsCard concept={C} n={n} />
              </li>
            ))}
          </ul>
          <div className="mt-16" data-reveal>
            <Channels concept={C} />
          </div>
        </div>
      </section>

      {/* 06 문의·자료 */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img("equipment/greeting-fixed-img.jpg")} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-25 mix-blend-luminosity" />
        <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow !text-white/60">Contact</p>
            <h2 className="t-section mt-4">
              JP이노베이션에 대해 궁금한 사항이
              <br className="hidden sm:block" /> 있으시다면 문의해 주세요.
            </h2>
            <p className="mt-6 text-[15px] text-white/70">
              T. {COMPANY.sites[0].tel} · {COMPANY.email}
            </p>
          </div>
          <ul className="border-t border-white/30 lg:col-span-5 lg:col-start-8" data-reveal style={d(120)}>
            {[
              { to: href(C, "support/inquiry"), t: "사업·제품 문의", s: "엔지니어링 · 장비 · 건설" },
              { to: CATALOG_URL, t: "e-카탈로그", s: "제품 카탈로그 보기", ext: true },
              { to: href(C, "support/contact"), t: "담당 연락처", s: "본사 · 동탄연구소" },
            ].map((x) => {
              const inner = (
                <>
                  <span>
                    <span className="block text-[19px] font-medium">{x.t}</span>
                    <span className="mt-1 block text-[13px] text-white/60">{x.s}</span>
                  </span>
                  {x.ext ? (
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  ) : (
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </>
              );
              const cls = "group flex items-center justify-between border-b border-white/30 py-6";
              return (
                <li key={x.t}>
                  {x.ext ? (
                    <a href={x.to} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                      <span className="sr-only">(새 창)</span>
                    </a>
                  ) : (
                    <Link href={x.to} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
