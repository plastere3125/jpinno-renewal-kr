"use client";

import { useState } from "react";
import { COMPANY, PRIVACY_COLLECTION } from "@/content/ko/common";

/**
 * 기존 견적문의 양식 항목 기준 UI.
 * 시안 단계: 발송 기능 미연결(수신 주소·항목·개인정보 문구·운영 방식 확정 후 연결).
 */
const KINDS = ["엔지니어링", "장비", "건설", "기타"];

export default function InquiryForm() {
  const [done, setDone] = useState(false);
  const field = "mt-2 h-12 w-full rounded-[var(--c-radius)] border border-line bg-white px-4 text-[15px] outline-none transition-colors focus:border-navy";
  const label = "block text-[14px] font-semibold text-ink";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-6"
    >
      <div className="rounded-[var(--c-radius)] border border-sky/40 bg-sky/5 px-4 py-3 text-[14px] leading-relaxed text-ink">
        <strong className="font-semibold">안내</strong> 이 양식은 아직 발송 기능이 연결되지 않아 입력 내용이 전달되지 않습니다.{" "}
        <br className="hidden xl:block" />
        현재 문의는{" "}
        <a href={`mailto:${COMPANY.email}`} className="font-semibold text-navy underline underline-offset-2">
          {COMPANY.email}
        </a>{" "}
        또는{" "}
        <a href={`tel:${COMPANY.sites[0].tel}`} className="font-semibold text-navy underline underline-offset-2">
          {COMPANY.sites[0].tel}
        </a>
        로 연락해 주세요.
      </div>

      <fieldset>
        <legend className={label}>문의 종류</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {KINDS.map((k, i) => (
            <label key={k} className="cursor-pointer">
              <input type="radio" name="kind" value={k} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-11 items-center rounded-[var(--c-radius)] border border-line px-5 text-[15px] text-muted transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-sky">
                {k}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>
            문의자명 <span className="text-sky-600">*</span>
          </label>
          <input id="f-name" name="name" autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>
            휴대폰 <span className="text-sky-600">*</span>
          </label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="f-email" className={label}>
            이메일 <span className="text-sky-600">*</span>
          </label>
          <input id="f-email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="f-company" className={label}>
            회사명
          </label>
          <input id="f-company" name="company" autoComplete="organization" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-dept" className={label}>
            부서
          </label>
          <input id="f-dept" name="dept" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-msg" className={label}>
            문의 내용 <span className="text-sky-600">*</span>
          </label>
          <textarea id="f-msg" name="message" rows={6} className={`${field} h-auto py-3`} />
        </div>
      </div>

      <div className="rounded-[var(--c-radius)] bg-[var(--c-alt)] p-5">
        <p className="text-[14px] font-semibold text-ink">개인정보 수집에 대한 동의</p>
        <ul className="mt-2 space-y-1 text-[13.5px] leading-relaxed text-muted">
          {PRIVACY_COLLECTION.map((l) => (
            <li key={l}>· {l}</li>
          ))}
        </ul>
        <label className="mt-4 flex items-center gap-2 text-[14.5px]">
          <input type="checkbox" name="agree" className="size-5 accent-[#2b2f84]" />
          동의합니다
        </label>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex h-12 items-center rounded-[var(--c-radius)] bg-navy px-10 text-[15px] font-semibold text-white transition-colors hover:bg-navy-700">
          문의 접수
        </button>
        <p role="status" className="text-[14px] text-sky-600">
          {done ? "시안 화면입니다. 입력 내용은 발송⁠·⁠저장되지 않았습니다." : ""}
        </p>
      </div>
    </form>
  );
}
