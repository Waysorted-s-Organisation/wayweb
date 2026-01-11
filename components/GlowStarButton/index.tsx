import React, { useEffect, useMemo, useState } from "react";

/* Deterministic PRNG so SSR/CSR can be stable when desired */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i);
  return h >>> 0;
}
function rngForIndex(seed: string, i: number) {
  const base = hashString(seed);
  const mixed = (base ^ Math.imul(i + 1, 0x9e3779b9)) >>> 0;
  return mulberry32(mixed);
}
function makeNonce() {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0].toString(36);
  }
  return Math.random().toString(36).slice(2);
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  starCount?: number;          // number of dots (kept name for compatibility)
  randomSeed?: string;
  rerollOnHover?: boolean;
  randomizeOnMount?: boolean;
  delayJitter?: number;
  enterDurationSec?: number;
  title?: string;
  "aria-label"?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function GlowStarButton({
  children = "Start Instantly!",
  className = "",
  starCount = 20,
  randomSeed = "glow-stars-v2",
  rerollOnHover = false,
  randomizeOnMount = false,
  delayJitter = 0.12,
  enterDurationSec = 0.45,
  title,
  "aria-label": ariaLabel,
  onClick,
  ...props
}: Props) {
  const [hoverKey, setHoverKey] = useState(0);
  const [mountNonce, setMountNonce] = useState<string>("");

  useEffect(() => {
    if (randomizeOnMount) {
      setMountNonce(makeNonce());
    }
  }, [randomizeOnMount]);

  const seedBase = randomizeOnMount && mountNonce ? `${randomSeed}-${mountNonce}` : randomSeed;
  const effectiveSeed = rerollOnHover ? `${seedBase}-${hoverKey}` : seedBase;

  const dots = useMemo(() => {
    const minX = 8, maxX = 92;
    const minY = 18, maxY = 86;
    const deadLeft = 36, deadRight = 64;
    const deadTop = 44, deadBottom = 60;

    const arr: {
      left: number;
      top: number;
      size: number;
      scale: number;
      dx: number;
      dy: number;
      spin: number;
      durMs: number;
      enterDelay: number;
      radius: number;
    }[] = [];
    for (let i = 0; i < starCount; i++) {
      const r = rngForIndex(effectiveSeed, i);

      let left = minX + r() * (maxX - minX);
      let top = minY + r() * (maxY - minY);

      // Push away from center zone
    }
    return arr;
  }, [effectiveSeed, starCount, delayJitter]);

  return (
    <button
      type="submit"
      className={`btn-glow text-white ${className}`}
      onMouseEnter={rerollOnHover ? () => setHoverKey(k => k + 1) : undefined}
      onTouchStart={rerollOnHover ? () => setHoverKey(k => k + 1) : undefined}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      <span className="btn-inner">{children}</span>
      {dots.map((d, i) => (
        <svg
          key={i}
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="btn-star"
            style={
              {
                "--top": `${d.top}%`,
                "--left": `${d.left}%`,
                "--size": `${d.size}px`,
                "--scale": d.scale,
                "--dx": `${d.dx}px`,
                "--dy": `${d.dy}px`,
                "--spin": `${d.spin}deg`,
                "--dur": `${d.durMs}ms`,
                "--enter-delay": `${d.enterDelay}s`,
                "--delay": `${d.enterDelay}s`,
                "--enter-dur": `${enterDurationSec}s`,
                "--rot": "0deg",
              } as React.CSSProperties
            }
          >
            <circle cx="12" cy="12" r={d.radius} fill="currentColor" />
          </svg>
      ))}
    </button>
  );
}