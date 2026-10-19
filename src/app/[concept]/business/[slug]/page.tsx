import type { Metadata } from "next";
import { BUSINESSES } from "@/content/ko/business";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import BusinessView from "@/components/views/BusinessView";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.flatMap((concept) => BUSINESSES.map((b) => ({ concept, slug: b.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = BUSINESSES.find((x) => x.slug === slug)!;
  return { title: `${b.name} | 사업분야`, description: b.summary.join(" ") };
}

export default async function Page({ params }: { params: Promise<{ concept: string; slug: string }> }) {
  const { concept: c, slug } = await params;
  const concept = c as Concept;
  const b = BUSINESSES.find((x) => x.slug === slug)!;
  return (
    <PageShell concept={concept} section="business" current={slug} title={b.name} visual={b.visual} lead={b.summary[0]}>
      <BusinessView concept={concept} b={b} />
    </PageShell>
  );
}
