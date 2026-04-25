/* ===================================================================
   LumiSpace — Provider Scene Presets
   Color and particle configurations for each provider theme.
   =================================================================== */

export interface ScenePreset {
  /** Primary particle color */
  particleColor: string;
  /** Secondary / accent color */
  accentColor: string;
  /** Fog color */
  fogColor: string;
  /** Background color */
  bgColor: string;
  /** Particle count */
  particleCount: number;
  /** Particle size */
  particleSize: number;
  /** Particle drift speed multiplier */
  speed: number;
  /** Particle spread radius */
  spread: number;
}

export const scenePresets: Record<string, ScenePreset> = {
  gold: {
    particleColor: "#C8A96A",
    accentColor: "#D4BC85",
    fogColor: "#080706",
    bgColor: "#080706",
    particleCount: 120,
    particleSize: 0.03,
    speed: 0.3,
    spread: 8,
  },
  neon: {
    particleColor: "#7B68EE",
    accentColor: "#9B8BFF",
    fogColor: "#0a0a15",
    bgColor: "#0a0a15",
    particleCount: 150,
    particleSize: 0.025,
    speed: 0.5,
    spread: 10,
  },
  garden: {
    particleColor: "#6B8E6B",
    accentColor: "#8AAE8A",
    fogColor: "#0a120a",
    bgColor: "#0a120a",
    particleCount: 100,
    particleSize: 0.035,
    speed: 0.2,
    spread: 7,
  },
};

export function getScenePreset(preset: string): ScenePreset {
  return scenePresets[preset] || scenePresets.gold;
}
