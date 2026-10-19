import type { Metadata } from "next";
import { PRODUCT_CATEGORIES } from "@/content/ko/products";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { CategoryView } from "@/components/views/ProductViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.flatMap((concept) => PRODUCT_CATEGORIES.map((p) => ({ concept, category: p.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = PRODUCT_CATEGORIES.find((x) => x.slug === category)!;
  return { title: `${c.name} | 제품소개`, description: c.summary };
}

export default async function Page({ params }: { params: Promise<{ concept: string; category: string }> }) {
  const { concept: k, category } = await params;
  const concept = k as Concept;
  const c = PRODUCT_CATEGORIES.find((x) => x.slug === category)!;
  return (
    <PageShell concept={concept} section="products" current={category} title={c.name}>
      <CategoryView concept={concept} c={c} />
    </PageShell>
  );
}
