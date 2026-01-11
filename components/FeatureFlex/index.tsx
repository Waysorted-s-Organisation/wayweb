"use client";
<<<<<<< HEAD
import WayAICard from "./WayAICard";
import GlassModeCard from "./GlassModeCard";
import Focus from "./Focus";
import WayspaceCard from "./WayspaceCard";
import LighterCard from "./LighterCard";
import PlaySecureCard from "./PlaySecureCard";
import SecureDataGlow from "./SecureDataGlow";
=======
import Image from "next/image";
import Focus from "./Focus";
import SecureDataGlow from "./SecureDataGlow";
import GlowStarButton from "@/components/GlowStarButton";
import GlassModeCard from "./GlassModeCard";
>>>>>>> wayweb/main

export default function FeatureFlex() {
  

  return (
<<<<<<< HEAD
    <section className="w-full flex justify-center py-10">
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Row 1, Col 1: Way AI 249x163 */}
          <WayAICard className="md:w-[249px] h-[163px]" />

          {/* Row 1, Col 2: Glass Mode 449x163 */}
          <GlassModeCard className="md:w-[449px] h-[163px]" />

          {/* Row 1, Col 3: Secure Data 275x163 */}
          <div
            className="md:w-[275px] h-[163px] p-2 rounded-2xl shadow border border-gray-100
                       flex flex-col overflow-hidden"
            aria-label="Security and encryption information"
          >
            <h3 className="text-base font-medium text-secondary-db-80">
              Protected with top-tier encryption
            </h3>

            {/* Push the icon to the bottom and center it horizontally */}
            <div className="mt-auto self-center">
              {/* If SecureDataGlow supports className, you can size it like: className="w-[84px] h-[84px]" */}
              <SecureDataGlow />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Row 2, Col 1: Focus 278x420 */}
          <Focus className="md:w-[278px] h-[420px]" />

          {/* Row 2, Col 2: Wayspace 345x420 */}
          <WayspaceCard className="md:w-[345px] h-[420px]" />

          {/* Row 2, Col 3: Lighter 349x175 + Play Challenge 349x229 (stacked, gap=16) */}
          <div className="flex flex-col gap-4 md:w-[349px]">
            <LighterCard className="md:w-[349px] h-[175px]" />
            <PlaySecureCard className="md:w-[349px] h-[229px]" />
          </div>
=======
    <section className="w-full flex justify-center py-10 ">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* LEFT + MIDDLE WRAPPER */}
        <div className="flex flex-col gap-5">
          {/* TOP ROW: Way AI + Wayspace */}
          <div className="flex gap-5">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* Way AI */}
              <div className="w-[346px] h-[163px] p-5 rounded-xl bg-white shadow glowing-border flex flex-col items-center justify-center text-center">
                <Image
                  src="/icons/way-ai.svg"
                  alt="Way AI"
                  width={40}
                  height={40}
                />
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  Way AI
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Lorem ipsum dolor sit consectetur adipiscing endisse sit amet
                  scelerisque sapien.
                </p>
              </div>

              {/* Play Secure */}
              <div className="w-[346px] h-[290px] p-6 rounded-2xl white-bg-dots shadow border border-gray-100 flex flex-col items-center text-center">
                <Image
                  src="/icons/play-secure.svg"
                  alt="Play Secure"
                  width={60}
                  height={60}
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Play Easy, Play Secure
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean eleifend.
                </p>
                <button className="mt-auto bg-black text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:shadow-md transition">
                  Play Challenge
                </button>
              </div>
            </div>

            {/* MIDDLE COLUMN */}
            <div className="w-[346px] h-[467px] p-6 rounded-2xl white-bg-dots shadow border border-gray-100 flex flex-col items-center text-center wayspace-cursor">
              <h3 className="text-xl font-semibold text-gray-900">
                Get Wayspace
              </h3>
              <p className="text-gray-600 text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse sit amet.
              </p>
              <div className="mt-5 flex gap-3">
                <div className="w-20 h-20 rounded-xl bg-gray-100" />
                <div className="w-20 h-20 rounded-xl bg-gray-100" />
                <div className="w-20 h-20 rounded-xl bg-gray-100" />
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: Secure Data + Glass Mode */}
          <div className="flex gap-5">
            {/* Secure Data */}
            <div className="w-[191px] h-[210px] p-5 rounded-2xl bg-white shadow border border-gray-100 flex flex-col items-center justify-center text-center overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900">Secure Data</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <div className="mt-15">
                <SecureDataGlow />
              </div>
            </div>

            {/* Glass Mode */}
            <GlassModeCard />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* Focus Section */}
          <Focus />

          {/* CTA */}
          <GlowStarButton className="w-[277px] h-[85px] bg-black text-white flex items-center justify-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold cursor-pointer">
            <span className="flex items-center justify-center gap-4 w-full">
              Start Instantly!
              <span
                className="bg-white h-14 w-14 flex items-center justify-center rounded-xl"
                aria-hidden="true"
              >
                <Image
                  src="/icons/rocket.svg"
                  alt="Launch"
                  width={30}
                  height={30}
                  className="inline-block"
                />
              </span>
            </span>
          </GlowStarButton>
>>>>>>> wayweb/main
        </div>
      </div>
    </section>
  );
}