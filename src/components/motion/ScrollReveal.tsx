/* ===================================================================
   LumiSpace — ScrollReveal
   Generic scroll-triggered reveal wrapper using GSAP ScrollTrigger.
   =================================================================== */

"use client";

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "./GsapProvider";
import {
  scrollTriggerDefaults,
  EASE,
  DURATION,
} from "@/lib/motion/animation-presets";

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction to reveal from */
  direction?: "up" | "down" | "left" | "right";
  /** Delay in seconds */
  delay?: number;
  /** Duration override */
  duration?: number;
  /** Distance to travel (px) */
  distance?: number;
  /** Stagger children elements */
  stagger?: number;
  /** CSS selector to target children instead of the container */
  childSelector?: string;
  /** Custom className for the wrapper */
  className?: string;
  /** Custom style for the wrapper */
  style?: CSSProperties;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION.reveal,
  distance = 60,
  stagger,
  childSelector,
  className = "",
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useGsap();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      ...(direction === "up" && { y: distance }),
      ...(direction === "down" && { y: -distance }),
      ...(direction === "left" && { x: distance }),
      ...(direction === "right" && { x: -distance }),
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: EASE.reveal,
      stagger: stagger || 0,
      scrollTrigger: {
        trigger: ref.current,
        ...scrollTriggerDefaults,
      },
    };

    const tween = gsap.fromTo(targets, fromVars, toVars);

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === ref.current)
        .forEach((st) => st.kill());
    };
  }, [prefersReducedMotion, direction, delay, duration, distance, stagger, childSelector]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(prefersReducedMotion ? {} : { opacity: 0 }),
      }}
    >
      {children}
    </div>
  );
}
