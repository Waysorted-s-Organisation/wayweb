import ToolsData from '@/app/learning/data/index';
import ToolBriefCarousel from './components/ToolBriefCarousel';
import allSlides from '@/app/learning/[toolName]/data/index';
import type { SlideData, SlideWithoutToolName } from '@/app/learning/types/index';
import DynamicLearningClient from './components/DynamicLearningClient';
import ExploreMore from './components/ExploreMore';
import JoinCommunity from '@/components/GetStarted';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return ToolsData.map(t => ({ toolName: t.slug }));
}

interface PageProps {
  params: Promise<{ toolName: string }>;
}

export default async function LearningToolPage({ params }: PageProps) {
  const { toolName } = await params;
  const tool = ToolsData.find(t => t.slug === toolName);
  if (!tool) return notFound();

  const slides: SlideWithoutToolName[] = (allSlides as SlideData[])
    .filter(s => s.toolName === toolName)
    .map(({ toolName: _ignore, ...rest }: SlideData) => rest);

  return (
    <div className="min-h-screen bg-white">
      <DynamicLearningClient toolName={tool.name} />
      <div className="my-10">
        <div className="mx-auto max-w-7xl px-5">
            <ToolBriefCarousel slides={slides} />
        </div>
      </div>
      <ExploreMore tools={ToolsData as any} />
      <JoinCommunity />
      <Footer />
    </div>
  )
}