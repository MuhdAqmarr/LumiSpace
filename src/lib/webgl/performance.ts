/* ===================================================================
   LumiSpace — WebGL Performance Utilities
   DPR capping, mobile detection, and performance helpers.
   =================================================================== */

export function getDevicePixelRatio(): number {
  if (typeof window === "undefined") return 1;
  // Cap DPR at 2 for performance
  return Math.min(window.devicePixelRatio || 1, 2);
}

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}
