import Link from "next/link";
import { href, img, type Concept } from "@/lib/site";
import { ArrowRight } from "@/components/shared/Icons";
import { ButtonLink } from "@/components/shared/Widgets";

const C: Concept = "concept-a";

/** 로고·카피·섹션 제목이 같은 세로 기준선(.wrap 안쪽 왼쪽)에 서도록 전폭 요소 안에서 쓰는 왼쪽 여백 */
const WRAP_LEFT = "pl-4 sm:pl-6 lg:pl-[max(40px,calc((100vw-1320px)/2+40px))]";

/**
 * 메인 디자인 1안 — 플랜트의 규모를 보여주는 전폭 구성 (2026-11-12 내부 시안)
 * - 첫 화면: 플랜트 야경을 화면 가로 전체에 깔아 굴뚝의 수직선과 설비의 가로 흐름을 그대로 보여주고,
 *   위쪽 하늘(사진의 하늘색을 이어 늘린 영역, scripts/import-261112-design.py)을 카피 자리로 쓴다.
 *   모바일은 높은 굴뚝 4개가 있는 구간만 세로로 다시 구성(카피 위, 설비 아래).
 * - 카피: 회사의 역할(플랜트 엔지니어링·공정장비 제작)을 굵게, 조사는 가늘게. 업종·EPC 설명은 보조 정보.
 *   ※ 제목 문구는 내부 시안(신규). 보조 문구는 기존 승인 문구.
 * - 첫 스크롤: 긴 회사소개 문단 대신 EPC 엔지니어링·공정장비 두 진입점(전폭 이미지 + 제목).
 */
export default function DesignOne() {
  return (
    <>
      <section id="hero-d1" className="relative isolate h-svh min-h-[640px] overflow-hidden bg-[#0e0f28] text-white">
        <picture>
          <source media="(max-width: 767px)" srcSet={img("home/d1-hero-m.jpg")} />
          <img
            src={img("home/d1-hero-pc.jpg")}
            alt="야간에 조명이 켜진 석유화학 플랜트 전경"
            className="absolute inset-0 -z-10 size-full origin-bottom object-cover object-bottom lg:scale-[1.08] pc-short:scale-100"
          />
        </picture>

        <div className="wrap pt-[calc(var(--header-h)+clamp(24px,4vh,80px))] pc-short:pt-[calc(var(--header-h)+16px)]">
          <p className="eyebrow [--c-eyebrow:var(--color-sky)]">Plant Engineering · Process Equipment</p>
          <h1 className="mt-5 text-[31px] font-bold leading-[1.18] tracking-[-0.045em] sm:text-[48px] lg:mt-6 lg:text-[64px] xl:text-[72px] pc-short:mt-4 pc-short:text-[50px]">
            플랜트 엔지니어링<span className="font-light text-white/65">부터</span>
            <br />
            공정장비 제작<span className="font-light text-white/65">까지</span>
          </h1>
          <p className="mt-5 max-w-[34em] text-[15px] leading-[1.7] text-white/75 sm:text-[17px] lg:mt-7 pc-short:mt-4 pc-short:text-[15.5px]">
            제약 바이오 및 이차전지, 석유 정밀화학 플랜트의
            <br className="hidden sm:block" /> 엔지니어링설계, 장비제작, 시공 및 사후관리까지 <span className="whitespace-nowrap">EPC(Turn-Key)</span>로 수행합니다.
          </p>
          <div className="mt-7 lg:mt-9 pc-short:mt-6">
            <ButtonLink to={href(C, "support/inquiry")} variant="light">
              사업⁠·⁠제품 문의
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 첫 스크롤: 두 진입점 */}
      <section aria-labelledby="d1-entry-title" className="bg-white">
        <div className="wrap pb-10 pt-20 lg:pb-14 lg:pt-28">
          <p className="eyebrow">What we do</p>
          <h2 id="d1-entry-title" className="t-section mt-4 text-ink">
            플랜트를 설계하고, 장비를 만듭니다
          </h2>
        </div>
        <div className="grid lg:grid-cols-2">
          <EntryTile
            to={href(C, "business/epc-engineering")}
            image="home/d1-epc.jpg"
            alt="전자소재 공정 클린룸 설비"
            en="EPC Engineering"
            title="EPC 엔지니어링"
            desc="엔지니어링설계 · 장비제작 · 시공 · 사후관리"
            pad={WRAP_LEFT}
          />
          <EntryTile
            to={href(C, "products/reactor")}
            image="home/d1-equip.jpg"
            alt="스테인리스 반응기와 배관 설비"
            en="Process Equipment"
            title="공정장비"
            desc="반응기 · 여과기 · 건조기 · 믹서 · 밀링⁠·⁠리파이너"
            pad="pl-4 sm:pl-6 lg:pl-10"
          />
        </div>
      </section>
    </>
  );
}

function EntryTile({ to, image, alt, en, title, desc, pad }: { to: string; image: string; alt: string; en: string; title: string; desc: string; pad: string }) {
  return (
    <Link href={to} className="group relative isolate block aspect-[6/5] overflow-hidden bg-deep text-white sm:aspect-[16/10] lg:aspect-auto lg:h-[min(76svh,720px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(image)} alt={alt} loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 pb-7 pr-6 lg:pb-12 ${pad}`}>
        <p className="eyebrow [--c-eyebrow:rgba(255,255,255,0.7)]">{en}</p>
        <h3 className="mt-3 flex items-center gap-3 text-[26px] font-bold tracking-[-0.04em] lg:text-[40px]">
          {title}
          <ArrowRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-7" />
        </h3>
        <p className="mt-2 text-[14px] text-white/80 lg:text-[16px]">{desc}</p>
      </div>
    </Link>
  );
}
