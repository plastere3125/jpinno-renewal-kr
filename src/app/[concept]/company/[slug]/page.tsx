import type { Metadata } from "next";
import { NAV } from "@/content/ko/common";
import { CONCEPTS, type Concept } from "@/lib/site";
import PageShell from "@/components/shared/PageShell";
import { CeoMessage, Clients, History, Location, Overview, Vision } from "@/components/views/CompanyViews";

const ITEMS = NAV.find((m) => m.key === "company")!.children!;
export const dynamicParams = false;
export function generateStaticParams() {
  return CONCEPTS.flatMap((concept) => ITEMS.map((i) => ({ concept, slug: i.key })));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: ITEMS.find((i) => i.key === slug)?.label };
}

export default async function Page({ params }: { params: Promise<{ concept: string; slug: string }> }) {
  const { concept: c, slug } = await params;
  const concept = c as Concept;
  const title = ITEMS.find((i) => i.key === slug)!.label;
  const body = {
    overview: <Overview concept={concept} />,
    ceo: <CeoMessage concept={concept} />,
    vision: <Vision concept={concept} />,
    history: <History />,
    clients: <Clients />,
    location: <Location />,
  }[slug];
  return (
    <PageShell concept={concept} section="company" current={slug} title={title}>
      {body}
    </PageShell>
  );
}
