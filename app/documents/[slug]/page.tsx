import { notFound } from "next/navigation";
import GettingStarted from "./content/getting-started";

// TODO: Narrow component prop types per document
const CONTENT_MAP: Record<string, React.ComponentType<any>> = {
  "getting-started": GettingStarted,
};

// Next.js App Router static params generator (can be async)
export async function generateStaticParams() {
  return Object.keys(CONTENT_MAP).map((slug) => ({ slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // params provided as a Promise by Next type defs in this channel
  const Comp = CONTENT_MAP[slug];
  if (!Comp) return notFound();
  return <Comp />;
}