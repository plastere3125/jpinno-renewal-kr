import Link from "next/link";
import { BUSINESSES } from "@/content/ko/business";
import { CATALOG_URL, COMPANY } from "@/content/ko/common";
import { HOME_CLIENTS } from "@/content/ko/company";
import { NEWS } from "@/content/ko/news";
import { PRODUCT_CATEGORIES } from "@/content/ko/products";
import { CERTIFICATIONS, PROJECTS } from "@/content/ko/tech";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/shared/Icons";
import { NewsCard } from "@/components/shared/Widgets";
import { Channels } from "@/components/views/MiscViews";

const C: Concept = "concept-a";

/**
 * 새 국문 홈(내부 검토 미리보기 /concept-a/new-home/, 2026-11-12)
 * 원칙(레퍼런스에서 가져온 것은 '구성과 전환의 원리'뿐): ① 인트로 = 히어로 무대가 한 번 열리는 프레이밍 변화(제목·버튼은 첫 프레임부터),
 * ② 헤더·타이포·미디어가 한 장면, ③ 섹션마다 구도·밀도·배경이 다르다.
 * 자산: 히어로 = 필터 리액터 제품 실사(원본 3644×7433, 형태 변경 없음). 영상은 자막 없는 움직임 구간이 1~1.6초뿐·원본 흐림 → 미사용.
 *       대표 실적 = 홍보센터 news-55 준공 사진(786×464, 확대 없음). 장비와 사례는 서로 다른 섹션 — 납품·설치 관계를 암시하지 않음.
 * 문구: 히어로 제목은 기존 시안 문구(내부 검토), 그 외 승인 문구·데이터 원문.
 */
const FEATURED_ID = "p02"; // 에이에스텍 장항 2공장 신축(사이트 실적 상세)
const MORE = ["삼진제약 오송공장 증축 EPC", "SK바이오텍 세종공장 증설 EPC"];

export default function NewHome() {
  const more = MORE.map((n) => PROJECTS.find((p) => p.name === n)!);
  const certs = ["asme-u", "iso9001", "pt-filter-reactor"].map((id) => CERTIFICATIONS.find((c) => c.id === id)!);
  const patents = CERTIFICATIONS.filter((c) => c.id.startsWith("pt-")).length;
  const latest = [...NEWS.filter((n) => n.type === "news" || n.type === "newsletter").slice(0, 3), NEWS.find((n) => n.type === "video")!];

  return (
    <main id="main" className="bg-[#070a16]">
      {/* ① 인트로 + 히어로: 무대(조명·장비)만 한 번 열리고, 헤더·제목·버튼은 처음부터 그 위에 있다 */}
      <section id="nh-hero" aria-labelledby="nh-title" className="relative isolate h-svh min-h-[620px] overflow-hidden text-white">
        <div aria-hidden className="nh-stage absolute inset-0 -z-10 bg-[radial-gradient(58%_78%_at_76%_42%,#2b3354_0%,#141a33_48%,#0a0e1d_100%)] max-lg:bg-[radial-gradient(90%_55%_at_50%_30%,#2b3354_0%,#141a33_55%,#0a0e1d_100%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img("home/nh-fr.webp")}
            alt=""
            width={1600}
            height={3605}
            fetchPriority="high"
            className="nh-subject absolute left-1/2 top-[13%] h-[96%] w-auto max-w-none -translate-x-1/2 lg:left-auto lg:right-[2%] lg:top-[14%] lg:h-[110%] lg:translate-x-0 xl:right-[4%] xl:top-[12%] xl:h-[122%]"
          />
        </div>
        {/* 모바일: 제목 영역 아래쪽만 어둡게(장비 하부 위 글자 대비) */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[52%] bg-gradient-to-t from-[#070a16] via-[#070a16]/85 to-transparent lg:hidden" />

        <div className="nh-copy wrap flex h-full flex-col justify-end pb-[max(40px,7svh)] lg:pb-[13vh]">
          <p className="text-[14px] text-white/70 lg:text-[17px]">제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업</p>
          <h1 id="nh-title" className="mt-3 text-[31px] font-bold leading-[1.2] tracking-[-0.045em] max-[380px]:text-[27px] sm:text-[46px] lg:mt-5 lg:text-[50px] xl:text-[66px]">
            공정장비는 직접 만들고,
            <br />
            플랜트는 <span className="whitespace-nowrap">EPC로 완성합니다.</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-10">
            <a href="#nh-projects" className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-white px-7 text-[15.5px] font-semibold text-ink transition-colors hover:bg-sky hover:text-white focus-visible:outline-2! focus-visible:outline-offset-4! focus-visible:outline-white!">
              주요 수행실적 보기
              <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#nh-equipment" className="text-[15px] font-medium text-white/80 underline-offset-[6px] transition-colors hover:text-white hover:underline focus-visible:outline-2! focus-visible:outline-offset-4! focus-visible:outline-white!">
              공정장비 보기
            </a>
          </div>
        </div>
      </section>

      {/* ② 첫 스크롤: 흰 시트가 히어로 아래 가장자리를 덮으며 대표 수행실적으로 */}
      <section id="nh-projects" aria-labelledby="nh-projects-title" className="relative z-10 -mt-10 rounded-t-[28px] bg-white lg:-mt-16 lg:rounded-t-[44px]">
        <div className="wrap pb-20 pt-14 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-y-8 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-5">
              <h2 id="nh-projects-title" className="text-[14px] font-semibold text-navy">
                대표 수행실적
              </h2>
              <p className="mt-4 text-[30px] font-bold leading-[1.2] tracking-[-0.045em] text-ink sm:text-[38px] lg:text-[48px]">에이에스텍 장항 제2공장</p>
              <p className="mt-4 text-[19px] font-bold tracking-[-0.02em] text-navy lg:text-[24px]">EPC 전 과정 수행</p>
              <p className="mt-3 text-[15px] text-muted lg:text-[16px]">2024 착공 · 2026.5 준공 · 바이오</p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-semibold">
                <Link href={href(C, `tech/projects/${FEATURED_ID}`)} className="link-arrow text-ink">
                  프로젝트 보기
                </Link>
                <Link href={href(C, "news/news-55")} className="link-arrow text-ink">
                  준공 소식
                </Link>
              </div>
            </div>
            <Link href={href(C, `tech/projects/${FEATURED_ID}`)} className="group block lg:col-span-7" aria-label="에이에스텍 장항 제2공장 프로젝트 보기">
              {/* 원본 786×464 — 7칸(약 713px) 이하로 표시, 확대 없음 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img("home/nh-astech.jpg")} alt="에이에스텍 장항 제2공장 준공 후 전경" width={786} height={464} className="block w-full max-w-[786px] rounded-[20px] lg:ml-auto lg:rounded-[28px]" />
            </Link>
          </div>

          <ul className="mt-14 border-t border-ink lg:mt-20">
            {more.map((p) => (
              <li key={p.id} className="border-b border-line">
                <Link href={href(C, `tech/projects/${p.id}`)} className="group grid grid-cols-[88px_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[140px_1fr_auto] lg:grid-cols-[180px_1fr_auto] lg:gap-8 lg:py-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p.image)} alt="" loading="lazy" className="aspect-[16/10] w-full rounded-[10px] object-cover" />
                  <span>
                    <span className="block text-[13px] text-muted">
                      {p.year} · {p.industry}
                    </span>
                    <span className="mt-1 block text-[16px] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-navy lg:text-[21px]">{p.name}</span>
                  </span>
                  <ArrowRight className="size-5 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-navy" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href(C, "tech/projects")} className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-navy">
            전체 수행실적 {PROJECTS.length}건 <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ③ 공정장비: 같은 기준선에 선 5종 — 형상과 분류를 한눈에 비교 */}
      <section id="nh-equipment" aria-labelledby="nh-equipment-title" className="bg-[#eceef2]">
        <div className="wrap py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <h2 id="nh-equipment-title" className="text-[30px] font-bold tracking-[-0.045em] text-ink lg:text-[44px]">
                공정장비
              </h2>
              <p className="mt-3 max-w-[34em] text-[15px] leading-relaxed text-muted lg:text-[16.5px]">끊임없는 연구와 축적된 경험을 바탕으로 핵심 공정장비를 자체 기술로 설계하고 제작합니다.</p>
            </div>
            <Link href={href(C, "products/reactor/filter-reactor")} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-navy hover:text-navy">
              대표 장비 · 필터 리액터(특허) <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-x-6">
            {PRODUCT_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={href(C, `products/${c.slug}`)} className="group block">
                  {/* 모든 장비가 같은 바닥선(아래 테두리) 위에 선다 — 형상 비교용, 크기는 실제 비례가 아님 */}
                  <span className="relative block h-[170px] border-b-2 border-ink sm:h-[220px] lg:h-[300px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(c.image)} alt="" loading="lazy" className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto max-w-full object-contain object-bottom transition-transform duration-500 group-hover:-translate-y-1.5" />
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-2">
                    <span>
                      <span className="block whitespace-nowrap text-[17px] font-bold tracking-[-0.03em] text-ink lg:text-[19px]">{c.name}</span>
                      <span className="mt-0.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{c.nameEn}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-navy" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ④ 사업분야: 사진 없이 큰 글자 목록 — 읽고 고르는 구간 */}
      <section aria-labelledby="nh-business-title" className="bg-white">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:gap-6 lg:py-28">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
              <h2 id="nh-business-title" className="text-[30px] font-bold tracking-[-0.045em] text-ink lg:text-[44px]">
                사업분야
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted lg:text-[16.5px]">
                엔지니어링 및 PLANT 설계, 시공, 건설 수행까지
                <br className="hidden lg:block" /> 고객이 필요한 공정을 완성합니다.
              </p>
            </div>
          </div>
          <ol className="border-t border-ink lg:col-span-8">
            {BUSINESSES.map((b) => (
              <li key={b.slug} className="border-b border-line">
                <Link href={href(C, `business/${b.slug}`)} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 lg:py-7">
                  <span>
                    <span className="flex items-baseline gap-3">
                      <span className="text-[22px] font-bold tracking-[-0.04em] text-ink transition-colors group-hover:text-navy lg:text-[32px]">{b.name}</span>
                      <span className="hidden text-[12px] font-medium uppercase tracking-[0.1em] text-muted sm:inline">{b.nameEn}</span>
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-muted lg:text-[15px]">{b.summary[0].replace(/\n/g, " ")}</span>
                  </span>
                  <ArrowRight className="hidden size-5 text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-navy sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ⑤ 기술·인증: 어두운 띠 + 고객사 로고 */}
      <section aria-labelledby="nh-tech-title" className="bg-[#0f1222] text-white">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:gap-6 lg:py-28">
          <div className="lg:col-span-5">
            <h2 id="nh-tech-title" className="text-[30px] font-bold tracking-[-0.045em] lg:text-[44px]">
              현장에서 검증된 기술력
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70 lg:text-[16.5px]">ASME 인증과 ISO 경영시스템, 자체 특허를 바탕으로 설계⁠·⁠제작합니다.</p>
            <dl className="mt-10 border-t border-white/25 text-[14.5px]">
              {[
                ["ASME", "U · U2 · U3 · S · PP"],
                ["ISO", "9001 · 14001 · 45001"],
                ["면허", "건설업(산업⁠·⁠환경설비공사업) · 특정설비제조"],
                ["특허", `필터 리액터 외 ${patents - 1}건`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[72px_1fr] gap-4 border-b border-white/15 py-4">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="text-white/70">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href={href(C, "tech/certifications")} className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-sky">
              인증 및 특허 {CERTIFICATIONS.length}건 <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-3 items-end gap-3 lg:col-span-6 lg:col-start-7 lg:gap-6">
            {certs.map((c, i) => (
              <li key={c.id} className={i === 1 ? "lg:-translate-y-10" : ""}>
                <Link href={href(C, "tech/certifications")} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(c.image)} alt={c.name} loading="lazy" className="aspect-[340/479] w-full rounded-[6px] bg-white object-contain p-2" />
                </Link>
                <p className="mt-3 text-[12.5px] leading-snug text-white/60">{c.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-label="주요 고객사" className="bg-white">
        <div className="wrap py-12 lg:py-16">
          <div className="flex items-end justify-between gap-4">
            <p className="text-[15px] text-muted">JP이노베이션은 다양한 파트너사들과 함께 합니다.</p>
            <Link href={href(C, "company/clients")} className="link-arrow shrink-0 text-ink">
              주요 고객사
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-x-6 gap-y-2 sm:grid-cols-4 lg:grid-cols-6">
            {HOME_CLIENTS.map((c) => (
              <li key={c.logo} className="flex h-16 items-center justify-center lg:h-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(c.logo)} alt={c.name} width={240} height={100} loading="lazy" className="max-h-[54%] w-auto opacity-75" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ⑥ 홍보센터 */}
      <section aria-labelledby="nh-news-title" className="bg-mist">
        <div className="wrap py-20 lg:py-24">
          <div className="flex items-end justify-between gap-4">
            <h2 id="nh-news-title" className="text-[30px] font-bold tracking-[-0.045em] text-ink lg:text-[40px]">
              홍보센터
            </h2>
            <Link href={href(C, "news")} className="link-arrow shrink-0 text-ink">
              소식 전체
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((n) => (
              <li key={n.id}>
                <NewsCard concept={C} n={n} />
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <Channels concept={C} />
          </div>
        </div>
      </section>

      {/* ⑦ 문의 */}
      <section aria-labelledby="nh-contact-title" className="bg-navy text-white">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:gap-6 lg:py-28">
          <div className="lg:col-span-6">
            <h2 id="nh-contact-title" className="text-[28px] font-bold leading-[1.3] tracking-[-0.045em] lg:text-[44px]">
              JP이노베이션에 대해 궁금한 사항이
              <br className="hidden sm:block" /> 있으시다면 문의해 주세요.
            </h2>
            <p className="mt-5 text-[15px] text-white/70">
              T. {COMPANY.sites[0].tel} · {COMPANY.email}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Link href={href(C, "support/inquiry")} className="group flex items-center justify-between rounded-full bg-white px-7 py-4 text-[16px] font-semibold text-ink transition-colors hover:bg-sky hover:text-white">
              사업⁠·⁠제품 문의 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-full border border-white/35 px-7 py-4 text-[16px] font-semibold transition-colors hover:border-white">
              e-카탈로그 <ArrowUpRight className="size-4" />
              <span className="sr-only">(새 창)</span>
            </a>
            <Link href={href(C, "support/contact")} className="group flex items-center justify-between rounded-full border border-white/35 px-7 py-4 text-[16px] font-semibold transition-colors hover:border-white">
              담당 연락처 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
