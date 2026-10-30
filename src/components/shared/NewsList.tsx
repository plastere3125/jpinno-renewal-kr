"use client";

import { useState } from "react";
import { NEWS, NEWS_TYPES } from "@/content/ko/news";
import type { NewsType } from "@/lib/types";
import type { Concept } from "@/lib/site";
import { NewsCard } from "./Widgets";

const PAGE = 12;

export default function NewsList({ concept }: { concept: Concept }) {
  const [type, setType] = useState<NewsType | "all">("all");
  const [count, setCount] = useState(PAGE);
  const list = type === "all" ? NEWS : NEWS.filter((n) => n.type === type);
  const tabs: { key: NewsType | "all"; label: string; n: number }[] = [
    { key: "all", label: "전체", n: NEWS.length },
    ...NEWS_TYPES.map((t) => ({ key: t.key, label: t.label, n: NEWS.filter((x) => x.type === t.key).length })),
  ];

  return (
    <div>
      <div role="tablist" aria-label="소식 분류" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {tabs.map((t) => {
          const on = t.key === type;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => {
                setType(t.key);
                setCount(PAGE);
              }}
              className={`h-10 shrink-0 rounded-full border px-4 text-[14.5px] transition-colors ${
                on ? "border-navy bg-navy font-semibold text-white" : "border-line bg-white text-muted hover:border-navy hover:text-navy"
              }`}
            >
              {t.label} <span className={on ? "text-white/70" : "text-muted/70"}>{t.n}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[13px] text-muted" aria-live="polite">
        총 {list.length}건 · 블로그⁠·⁠영상은 원문 채널로 이동합니다.
      </p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.slice(0, count).map((n) => (
          <li key={n.id}>
            <NewsCard concept={concept} n={n} />
          </li>
        ))}
      </ul>
      {count < list.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE)}
            className="h-12 rounded-[var(--c-radius)] border border-navy px-8 text-[15px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            더 보기 ({Math.min(count, list.length)} / {list.length})
          </button>
        </div>
      )}
    </div>
  );
}
