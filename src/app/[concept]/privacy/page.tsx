import type { Metadata } from "next";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { Privacy } from "@/components/views/MiscViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept }));
}
export const metadata: Metadata = { title: "개인정보처리방침" };

export default async function Page({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return (
    <PageShell concept={concept as Concept} section="privacy" title="개인정보처리방침">
      <Privacy />
    </PageShell>
  );
}
