<<<<<<< HEAD
"use client";
import clsx from "clsx";
import React from "react";
import Image from "next/image";

export default function GlassModeCard({ className }: { className?: string }) {

  return (
    <div
      className={clsx(
        "p-6 relative rounded-2xl shadow border border-gray-100 flex flex-col justify-center items-start transition-all duration-300 wayspace-cursor",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-gray-900 mt-3">Liquid Glass</h3>
      <p className="text-secondary-db-80 text-base font-medium">
        A dynamic, Liquid glass mode that keeps you more focused.
      </p>
        <Image
        src="/icons/glass-mode.png"
        alt="Glass mode"
        width={480}
        height={128}
        className="md:translate-y-[26px] translate-y-[28px]"
        />
=======
import React, { useState } from "react";

export default function GlassModeCard() {
  const [isGlassMode, setIsGlassMode] = useState(false);

  return (
    <div
      className={`w-[500px] h-[210px] p-6 rounded-2xl shadow border border-gray-100 flex flex-col justify-center items-center transition-all duration-300
        ${isGlassMode ? "glass-bg glass-cursor" : "white-bg-dots wayspace-cursor-1"}
      `}
    >
      <button
        className={`text-lg font-semibold max-w-40 px-4 py-2 rounded-xl transition
          ${isGlassMode ? "text-black glass glass-cursor" : "text-white bg-primary-way-100 wayspace-cursor-1"}
        `}
        onClick={() => setIsGlassMode((prev) => !prev)}
      >
        {isGlassMode ? "Default Mode" : "Glass Mode"}
      </button>
      <p className="text-gray-600 text-sm mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse sit amet scelerisque sapien.
      </p>
>>>>>>> wayweb/main
    </div>
  );
}