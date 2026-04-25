/* ===================================================================
   LumiSpace — HorizontalScrollGallery
   Desktop horizontal scroll gallery using GSAP ScrollTrigger pin.
   =================================================================== */

"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "./GsapProvider";
import { EASE } from "@/lib/motion/animation-presets";

interface HorizontalScrollGalleryProps {
  children: ReactNode;
  /** CSS class for the outer wrapper */
  className?: string;
  /** CSS class for the inner track */
  trackClassName?: string;
}

export default function HorizontalScrollGallery({
  children,
  className = "",
  trackClassName = "",
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useGsap();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - track.offsetWidth;

    if (scrollWidth <= 0) return;

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === sectionRef.current)
        .forEach((st) => st.kill());
    };
  }, [prefersReducedMotion]);

  // On mobile / reduced-motion, just scroll horizontally
  if (prefersReducedMotion) {
    return (
      <div className={className} style={{ overflowX: "auto" }}>
        <div className={trackClassName} style={{ display: "flex", gap: "1.5rem" }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={className} style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        className={trackClassName}
        style={{ display: "flex", gap: "1.5rem", width: "max-content" }}
      >
        {children}
      </div>
    </div>
  );
}
