import Link from "next/link";
import { BUSINESSES } from "@/content/ko/business";
import { PRODUCT_CATEGORIES } from "@/content/ko/products";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";
import { ButtonLink } from "@/components/shared/Widgets";

const C: Concept = "concept-a";

/**
 * 메인 디자인 2안 — 장비의 정밀함을 보여주는 비대칭 구성 (2026-11-12 내부 시안)
 * - 화면을 44 : 56으로 가르는 하나의 세로 기준선. 왼쪽은 여백이 넓은 타이포그래피(로고와 같은 시작선),
 *   오른쪽은 화면 끝까지 이어지는 회색 면 위에 실제 장비(필터 리액터 누끼, 형태·라벨 그대로)를 크게 세운다.
 * - 첫 스크롤의 제품·사업분야 진입점도 같은 기준선(왼쪽 글, 오른쪽 이미지)을 이어받는다.
 * - 문구: 제목은 기존 회사소개 문장("핵심 공정장비를 자체 기술로 설계하고 제작합니다")을 재편집,
 *   장비 캡션·인증 표기는 제품·인증 데이터의 실제 값.
 * - 모바일: 글 → 장비 면(왼쪽을 비우고 오른쪽 끝까지) → 설명 순서로 다시 구성.
 */
const SPLIT = "lg:grid-cols-[44%_56%]";
const LEFT = "px-4 sm:px-6 lg:pl-[max(40px,calc((100vw-1320px)/2+40px))] lg:pr-16 xl:pr-24";
const PANEL = "bg-[#eceef2]";

export default function DesignTwo() {
  const cats = PRODUCT_CATEGORIES;
  return (
    <>
      <section id="hero-d2" className={`relative grid bg-white lg:h-[calc(100svh-var(--header-h))] lg:min-h-[620px] ${SPLIT}`}>
        {/* 왼쪽: 타이포그래피 */}
        <div className={`${LEFT} order-1 flex flex-col justify-center pb-8 pt-10 lg:py-16`}>
          <p className="eyebrow">Process Equipment · EPC</p>
          <h1 className="mt-5 text-ink lg:mt-7">
            <span className="block text-[19px] font-light leading-snug tracking-[-0.03em] text-ink/70 sm:text-[24px] lg:text-[28px]">자체 기술로 설계하고 제작하는</span>
            <span className="mt-1.5 block text-[42px] font-bold leading-[1.1] tracking-[-0.05em] sm:text-[56px] lg:mt-2 lg:text-[64px] xl:text-[72px]">핵심 공정장비</span>
          </h1>
          <div className="hidden lg:block">
            <Intro />
          </div>
        </div>

        {/* 오른쪽: 장비 면(화면 오른쪽 끝·위아래 끝까지) */}
        <div className={`relative order-2 ml-12 aspect-[4/5] sm:ml-24 sm:aspect-[5/4] lg:ml-0 lg:aspect-auto lg:h-full ${PANEL}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img("home/d2-fr.webp")}
            alt="JP이노베이션 필터 리액터"
            className="absolute bottom-[15%] left-1/2 h-[74%] w-auto max-w-none -translate-x-1/2 lg:bottom-[5%] lg:left-[54%] lg:h-[90%]"
          />
          <div className="absolute bottom-4 left-4 text-[12px] leading-relaxed text-ink/70 lg:bottom-8 lg:left-10 lg:text-[13px]">
            <p className="font-semibold text-ink">필터 리액터 Filter Reactor</p>
            <p>JP이노베이션 특허 장비 · JPIFR 10~20 m³</p>
          </div>
        </div>

        {/* 모바일: 설명은 장비 아래 */}
        <div className="order-3 px-4 pb-14 pt-8 sm:px-6 lg:hidden">
          <Intro />
        </div>
      </section>

      {/* 첫 스크롤: 같은 기준선 — 공정장비 */}
      <section aria-labelledby="d2-products" className="border-t border-line bg-white">
        <div className={`grid ${SPLIT}`}>
          <div className={`${LEFT} py-16 lg:py-28`}>
            <p className="eyebrow">Products</p>
            <h2 id="d2-products" className="t-section mt-4 text-ink">
              공정장비
            </h2>
            <p className="mt-5 max-w-[26em] text-[15.5px] leading-relaxed text-muted lg:text-[16.5px]">
              끊임없는 연구와 축적된 경험을 바탕으로 핵심 공정장비를 자체 기술로 설계하고 제작합니다.
            </p>
            <Link href={href(C, "products/reactor")} className="link-arrow mt-8 text-ink">
              제품소개
            </Link>
          </div>
          <ul className="ml-12 grid grid-cols-2 gap-px bg-line sm:ml-24 sm:grid-cols-3 lg:ml-0">
            {cats.map((c) => (
              <li key={c.slug} className="bg-white">
                <Link href={href(C, `products/${c.slug}`)} className="group flex h-full flex-col">
                  <span className={`relative block aspect-square ${PANEL}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(c.image)} alt="" loading="lazy" className="absolute inset-0 m-auto max-h-[74%] max-w-[74%] object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
                  </span>
                  <span className="flex items-center justify-between gap-2 px-4 py-4 lg:px-5">
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{c.nameEn}</span>
                      <span className="mt-1 block text-[16px] font-semibold text-ink lg:text-[17px]">{c.name}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-ink/40 transition-colors group-hover:text-navy" />
                  </span>
                </Link>
              </li>
            ))}
            <li className="bg-navy">
              <Link href={href(C, "support/inquiry")} className="group flex h-full min-h-40 flex-col justify-between p-5 text-white">
                <span className="text-[13px] text-white/70">공정 조건에 맞는 장비 상담</span>
                <span className="flex items-center gap-2 text-[17px] font-semibold">
                  사업⁠·⁠제품 문의 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 같은 기준선 — 사업분야 */}
      <section aria-labelledby="d2-business" className="bg-white">
        <div className={`grid ${SPLIT}`}>
          <div className={`${LEFT} py-16 lg:py-28`}>
            <p className="eyebrow">Business</p>
            <h2 id="d2-business" className="t-section mt-4 text-ink">
              플랜트 EPC
            </h2>
            <p className="mt-5 max-w-[26em] text-[15.5px] leading-relaxed text-muted lg:text-[16.5px]">
              엔지니어링설계, 장비제작, 시공 및 사후관리까지 <span className="whitespace-nowrap">EPC(Turn-Key)</span> 사업을 수행합니다.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {BUSINESSES.map((b) => (
                <li key={b.slug}>
                  <Link href={href(C, `business/${b.slug}`)} className="text-ink/80 transition-colors hover:text-navy">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href={href(C, "business/epc-engineering")} className="group relative ml-12 block aspect-[4/3] overflow-hidden bg-deep sm:ml-24 lg:ml-0 lg:aspect-auto lg:min-h-[560px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img("home/d1-epc.jpg")} alt="전자소재 공정 클린룸 설비" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute bottom-0 left-0 flex items-center gap-2 bg-white px-5 py-4 text-[15px] font-semibold text-ink lg:px-8 lg:py-5 lg:text-[17px]">
              EPC 엔지니어링 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

function Intro() {
  return (
    <>
      <p className="mt-7 max-w-[30em] text-[15.5px] leading-[1.75] text-muted lg:mt-9 lg:text-[16.5px]">
        반응기, 여과기, 건조기, 믹서부터 플랜트의 엔지니어링설계, 시공 및 사후관리까지. 제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업입니다.
      </p>
      <dl className="mt-7 grid max-w-[30em] grid-cols-2 gap-x-6 text-[13px] lg:mt-9">
        <div>
          <dt className="font-semibold text-ink">ASME 인증</dt>
          <dd className="mt-1 text-muted">U, U2, U3, S, PP</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">ISO 경영인증</dt>
          <dd className="mt-1 text-muted">9001, 14001, 45001</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-10">
        <ButtonLink to={href(C, "products/reactor")}>제품소개</ButtonLink>
        <Link href={href(C, "support/inquiry")} className="link-arrow text-ink">
          사업⁠·⁠제품 문의
        </Link>
      </div>
    </>
  );
}
