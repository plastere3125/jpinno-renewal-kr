import { notFound } from "next/navigation";
import { CONCEPTS, isConcept } from "@/lib/site";
import HeaderA from "@/components/a/HeaderA";
import HeaderB from "@/components/b/HeaderB";
import Footer from "@/components/shared/Footer";
import Motion from "@/components/shared/Motion";

export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept }));
}

export default async function ConceptLayout({ children, params }: { children: React.ReactNode; params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  if (!isConcept(concept)) notFound();
  return (
    <div data-concept={concept} className="flex min-h-svh flex-col">
      <a href="#main" className="skip-link">
        본문 바로가기
      </a>
      {concept === "concept-a" ? <HeaderA /> : <HeaderB />}
      <div className="flex-1">{children}</div>
      <Footer concept={concept} />
      <Motion />
    </div>
  );
}
