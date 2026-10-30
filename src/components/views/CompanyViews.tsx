import { CEO, CLIENT_GROUPS, HISTORY, ORG, ORG_CHART, OVERVIEW, VISION } from "@/content/ko/company";
import { COMPANY, EPC_SUMMARY } from "@/content/ko/common";
import { COMPANY_VIDEO } from "@/content/ko/news";
import { img, type Concept } from "@/lib/site";
import { SectionTitle } from "@/components/shared/PageShell";
import YouTubeFacade from "@/components/shared/YouTubeFacade";

const sec = "wrap py-16 lg:py-24";

export function Overview({ concept }: { concept: Concept }) {
  return (
    <>
      <section className={sec}>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionTitle eyebrow="Company Identity" title={COMPANY.tagline} />
            <ul className="mt-8 space-y-3 border-l-2 border-sky pl-5 text-[15.5px] leading-relaxed text-ink">
              {EPC_SUMMARY.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--c-radius)] border border-line bg-white p-6 lg:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(OVERVIEW.identityImage)} alt="Just Progress + INNOVATION — 멈추지 않는 진보와 정진, 끊임없는 혁신" width={600} height={280} className="mx-auto w-full max-w-[600px]" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-alt)]">
        <div className={sec}>
          <SectionTitle eyebrow="EPC Business" title="Global Standard Project 수행절차" />
          <ol className="mt-10 grid gap-3 sm:grid-cols-5">
            {OVERVIEW.epcSteps.map((s, i) => (
              <li key={s} className={`flex items-center gap-4 rounded-[var(--c-radius)] p-5 sm:flex-col sm:items-start ${concept === "concept-b" ? "bg-deep text-white" : "bg-white"}`}>
                <span className="text-[13px] font-semibold tracking-[0.12em] text-sky">STEP {String(i + 1).padStart(2, "0")}</span>
                <span className="text-[17px] font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={sec}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionTitle eyebrow="R&D Center" title={`${OVERVIEW.lab.title} ${OVERVIEW.lab.since}`} />
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">{OVERVIEW.lab.address}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {OVERVIEW.lab.photos.map((p, i) => (
              <li key={p} className="overflow-hidden rounded-[var(--c-radius)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(p)} alt={`동탄연구소 사진 ${i + 1}`} width={700} height={375} loading="lazy" className="aspect-[700/375] w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--c-alt)]">
        <div className={sec}>
          <SectionTitle eyebrow="Video" title={COMPANY_VIDEO.title} />
          <div className="mt-8 max-w-[960px]">
            <YouTubeFacade id={COMPANY_VIDEO.id} title={COMPANY_VIDEO.title} poster={img("equipment/greeting-fixed-img.jpg")} />
          </div>
        </div>
      </section>
    </>
  );
}

export function CeoMessage({ concept }: { concept: Concept }) {
  return (
    <>
      <section className={sec}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          <figure className="mx-auto w-full max-w-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(CEO.photo)} alt="대표이사 이제환" width={560} height={700} className="w-full rounded-[var(--c-radius)] bg-mist" />
          </figure>
          <div>
            <p className="sub-eyebrow text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--c-eyebrow)]">CEO Message</p>
            <h2 className="mt-3 text-[26px] font-semibold leading-snug tracking-[-0.02em] text-[var(--c-heading)] lg:text-[36px]">
              <span className="text-sky-600">기술</span>과 신뢰를 기반으로
              <br />
              글로벌 엔지니어링 기업으로
              <br className="hidden lg:block" /> 도약하겠습니다
            </h2>
            <div className="prose-ko mt-8 text-[16px] leading-[1.85] text-ink/85">
              {CEO.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-[17px] font-semibold text-ink">{CEO.sign}</p>
          </div>
        </div>
      </section>
      <section className={concept === "concept-b" ? "bg-deep text-white" : "bg-[var(--c-alt)]"}>
        <div className="wrap grid gap-4 py-14 md:grid-cols-2 lg:py-20">
          {CEO.values.map((v) => (
            <div key={v.title} className={`rounded-[var(--c-radius)] p-7 lg:p-10 ${concept === "concept-b" ? "border border-white/12" : "bg-white"}`}>
              <h3 className={`text-[20px] font-semibold ${concept === "concept-b" ? "text-white" : "text-navy"}`}>{v.title}</h3>
              <p className={`mt-3 text-[15.5px] leading-relaxed ${concept === "concept-b" ? "text-white/70" : "text-muted"}`}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Vision({ concept }: { concept: Concept }) {
  const dark = concept === "concept-b";
  return (
    <>
      <section className={sec}>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { k: "VISION", v: VISION.vision },
            { k: "MISSION", v: VISION.mission },
          ].map((x) => (
            <div key={x.k} className={`rounded-[var(--c-radius)] p-8 lg:p-12 ${x.k === "VISION" ? "bg-navy text-white" : dark ? "bg-deep text-white" : "bg-[var(--c-alt)]"}`}>
              <p className={`text-[13px] font-semibold tracking-[0.2em] ${x.k === "VISION" || dark ? "text-sky" : "text-sky-600"}`}>{x.k}</p>
              <p className="mt-4 text-[22px] font-semibold leading-snug lg:text-[30px]">{x.v}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[var(--c-alt)]">
        <div className={sec}>
          <SectionTitle eyebrow="Core Values" title="제이피이노베이션 핵심 가치" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VISION.values.map((v, i) => (
              <li key={v.en} className="flex flex-col rounded-[var(--c-radius)] bg-white p-7">
                <span className="text-[13px] font-semibold text-sky-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 text-[13px] font-semibold tracking-[0.12em] text-muted">{v.en}</p>
                <h3 className="mt-1 text-[24px] font-semibold text-[var(--c-heading)]">{v.ko}</h3>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-[14.5px] leading-relaxed text-muted">
                  {v.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export function History() {
  return (
    <>
      <section className={sec}>
        <SectionTitle eyebrow="History" title="연혁" />
        <ol className="mt-10 border-t-2 border-[var(--c-heading)]">
          {HISTORY.map((h) => (
            <li key={h.year} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[160px_1fr] lg:grid-cols-[220px_1fr] lg:py-8">
              <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-navy lg:text-[36px]">{h.year}</p>
              <ul className="space-y-2 text-[15.5px] leading-relaxed text-ink/85">
                {h.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-sky" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section id="organization" className="bg-[var(--c-alt)]">
        <div className={sec}>
          <SectionTitle eyebrow="Organization" title="조직도" />
          <div className="mt-10 rounded-[var(--c-radius)] bg-white p-5 lg:p-10">
            <div className="space-y-10">
              {ORG.map((g) => (
                <div key={g.role} className="grid gap-5 lg:grid-cols-[200px_1fr] lg:items-start">
                  <p className="w-fit rounded-[var(--c-radius)] bg-sky-600 px-6 py-3 text-[18px] font-semibold text-white lg:w-full lg:text-center">
                    {g.ceo} <span className="text-[14px] font-medium text-white/85">({g.role})</span>
                  </p>
                  <ul className={`grid gap-5 ${g.divisions.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {g.divisions.map((d) => (
                      <li key={d.name} className="rounded-[var(--c-radius)] border border-line">
                        <p className="bg-navy px-4 py-3 text-center text-[16px] font-semibold text-white">{d.name}</p>
                        <div className="flex flex-wrap gap-2 p-4">
                          {d.units.map((u, i) => (
                            <div key={i} className="min-w-[110px] flex-1">
                              {u.name && <p className="mb-2 border-t-2 border-sky-600 bg-mist px-2 py-2 text-center text-[14px] font-semibold text-navy">{u.name}</p>}
                              <ul className="space-y-2">
                                {u.teams.map((t) => (
                                  <li key={t} className="rounded-[var(--c-radius)] border border-line px-2 py-2 text-center text-[14px] text-ink">
                                    {t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-right">
              <a href={img(ORG_CHART)} target="_blank" rel="noopener" className="text-[13.5px] text-muted underline underline-offset-2 hover:text-navy">
                조직도 원본 이미지 보기<span className="sr-only">(새 창)</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Clients() {
  return (
    <section className={sec}>
      <SectionTitle eyebrow="Clients" title="JP이노베이션과 함께하는 고객사" />
      <div className="mt-10 space-y-12">
        {CLIENT_GROUPS.map((g) => (
          <div key={g.title}>
            <h3 className="flex items-baseline gap-3 border-b-2 border-[var(--c-heading)] pb-3 text-[19px] font-semibold text-[var(--c-heading)]">
              {g.title}
              <span className="text-[14px] font-medium text-muted">{g.clients.length}</span>
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {g.clients.map((c) => (
                <li key={c.logo} className="flex aspect-[270/90] items-center justify-center rounded-[var(--c-radius)] border border-line bg-white px-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(c.logo)} alt={c.name} width={270} height={70} loading="lazy" className="max-h-full w-auto" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section className={sec}>
      <div className="space-y-16">
        {COMPANY.sites.map((s) => (
          <article key={s.key} id={s.key} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <p className="sub-eyebrow text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--c-eyebrow)]">{s.key === "hq" ? "Head Office" : "R&D Center"}</p>
              <h2 className="mt-2 text-[26px] font-semibold text-[var(--c-heading)] lg:text-[30px]">{s.fullName}</h2>
              <dl className="mt-8 divide-y divide-line border-y border-line text-[15px]">
                {[
                  ["주소", s.address],
                  ["Tel", s.tel],
                  ["Fax", s.fax],
                  ["대중교통", s.transit.join(" / ")],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[88px_1fr] gap-3 py-4">
                    <dt className="font-semibold text-ink">{k}</dt>
                    <dd className="text-muted">{k === "Tel" ? <a href={`tel:${v}`} className="hover:text-navy">{v}</a> : v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={`https://map.naver.com/p/search/${encodeURIComponent(s.address.replace(/\u2060/g, "").replace(/ \d{4}-\d{4}호$/, ""))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-[var(--c-radius)] border border-navy px-6 text-[15px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                네이버 지도에서 길찾기<span className="sr-only">(새 창)</span>
              </a>
            </div>
            <div className="overflow-hidden rounded-[var(--c-radius)] border border-line bg-mist">
              <iframe src={s.mapEmbed} title={`${s.fullName} 지도`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full lg:aspect-[16/10]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
