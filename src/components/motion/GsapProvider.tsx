/* ===================================================================
   LumiSpace — GsapProvider
   Wraps the app to register GSAP plugins and provide context.
   =================================================================== */

"use client";

import { useEffect, createContext, useContext, type ReactNode } from "react";
import { registerGsapPlugins } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { ReactLenis } from 'lenis/react';

interface GsapContextValue {
  /** True when user prefers reduced motion */
  prefersReducedMotion: boolean;
}

const GsapContext = createContext<GsapContextValue>({
  prefersReducedMotion: false,
});

export function useGsap() {
  return useContext(GsapContext);
}

interface GsapProviderProps {
  children: ReactNode;
}

export default function GsapProvider({ children }: GsapProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGsapPlugins();
  }, []);

  return (
    <GsapContext.Provider value={{ prefersReducedMotion }}>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
        {children}
      </ReactLenis>
    </GsapContext.Provider>
  );
}
