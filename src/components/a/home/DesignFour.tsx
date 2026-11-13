import Link from "next/link";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/content/ko/products";
import { EPC_RECORDS, PROJECTS } from "@/content/ko/tech";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";
import { ButtonLink } from "@/components/shared/Widgets";

const C: Concept = "concept-a";

/**
 * 메인 디자인 4안 — 현장 → 수행실적 → 공정장비 (2026-11-12 내부 시안)
 * 박자: ① 본문 폭 전체의 넓은 현장 파노라마 → ② 사진 6칸 + 정보 6칸의 실적 → ③ 가운데 선 제품 하나.
 * 정렬: 헤더 로고 왼쪽 끝 = 제목·이미지·섹션 제목 왼쪽 끝, 문의 버튼 오른쪽 끝 = 이미지 오른쪽 끝(.wrap).
 * 히어로 이미지: 클라이언트 제공 석유화학 플랜트 야경 원본(4093×1521)을 확대 없이 사용
 *   (scripts/import-261112-design4.py — 3안 영상 프레임은 원본이 흐려 교체). ※ 메인 사용 여부 클라이언트 확인 필요
 * 문구: 제목 '플랜트를 설계하고, 공정장비를 제작합니다.'는 내부 검토용(기존 "핵심 공정장비를 자체 기술로 설계하고
 *   제작합니다"·"…플랜트 전문기업"을 한 문장으로). 실적·장비 정보는 데이터 원문.
 * 수행실적 사진: projects/hd/*는 클라이언트 제공 폴더의 사진이며 파일명이 '연도 + 프로젝트명'이라 짝지음의 근거가 있음.
 *   그중 3D 조감도(유피케미칼·에이에스텍 장항·IC바이오)는 제외하고 실사만 사용.
 */
const FEATURED = "SK바이오텍 세종공장 증설 EPC";
const MORE = ["삼진제약 오송공장 증축 EPC", "YCI 어드밴스드 울산공장 EPC"];

export default function DesignFour() {
  const featured = PROJECTS.find((p) => p.name === FEATURED)!;
  const more = MORE.map((n) => PROJECTS.find((p) => p.name === n)!);
  // 회사소개서 납품실적표에서 같은 프로젝트(연도·고객사)의 수행 내용
  const record = EPC_RECORDS.find((r) => r.year === featured.year && r.client === "SK바이오텍" && r.project.includes("세종공장 증설"));
  const fr = PRODUCTS.find((p) => p.slug === "filter-reactor")!;

  return (
    <>
      {/* ① 첫 화면: 같은 흰 면에서 제목 → 이미지 위 가장자리 */}
      <section id="hero-d4" aria-labelledby="d4-title" className="bg-white">
        <div className="wrap pt-8 sm:pt-10 lg:pt-12 pc-short:pt-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h1 id="d4-title" className="text-[30px] font-bold leading-[1.22] tracking-[-0.045em] text-ink sm:text-[40px] lg:text-[48px] xl:text-[56px]">
              플랜트를 설계하고,
              <br className="sm:hidden" /> 공정장비를 제작합니다.
            </h1>
            <div className="shrink-0 lg:pb-2">
              <ButtonLink to={href(C, "tech/projects")}>주요 수행실적 보기</ButtonLink>
            </div>
          </div>
          <picture>
            <source media="(max-width: 767px)" srcSet={img("home/d4-hero-m.jpg")} />
            <img
              src={img("home/d4-hero-pc.jpg")}
              alt="야간 조명이 켜진 석유화학 플랜트 전경"
              width={2880}
              height={959}
              className="mt-6 block aspect-[5/4] w-full rounded-[var(--c-radius)] object-cover md:aspect-[2880/959] lg:mt-8 pc-short:mt-6"
            />
          </picture>
          <p className="mt-3 text-[13px] text-muted">제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업</p>
        </div>
      </section>

      {/* ② 첫 스크롤: 대표 수행실적 1건 + 2건 */}
      <section aria-labelledby="d4-projects" className="bg-white">
        <div className="wrap pb-24 pt-20 lg:pb-32 lg:pt-24 pc-short:pt-14">
          <div className="flex items-end justify-between gap-4 border-b border-ink pb-5">
            <h2 id="d4-projects" className="t-section text-ink">
              주요 수행실적
            </h2>
            <Link href={href(C, "tech/projects")} className="link-arrow shrink-0 text-ink">
              전체 수행실적
            </Link>
          </div>
          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-6">
            <Link href={href(C, `tech/projects/${featured.id}`)} className="group block lg:col-span-6">
              {/* 원본 631×391 — 6칸(약 608px) 이하로 표시해 확대하지 않음 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(featured.image)} alt={`${featured.name} 현장`} width={631} height={391} loading="lazy" className="block w-full max-w-[631px] rounded-[var(--c-radius)]" />
            </Link>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[14px] text-muted">
                {featured.year} · {featured.industry}
              </p>
              <h3 className="mt-2 text-[26px] font-bold leading-snug tracking-[-0.04em] text-ink lg:text-[32px]">{featured.name}</h3>
              <dl className="mt-6 grid grid-cols-[88px_1fr] gap-y-2.5 text-[15px]">
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
            </div>
          </div>
        </div>
      </section>

      {/* ③ 공정장비: 가운데 선 대표 장비 하나 + 기존 분류 진입점 */}
      <section aria-labelledby="d4-products" className="bg-mist">
        <div className="wrap pb-20 pt-20 lg:pb-28 lg:pt-24">
          <div className="flex items-end justify-between gap-4 border-b border-ink pb-5">
            <h2 id="d4-products" className="t-section text-ink">
              공정장비
            </h2>
            <Link href={href(C, "products/reactor")} className="link-arrow shrink-0 text-ink">
              제품소개
            </Link>
          </div>

          <div className="relative mt-10 grid items-end gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-6">
            <div className="flex justify-center lg:col-span-6 lg:col-start-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img("home/d2-fr.webp")} alt="JP이노베이션 필터 리액터" width={888} height={2000} loading="lazy" className="h-[420px] w-auto sm:h-[520px] lg:h-[600px]" />
            </div>
            <div className="lg:col-span-3 lg:col-start-10 lg:pb-10">
              <p className="text-[14px] text-muted">대표 장비</p>
              <h3 className="mt-2 text-[24px] font-bold tracking-[-0.04em] text-ink lg:text-[28px]">필터 리액터</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{fr.summary}</p>
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
