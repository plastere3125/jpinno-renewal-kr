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
import DesignOne from "./home/DesignOne";
import DesignTwo from "./home/DesignTwo";
import DesignThree from "./home/DesignThree";
import DesignFour from "./home/DesignFour";
import DesignFive from "./home/DesignFive";

/**
 * 시안 A — Brand Film (밝은 톤)
 * 큰 헤드라인 + 자동재생 브랜드 영상, 스크롤에 따라 겹쳐 올라오는 사업분야 카드,
 * 제품 가로 슬라이드. 화이트 바탕·원색 사진·네이비 포인트.
 */
const C: Concept = "concept-a";
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function Head({ en, title, lead, more }: { en: string; title: React.ReactNode; lead?: React.ReactNode; more?: { to: string; label: string } }) {
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
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * design: 2026-11-12 메인 디자인 내부 시안 비교용(1안 /concept-a/design-1/, 2안 /design-2/, 3안 /design-3/).
 * 없으면 현재 메인. 1안은 대표 비주얼·회사소개를, 2안은 대표 비주얼~대표 제품을,
 * 3안은 대표 비주얼·회사소개·대표 제품을 시안 구성(첫 화면·공정 흐름·공정장비)으로 바꾼다.
 * 4안(/design-4/)은 대표 비주얼·회사소개·대표 제품을 현장→수행실적→공정장비로 바꾸고, 04에서 수행실적 카드는 뺀다.
 * 5안(/design-5/)은 4안 흐름에 상단 구도(네이비 면+사진 비대칭 오프닝, 바로 이어지는 대표 실적)만 바꾼 안.
 */
export default function HomeA({ design }: { design?: 1 | 2 | 3 | 4 | 5 }) {
  const patents = CERTIFICATIONS.filter((c) => c.id.startsWith("pt-")).length;
  const clients = CLIENT_GROUPS.reduce((n, g) => n + g.clients.length, 0);
  const stats = [
    { n: 5, u: "종", k: "ASME 인증", s: "U, U2, U3, S, PP" },
    { n: 3, u: "종", k: "ISO 경영인증", s: "9001, 14001, 45001" },
    { n: patents, u: "건", k: "특허", s: "필터 리액터 외" },
    { n: clients, u: "곳", k: "주요 고객사", s: "바이오⁠·⁠제약, 이차전지, 화장품" },
  ];
  const latest = [...NEWS.filter((n) => n.type === "news" || n.type === "newsletter").slice(0, 3), NEWS.find((n) => n.type === "video")!];

  return (
    <main id="main">
      {design === 1 && <DesignOne />}
      {design === 2 && <DesignTwo />}
      {design === 3 && <DesignThree />}
      {design === 4 && <DesignFour />}
      {design === 5 && <DesignFive />}
      {!design && (
      <>
      {/* 01 대표 비주얼 — 2026-11-12 재설계
          클라이언트 회신(11-11): "상단 메뉴와 영상이 중간 카피로 나뉘어 임팩트가 없다"
          → 메뉴·카피·영상을 한 화면으로 묶는다. 카피 전용 띠 없음.
          - 영상: 브랜드 영상 중 반응기(원본 12.9초)~전자소재 클린룸(26.55초) 설비 구간만 반복(brand-loop-*.mp4).
            반응기 초점이 맞는 13.4초에서 시작하도록 순서만 돌림(13.4→26.55 + 12.9→13.4, 이음새는 원래 연속 프레임).
            첫 프레임·이음새에 자막과 전환 컷이 없고, 포스터는 첫 프레임과 같은 장면.
          - 브랜드 영상 자막은 화면 가로 37~66%·세로 47~67%에 박혀 있다
            → PC는 영상을 왼쪽 기준(object-left)으로 맞춰 자막을 오른쪽으로 보내고, 카피는 왼쪽에 둔다.
              카피 폭(제목 최대 10.7em×52px)은 1024~2560px 폭에서 자막 시작 위치보다 왼쪽에서 끝난다.
          - 위 배치는 화면 비율 16:10 이상(hero-wide, globals.css)에서만. 모바일·태블릿·4:3 화면은 영상(가운데 기준, 모바일은 세로 크롭본)이
            위쪽을 차지하고 아래로 어두워지며 카피로 이어진다. 21:9 초광폭은 카피를 화면 왼쪽 여백 기준(hero-ultra). */}
      <section id="hero-a" className="relative isolate flex h-svh min-h-[640px] flex-col justify-end overflow-hidden bg-deep text-white lg:min-h-[680px]">
        <div className="absolute inset-x-0 top-0 h-[68%] hero-wide:h-full">
          <BackgroundVideo
            src={asset("video/brand-loop-1920.mp4")}
            srcMobile={asset("video/brand-loop-m720.mp4")}
            poster={img("video/brand-loop-poster.jpg")}
            posterMobile={img("video/brand-loop-poster-m.jpg")}
            label="JP이노베이션 브랜드 영상(설비 장면)"
            videoClassName="object-center hero-wide:object-left"
            controlClassName="right-4 top-[calc(var(--header-h)+12px)] hero-wide:bottom-8 hero-wide:right-8 hero-wide:top-auto"
          />
          {/* 메뉴 가독성 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent lg:h-48 lg:from-black/60" />
          {/* 모바일: 영상 아래쪽이 카피 영역으로 끊김 없이 이어지게 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep via-deep/60 to-transparent hero-wide:hidden" />
          {/* PC: 카피가 있는 왼쪽만 어둡게(오른쪽 설비는 원래 밝기 유지) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[64%] bg-gradient-to-r from-black/70 via-black/35 to-transparent hero-wide:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-black/45 to-transparent hero-wide:block" />
        </div>

        <div className="wrap relative pb-10 sm:pb-14 hero-wide:pb-[clamp(56px,11vh,120px)] hero-ultra:max-w-none! hero-ultra:px-[5vw]!">
          <p className="eyebrow [--c-eyebrow:rgba(255,255,255,0.75)]">JP Innovation · Since 2008</p>
          <h1 className="t-display mt-4 text-[30px] sm:text-[42px] lg:mt-5 lg:text-[52px]">
            제약 바이오 및 이차전지,
            <br />
            석유 정밀화학
            <br />
            플랜트 전문기업
          </h1>
          <p className="mt-5 max-w-[30em] text-[15px] leading-relaxed text-white/80 sm:text-[17px] lg:mt-6">
            엔지니어링설계, 장비제작, 시공 및 사후관리까지 <span className="whitespace-nowrap">EPC(Turn-Key)</span> 사업을 수행합니다.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-9">
            <ButtonLink to={href(C, "business/epc-engineering")} variant="light">
              사업분야 보기
            </ButtonLink>
            <a
              href="https://www.youtube.com/watch?v=c_vkTfblDaE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
            >
              소리와 함께 영상 보기 <ArrowUpRight className="size-3.5" />
              <span className="sr-only">(유튜브 새 창)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 회사 소개 문장 + 수치 */}
      <section className="wrap py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3" data-reveal>
            About
          </p>
          <div className="lg:col-span-9">
            <p className="text-[24px] font-medium leading-[1.55] tracking-[-0.03em] text-ink sm:text-[30px] lg:text-[40px]" data-reveal>
              우리는 끊임없는 연구와{" "}
              <br className="xl:hidden" />
              축적된 경험을 바탕으로{" "}
              <br className="hidden xl:block" />
              <span className="whitespace-nowrap text-navy">반응기, 여과기, 건조기, 믹서</span> 등 핵심 공정장비를{" "}
              <br className="hidden xl:block" />
              자체 기술로 <span className="whitespace-nowrap">설계하고 제작합니다.</span>
            </p>
            <Link href={href(C, "company/overview")} className="link-arrow mt-10 text-ink" data-reveal>
              회사개요
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

      </>
      )}

      {design !== 2 && (
      <>
      {/* 02 사업분야: 스크롤 시 겹쳐 올라오는 카드 */}
      <section className="bg-mist pb-24 pt-24 lg:pb-36 lg:pt-32">
        <div className="wrap">
          <Head en="Business" title="공정의 모든 것을 한번에" lead={<>엔지니어링 및 PLANT 설계, 시공, 건설 수행까지{" "}<br className="lg:hidden xl:block" />고객이 필요한 공정을 완성합니다.</>} more={{ to: href(C, "business/epc-engineering"), label: "사업분야 전체" }} />
          <ol className="mt-14 lg:mt-20">
            {BUSINESSES.map((b, i) => (
              <li key={b.slug} className="sticky mb-6 lg:mb-10" style={{ top: `calc(var(--header-h) + 20px + ${i * 14}px)` }}>
                <Link href={href(C, `business/${b.slug}`)} className="group relative isolate flex min-h-[460px] overflow-hidden rounded-[8px] bg-deep text-white shadow-[0_-12px_40px_-20px_rgba(15,18,34,0.45)] lg:h-[min(68vh,600px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(b.visual)} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                  <span className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(15,18,34,0.88)_0%,rgba(15,18,34,0.55)_45%,rgba(15,18,34,0.05)_100%)]" />
                  <div className="flex w-full flex-col justify-between p-7 sm:p-10 lg:p-14">
                    <p className="flex items-center gap-3 text-[13px] text-white/60">
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
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
                        자세히 보기
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </>
      )}

      {(design === undefined || design === 1) && (
      <>
      {/* 03 대표 제품 */}
      <section className="overflow-hidden bg-[#eef0f4] py-24 lg:py-32">
        <div className="wrap">
          <Head en="Products" title={<>핵심 공정장비를{" "}<br className="lg:hidden xl:block" />자체 기술로 <span className="whitespace-nowrap">설계하고 제작합니다</span></>} more={{ to: href(C, "products/reactor"), label: "제품소개" }} />
        </div>
        <ProductRailA />
      </section>

      </>
      )}

      {/* 04 기술·수행실적 */}
      <section className="wrap py-24 lg:py-36">
        <Head
          en="Technology & Projects"
          title="현장에서 검증된 기술력"
          lead={<>ASME 인증과 ISO 경영시스템,{" "}<br className="lg:hidden xl:block" />자체 특허를 바탕으로 설계⁠·⁠제작합니다.</>}
          more={{ to: href(C, "tech/certifications"), label: `인증 및 특허 ${CERTIFICATIONS.length}건` }}
        />
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <dl className="border-t border-ink lg:col-span-5" data-reveal>
            {[
              ["ASME", "U · U2 · U3 · S · PP Certificate"],
              ["ISO", "9001 품질 · 14001 환경 · 45001 안전보건"],
              ["면허", "건설업⁠(산업⁠·⁠환경설비공사업) · 특정설비제조"],
              ["확인서", "기술혁신⁠·⁠경영혁신 중소기업, 벤처기업, 뿌리기업, 소재⁠·⁠부품⁠·⁠장비 전문기업"],
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

        {design !== 4 && design !== 5 && (
        <>
        <div className="mt-28 flex items-end justify-between gap-4 border-b border-line pb-5" data-reveal>
          <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-ink lg:text-[26px]">주요 수행실적</h3>
          <Link href={href(C, "tech/projects")} className="link-arrow text-ink">
            전체 {PROJECTS.length}건
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
        </>
        )}

        <div className="mt-28" data-reveal>
          <div className="flex items-end justify-between gap-4">
            <p className="text-[15px] text-muted">JP이노베이션은 다양한 파트너사들과 함께 합니다.</p>
            <Link href={href(C, "company/clients")} className="link-arrow shrink-0 text-ink">
              주요 고객사
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
              JP이노베이션에 대해 궁금한 사항이{" "}
              <br className="hidden xl:block" />
              있으시다면 문의해 주세요.
            </h2>
            <p className="mt-6 text-[15px] text-white/70">
              T. {COMPANY.sites[0].tel} · {COMPANY.email}
            </p>
          </div>
          <ul className="border-t border-white/30 lg:col-span-5 lg:col-start-8" data-reveal style={d(120)}>
            {[
              { to: href(C, "support/inquiry"), t: "사업⁠·⁠제품 문의", s: "엔지니어링, 장비, 건설" },
              { to: CATALOG_URL, t: "e-카탈로그", s: "제품 카탈로그 보기", ext: true },
              { to: href(C, "support/contact"), t: "담당 연락처", s: "본사, 동탄연구소" },
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
