/* ===================================================================
   LumiSpace — PinnedStorySection
   Sticky scroll storytelling section that pins while slides change.
   =================================================================== */

"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "./GsapProvider";
import { EASE } from "@/lib/motion/animation-presets";

interface StorySlide {
  /** Unique key */
  id: string;
  /** Content to render */
  content: ReactNode;
}

interface PinnedStorySectionProps {
  slides: StorySlide[];
  /** CSS class for the outer wrapper */
  className?: string;
  /** CSS class for each slide */
  slideClassName?: string;
  /** Height of each scroll segment (vh units) */
  segmentHeight?: number;
}

export default function PinnedStorySection({
  slides,
  className = "",
  slideClassName = "",
  segmentHeight = 100,
}: PinnedStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useGsap();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || slides.length <= 1) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const slideElements = section.querySelectorAll<HTMLElement>(".story-slide");

    // Set all slides except first to invisible
    gsap.set(Array.from(slideElements).slice(1), {
      opacity: 0,
      y: 40,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.5,
        end: () => `+=${(slides.length - 1) * segmentHeight}vh`,
        invalidateOnRefresh: true,
      },
    });

    slideElements.forEach((slide, i) => {
      if (i === 0) return;
      const prev = slideElements[i - 1];

      // Fade out previous slide
      tl.to(
        prev,
        {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: EASE.reveal,
        },
        i - 1
      );

      // Fade in current slide
      tl.to(
        slide,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: EASE.reveal,
        },
        i - 0.5
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, [prefersReducedMotion, slides.length, segmentHeight]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`story-slide ${slideClassName}`}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {slide.content}
        </div>
      ))}
    </div>
  );
}
