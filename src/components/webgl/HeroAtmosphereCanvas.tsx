/* ===================================================================
   LumiSpace — HeroAtmosphereCanvas
   Golden particle atmosphere for the hero section.
   Uses React Three Fiber for a cinematic, atmospheric effect.
   =================================================================== */

"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingParticles from "./FloatingParticles";
import { getDevicePixelRatio, isMobileDevice, supportsWebGL } from "@/lib/webgl/performance";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface HeroAtmosphereCanvasProps {
  className?: string;
}

export default function HeroAtmosphereCanvas({
  className = "",
}: HeroAtmosphereCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Only render WebGL if device supports it, isn't mobile, and user doesn't prefer reduced motion
    if (!prefersReducedMotion && supportsWebGL() && !isMobileDevice()) {
      setCanRender(true);
    }
  }, [prefersReducedMotion]);

  if (!canRender) return null;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Canvas
        dpr={getDevicePixelRatio()}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Primary gold particles — slow, large */}
          <FloatingParticles
            count={80}
            color="#C8A96A"
            size={0.04}
            spread={10}
            speed={0.2}
            opacity={0.5}
          />
          {/* Secondary warm particles — faster, smaller */}
          <FloatingParticles
            count={40}
            color="#D4BC85"
            size={0.02}
            spread={8}
            speed={0.4}
            opacity={0.3}
          />
          {/* Subtle clay accent particles */}
          <FloatingParticles
            count={20}
            color="#9D6B53"
            size={0.025}
            spread={12}
            speed={0.15}
            opacity={0.2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
