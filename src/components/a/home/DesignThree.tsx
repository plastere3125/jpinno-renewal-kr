import Link from "next/link";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/content/ko/products";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";

const C: Concept = "concept-a";

/**
 * 메인 디자인 3안 — 현장 사진과 하나의 4칸 기준선 (2026-11-12 내부 시안)
 * - 첫 화면: 브랜드 영상 4K 17.48초 반응기실(scripts/import-261112-design3.py). PC는 제어반·반응기가 화면 가운데(모바일은 열린 맨홀),
 *   앞쪽 돔과 맨홀은 왼쪽 아래, 오른쪽으로 바닥·트레이가 물러나는 원근. 사진 아래쪽(바닥·돔 하부)만 어둡게 해
 *   짧은 제목과 주요 링크 4개를 4칸 격자로 둔다.
 * - 다음 섹션: 사진 아래 어두운 색이 그대로 이어지는 바탕에서 설계 → 장비 제작 → 시공 → 사후관리를
 *   첫 화면 링크와 같은 4칸에 맞춰 잇는다.
 * - 공정장비: 필터 리액터를 대표 비주얼로(4칸 중 왼쪽 2칸), 오른쪽 2칸에 실제 사양값과 장비 분류.
 * 문구 구분
 *   - 제목 '플랜트 전문기업'과 업종 줄: 기존 승인 문구("제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업")를 압축 — 내부 검토용
 *   - 공정 섹션 제목·단계 설명: 기존 사업분야 문구를 바탕으로 새로 정리 — 내부 검토용
 *   - EPC 설명·회사소개 문장·필터 리액터 요약·사양: 기존 승인 문구·데이터 그대로
 */
const COLS = "grid grid-cols-2 gap-x-6 lg:grid-cols-4";

const LINKS = [
  { en: "EPC Engineering", label: "EPC 엔지니어링", to: "business/epc-engineering" },
  { en: "Process Equipment", label: "공정장비", to: "products/reactor" },
  { en: "Projects", label: "수행실적", to: "tech/projects" },
  { en: "Contact", label: "사업⁠·⁠제품 문의", to: "support/inquiry" },
];

const STEPS = [
  { n: "01", title: "설계", en: "Engineering", desc: "각 공정에 맞는 플랜트 설계와 장비 엔지니어링", link: { label: "EPC 엔지니어링", to: "business/epc-engineering" } },
  { n: "02", title: "장비 제작", en: "Manufacturing", desc: "반응기, 여과기, 건조기, 믹서 등 핵심 공정장비 자체 제작", link: { label: "공정장비", to: "products/reactor" } },
  { n: "03", title: "시공", en: "Construction", desc: "플랜트 시공과 설비 설치", link: { label: "건설산업", to: "business/construction" } },
  { n: "04", title: "사후관리", en: "After Service", desc: "납품 이후의 사후관리", link: { label: "담당 연락처", to: "support/contact" } },
];

export default function DesignThree() {
  const fr = PRODUCTS.find((p) => p.slug === "filter-reactor")!;
  const spec = fr.spec!;
  const iModel = spec.columns.indexOf("MODEL");
  const iVol = spec.columns.findIndex((c) => c.startsWith("VOLUME"));
  const iH = spec.columns.findIndex((c) => c.startsWith("H "));

  return (
    <>
      {/* 01 첫 화면 */}
      <section id="hero-d3" className="relative isolate flex h-svh min-h-[640px] flex-col justify-end overflow-hidden bg-deep text-white">
        <picture>
          <source media="(max-width: 767px)" srcSet={img("home/d3-hero-m.jpg")} />
          <img src={img("home/d3-hero-pc.jpg")} alt="반응기와 제어반, 배관이 설치된 공정 현장" className="absolute inset-0 -z-10 size-full object-cover object-center" />
        </picture>
        {/* 메뉴 가독성(위쪽 얇게) · 제목과 링크 자리(사진 아래쪽만) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[58%] bg-gradient-to-t from-deep via-deep/75 to-transparent lg:h-[50%]" />

        <div className="wrap">
          <p className="text-[14px] font-medium tracking-[-0.01em] text-white/75 lg:text-[16px]">제약 바이오 · 이차전지 · 석유 정밀화학</p>
          <h1 className="mt-3 text-[46px] font-bold leading-[1.02] tracking-[-0.055em] sm:text-[64px] lg:mt-4 lg:text-[84px] xl:text-[96px] pc-short:text-[72px]">플랜트 전문기업</h1>
          <nav aria-label="주요 링크" className={`${COLS} mt-8 lg:mt-12`}>
            {LINKS.map((l) => (
              <Link key={l.to} href={href(C, l.to)} className="group flex items-end justify-between gap-3 border-t border-white/25 py-4 transition-colors hover:border-white lg:py-7">
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">{l.en}</span>
                  <span className="mt-1.5 block text-[16px] font-semibold tracking-[-0.02em] lg:text-[19px]">{l.label}</span>
                </span>
                <ArrowRight className="mb-1 size-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-white lg:size-5" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* 02 설계 → 장비 제작 → 시공 → 사후관리 (첫 화면 링크와 같은 4칸) */}
      <section aria-labelledby="d3-process" className="bg-deep text-white">
        <div className="wrap pb-24 pt-16 lg:pb-32 lg:pt-24">
          <div className="grid gap-x-6 gap-y-6 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="eyebrow [--c-eyebrow:var(--color-sky)]">EPC · Turn-Key</p>
              <h2 id="d3-process" className="t-section mt-4 text-white">
                설계부터 사후관리까지
                <br />
                한 흐름으로 수행합니다
              </h2>
            </div>
            <p className="text-[15.5px] leading-relaxed text-white/70 lg:col-span-2 lg:self-end lg:text-[17px]">
              엔지니어링설계, 장비제작, 시공 및 사후관리까지 <span className="whitespace-nowrap">EPC(Turn-Key)</span> 사업을 수행합니다.
            </p>
          </div>

          <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative pt-9">
                {/* 단계 사이를 잇는 선: 다음 칸의 시작점까지(마지막 칸은 칸 끝까지) */}
                <span aria-hidden className={`absolute left-0 top-0 h-px bg-white/25 ${i < STEPS.length - 1 ? "right-0 lg:-right-6" : "right-0"}`} />
                <span aria-hidden className="absolute -top-[4px] left-0 size-[9px] rounded-full bg-sky" />
                <p className="text-[13px] font-semibold tabular-nums text-sky">{s.n}</p>
                <h3 className="mt-3 text-[24px] font-bold tracking-[-0.04em] lg:text-[28px]">{s.title}</h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">{s.en}</p>
                <p className="mt-4 max-w-[17em] text-[15px] leading-relaxed text-white/70">{s.desc}</p>
                <Link href={href(C, s.link.to)} className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-white/85 transition-colors hover:text-white">
                  {s.link.label} <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 공정장비 — 대표 비주얼: 필터 리액터 (왼쪽 2칸 / 오른쪽 2칸) */}
      <section aria-labelledby="d3-products" className="overflow-hidden bg-deep-2 text-white">
        <div className="wrap grid gap-x-6 lg:grid-cols-4">
          <div className="relative flex items-end justify-center pb-2 pt-14 lg:col-span-2 lg:pb-16 lg:pt-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img("home/d2-fr.webp")} alt="JP이노베이션 필터 리액터" loading="lazy" className="h-[440px] w-auto max-w-none sm:h-[560px] lg:h-[min(78svh,720px)]" />
          </div>
          <div className="pb-20 pt-10 lg:col-span-2 lg:self-center lg:py-24">
            <p className="eyebrow [--c-eyebrow:var(--color-sky)]">Process Equipment</p>
            <h2 id="d3-products" className="t-section mt-4 text-white">
              공정장비
            </h2>
            <p className="mt-5 max-w-[30em] text-[15.5px] leading-relaxed text-white/70 lg:text-[16.5px]">
              끊임없는 연구와 축적된 경험을 바탕으로 핵심 공정장비를 자체 기술로 설계하고 제작합니다.
            </p>

            <div className="mt-10 border-t border-white/20 pt-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-sky">대표 장비 · 특허</p>
              <p className="mt-2 text-[22px] font-bold tracking-[-0.03em] lg:text-[26px]">
                필터 리액터 <span className="text-[15px] font-medium text-white/55 lg:text-[16px]">Filter Reactor</span>
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{fr.summary}</p>
              <table className="mt-5 w-full max-w-[420px] text-left text-[13.5px] tabular-nums">
                <thead className="text-white/50">
                  <tr>
                    <th className="py-1.5 font-medium">모델</th>
                    <th className="py-1.5 font-medium">용량 (m³)</th>
                    <th className="py-1.5 font-medium">높이 (mm)</th>
                  </tr>
                </thead>
                <tbody className="text-white/85">
                  {spec.rows.map((r) => (
                    <tr key={r[iModel]} className="border-t border-white/10">
                      <td className="py-1.5">{r[iModel]}</td>
                      <td className="py-1.5">{r[iVol]}</td>
                      <td className="py-1.5">{r[iH]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href={href(C, "products/reactor/filter-reactor")} className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-white/85 hover:text-white">
                필터 리액터 자세히 <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6">
              {PRODUCT_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={href(C, `products/${c.slug}`)} className="group flex items-center justify-between border-t border-white/15 py-3.5 text-[15.5px] font-medium text-white/85 transition-colors hover:text-white">
                    {c.name}
                    <ArrowRight className="size-3.5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
