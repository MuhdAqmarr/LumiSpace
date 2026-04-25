/* ===================================================================
   LumiSpace — GSAP Animation Presets
   Reusable animation configurations for the motion system.
   =================================================================== */

export const EASE = {
  /** Smooth cinematic reveal */
  reveal: "power3.out",
  /** Snappy UI transitions */
  snappy: "power2.out",
  /** Dramatic entrance */
  dramatic: "expo.out",
  /** Elastic bounce for counters */
  elastic: "elastic.out(1, 0.5)",
  /** Smooth cubic for magnetic effects */
  magnetic: "power2.out",
} as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  reveal: 1.0,
  counter: 2.0,
  stagger: 0.15,
} as const;

/** Default scroll-triggered reveal animation */
export const scrollRevealDefaults = {
  y: 60,
  opacity: 0,
  duration: DURATION.reveal,
  ease: EASE.reveal,
} as const;

/** Split text reveal defaults */
export const splitTextDefaults = {
  y: "110%",
  opacity: 0,
  duration: DURATION.slow,
  ease: EASE.dramatic,
  stagger: DURATION.stagger,
} as const;

/** ScrollTrigger default config */
export const scrollTriggerDefaults = {
  start: "top 85%",
  end: "bottom 20%",
  toggleActions: "play none none none",
} as const;
