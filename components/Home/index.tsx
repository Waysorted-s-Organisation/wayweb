"use client"
import { useEffect, useState } from "react";
<<<<<<< HEAD
// import FloatingButton from '@/components/FloatingButton'
import dynamic from 'next/dynamic';
=======
import FloatingButton from '@/components/FloatingButton'
>>>>>>> wayweb/main
import Hero from '@/components/Hero/index'
import TopSection from '@/components/TopSection/index'
import ToolsGrid from '@/components/ToolsGrid/index'
import { useBanner } from "@/context/BannerContext";
import Header from "@/components/Header";
<<<<<<< HEAD

// Dynamic Imports for Below-the-Fold components
const ImpactTop = dynamic(() => import('@/components/ImpactTop'), { ssr: false });
const InfoCards = dynamic(() => import('@/components/InfoCards').then(mod => mod.InfoCards), { ssr: false });
const GetStarted = dynamic(() => import('@/components/GetStarted'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const SecureAnimation = dynamic(() => import("@/components/SecureAnimation"), { ssr: false });
const SecureCards = dynamic(() => import("@/components/SecureCards/index"));
const FloatingStatsSection = dynamic(() => import("../FloatingStats"), { ssr: false });

export default function Home() {
  const { showBanner, setShowBanner } = useBanner();
  const [showSecureCards, setShowSecureCards] = useState(false);
=======
import GetStarted from '@/components/GetStarted'
import Testimonials from '@/components/Testimonials'
import Coffee from '@/components/Coffee'
import Comments from '@/components/Comments'
import Footer from "@/components/Footer";
import SecureAnimation from "@/components/SecureAnimation";
import SecureCards from "@/components/SecureCards/index";

export default function Home() {
    const { showBanner, setShowBanner } = useBanner();
     const [showSecureCards, setShowSecureCards] = useState(false);

>>>>>>> wayweb/main
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // When the user scrolls past 1 full viewport height
      if (scrollY >= vh) {
        setShowSecureCards(true);
      } else {
        setShowSecureCards(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

<<<<<<< HEAD
  return (
    <main
      className={`min-h-screen bg-white transition-all duration-300 ${showBanner ? "pt-24" : "pt-16"}`}
    >
      <Header showBanner={showBanner} setShowBanner={setShowBanner} />
      <Hero />
      <ToolsGrid />
      <TopSection />
      {/* <FloatingButton /> */}
      <ImpactTop />

      <InfoCards />
      <div className="my-60" />
      {/* Section 1: Secure Animation */}
      <section id="secure-animation" className="h-[200vh] hidden md:block">
=======
    return (
        <main
            className={`min-h-screen bg-white transition-all duration-300 ${showBanner ? "pt-24" : "pt-16"
                }`}
        >
            <Header showBanner={showBanner} setShowBanner={setShowBanner} />
            <Hero />
            <ToolsGrid />
            <TopSection />
            <FloatingButton />
            <ImpactTop />
            <InfoCards />
             {/* Section 1: Secure Animation */}
      <section className="h-[200vh]">
>>>>>>> wayweb/main
        <SecureAnimation />
      </section>

      {/* Section 2: Secure Cards */}
      <section
<<<<<<< HEAD
        id="secure-cards"
        className={`transition-opacity duration-700 ${showSecureCards ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <SecureCards />
      </section>
      <FloatingStatsSection />
      <Testimonials />
      <GetStarted />

      <Footer />
    </main>
  )
}
=======
        className={`transition-opacity duration-700 ${
          showSecureCards ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <SecureCards />
      </section>
            <Coffee />
            <Comments />
            <Testimonials />
            <GetStarted />
            <Footer />
        </main>
    )
}
>>>>>>> wayweb/main
