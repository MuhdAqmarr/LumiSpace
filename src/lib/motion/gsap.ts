/* ===================================================================
   LumiSpace — GSAP Registration Helpers
   Registers GSAP plugins once at app startup.
   =================================================================== */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}
