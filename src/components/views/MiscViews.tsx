import Link from "next/link";
import { CATALOG_URL, CHANNELS, COMPANY, NAV, PRIVACY_COLLECTION, UTIL_NAV } from "@/content/ko/common";
import { internalNews, typeLabel } from "@/content/ko/news";
import { href, img, type Concept } from "@/lib/site";
import type { NewsItem } from "@/lib/types";
import { SectionTitle } from "@/components/shared/PageShell";
import { ButtonLink } from "@/components/shared/Widgets";
import NewsList from "@/components/shared/NewsList";
import InquiryForm from "@/components/shared/InquiryForm";
import { ArrowUpRight, DocIcon, MailIcon, PhoneIcon } from "@/components/shared/Icons";

const sec = "wrap py-16 lg:py-24";
const URL_RE = /^https?:\/\/\S+$/;

export function Channels({ concept }: { concept: Concept }) {
  const dark = concept === "concept-b";
  return (
    <ul className={`grid border-t sm:grid-cols-3 ${dark ? "border-white/15" : "border-line"}`}>
      {CHANNELS.map((ch, i) => (
        <li key={ch.key} className={`border-b sm:border-b-0 ${i > 0 ? (dark ? "sm:border-l sm:border-white/15" : "sm:border-l sm:border-line") : ""} ${dark ? "border-white/15" : "border-line"}`}>
          <a
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-between gap-4 py-5 sm:px-6 sm:first:pl-0 ${i === 0 ? "sm:pl-0" : ""} ${dark ? "text-white" : "text-ink"}`}
          >
            <span>
              <span className={`block text-[12px] font-medium uppercase tracking-[0.14em] ${dark ? "text-white/45" : "text-muted"}`}>{ch.short}</span>
              <span className="mt-1 block text-[16px] font-medium">{ch.label}</span>
            </span>
            <ArrowUpRight className={`size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${dark ? "text-white/60" : "text-muted"}`} />
            <span className="sr-only">(새 창)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function NewsIndex({ concept }: { concept: Concept }) {
  return (
    <>
      <section className={sec}>
        <NewsList concept={concept} />
      </section>
      <section className="bg-[var(--c-alt)]">
        <div className="wrap py-14 lg:py-16">
          <SectionTitle eyebrow="Official Channels" title="JP이노베이션 공식 채널" />
          <div className="mt-8">
            <Channels concept={concept} />
          </div>
        </div>
      </section>
    </>
  );
}

function Body({ lines }: { lines: string[] }) {
  return (
    <div className="prose-ko text-[16px] leading-[1.9] text-ink/85">
      {lines.map((l, i) =>
        URL_RE.test(l) ? (
          <p key={i}>
            <a href={l} target="_blank" rel="noopener noreferrer" className="break-all text-navy underline underline-offset-2">
              {l}
            </a>
          </p>
        ) : (
          <p key={i}>{l}</p>
        ),
      )}
    </div>
  );
}

export function NewsDetail({ concept, n }: { concept: Concept; n: NewsItem }) {
  const i = internalNews.findIndex((x) => x.id === n.id);
  const newer = internalNews[i - 1];
  const older = internalNews[i + 1];
  const tall = n.type === "newsletter";
  return (
    <>
      <article className="wrap max-w-[960px] py-14 lg:py-20">
        <header className="border-b-2 border-[var(--c-heading)] pb-6">
          <p className="flex items-center gap-3 text-[14px]">
            <span className="rounded-[var(--c-radius)] bg-navy px-2 py-1 text-[12px] font-semibold text-white">{typeLabel(n.type)}</span>
            <time dateTime={n.date} className="text-muted">
              {n.date.replaceAll("-", ".")}
            </time>
          </p>
          <h2 className="mt-4 text-[24px] font-semibold leading-snug tracking-[-0.02em] text-ink lg:text-[32px]">{n.title}</h2>
        </header>

        {n.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img(n.image)} alt={tall ? `${n.title} 뉴스레터 본문 이미지` : ""} className={`mx-auto mt-10 w-full ${tall ? "max-w-[800px]" : "rounded-[var(--c-radius)]"}`} />
        )}

        {n.embedPage && (
          <div className="mt-10 rounded-[var(--c-radius)] bg-[var(--c-alt)] p-8 text-center">
            <p className="text-[15.5px] text-ink">이 호는 웹페이지 형식으로 발행되었습니다.</p>
            <div className="mt-5">
              <ButtonLink to={n.embedPage} external>
                뉴스레터 보기
              </ButtonLink>
            </div>
          </div>
        )}

        {n.body.length > 0 && (
          <div className="mt-10">
            <Body lines={n.body} />
          </div>
        )}

        {n.links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
            {n.links.map((l) => (
              <ButtonLink key={l} to={l} variant="outline" external>
                {l.includes("linkedin") ? "LinkedIn 원문 보기" : l.includes("youtube") ? "YouTube 영상 보기" : "관련 링크"}
              </ButtonLink>
            ))}
          </div>
        )}
      </article>

      <nav aria-label="이전⁠·⁠다음 소식" className="border-t border-line">
        <div className="wrap max-w-[960px] divide-y divide-line">
          {[
            { k: "다음 글", item: newer },
            { k: "이전 글", item: older },
          ].map(({ k, item }) => (
            <div key={k} className="grid grid-cols-[72px_1fr] items-center gap-3 py-4 text-[15px]">
              <span className="text-[13px] text-muted">{k}</span>
              {item ? (
                <Link href={href(concept, `news/${item.id}`)} className="truncate text-ink hover:text-navy">
                  {item.title}
                </Link>
              ) : (
                <span className="text-muted/70">없음</span>
              )}
            </div>
          ))}
        </div>
        <div className="py-10 text-center">
          <ButtonLink to={href(concept, "news")} variant="outline">
            목록으로
          </ButtonLink>
        </div>
      </nav>
    </>
  );
}

export function Inquiry() {
  return (
    <section className={sec}>
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-20">
        <aside>
          <SectionTitle eyebrow="Inquiry" title="사업⁠·⁠제품 문의" desc="엔지니어링⁠·⁠장비⁠·⁠건설 관련 문의를 남겨 주세요." />
          <ul className="mt-8 space-y-3 text-[15px]">
            <li className="flex items-center gap-3">
              <PhoneIcon className="size-5 text-sky-600" />
              <a href={`tel:${COMPANY.sites[0].tel}`} className="hover:text-navy">
                {COMPANY.sites[0].tel}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="size-5 text-sky-600" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-navy">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <DocIcon className="size-5 text-sky-600" />
              <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
                e-카탈로그 보기<span className="sr-only">(새 창)</span>
              </a>
            </li>
          </ul>
        </aside>
        <InquiryForm />
      </div>
    </section>
  );
}

export function Contact({ concept }: { concept: Concept }) {
  const dark = concept === "concept-b";
  return (
    <>
      <section className={sec}>
        <SectionTitle eyebrow="Contact" title="담당 연락처" desc="사업장별 대표 연락처입니다." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {COMPANY.sites.map((s) => (
            <article key={s.key} className={`rounded-[var(--c-radius)] p-7 lg:p-10 ${dark ? "bg-deep text-white" : "border border-line bg-white"}`}>
              <p className={`sub-eyebrow text-[13px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-sky" : "text-sky-600"}`}>{s.key === "hq" ? "Head Office" : "R&D Center"}</p>
              <h3 className="mt-2 text-[22px] font-semibold">{s.fullName}</h3>
              <p className={`mt-2 text-[14.5px] ${dark ? "text-white/65" : "text-muted"}`}>{s.address}</p>
              <dl className={`mt-6 space-y-3 border-t pt-6 text-[16px] ${dark ? "border-white/12" : "border-line"}`}>
                <div className="flex gap-4">
                  <dt className="w-12 font-semibold">Tel</dt>
                  <dd>
                    <a href={`tel:${s.tel}`} className="hover:text-sky">
                      {s.tel}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-12 font-semibold">Fax</dt>
                  <dd>{s.fax}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-12 font-semibold">Email</dt>
                  <dd>
                    <a href={`mailto:${COMPANY.email}`} className="hover:text-sky">
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-muted">부서⁠·⁠담당자별 연락처는 확정 후 추가됩니다.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to={href(concept, "support/inquiry")}>사업⁠·⁠제품 문의하기</ButtonLink>
          <ButtonLink to={href(concept, "company/location")} variant="outline">
            오시는 길
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <section className="wrap max-w-[960px] py-16 lg:py-24">
      <div className="rounded-[var(--c-radius)] border border-sky/40 bg-sky/5 p-6 text-[15px] leading-relaxed">
        개인정보처리방침 전문은 확정 후 게재됩니다. 아래는 현재 홈페이지 문의 양식에 안내된 개인정보 수집 내용입니다.
      </div>
      <h2 className="mt-10 text-[20px] font-semibold text-[var(--c-heading)]">문의 시 개인정보 수집 안내</h2>
      <ul className="mt-4 space-y-2 text-[15.5px] leading-relaxed text-ink/85">
        {PRIVACY_COLLECTION.map((l) => (
          <li key={l}>· {l}</li>
        ))}
      </ul>
    </section>
  );
}

export function Sitemap({ concept }: { concept: Concept }) {
  return (
    <section className={sec}>
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {NAV.map((m) => (
          <li key={m.key} className="border-t-2 border-[var(--c-heading)] pt-4">
            <Link href={href(concept, m.path)} className="text-[20px] font-semibold text-[var(--c-heading)] hover:underline">
              {m.label}
            </Link>
            {(m.children?.length ?? 0) > 1 && (
              <ul className="mt-4 space-y-2 text-[15.5px]">
                {m.children!.map((c) => (
                  <li key={c.key}>
                    <Link href={href(concept, c.path)} className="text-muted hover:text-navy">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li className="border-t-2 border-line pt-4">
          <p className="text-[20px] font-semibold text-ink">기타</p>
          <ul className="mt-4 space-y-2 text-[15.5px]">
            {UTIL_NAV.map((u) => (
              <li key={u.key}>
                <Link href={href(concept, u.path)} className="text-muted hover:text-navy">
                  {u.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}
