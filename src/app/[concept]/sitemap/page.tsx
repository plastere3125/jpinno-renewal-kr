import type { Metadata } from "next";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { Sitemap } from "@/components/views/MiscViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept }));
}
export const metadata: Metadata = { title: "사이트맵" };

export default async function Page({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return (
    <PageShell concept={concept as Concept} section="sitemap" title="사이트맵">
      <Sitemap concept={concept as Concept} />
    </PageShell>
  );
}
