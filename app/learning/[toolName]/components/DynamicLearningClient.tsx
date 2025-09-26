'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBanner } from '@/context/BannerContext';
import Header from '@/components/Header';

interface Props { toolName: string }

export default function DynamicLearningClient({ toolName }: Props) {
  const { showBanner, setShowBanner } = useBanner();
  const router = useRouter();

  return (
    <>
      <main className={`transition-all duration-300 ${showBanner ? 'pt-24' : 'pt-16'}`}>        
        <Header showBanner={showBanner} setShowBanner={setShowBanner} />
        <div className="max-w-7xl mx-auto px-5 my-16">
          <nav className="text-base font-medium text-secondary-db-100/50">
            <button
              type="button"
              className="cursor-pointer hover:text-secondary-db-100 hover:border-b-2 hover:border-b-primary-way-100"
              onClick={() => router.push('/')}
            >Home</button>
            <Image src="/icons/chevron-right.svg" alt="Arrow Right" width={4} height={4} className="inline-block mx-2" />
            <button
              type="button"
              className="text-secondary-db-100/50 text-base font-medium hover:text-secondary-db-100 cursor-pointer hover:border-b-2 hover:border-b-primary-way-100"
              onClick={() => router.push('/learning')}
            >Learning</button>
            <Image src="/icons/chevron-right.svg" alt="Arrow Right" width={4} height={4} className="inline-block mx-2" />
            <span className="text-primary-way-100 text-base font-medium">{toolName}</span>
          </nav>
        </div>
      </main>
    </>
  );
}
