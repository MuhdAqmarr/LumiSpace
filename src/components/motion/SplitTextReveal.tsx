/* ===================================================================
   LumiSpace — SplitTextReveal
   Line-by-line or word-by-word text reveal animation.
   =================================================================== */

"use client";

import { useRef, useEffect, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "./GsapProvider";
import { EASE, DURATION, scrollTriggerDefaults } from "@/lib/motion/animation-presets";

interface SplitTextRevealProps {
  /** Text content to animate */
  text: string;
  /** Split mode */
  splitBy?: "words" | "lines" | "chars";
  /** HTML tag */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** CSS class */
  className?: string;
  /** Custom style */
  style?: CSSProperties;
  /** Delay before animation starts */
  delay?: number;
  /** Stagger between each element */
  stagger?: number;
  /** Duration for each element */
  duration?: number;
}

export default function SplitTextReveal({
  text,
  splitBy = "words",
  as = "h2",
  className = "",
  style,
  delay = 0,
  stagger = DURATION.stagger,
  duration = DURATION.slow,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useGsap();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = containerRef.current.querySelectorAll(".split-item");
    if (!elements.length) return;

    gsap.set(elements, { y: "110%", opacity: 0 });

    const tween = gsap.to(elements, {
      y: "0%",
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: EASE.dramatic,
      scrollTrigger: {
        trigger: containerRef.current,
        ...scrollTriggerDefaults,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === containerRef.current)
        .forEach((st) => st.kill());
    };
  }, [prefersReducedMotion, text, delay, stagger, duration]);

  const items = splitBy === "chars"
    ? text.split("")
    : splitBy === "lines"
    ? text.split("\n")
    : text.split(/\s+/);

  // Render inner spans inside a div wrapper, then apply the semantic tag's styling via className
  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, overflow: "hidden" }}
      role="heading"
      aria-level={as === "h1" ? 1 : as === "h2" ? 2 : as === "h3" ? 3 : as === "h4" ? 4 : undefined}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="split-item"
          style={{
            display: "inline-block",
            whiteSpace: splitBy === "chars" ? "pre" : undefined,
          }}
        >
          {item}
          {splitBy !== "chars" && i < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}
