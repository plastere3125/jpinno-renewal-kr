import Link from "next/link";
import { BUSINESSES, ELECTRONIC, EPC_STEPS, PETRO_PRODUCTS, PHARMA_TABLE, PROCESS_IMAGES } from "@/content/ko/business";
import { PRODUCT_CATEGORIES } from "@/content/ko/products";
import { PROJECTS } from "@/content/ko/tech";
import { href, img, type Concept } from "@/lib/site";
import type { Business } from "@/lib/types";
import { SectionTitle } from "@/components/shared/PageShell";
import { ButtonLink, ZoomImage } from "@/components/shared/Widgets";

const sec = "wrap py-16 lg:py-24";

export default function BusinessView({ concept, b }: { concept: Concept; b: Business }) {
  const dark = concept === "concept-b";
  const related = PRODUCT_CATEGORIES.filter((c) => b.relatedProducts.includes(c.slug));
  const process = PROCESS_IMAGES[b.slug];
  const idx = BUSINESSES.findIndex((x) => x.slug === b.slug);
  const prev = BUSINESSES[(idx + BUSINESSES.length - 1) % BUSINESSES.length];
  const next = BUSINESSES[(idx + 1) % BUSINESSES.length];

  return (
    <>
      <section className={sec}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="sub-eyebrow text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--c-eyebrow)]">{b.nameEn}</p>
            <h2 className="mt-2 text-[26px] font-semibold leading-snug tracking-[-0.02em] text-[var(--c-heading)] lg:text-[34px]">{b.name}</h2>
            <ul className="mt-6 space-y-2.5 border-l-2 border-sky pl-5 text-[15.5px] leading-relaxed text-ink">
              {b.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="prose-ko text-[16px] leading-[1.85] text-ink/85">
            {b.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {b.slug === "epc-engineering" && (
        <section className={dark ? "bg-deep text-white" : "bg-[var(--c-alt)]"}>
          <div className={sec}>
            <div className={dark ? "[--c-heading:#fff]" : ""}>
              <SectionTitle eyebrow="Project Process" title="EPC 프로젝트 수행 단계" />
            </div>
            <ol className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {EPC_STEPS.map((s) => (
                <li key={s.no} className={`rounded-[var(--c-radius)] p-6 ${dark ? "border border-white/12 bg-deep-2" : "bg-white"}`}>
                  <p className="text-[12px] font-semibold tracking-[0.14em] text-sky">STEP {s.no}</p>
                  <h3 className="mt-2 text-[20px] font-semibold">
                    {s.ko} <span className={`text-[14px] font-medium ${dark ? "text-white/60" : "text-muted"}`}>{s.en}</span>
                  </h3>
                  <ul className={`mt-4 space-y-1 border-t pt-4 text-[13.5px] leading-relaxed ${dark ? "border-white/12 text-white/75" : "border-line text-muted"}`}>
                    {s.lines.map((l, i) =>
                      l.startsWith("- ") ? (
                        <li key={i} className="pl-3 text-[13px] opacity-80">
                          · {l.slice(2)}
                        </li>
                      ) : (
                        <li key={i} className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>
                          {l}
                        </li>
                      ),
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {process && (
        <section className="bg-[var(--c-alt)]">
          <div className={sec}>
            <SectionTitle eyebrow="JPI Scope" title={process.title} />
            <div className="mt-10 rounded-[var(--c-radius)] bg-white p-4 lg:p-10">
              <ZoomImage src={process.image} alt={process.title} className="mx-auto w-fit" imgClass="mx-auto w-full max-w-[820px]" />
            </div>
          </div>
        </section>
      )}

      {b.slug === "pharma-bio" && (
        <section className="bg-[var(--c-alt)]">
          <div className={sec}>
            <SectionTitle eyebrow="Process" title="제약 · 바이오 생산 공정 비교" />
            <div className="table-scroll mt-10 border-t-2 border-[var(--c-heading)] bg-white">
              <table className="w-full min-w-[720px] border-collapse text-left text-[14.5px]">
                <thead>
                  <tr className="bg-white">
                    {PHARMA_TABLE.columns.map((c) => (
                      <th key={c} scope="col" className="border-b border-line px-5 py-4 font-semibold text-ink">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PHARMA_TABLE.rows.map(([k, a, c]) => (
                    <tr key={k} className="border-b border-line align-top">
                      <th scope="row" className="w-[180px] bg-[var(--c-alt)] px-5 py-4 font-semibold text-navy">
                        {k}
                      </th>
                      {[a, c].map((col, i) => (
                        <td key={i} className="px-5 py-4 leading-relaxed text-muted">
                          {col.map((l) => (
                            <p key={l}>{col.length > 1 ? `- ${l}` : l}</p>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {b.slug === "electronic-materials" && (
        <>
          <section className="bg-[var(--c-alt)]">
            <div className={sec}>
              <SectionTitle eyebrow="Strength" title="전자소재 공정 솔루션" />
              <ul className="mt-10 grid gap-4 lg:grid-cols-3">
                {ELECTRONIC.strengths.map((s, i) => (
                  <li key={s.title} className="rounded-[var(--c-radius)] bg-white p-7">
                    <span className="text-[13px] font-semibold text-sky-600">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-[19px] font-semibold text-[var(--c-heading)]">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className={sec}>
            <SectionTitle eyebrow="Scope" title="전자소재 사업 범위" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {ELECTRONIC.scope.map((g) => (
                <div key={g.en} className={`rounded-[var(--c-radius)] p-6 ${dark ? "bg-deep text-white" : "border border-line"}`}>
                  <p className="text-[18px] font-semibold">{g.en}</p>
                  <p className={`text-[14px] ${dark ? "text-sky" : "text-sky-600"}`}>{g.ko}</p>
                  <ul className={`mt-4 space-y-1.5 border-t pt-4 text-[14.5px] ${dark ? "border-white/12 text-white/75" : "border-line text-muted"}`}>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {b.slug === "petrochemical" && (
        <section className="bg-[var(--c-alt)]">
          <div className={sec}>
            <SectionTitle eyebrow="Main Products" title="사업 주요 제품" />
            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PETRO_PRODUCTS.map((name, i) => (
                <li key={name} className={`flex items-baseline gap-4 rounded-[var(--c-radius)] p-6 ${dark ? "bg-deep text-white" : "bg-white"}`}>
                  <span className={`text-[13px] font-semibold tabular-nums ${dark ? "text-sky" : "text-sky-600"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[19px] font-semibold">{name}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {b.slug === "construction" && (
        <section className="bg-[var(--c-alt)]">
          <div className={sec}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle eyebrow="Projects" title="사업 실적" />
              <ButtonLink to={href(concept, "tech/projects")} variant="outline">
                주요 수행실적 전체 보기
              </ButtonLink>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {PROJECTS.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <Link href={href(concept, `tech/projects/${p.id}`)} className="group block overflow-hidden rounded-[var(--c-radius)] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.image)} alt="" loading="lazy" className="aspect-[449/287] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <p className="px-4 py-3 text-[14.5px] font-semibold text-ink">{p.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={sec}>
          <SectionTitle eyebrow="Related Products" title={`${b.name} 관련 제품`} />
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {related.map((c) => (
              <li key={c.slug}>
                <Link href={href(concept, `products/${c.slug}`)} className="group flex h-full flex-col rounded-[var(--c-radius)] border border-line bg-white transition-colors hover:border-navy">
                  <div className="relative aspect-square bg-[var(--c-alt)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(c.image)} alt="" loading="lazy" className="absolute inset-0 m-auto max-h-[80%] max-w-[80%] object-contain" />
                  </div>
                  <p className="flex items-center justify-between px-4 py-3 text-[15px] font-semibold text-ink">
                    {c.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="다른 사업분야" className="border-t border-line">
        <div className="wrap grid grid-cols-2">
          <Link href={href(concept, `business/${prev.slug}`)} className="group py-8 pr-4 text-left">
            <span className="text-[13px] text-muted">이전 사업분야</span>
            <span className="mt-1 block text-[17px] font-semibold text-ink group-hover:text-navy">← {prev.name}</span>
          </Link>
          <Link href={href(concept, `business/${next.slug}`)} className="group border-l border-line py-8 pl-4 text-right">
            <span className="text-[13px] text-muted">다음 사업분야</span>
            <span className="mt-1 block text-[17px] font-semibold text-ink group-hover:text-navy">{next.name} →</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
