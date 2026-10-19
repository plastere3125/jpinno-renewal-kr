import type { NewsItem, NewsType } from "@/lib/types";
import data from "./news.data.json";

/**
 * 홍보센터 통합 목록. scripts/build-news.py 로 생성(2026-10-19 스냅샷).
 * - news/newsletter: 기존 사이트 게시물 → 내부 상세 페이지
 * - blog/video: 네이버 블로그·유튜브 공개 게시물 → 원문 링크(외부 이동)
 */
export const NEWS = data as NewsItem[];

export const NEWS_TYPES: { key: NewsType; label: string }[] = [
  { key: "news", label: "새소식" },
  { key: "newsletter", label: "뉴스레터" },
  { key: "video", label: "영상" },
  { key: "blog", label: "블로그" },
];

export const typeLabel = (t: NewsType) => NEWS_TYPES.find((x) => x.key === t)?.label ?? t;

export const internalNews = NEWS.filter((n) => !n.external);

/** 회사소개 영상(유튜브, 클릭 시 재생) */
export const COMPANY_VIDEO = { id: "p5OA5ymzjaE", title: "JP 이노베이션 회사소개 영상" };
