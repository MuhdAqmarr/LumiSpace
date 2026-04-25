/* ===================================================================
   LumiSpace — ProviderSignatureScene
   Provider-specific 3D particle background using theme presets.
   =================================================================== */

"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingParticles from "./FloatingParticles";
import { getScenePreset } from "@/lib/webgl/scene-presets";
import { getDevicePixelRatio, isMobileDevice, supportsWebGL } from "@/lib/webgl/performance";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface ProviderSignatureSceneProps {
  /** Provider theme preset: "gold" | "neon" | "garden" */
  preset?: string;
  className?: string;
}

export default function ProviderSignatureScene({
  preset = "gold",
  className = "",
}: ProviderSignatureSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const [canRender, setCanRender] = useState(false);
  const config = getScenePreset(preset);

  useEffect(() => {
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
          {/* Primary particles */}
          <FloatingParticles
            count={config.particleCount}
            color={config.particleColor}
            size={config.particleSize}
            spread={config.spread}
            speed={config.speed}
            opacity={0.5}
          />
          {/* Accent particles — fewer, slightly different */}
          <FloatingParticles
            count={Math.round(config.particleCount * 0.3)}
            color={config.accentColor}
            size={config.particleSize * 0.7}
            spread={config.spread * 0.8}
            speed={config.speed * 1.5}
            opacity={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
