/* ===================================================================
   LumiSpace — MagneticButton
   Mouse-reactive CTA button with magnetic pull effect.
   =================================================================== */

"use client";

import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGsap } from "./GsapProvider";
import { EASE, DURATION } from "@/lib/motion/animation-presets";

interface MagneticButtonProps {
  children: ReactNode;
  /** Magnetic pull strength (px) */
  strength?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  strength = 20,
  className = "",
  style,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useGsap();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(ref.current, {
        x: x * (strength / rect.width) * 2,
        y: y * (strength / rect.height) * 2,
        duration: DURATION.fast,
        ease: EASE.magnetic,
      });
    },
    [prefersReducedMotion, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion || !ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: DURATION.normal,
      ease: "elastic.out(1, 0.3)",
    });
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
