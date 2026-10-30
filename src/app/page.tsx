import Link from "next/link";
import { CONCEPTS, CONCEPT_LABEL, href, img } from "@/lib/site";
import Logo from "@/components/shared/Logo";
import { ArrowRight } from "@/components/shared/Icons";

const PREVIEW = {
  "concept-a": { image: "video/brand-film-poster.jpg", dark: false },
  "concept-b": { image: "visual/sec01-bg02.jpg", dark: true },
} as const;

export default function Chooser() {
  return (
    <main id="main" className="min-h-svh bg-white">
      <div className="wrap py-12 lg:py-20">
        <Logo />
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <h1 className="t-display text-[32px] text-ink lg:col-span-7 lg:text-[52px]">
            홈페이지 리뉴얼
            <br />
            국문 디자인 시안
          </h1>
          <p className="t-lead lg:col-span-4 lg:col-start-9">구조도 A안⁠(기업 신뢰⁠·⁠전문성 중심형) 기준. 같은 콘텐츠로 두 가지 디자인 컨셉을 비교하실 수 있습니다.</p>
        </div>

        <ul className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          {CONCEPTS.map((c) => {
            const p = PREVIEW[c];
            const l = CONCEPT_LABEL[c];
            return (
              <li key={c}>
                <Link href={href(c)} className="group block">
                  <div className={`relative aspect-[16/10] overflow-hidden bg-deep`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.image)} alt="" className={`size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${p.dark ? "opacity-70" : ""}`} />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-6 top-6 z-10 text-[13px] font-medium text-white">{l.name}</span>
                    <span className={`absolute bottom-6 left-6 z-10 text-[32px] font-semibold tracking-[-0.04em] lg:text-[44px] text-white`}>{l.title}</span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6 border-t border-ink pt-6">
                    <div>
                      <p className="text-[16px] leading-relaxed text-ink">{l.desc}</p>
                      <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-[14px] text-muted sm:grid-cols-2">
                        {l.points.map((x) => (
                          <li key={x}>— {x}</li>
                        ))}
                      </ul>
                    </div>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-20 border-t border-line pt-6 text-[13px] leading-relaxed text-muted">
          검토용 시안입니다. 검색엔진 색인에서 제외되어 있으며, 현재 운영 중인 jpinno.com 과는 별개입니다. 콘텐츠⁠·⁠이미지는 기존 국문 홈페이지 공개 자료를 사용했습니다.
        </p>
      </div>
    </main>
  );
}
