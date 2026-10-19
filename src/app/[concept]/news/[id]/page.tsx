import type { Metadata } from "next";
import { internalNews } from "@/content/ko/news";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { NewsDetail } from "@/components/views/MiscViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.flatMap((concept) => internalNews.map((n) => ({ concept, id: n.id })));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const n = internalNews.find((x) => x.id === id)!;
  return { title: `${n.title} | 홍보센터`, description: n.body[0] };
}

export default async function Page({ params }: { params: Promise<{ concept: string; id: string }> }) {
  const { concept, id } = await params;
  const n = internalNews.find((x) => x.id === id)!;
  return (
    <PageShell concept={concept as Concept} section="news" title="홍보센터" trail={[{ label: n.title.length > 24 ? n.title.slice(0, 24) + "…" : n.title }]}>
      <NewsDetail concept={concept as Concept} n={n} />
    </PageShell>
  );
}
