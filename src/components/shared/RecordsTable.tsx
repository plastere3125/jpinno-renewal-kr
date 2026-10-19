"use client";

import { useState } from "react";
import { CHEMICAL_RECORDS, EPC_RECORDS, RECORD_TABS, SPECIAL_RECORDS } from "@/content/ko/tech";

type Key = (typeof RECORD_TABS)[number]["key"];

/** 납품 실적 표(EPC / 화학장비 / 특수장비 탭). 같은 연도는 첫 행에만 연도 표기 */
export default function RecordsTable() {
  const [tab, setTab] = useState<Key>("epc");
  const isEpc = tab === "epc";
  const rows = isEpc
    ? EPC_RECORDS.map((r) => [r.year, r.client, r.industry, r.project])
    : (tab === "chemical" ? CHEMICAL_RECORDS : SPECIAL_RECORDS).map((r) => [r.year, r.client, r.capacity || "–", r.material ? `${r.equipment} · ${r.material}` : r.equipment]);
  const head = isEpc ? ["연도", "업체명", "산업", "프로젝트"] : ["연도", "업체명", "용량", "장비명"];

  return (
    <div>
      <div role="tablist" aria-label="납품 실적 구분" className="flex flex-wrap gap-2">
        {RECORD_TABS.map((t) => {
          const on = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t.key)}
              className={`h-11 rounded-full border px-5 text-[14.5px] font-medium transition-colors ${on ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-navy"}`}
            >
              {t.label} <span className={on ? "text-white/70" : "text-muted"}>{t.count}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-6 overflow-x-auto border-t-2 border-[var(--c-heading)]">
        <table className="w-full min-w-[620px] text-left text-[14.5px]">
          <thead>
            <tr className="border-b border-line bg-[var(--c-alt)] text-[13.5px] text-muted">
              {head.map((h, i) => (
                <th key={h} scope="col" className={`px-4 py-3 font-semibold ${i === 0 ? "w-[88px]" : ""} ${i === 2 ? "w-[150px]" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const first = i === 0 || rows[i - 1][0] !== r[0];
              return (
                <tr key={i} className={`border-b ${first ? "border-t border-t-line" : ""} border-line/70`}>
                  <td className="px-4 py-3 align-top font-semibold tabular-nums text-navy">{first ? r[0] : ""}</td>
                  <td className="px-4 py-3 align-top font-medium text-ink">{r[1]}</td>
                  <td className="px-4 py-3 align-top text-ink/75">{r[2]}</td>
                  <td className="px-4 py-3 align-top text-ink/85">{r[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
