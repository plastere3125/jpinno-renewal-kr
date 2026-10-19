import type { Metadata } from "next";
import { CONCEPT_LABEL, type Concept } from "@/lib/site";
import HomeA from "@/components/a/HomeA";
import HomeB from "@/components/b/HomeB";

export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }): Promise<Metadata> {
  const { concept } = await params;
  return { title: `${CONCEPT_LABEL[concept as Concept].name} 메인` };
}

export default async function Home({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return concept === "concept-a" ? <HomeA /> : <HomeB />;
}
