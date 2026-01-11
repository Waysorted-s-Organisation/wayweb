"use client";
 
import { useEffect, useRef } from "react";
<<<<<<< HEAD
import Image from "next/image";
import { useTypewriter } from "@/hooks/useTypeWriter";

type CardState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
};

const CARD_COUNT = 12;
const CARD_WIDTH = 240;
const CARD_HEIGHT = 160;
const PADDING = 12;
const BOUNCE = 0.9; // Elasticity for wall/collision


 
export default function Comments() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const typedText = useTypewriter(["searching", "hunting", "exploring"]);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null); // container that cards stay inside
  
  const cardStates = useRef<CardState[]>([]);

  // Track last mouse position for "kick" on hover
  const lastPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const bounds = cardsContainerRef.current;
    if (!bounds) return;

    const boundaryPadding = 20; // or whatever
    const bw = bounds.clientWidth + boundaryPadding;
    const bh = bounds.clientHeight + boundaryPadding;

    // Capture current refs for cleanup
    const currentCards = cardRefs.current;

    // Initialize card positions and velocities
    cardStates.current = [];
    for (let i = 0; i < CARD_COUNT; i++) {
      // Random non-overlapping placement (simple version)
      let tries = 0;
      let x = 0;
      let y = 0;
      let safe = false;
      while (!safe && tries < 1000) {
        x = Math.random() * (bw - CARD_WIDTH);
        y = Math.random() * (bh - CARD_HEIGHT);
        safe = true;
        for (let j = 0; j < i; j++) {
          const c = cardStates.current[j];
          if (
            Math.abs(x - c.x) < CARD_WIDTH + PADDING &&
            Math.abs(y - c.y) < CARD_HEIGHT + PADDING
          ) {
            safe = false;
            break;
          }
        }
        tries++;
      }
      cardStates.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2, //initial small random velocity
        vy: (Math.random() - 0.5) * 0.2, //initial small random velocity
        w: CARD_WIDTH,
        h: CARD_HEIGHT,
      });
    }
    // Initial DOM positions
    cardRefs.current.forEach((card, i) => {
      if (card) {
        card.style.transform = `translate(${cardStates.current[i].x}px, ${cardStates.current[i].y}px)`;
      }
    });

    let animId = 0;
    const update = () => {
      // Physics step
      for (let i = 0; i < CARD_COUNT; i++) {
        const state = cardStates.current[i];

        // Move by velocity
        state.x += state.vx;
        state.y += state.vy;

        // Wall collisions (AABB)
        if (state.x < 0) {
          state.x = 0;
          state.vx *= -BOUNCE;
        }
        if (state.x + CARD_WIDTH > bw) {
          state.x = bw - CARD_WIDTH;
          state.vx *= -BOUNCE;
        }
        if (state.y < 0) {
          state.y = 0;
          state.vy *= -BOUNCE;
        }
        if (state.y + CARD_HEIGHT > bh) {
          state.y = bh - CARD_HEIGHT;
          state.vy *= -BOUNCE;
        }
        state.vx *= 0.98; // Friction
        state.vy *= 0.98; // Friction
      }
      // Card<->card collision detection and resolution
      for (let i = 0; i < CARD_COUNT; i++) {
        for (let j = i + 1; j < CARD_COUNT; j++) {
          const a = cardStates.current[i];
          const b = cardStates.current[j];
          if (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
          ) {
            // Overlap detected, resolve
            // Calculate overlap on x and y
            const dx = (a.x + a.w / 2) - (b.x + b.w / 2);
            const dy = (a.y + a.h / 2) - (b.y + b.h / 2);
            const overlapX = a.w / 2 + b.w / 2 - Math.abs(dx);
            const overlapY = a.h / 2 + b.h / 2 - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              // Push both cards away along the minimal axis
              if (overlapX < overlapY) {
                const shift = overlapX / 2;
                if (dx > 0) {
                  a.x += shift;
                  b.x -= shift;
                } else {
                  a.x -= shift;
                  b.x += shift;
                }
                // Exchange vx (elastic collision)
                const vxa = a.vx;
                a.vx = b.vx * BOUNCE;
                b.vx = vxa * BOUNCE;
              } else {
                const shift = overlapY / 2;
                if (dy > 0) {
                  a.y += shift;
                  b.y -= shift;
                } else {
                  a.y -= shift;
                  b.y += shift;
                }
                // Exchange vy (elastic collision)
                const vya = a.vy;
                a.vy = b.vy * BOUNCE;
                b.vy = vya * BOUNCE;
              }
            }
          }
        }
      }
      // Update DOM
      cardRefs.current.forEach((card, i) => {
        if (card) {
          const st = cardStates.current[i];
          card.style.transform = `translate(${st.x}px, ${st.y}px)`;
        }
      });
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);

    // Mouse "kick" on hover
    const onPointerMove = (e: MouseEvent) => {
      lastPointer.current.x = e.clientX;
      lastPointer.current.y = e.clientY;
    };
    document.addEventListener("mousemove", onPointerMove);

    // For each card, handle mouseenter to "kick"
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const onEnter = () => {
        // Assign a velocity based on pointer direction
        const st = cardStates.current[i];
        // Just use random direction if no movement
        const dx = (lastPointer.current.x - (st.x + CARD_WIDTH / 2)) || (Math.random() - 0.5);
        const dy = (lastPointer.current.y - (st.y + CARD_HEIGHT / 2)) || (Math.random() - 0.5);
        const speed = 13 + Math.random() * 3; // random speed boost
        const length = Math.sqrt(dx * dx + dy * dy) || 1;
        st.vx += (dx / length) * speed;
        st.vy += (dy / length) * speed;
        card.style.zIndex = "20";
      };
      const onLeave = () => {
        card.style.zIndex = "10";
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onPointerMove);
      currentCards.forEach((card) => {
        if (!card) return;
        card.replaceWith(card.cloneNode(true)); // removes listeners
      });
=======
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import CommentCard from "@/components/CommentCard";
 
gsap.registerPlugin(ScrollTrigger, InertiaPlugin);

 
export default function Comments() {
  const wordsRefs = useRef<HTMLSpanElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null); // container that cards stay inside
 
  const VISION_STATEMENT =
    "Designers juggle 100+ tools weekly, wasting time switching and searching perfect tools. Waysorted tackle the chaotic workflow...";
 
  useEffect(() => {
    if (!sectionRef.current || wordsRefs.current.length === 0) return;
 
    // Scroll-synced word animation
    gsap.set(wordsRefs.current, { opacity: 0 });
 
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 90%",
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
      },
    });
 
    masterTimeline
      .to(wordsRefs.current, { opacity: 0.2, duration: 1, stagger: 0.15, ease: "power3.out" })
      .to(wordsRefs.current, { opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, 0.5);
 
    // Floating cards over the dedicated cards container
    let oldX = 0,
      oldY = 0;
    let displacedX = 0,
      displacedY = 0;
 
    const handleMouseMove = (e: MouseEvent) => {
      displacedX = e.clientX - oldX;
      displacedY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };
 
    document.addEventListener("mousemove", handleMouseMove);
 
    const bounds = cardsContainerRef.current;
    if (!bounds) return;
 
    // Place cards randomly without overlap on initial load
    const placeCardsWithoutOverlap = () => {
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const padding = 12; // space between cards
      const MAX_TRIES = 500;
 
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
 
        const w = card.offsetWidth;
        const h = card.offsetHeight;
 
        const maxX = Math.max(0, bounds.clientWidth - w);
        const maxY = Math.max(0, bounds.clientHeight - h);
 
        let x = 0;
        let y = 0;
        let tries = 0;
 
        const overlapsAny = (nx: number, ny: number) => {
          for (const r of placed) {
            const overlap =
              nx < r.x + r.w + padding &&
              nx + w + padding > r.x &&
              ny < r.y + r.h + padding &&
              ny + h + padding > r.y;
            if (overlap) return true;
          }
          return false;
        };
 
        if (maxX === 0 && maxY === 0) {
          x = 0;
          y = 0;
        } else {
          do {
            x = Math.random() * maxX;
            y = Math.random() * maxY;
            tries++;
          } while (overlapsAny(x, y) && tries < MAX_TRIES);
 
          // Fallback to grid-like placement if random attempts fail
          if (tries >= MAX_TRIES) {
            const count = cardRefs.current.filter(Boolean).length;
            const cols = Math.ceil(Math.sqrt(count));
            const rows = Math.ceil(count / cols);
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const cellW = bounds.clientWidth / cols;
            const cellH = bounds.clientHeight / rows;
            x = Math.min(maxX, col * cellW + Math.max(0, (cellW - w) / 2));
            y = Math.min(maxY, row * cellH + Math.max(0, (cellH - h) / 2));
          }
        }
 
        gsap.set(card, { x, y });
        placed.push({ x, y, w, h });
      });
    };
 
    // Physics: bouncing inside cardsContainerRef
    const friction = -0.55; // negative to invert direction, magnitude < 1 to absorb energy
    const resistance = 280; // higher -> slows down sooner
    const kickScale = 45; // scales the initial velocity on hover
 
    type Cleaner = () => void;
    const cleaners: Cleaner[] = [];
 
    const setupCardPhysics = (card: HTMLDivElement) => {
      // Tracker for current velocity
      const tracker = InertiaPlugin.track(card, "x,y")[0];
      const cardProp = gsap.getProperty(card);
 
      // Current bounds (container size)
      let bw = bounds.clientWidth;
      let bh = bounds.clientHeight;
 
      const handleResize = () => {
        bw = bounds.clientWidth;
        bh = bounds.clientHeight;
      };
      window.addEventListener("resize", handleResize);
      cleaners.push(() => window.removeEventListener("resize", handleResize));
 
      // Bounce animation (doesn't return to any previous position)
      const animateBounce = (
        x: number | string = "+=0",
        y: number | string = "+=0",
        vx: number | "auto" = "auto",
        vy: number | "auto" = "auto"
      ) => {
        gsap.to(card, {
          // When inertia is set with velocity, GSAP drives x/y and we'll clamp/reflect in checkBounds
          inertia: {
            x: typeof vx === "number" ? { velocity: vx, resistance } : "auto",
            y: typeof vy === "number" ? { velocity: vy, resistance } : "auto",
          } as any,
          x,
          y,
          onUpdate: checkBounds,
          ease: "none",
        });
      };
 
      const checkBounds = () => {
        // Current position and velocity
        const x = Number(cardProp("x") as any) || 0;
        const y = Number(cardProp("y") as any) || 0;
 
        const w = card.offsetWidth;
        const h = card.offsetHeight;
 
        let vx = tracker.get("x"); // pixels/second
        let vy = tracker.get("y");
 
        let nx = x;
        let ny = y;
 
        let hit = false;
 
        // Right wall
        if (x + w > bw) {
          nx = bw - w;
          vx *= friction;
          hit = true;
        }
        // Left wall
        else if (x < 0) {
          nx = 0;
          vx *= friction;
          hit = true;
        }
 
        // Bottom wall
        if (y + h > bh) {
          ny = bh - h;
          vy *= friction;
          hit = true;
        }
        // Top wall
        else if (y < 0) {
          ny = 0;
          vy *= friction;
          hit = true;
        }
 
        if (hit) {
          // Start a new inertia tween from the collision point with reflected velocities
          gsap.killTweensOf(card);
          animateBounce(nx, ny, vx, vy);
        }
      };
 
      // Kick the card on hover with a velocity based on cursor movement
      const onEnter = () => {
        // Bring to front while it's active
        card.style.zIndex = "20";
        gsap.killTweensOf(card);
 
        const vx = displacedX * kickScale;
        const vy = displacedY * kickScale;
 
        // Start from the current position (+=0) with the "kick" velocities
        animateBounce("+=0", "+=0", vx, vy);
      };
 
      const onLeave = () => {
        // Let physics continue, just lower z-index
        card.style.zIndex = "10";
      };
 
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
 
      cleaners.push(() => {
        gsap.killTweensOf(card);
        InertiaPlugin.untrack(card, "x,y");
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    };
 
    // Ensure DOM has rendered/sized before measuring/placing
    requestAnimationFrame(() => {
      placeCardsWithoutOverlap();
      // Initialize physics for each card
      cardRefs.current.forEach((card) => card && setupCardPhysics(card));
    });
 
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      masterTimeline.kill();
      cleaners.forEach((c) => c());
>>>>>>> wayweb/main
    };
  }, []);
 
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white flex flex-col items-center justify-center text-center py-40 overflow-hidden"
    >
      {/* Wrap blue block and overlay a positioned container for the floating cards */}
      <div className="relative w-full max-w-6xl mx-auto">
<<<<<<< HEAD
        <div className="bg-dots rounded-3xl text-white relative z-0 w-full">
          <section className="mx-auto max-w-5xl px-8 py-14 flex flex-col items-center">
            <p className="text-white font-normal text-3xl md:text-6xl leading-tight text-center">
              <span>Creators spend </span>
              <div className="relative inline-block"> <span className="invisible px-4 py-2 rounded-full border-2 border-white/80">exploring</span> <span className="absolute inset-0 flex items-center justify-center px-4 py-2 rounded-full border-2 border-white/80"> {typedText} </span> </div>
              <span className="block mt-3">
                100+ tools daily than creating.
=======
        {/* Background text (blue block) */}
        <div className="bg-blue-500 rounded-3xl text-white relative z-0 w-full">
          <p className="text-white font-normal text-2xl leading-relaxed py-35 px-35">
            {VISION_STATEMENT.split(" ").map((word, index) => (
              <span
                key={`word-${index}`}
                ref={(el) => {
                  if (el) wordsRefs.current[index] = el;
                }}
                className="inline-block mx-1"
              >
                {word}
>>>>>>> wayweb/main
              </span>
            </p>

            <button
              className="mt-10 bg-secondary-db-100 tool-hunt text-white font-semibold text-base rounded-xl py-3 px-7 border border-white/20 cursor-pointer"
              type="button"
            >
              End the Tool Hunt.
            </button>
          </section>
        </div>
 
        {/* Cards container overlays the blue block exactly */}
        <div
          ref={cardsContainerRef}
<<<<<<< HEAD
          className="absolute -inset-40 z-10 pointer-events-none"
=======
          className="absolute -inset-5 z-10"
>>>>>>> wayweb/main
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              // Left/top 0 ensures GSAP's x/y are relative to container's top-left
<<<<<<< HEAD
              className="absolute left-0 top-0 will-change-transform pointer-events-auto"
              style={{ zIndex: 10 }}
            >
              <Image
                src={`/icons/comment-card-${(idx + 1)}.svg`}
                alt="User comment"
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                className="w-60 h-40 object-cover rounded-xl"
                draggable={false}
=======
              className="absolute left-0 top-0 will-change-transform"
              style={{ zIndex: 10 }}
            >
              <CommentCard
                username={`User ${idx + 1}`}
                role="Figma User"
                comment="Floating comment!"
                avatarSrc="/path/to/avatar.jpg"
>>>>>>> wayweb/main
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
<<<<<<< HEAD
 
=======
 
>>>>>>> wayweb/main
