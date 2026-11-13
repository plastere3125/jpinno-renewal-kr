import Link from "next/link";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/content/ko/products";
import { EPC_RECORDS, PROJECTS } from "@/content/ko/tech";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";

const C: Concept = "concept-a";

/**
 * 메인 디자인 5안 — 4안의 흐름(현장 → 대표 수행실적 → 공정장비)을 유지하고 상단 구도만 다시 잡은 내부 시안 (2026-11-12)
 * - PC 히어로: 화면 왼쪽 끝에서 본문 6번째 칸 시작선 + 1칸까지 짙은 네이비 면, 그 시작선에서 화면 오른쪽 끝까지 현장 사진.
 *   사진은 면보다 64px 아래에서 시작해 면과 1칸 겹치고 면 아래로 64px 더 내려와 두 요소가 맞물린다.
 *   (경계선은 % 계산이라 스크롤바 유무와 무관하게 .wrap 그리드와 일치)
 * - 타이포 블록: 산업 분야(기존 승인 문구) → 2줄 제목(내부 검토용) → '주요 수행실적 보기'(바로 아래 대표 실적으로 이동).
 *   전체 목록 링크는 실적 섹션 안에서만 — 같은 목적·크기의 링크를 반복하지 않음.
 * - 바로 다음: 큰 섹션 제목 없이 대표 실적 사진과 프로젝트명이 첫 화면 아래에서 바로 시작.
 * - 공정장비: 필터 리액터(2~6칸)와 설명(7~10칸)을 한 묶음으로 화면 중심에 둠.
 * - 모바일: 네이비 면(문구·링크) → 면 아래 가장자리에 걸친 사진(왼쪽 24px 들여 오른쪽 끝까지) 하나의 오프닝.
 * 사진: 클라이언트 제공 석유화학 야경 원본에서 확대 없이(d5-hero-pc.jpg 2800×1400, 모바일 d4-hero-m.jpg 1200×960).
 *   ※ 내부 검토용 — 메인 사용 확인 전 외부 배포 금지.
 */
const FEATURED = "SK바이오텍 세종공장 증설 EPC";
const MORE = ["삼진제약 오송공장 증축 EPC", "YCI 어드밴스드 울산공장 EPC"];

/** .wrap(최대 1320, 좌우 40) 안 12칸 그리드에서 6번째 칸 시작선 / 1칸 폭 — 절대 배치 요소용(부모 폭 기준 %) */
const GRID_LEFT = "max(40px, (100% - 1320px) / 2 + 40px)";
const COL = "((min(100% - 80px, 1240px) - 264px) / 12 + 24px)";
const SPLIT = `calc(${GRID_LEFT} + 5 * ${COL})`;
const PANEL_W = `calc(${GRID_LEFT} + 6 * ${COL})`;

export default function DesignFive() {
  const featured = PROJECTS.find((p) => p.name === FEATURED)!;
  const more = MORE.map((n) => PROJECTS.find((p) => p.name === n)!);
  const record = EPC_RECORDS.find((r) => r.year === featured.year && r.client === "SK바이오텍" && r.project.includes("세종공장 증설"));
  const fr = PRODUCTS.find((p) => p.slug === "filter-reactor")!;

  return (
    <>
      {/* ① 오프닝 */}
      <section id="hero-d5" aria-labelledby="d5-title" className="relative bg-white [--panel-h:clamp(440px,62svh,600px)] lg:h-[calc(var(--panel-h)+64px)] pc-short:[--panel-h:clamp(400px,56svh,600px)]">
        {/* PC: 네이비 면 + 오른쪽 끝까지 사진 */}
        <div aria-hidden className="absolute left-0 top-0 hidden h-[var(--panel-h)] bg-navy-700 lg:block" style={{ width: PANEL_W }} />
        <div className="absolute right-0 top-16 hidden h-[var(--panel-h)] lg:block" style={{ left: SPLIT }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("home/d5-hero-pc.jpg")} alt="야간 조명이 켜진 석유화학 플랜트 전경" width={2800} height={1400} className="size-full object-cover" />
        </div>

        {/* 타이포 블록(PC는 네이비 면 안, 모바일은 네이비 면 전체) */}
        <div className="bg-navy-700 lg:bg-transparent">
          <div className="wrap relative grid pb-16 pt-10 text-white sm:pt-14 lg:h-[var(--panel-h)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-0">
            <div className="lg:col-span-5">
              <p className="text-[14px] leading-relaxed text-white/70 lg:text-[15px]">제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업</p>
              <h1 id="d5-title" className="mt-4 text-[31px] font-bold leading-[1.24] tracking-[-0.045em] sm:text-[40px] lg:mt-5 lg:text-[36px] xl:text-[46px]">
                플랜트를 설계하고,
                <br />
                <span className="whitespace-nowrap">공정장비를 제작합니다.</span>
              </h1>
              <a href="#d5-projects" className="group mt-7 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[15px] font-medium transition-colors hover:border-white lg:mt-9 lg:text-[16px]">
                주요 수행실적 보기
                <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 모바일: 사진이 네이비 면 아래 가장자리에 걸쳐 붙음 */}
        <div className="bg-[linear-gradient(to_bottom,var(--color-navy-700)_0_45%,#fff_45%_100%)] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img("home/d4-hero-m.jpg")} alt="야간 조명이 켜진 석유화학 플랜트 전경" width={1200} height={960} className="ml-6 block aspect-[5/4] w-[calc(100%-24px)] object-cover sm:ml-12 sm:w-[calc(100%-48px)]" />
        </div>
      </section>

      {/* ② 바로 이어지는 대표 수행실적 */}
      <section aria-labelledby="d5-projects-title" id="d5-projects" className="scroll-mt-24 bg-white">
        <div className="wrap pb-24 pt-10 lg:pb-32 lg:pt-12">
          {/* 모바일: 제목·프로젝트명 → 사진 → 세부 정보 / PC: 사진(1~6칸, 두 줄 차지) | 프로젝트명·세부 정보(8~12칸) */}
          <div className="grid gap-x-6 gap-y-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <h2 id="d5-projects-title" className="text-[14px] font-semibold text-navy">
                대표 수행실적
              </h2>
              <p className="mt-3 text-[14px] text-muted lg:mt-5">
                {featured.year} · {featured.industry}
              </p>
              <h3 className="mt-2 text-[24px] font-bold leading-snug tracking-[-0.04em] text-ink sm:text-[26px] lg:text-[32px]">{featured.name}</h3>
            </div>
            <Link href={href(C, `tech/projects/${featured.id}`)} className="group block lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1">
              {/* 원본 631×391 — 6칸(약 608px) 이하로 표시해 확대하지 않음 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(featured.image)} alt={`${featured.name} 현장`} width={631} height={391} loading="lazy" className="block w-full max-w-[631px]" />
            </Link>
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
              <dl className="grid grid-cols-[88px_1fr] gap-y-2.5 text-[15px] lg:mt-0">
                <dt className="text-muted">고객사</dt>
                <dd className="text-ink">{record?.client ?? "SK바이오텍"}</dd>
                <dt className="text-muted">수행 범위</dt>
                <dd className="text-ink">EPC{record ? ` · ${record.project}` : ""}</dd>
                <dt className="text-muted">산업</dt>
                <dd className="text-ink">{featured.industry}</dd>
              </dl>
              <Link href={href(C, `tech/projects/${featured.id}`)} className="link-arrow mt-7 text-ink">
                프로젝트 보기
              </Link>

              <ul className="mt-12 border-t border-line">
                {more.map((p) => (
                  <li key={p.id}>
                    <Link href={href(C, `tech/projects/${p.id}`)} className="group flex items-center justify-between gap-4 border-b border-line py-4">
                      <span>
                        <span className="block text-[16px] font-medium text-ink transition-colors group-hover:text-navy">{p.name}</span>
                        <span className="mt-0.5 block text-[13px] text-muted">
                          {p.year} · {p.industry}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-navy" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={href(C, "tech/projects")} className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-ink">
                전체 수행실적 {PROJECTS.length}건 <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ③ 공정장비: 필터 리액터와 설명을 같은 중심에 */}
      <section aria-labelledby="d5-products" className="bg-mist">
        <div className="wrap pb-20 pt-20 lg:pb-28 lg:pt-24">
          <div className="flex items-end justify-between gap-4 border-b border-ink pb-5">
            <h2 id="d5-products" className="t-section text-ink">
              공정장비
            </h2>
            <Link href={href(C, "products/reactor")} className="link-arrow shrink-0 text-ink">
              제품소개
            </Link>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-6">
            <div className="flex justify-center lg:col-span-5 lg:col-start-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img("home/d2-fr.webp")} alt="JP이노베이션 필터 리액터" width={888} height={2000} loading="lazy" className="h-[420px] w-auto sm:h-[500px] lg:h-[560px]" />
            </div>
            <div className="lg:col-span-4 lg:col-start-7">
              <p className="text-[14px] font-semibold text-navy">대표 장비</p>
              <h3 className="mt-2 text-[26px] font-bold tracking-[-0.04em] text-ink lg:text-[32px]">필터 리액터</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted lg:text-[16px]">{fr.summary}</p>
              <Link href={href(C, "products/reactor/filter-reactor")} className="link-arrow mt-6 text-ink">
                자세히 보기
              </Link>
            </div>
          </div>

          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3 lg:mt-14 lg:grid-cols-5">
            {PRODUCT_CATEGORIES.map((c) => (
              <li key={c.slug} className="bg-white">
                <Link href={href(C, `products/${c.slug}`)} className="group flex h-full items-center gap-4 px-4 py-3 sm:py-4 lg:p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(c.image)} alt="" loading="lazy" className="size-12 shrink-0 object-contain sm:size-14 lg:size-16" />
                  <span className="flex-1 whitespace-nowrap text-[15.5px] font-semibold text-ink transition-colors group-hover:text-navy">{c.name}</span>
                  <ArrowRight className="size-4 shrink-0 text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-navy" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
