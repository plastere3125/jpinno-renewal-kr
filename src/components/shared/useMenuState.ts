"use client";

import { useEffect } from "react";

/** 메뉴가 열려 있는 동안 배경 스크롤 잠금 + ESC 닫기 */
export function useMenuState(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
}

/** 현재 경로가 해당 메뉴 경로(또는 그 하위)인지 */
export function isActivePath(pathname: string, concept: string, path: string) {
  const norm = pathname.replace(/\/+$/, "");
  const target = `/${concept}/${path}`.replace(/\/+$/, "");
  const section = target.split("/").slice(0, 3).join("/");
  return norm === target || norm.startsWith(target + "/") || (path.split("/").length === 1 && norm.startsWith(section));
}
