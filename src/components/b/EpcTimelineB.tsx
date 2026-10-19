"use client";

import { useState } from "react";
import { EPC_STEPS } from "@/content/ko/business";

/** 시안 B: EPC 5단계 인터랙티브 타임라인 (단계 선택 시 세부 항목 표시) */
export default function EpcTimelineB() {
  const [i, setI] = useState(0);
  const s = EPC_STEPS[i];
  const main = s.lines.filter((l) => !l.startsWith("- "));
  return (
    <div className="mt-14 lg:mt-20">
      <div role="tablist" aria-label="EPC 수행 단계" className="relative grid grid-cols-5">
        <span className="absolute inset-x-0 top-[19px] h-px bg-white/15" aria-hidden />
        <span className="absolute left-0 top-[19px] h-px bg-sky transition-[width] duration-700" style={{ width: `${(i / 4) * 100}%` }} aria-hidden />
        {EPC_STEPS.map((x, k) => {
          const on = k === i;
          const done = k <= i;
          return (
            <button key={x.no} type="button" role="tab" aria-selected={on} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className="group relative flex flex-col items-start text-left">
              <span className={`relative z-10 flex size-10 items-center justify-center rounded-full border text-[12.5px] tabular-nums transition-colors ${done ? "border-sky bg-sky text-white" : "border-white/25 bg-deep-2 text-white/60"}`}>
                {x.no}
              </span>
              <span className={`mt-5 text-[16px] font-semibold transition-colors lg:text-[22px] ${on ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>{x.ko}</span>
              <span className="mt-1 hidden text-[13px] text-white/45 sm:block">{x.en}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-12 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[13px] tabular-nums text-sky">STEP {s.no}</p>
          <p className="mt-2 text-[30px] font-semibold tracking-[-0.03em] lg:text-[40px]">
            {s.ko} <span className="text-[18px] font-medium text-white/50">{s.en}</span>
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-3 text-[15px] text-white/75 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {main.map((l) => (
            <li key={l} className="border-b border-white/10 pb-3">
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
