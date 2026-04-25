/* ===================================================================
   LumiSpace — AnimatedCounter
   Number counter that counts up on scroll trigger.
   =================================================================== */

"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "./GsapProvider";
import { EASE, DURATION, scrollTriggerDefaults } from "@/lib/motion/animation-presets";

interface AnimatedCounterProps {
  /** Target number to count to */
  end: number;
  /** Starting number */
  start?: number;
  /** Duration of the count animation */
  duration?: number;
  /** Suffix text (e.g., "+", "%", "K") */
  suffix?: string;
  /** Prefix text (e.g., "RM", "$") */
  prefix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** CSS class */
  className?: string;
}

export default function AnimatedCounter({
  end,
  start = 0,
  duration = DURATION.counter,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefersReducedMotion } = useGsap();
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? end : start
  );

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) {
      setDisplayValue(end);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const obj = { value: start };
    const tween = gsap.to(obj, {
      value: end,
      duration,
      ease: EASE.snappy,
      onUpdate: () => {
        setDisplayValue(
          decimals > 0
            ? parseFloat(obj.value.toFixed(decimals))
            : Math.round(obj.value)
        );
      },
      scrollTrigger: {
        trigger: ref.current,
        ...scrollTriggerDefaults,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === ref.current)
        .forEach((st) => st.kill());
    };
  }, [prefersReducedMotion, end, start, duration, decimals]);

  const formatted =
    decimals > 0 ? displayValue.toFixed(decimals) : displayValue.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
