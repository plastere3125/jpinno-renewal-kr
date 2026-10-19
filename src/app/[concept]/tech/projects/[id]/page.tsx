import type { Metadata } from "next";
import { PROJECTS } from "@/content/ko/tech";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { ProjectDetail } from "@/components/views/TechViews";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.flatMap((concept) => PROJECTS.map((p) => ({ concept, id: p.id })));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `${PROJECTS.find((p) => p.id === id)!.name} | 주요 수행실적` };
}

export default async function Page({ params }: { params: Promise<{ concept: string; id: string }> }) {
  const { concept, id } = await params;
  const p = PROJECTS.find((x) => x.id === id)!;
  return (
    <PageShell concept={concept as Concept} section="tech" current="projects" title="주요 수행실적" trail={[{ label: p.name }]}>
      <ProjectDetail concept={concept as Concept} p={p} />
    </PageShell>
  );
}
