import type { Metadata } from "next";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { Inquiry } from "@/components/views/MiscViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept }));
}
export const metadata: Metadata = { title: "사업·제품 문의" };

export default async function Page({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return (
    <PageShell concept={concept as Concept} section="support" current="inquiry" title="사업⁠·⁠제품 문의">
      <Inquiry />
    </PageShell>
  );
}
