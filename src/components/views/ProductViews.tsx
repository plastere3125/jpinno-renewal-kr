import Link from "next/link";
import { PRODUCT_CATEGORIES, productsOf } from "@/content/ko/products";
import { href, img, type Concept } from "@/lib/site";
import type { Product, ProductCategory } from "@/lib/types";
import { SectionTitle } from "@/components/shared/PageShell";
import { ButtonLink, ProductCard, SpecTable, ZoomImage } from "@/components/shared/Widgets";

const sec = "wrap py-16 lg:py-24";

export function CategoryView({ concept, c }: { concept: Concept; c: ProductCategory }) {
  const list = productsOf(c.slug);
  return (
    <>
      <section className={sec}>
        <div className="flex flex-col gap-4 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--c-eyebrow)]">{c.nameEn}</p>
            <h2 className="mt-2 text-[26px] font-semibold text-[var(--c-heading)] lg:text-[32px]">{c.name}</h2>
          </div>
          <p className="max-w-[620px] text-[15.5px] leading-relaxed text-muted lg:text-right">{c.summary}</p>
        </div>
        <p className="mt-6 text-[14px] text-muted">
          제품 <strong className="text-ink">{list.length}</strong>종
        </p>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <ProductCard concept={concept} p={p} />
            </li>
          ))}
        </ul>
      </section>
      <InquiryBand concept={concept} />
    </>
  );
}

export function ProductDetail({ concept, p }: { concept: Concept; p: Product }) {
  const c = PRODUCT_CATEGORIES.find((x) => x.slug === p.category)!;
  const siblings = productsOf(p.category).filter((x) => x.slug !== p.slug);
  const dark = concept === "concept-b";
  return (
    <>
      <section className={sec}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={`relative aspect-[5/4] rounded-[var(--c-radius)] ${dark ? "bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#e9edf5_70%)]" : "bg-[var(--c-alt)]"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(p.image)} alt={p.name} className="absolute inset-0 m-auto max-h-[82%] max-w-[82%] object-contain" />
          </div>
          <div>
            <Link href={href(concept, `products/${c.slug}`)} className="text-[14px] font-semibold text-sky-600 hover:underline">
              {c.name}
            </Link>
            <h2 className="mt-2 text-[30px] font-semibold leading-tight tracking-[-0.02em] text-[var(--c-heading)] lg:text-[40px]">{p.name}</h2>
            <p className="mt-1 text-[15px] font-medium text-muted">{p.nameEn}</p>
            <div className="prose-ko mt-6 text-[16px] leading-[1.85] text-ink/85">
              {p.intro.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={href(concept, "support/inquiry")}>제품 문의하기</ButtonLink>
              {p.spec && (
                <a href="#spec" className="inline-flex h-12 items-center rounded-[var(--c-radius)] border border-line px-6 text-[15px] font-semibold text-ink transition-colors hover:border-navy hover:text-navy">
                  스펙 보기
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {(p.features.length > 0 || p.extraLists?.length) && (
        <section className="bg-[var(--c-alt)]">
          <div className={`${sec} grid gap-10 ${p.extraLists?.length ? "lg:grid-cols-2" : ""}`}>
            {p.features.length > 0 && (
              <div>
                <SectionTitle eyebrow="Features" title={p.featuresTitle ?? "제품 특징"} />
                <ul className="mt-8 border-t border-ink">
                  {p.features.map((f, i) => (
                    <li key={f} className="flex gap-6 border-b border-line py-5 text-[15.5px] leading-relaxed text-ink">
                      <span className="pt-0.5 text-[13px] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {p.extraLists?.map((l) => (
              <div key={l.title}>
                <SectionTitle eyebrow="Options" title={l.title} />
                <ul className="mt-8 border-t border-ink">
                  {l.items.map((f) => (
                    <li key={f} className="border-b border-line py-5 text-[15.5px] leading-relaxed text-ink">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.compare && (
        <section className={sec}>
          <SectionTitle eyebrow="Process" title="기존 공정과 FILTER REACTOR 공정 비교" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {p.compare.map((x) => (
              <figure key={x.title} className="rounded-[var(--c-radius)] border border-line p-5">
                <ZoomImage src={x.image} alt={x.title} className="mx-auto w-fit" imgClass="mx-auto w-full max-w-[313px]" />
                <figcaption className="mt-4 text-center text-[15.5px] font-semibold text-ink">{x.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {p.uses.length > 0 && (
        <section className={p.compare ? "bg-[var(--c-alt)]" : ""}>
          <div className={sec}>
            <SectionTitle eyebrow="Applications" title={p.usesTitle ?? "제품 용도"} />
            <ul className={`mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${dark ? "bg-white/10" : "border border-line bg-line"}`}>
              {p.uses.map((u, i) => (
                <li key={u.title} className={`p-6 lg:p-7 ${dark ? "bg-deep text-white" : "bg-white"}`}>
                  <span className={`text-[12px] tabular-nums ${dark ? "text-sky" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 text-[17px] font-semibold leading-snug tracking-[-0.02em]">{u.title}</p>
                  {u.text && <p className={`mt-2 text-[14px] leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>{u.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {p.steps && (
        <section className="bg-[var(--c-alt)]">
          <div className={sec}>
            <SectionTitle eyebrow="Operation" title={`${p.name} ${p.nameEn} 구동 과정`} />
            <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
              {p.steps.map((s) => (
                <li key={s.title} className="rounded-[var(--c-radius)] bg-white p-2">
                  <ZoomImage src={s.image} alt={`${p.name} 구동 ${s.title}`} imgClass="w-full" />
                  <p className="py-2 text-center text-[13px] font-semibold tracking-[0.08em] text-navy">{s.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {p.spec && (
        <section id="spec" className={sec}>
          <SectionTitle eyebrow="Specification" title="스펙" />
          <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <SpecTable spec={p.spec} caption={`${p.name} 모델별 스펙`} />
              <p className="mt-3 text-[13px] text-muted lg:hidden">표를 좌우로 밀어 전체 항목을 확인할 수 있습니다.</p>
            </div>
            {p.spec.drawing && (
              <figure className="rounded-[var(--c-radius)] border border-line bg-white p-4">
                <ZoomImage src={p.spec.drawing} alt={`${p.name} 도면`} className="mx-auto w-fit" imgClass="mx-auto max-h-[420px] w-auto" />
                <figcaption className="mt-3 text-center text-[13px] text-muted">도면</figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="border-t border-line">
          <div className={sec}>
            <SectionTitle eyebrow={c.nameEn} title={`${c.name}의 다른 제품`} />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <ProductCard concept={concept} p={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <InquiryBand concept={concept} />
    </>
  );
}

export function InquiryBand({ concept }: { concept: Concept }) {
  const dark = concept === "concept-b";
  return (
    <section className={dark ? "bg-deep text-white" : "bg-navy text-white"}>
      <div className="wrap flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
        <div>
          <p className="text-[22px] font-semibold lg:text-[26px]">공정에 맞는 장비와 엔지니어링이 필요하신가요?</p>
          <p className="mt-2 text-[15px] text-white/70">사업·제품 문의를 남겨 주시면 담당 부서에서 확인 후 연락드립니다.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={href(concept, "support/inquiry")} variant="light">
            사업·제품 문의
          </ButtonLink>
          <ButtonLink to={href(concept, "support/contact")} variant="ghost-light">
            담당 연락처
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
