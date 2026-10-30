import type { Metadata } from "next";
import HomeA from "@/components/a/HomeA";
import HomeB from "@/components/b/HomeB";

export const metadata: Metadata = { title: { absolute: "JP이노베이션 | 제약 바이오 및 이차전지, 석유 정밀화학 플랜트 전문기업" } };

export default async function Home({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return concept === "concept-a" ? <HomeA /> : <HomeB />;
}
