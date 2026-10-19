import Link from "next/link";
import { CERT_GROUPS, CERTIFICATIONS, EPC_RECORDS, PROJECTS, RECORD_TABS, projectMeta } from "@/content/ko/tech";
import { href, img, type Concept } from "@/lib/site";
import type { Project } from "@/lib/types";
import { SectionTitle } from "@/components/shared/PageShell";
import { ButtonLink, ZoomImage } from "@/components/shared/Widgets";
import { ArrowRight } from "@/components/shared/Icons";
import RecordsTable from "@/components/shared/RecordsTable";

const sec = "wrap py-16 lg:py-24";

export function Certifications() {
  return (
    <section className={sec}>
      <div className="space-y-16">
        {CERT_GROUPS.map((g) => {
          const list = CERTIFICATIONS.filter((c) => c.group === g.key);
          return (
            <div key={g.key}>
              <h2 className="flex items-baseline gap-3 border-b-2 border-[var(--c-heading)] pb-3 text-[22px] font-semibold text-[var(--c-heading)]">
                {g.title}
                <span className="text-[14px] font-medium text-muted">{list.length}건</span>
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {list.map((c) => (
                  <li key={c.id}>
                    <div className="rounded-[var(--c-radius)] border border-line bg-[var(--c-alt)] p-3">
                      <ZoomImage src={c.image} alt={c.name} imgClass="aspect-[340/479] w-full bg-white object-contain shadow-[0_6px_18px_-10px_rgba(20,23,43,0.35)]" />
                    </div>
                    <p className="mt-3 text-[14.5px] font-semibold leading-snug text-ink">{c.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Projects({ concept }: { concept: Concept }) {
  const years = EPC_RECORDS.map((r) => Number(r.year));
  return (
    <>
      <section className={sec}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="Projects" title="주요 수행실적" />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-muted lg:justify-end">
            {RECORD_TABS.map((t) => (
              <li key={t.key}>
                {t.label} <span className="font-semibold tabular-nums text-ink">{t.count}건</span>
              </li>
            ))}
            <li className="tabular-nums">
              {Math.min(...years)}–{Math.max(...years)}
            </li>
          </ul>
        </div>
        <ul className="mt-10 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <Link href={href(concept, `tech/projects/${p.id}`)} className="group block">
                <div className="overflow-hidden rounded-[var(--c-radius)] bg-mist">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p.image)} alt="" loading="lazy" className="aspect-[449/287] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12.5px] font-semibold tabular-nums text-sky-600">{projectMeta(p)}</p>
                    <h3 className="mt-1 text-[16.5px] font-semibold leading-snug text-ink group-hover:text-navy">{p.name}</h3>
                  </div>
                  <ArrowRight className="mt-6 size-4 shrink-0 text-navy transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="records" className="bg-[var(--c-alt)]">
        <div className={sec}>
          <SectionTitle eyebrow="Delivery Records" title="납품 실적" />
          <div className="mt-10 rounded-[var(--c-radius)] bg-white p-4 sm:p-6 lg:p-10">
            <RecordsTable />
          </div>
        </div>
      </section>
    </>
  );
}

export function ProjectDetail({ concept, p }: { concept: Concept; p: Project }) {
  const i = PROJECTS.findIndex((x) => x.id === p.id);
  const prev = PROJECTS[i - 1];
  const next = PROJECTS[i + 1];
  return (
    <>
      <section className={sec}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <figure className="overflow-hidden rounded-[var(--c-radius)] bg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(p.image)} alt={`${p.name} 사진`} width={449} height={287} className="aspect-[449/287] w-full object-cover" />
          </figure>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--c-eyebrow)]">Project {String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-[28px] font-semibold leading-tight text-[var(--c-heading)] lg:text-[36px]">{p.name}</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
              {[
                ["수행 연도", p.year],
                ["산업 분야", p.industry],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[132px_1fr] gap-3 py-4">
                    <dt className="font-semibold text-ink">{k}</dt>
                    <dd className="text-ink/85">{v}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-8">
              <ButtonLink to={href(concept, "tech/projects")} variant="outline">
                수행실적 목록
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <nav aria-label="이전·다음 수행실적" className="border-t border-line">
        <div className="wrap grid grid-cols-2">
          {prev ? (
            <Link href={href(concept, `tech/projects/${prev.id}`)} className="group py-8 pr-4">
              <span className="text-[13px] text-muted">이전 실적</span>
              <span className="mt-1 block text-[16px] font-semibold text-ink group-hover:text-navy">← {prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={href(concept, `tech/projects/${next.id}`)} className="group border-l border-line py-8 pl-4 text-right">
              <span className="text-[13px] text-muted">다음 실적</span>
              <span className="mt-1 block text-[16px] font-semibold text-ink group-hover:text-navy">{next.name} →</span>
            </Link>
          ) : (
            <span className="border-l border-line" />
          )}
        </div>
      </nav>
    </>
  );
}
