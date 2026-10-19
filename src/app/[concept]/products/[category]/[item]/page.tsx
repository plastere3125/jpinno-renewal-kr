import type { Metadata } from "next";
import { PRODUCTS, categoryOf } from "@/content/ko/products";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { ProductDetail } from "@/components/views/ProductViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.flatMap((concept) => PRODUCTS.map((p) => ({ concept, category: p.category, item: p.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{ item: string }> }): Promise<Metadata> {
  const { item } = await params;
  const p = PRODUCTS.find((x) => x.slug === item)!;
  return { title: `${p.name} ${p.nameEn} | 제품소개`, description: p.intro[0] };
}

export default async function Page({ params }: { params: Promise<{ concept: string; category: string; item: string }> }) {
  const { concept: k, category, item } = await params;
  const concept = k as Concept;
  const p = PRODUCTS.find((x) => x.slug === item)!;
  const c = categoryOf(category)!;
  return (
    <PageShell concept={concept} section="products" current={category} title={c.name} trail={[{ label: p.name }]}>
      <ProductDetail concept={concept} p={p} />
    </PageShell>
  );
}
