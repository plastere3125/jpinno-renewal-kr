import type { Metadata } from "next";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { Projects } from "@/components/views/TechViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept }));
}
export const metadata: Metadata = { title: "주요 수행실적" };

export default async function Page({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return (
    <PageShell concept={concept as Concept} section="tech" current="projects" title="주요 수행실적">
      <Projects concept={concept as Concept} />
    </PageShell>
  );
}
