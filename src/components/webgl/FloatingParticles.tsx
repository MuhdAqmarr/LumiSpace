/* ===================================================================
   LumiSpace — FloatingParticles
   Reusable R3F particle system with gentle drift animation.
   =================================================================== */

"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
  speed?: number;
  opacity?: number;
}

export default function FloatingParticles({
  count = 120,
  color = "#C8A96A",
  size = 0.03,
  spread = 8,
  speed = 0.3,
  opacity = 0.6,
}: FloatingParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * spread;

      vel[i3] = (Math.random() - 0.5) * speed * 0.01;
      vel[i3 + 1] = Math.random() * speed * 0.005 + 0.001;
      vel[i3 + 2] = (Math.random() - 0.5) * speed * 0.01;
    }

    return { positions: pos, velocities: vel };
  }, [count, spread, speed]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const positionAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;
    const halfSpread = spread / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3] += velocities[i3] * delta * 60;
      array[i3 + 1] += velocities[i3 + 1] * delta * 60;
      array[i3 + 2] += velocities[i3 + 2] * delta * 60;

      // Wrap around if out of bounds
      if (array[i3 + 1] > halfSpread) {
        array[i3 + 1] = -halfSpread;
        array[i3] = (Math.random() - 0.5) * spread;
        array[i3 + 2] = (Math.random() - 0.5) * spread;
      }
      if (Math.abs(array[i3]) > halfSpread) {
        array[i3] = -Math.sign(array[i3]) * halfSpread;
      }
      if (Math.abs(array[i3 + 2]) > halfSpread) {
        array[i3 + 2] = -Math.sign(array[i3 + 2]) * halfSpread;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
