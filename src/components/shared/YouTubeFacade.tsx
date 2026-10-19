"use client";

import { useState } from "react";
import { PlayIcon } from "./Icons";

/** 클릭 전에는 유튜브를 불러오지 않음(자동재생·외부 요청 없음). 클릭 시 youtube-nocookie 임베드 */
export default function YouTubeFacade({ id, title, poster }: { id: string; title: string; poster?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--c-radius)] bg-deep">
      {on ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 flex size-full items-center justify-center text-white">
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="absolute inset-0 size-full object-cover opacity-45" />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" />
          <span className="relative flex flex-col items-center gap-4">
            <span className="flex size-[72px] items-center justify-center rounded-full bg-sky transition-transform group-hover:scale-105 lg:size-[88px]">
              <PlayIcon className="ml-1 size-8" />
            </span>
            <span className="px-6 text-center text-[16px] font-semibold lg:text-[18px]">{title}</span>
            <span className="text-[12.5px] text-white/65">클릭하면 YouTube 영상이 재생됩니다</span>
          </span>
        </button>
      )}
    </div>
  );
}
