import type { Metadata } from "next";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { NewsIndex } from "@/components/views/MiscViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept }));
}
export const metadata: Metadata = { title: "홍보센터" };

export default async function Page({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return (
    <PageShell concept={concept as Concept} section="news" title="홍보센터" lead="새소식⁠·⁠뉴스레터와 공식 채널의 영상⁠·⁠블로그를 한곳에서 확인하실 수 있습니다.">
      <NewsIndex concept={concept as Concept} />
    </PageShell>
  );
}
