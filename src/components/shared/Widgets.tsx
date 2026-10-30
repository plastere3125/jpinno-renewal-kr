import Link from "next/link";
import { href, img, type Concept } from "@/lib/site";
import type { NewsItem, Product, Spec } from "@/lib/types";
import { typeLabel } from "@/content/ko/news";
import { ArrowRight, ArrowUpRight, PlayIcon, ZoomIcon } from "./Icons";

/** 이미지 원본 새 창 보기 (도면·인증서 확대용) */
export function ZoomImage({ src, alt, className = "", imgClass = "" }: { src: string; alt: string; className?: string; imgClass?: string }) {
  return (
    <a href={img(src)} target="_blank" rel="noopener" className={`group relative block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(src)} alt={alt} loading="lazy" className={imgClass} />
      <span className="absolute bottom-2 right-2 inline-flex size-8 items-center justify-center bg-white/90 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <ZoomIcon className="size-4" />
        <span className="sr-only">크게 보기 (새 창)</span>
      </span>
    </a>
  );
}

export function SpecTable({ spec, caption }: { spec: Spec; caption: string }) {
  return (
    <div className="table-scroll border-t border-ink">
      <table className="w-full min-w-[640px] border-collapse text-center text-[14px] tabular-nums">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {spec.columns.map((c) => (
              <th key={c} scope="col" className="whitespace-nowrap border-b border-line px-3 py-3.5 text-[13px] font-semibold text-ink">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spec.rows.map((r) => (
            <tr key={r[0]} className="border-b border-line transition-colors hover:bg-[var(--c-alt)]">
              {r.map((v, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="whitespace-nowrap px-3 py-3 text-left font-medium text-ink">
                    {v}
                  </th>
                ) : (
                  <td key={i} className="whitespace-nowrap px-3 py-3 text-muted">
                    {v}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductCard({ concept, p, dark }: { concept: Concept; p: Product; dark?: boolean }) {
  return (
    <Link href={href(concept, `products/${p.category}/${p.slug}`)} className="group flex h-full flex-col">
      <div className={`relative aspect-[4/3] overflow-hidden ${dark ? "bg-white" : "bg-[var(--c-alt)]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(p.image)}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 m-auto max-h-[78%] max-w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className={`flex flex-1 flex-col pt-5 ${dark ? "text-white" : ""}`}>
        <p className={`text-[12px] font-medium tracking-[0.06em] ${dark ? "text-white/50" : "text-muted"}`}>{p.nameEn}</p>
        <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.02em]">{p.name}</h3>
        <p className={`mt-2 flex-1 text-[14px] leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>{p.summary}</p>
        <span className={`mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium ${dark ? "text-white" : "text-ink"}`}>
          자세히 보기
        </span>
      </div>
    </Link>
  );
}

/** 이미지가 없는 게시물: 무채색 타이포 타일 */
function NewsTile({ n, dark }: { n: NewsItem; dark?: boolean }) {
  const issue = n.type === "newsletter" ? n.title.match(/^(\d+)호/)?.[1] : null;
  const label = { newsletter: "Newsletter", news: "News", blog: "Naver Blog", video: "YouTube" }[n.type];
  const video = n.type === "video";
  return (
    <div className={`flex size-full flex-col justify-between p-5 ${video ? "bg-deep text-white" : dark ? "bg-deep-2 text-white" : "bg-[#eceef3] text-ink"}`}>
      <p className={`text-[11.5px] font-semibold uppercase tracking-[0.16em] ${video || dark ? "text-white/55" : "text-muted"}`}>{label}</p>
      {issue ? (
        <p className="text-[56px] font-semibold leading-none tracking-[-0.05em]">
          {issue}
          <span className="ml-1 text-[18px] font-medium tracking-normal">호</span>
        </p>
      ) : video ? (
        <span className="flex size-12 items-center justify-center rounded-full border border-white/40">
          <PlayIcon className="ml-0.5 size-4" />
        </span>
      ) : (
        <p className="text-[13px] leading-snug opacity-70">blog.naver.com/jpinno</p>
      )}
    </div>
  );
}

/** 홍보센터 카드: 내부 게시물은 상세로, 블로그·영상은 원문(새 창)으로 */
export function NewsCard({ concept, n, dark }: { concept: Concept; n: NewsItem; dark?: boolean }) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        {n.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img(n.thumb)} alt="" loading="lazy" className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
        ) : (
          <NewsTile n={n} dark={dark} />
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className={`flex items-center gap-2 text-[12.5px] ${dark ? "text-white/55" : "text-muted"}`}>
          <span className={`font-semibold ${dark ? "text-sky" : "text-navy"}`}>{typeLabel(n.type)}</span>
          <span aria-hidden>·</span>
          <time dateTime={n.date}>{n.date.replaceAll("-", ".")}</time>
          {n.external && <ArrowUpRight className="ml-auto size-3.5" />}
        </p>
        <h3 className={`mt-2 line-clamp-2 text-[16px] font-medium leading-[1.5] tracking-[-0.01em] transition-colors ${dark ? "text-white group-hover:text-sky" : "text-ink group-hover:text-navy"}`}>
          {n.title}
        </h3>
      </div>
    </>
  );
  const cls = "group flex h-full flex-col";
  return n.external ? (
    <a href={n.external} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
      <span className="sr-only">({typeLabel(n.type)} 원문, 새 창)</span>
    </a>
  ) : (
    <Link href={href(concept, `news/${n.id}`)} className={cls}>
      {inner}
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  external,
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost-light";
  external?: boolean;
}) {
  const cls = {
    primary: "bg-navy text-white hover:bg-navy-700",
    outline: "border border-ink/20 text-ink hover:border-ink",
    light: "bg-white text-ink hover:bg-white/90",
    "ghost-light": "border border-white/30 text-white hover:border-white",
  }[variant];
  const c = `group inline-flex h-12 items-center gap-3 rounded-[var(--c-radius)] px-6 text-[14.5px] font-medium transition-colors ${cls}`;
  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={c}>
      {children}
      <ArrowUpRight className="size-3.5" />
      <span className="sr-only">(새 창)</span>
    </a>
  ) : (
    <Link href={to} className={c}>
      {children}
      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
