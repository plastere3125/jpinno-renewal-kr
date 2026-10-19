"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PauseIcon, PlayIcon } from "./Icons";

const REDUCED = "(prefers-reduced-motion: reduce)";
const MOBILE = "(max-width: 767px)";
const watch = (q: string) => (cb: () => void) => {
  const m = window.matchMedia(q);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const subReduced = watch(REDUCED);
const subMobile = watch(MOBILE);

/**
 * 메인 브랜드 영상(클라이언트 제공 원본 mp4를 웹용으로 변환, 상하 검은 띠 제거).
 * - 무음·반복·인라인 자동재생 → 모바일에서도 재생(유튜브 UI 노출 없음)
 * - 화면 폭에 따라 960/1920 파일 선택, 포스터를 먼저 표시
 * - 동작 줄이기 설정이면 자동재생하지 않고 재생 버튼만 제공
 * - 화면 밖으로 벗어나면 일시정지(배터리·데이터 절약)
 */
export default function BackgroundVideo({ src, srcMobile, poster, label }: { src: string; srcMobile: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subReduced, () => window.matchMedia(REDUCED).matches, () => true);
  const mobile = useSyncExternalStore(subMobile, () => window.matchMedia(MOBILE).matches, () => false);
  // paused: 사용자가 직접 멈춤 / playing: 실제 재생 상태(video 이벤트 기준)
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced || paused) return;
    v.muted = true; // SSR 마크업에 muted 속성이 빠지는 경우 대비(자동재생 조건)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, paused, mobile]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-deep">
      <video
        key={mobile ? "m" : "d"}
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload={reduced ? "none" : "auto"}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={mobile ? srcMobile : src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "배경 영상 일시정지" : "배경 영상 재생"}
        className="absolute bottom-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 lg:bottom-6 lg:right-6"
      >
        {playing ? <PauseIcon className="size-3.5" /> : <PlayIcon className="ml-0.5 size-3.5" />}
      </button>
    </div>
  );
}
