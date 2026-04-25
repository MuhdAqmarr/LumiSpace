"use client";

import { useEffect, useRef } from "react";
import { Search, Calendar, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";
import { useGsap } from "@/components/motion/GsapProvider";

const steps = [
  {
    icon: Search,
    title: "Discover Venues",
    description:
      "Browse premium halls, gardens, rooftops, and private spaces from trusted providers across Malaysia.",
  },
  {
    icon: Calendar,
    title: "Choose a Date & Time",
    description:
      "Select your preferred event date and time slot. See real-time availability for each venue.",
  },
  {
    icon: Send,
    title: "Send a Request",
    description:
      "Fill in your event details and submit a booking request. No payment required at this stage.",
  },
  {
    icon: CheckCircle2,
    title: "Provider Confirms",
    description:
      "The venue provider reviews your request and confirms or suggests alternatives. Simple.",
  },
];

export default function HowItWorks() {
  const { prefersReducedMotion } = useGsap();
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Wait for refs to populate
    if (iconRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      steps.forEach((_, i) => {
        const icon = iconRefs.current[i];
        const line = lineRefs.current[i];

        if (!icon) return;

        // 1. Icon glows up
        tl.to(icon, {
          borderColor: "#C8A96A",
          boxShadow: "0 0 20px rgba(200, 169, 106, 0.5)",
          duration: 0.4,
          ease: "power2.out",
        });

        if (i < steps.length - 1 && line) {
          // 2. Icon dims while line pulse travels
          tl.to(
            icon,
            {
              borderColor: "rgba(200, 169, 106, 0.12)", // Original var(--border)
              boxShadow: "0 0 0px rgba(200, 169, 106, 0)",
              duration: 0.6,
              ease: "power2.inOut",
            },
            "+=0.2" // Wait a moment before dimming
          );

          tl.fromTo(
            line,
            { xPercent: -100, opacity: 0 },
            {
              xPercent: 200,
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
            },
            "<" // Start exactly when the icon starts dimming
          );
        } else {
          // Last icon just dims
          tl.to(
            icon,
            {
              borderColor: "rgba(200, 169, 106, 0.12)",
              boxShadow: "0 0 0px rgba(200, 169, 106, 0)",
              duration: 0.6,
              ease: "power2.inOut",
            },
            "+=0.4" // Wait slightly longer for the final step before repeating
          );
        }
      });

      // Small pause before restarting the sequence
      tl.to({}, { duration: 1.5 });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              How It Works
            </span>
          </ScrollReveal>
          <SplitTextReveal
            text="Four simple steps"
            as="h2"
            className="mt-4 font-display text-4xl font-medium text-text-primary md:text-5xl"
            delay={0.2}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.15} distance={40}>
              <div className="relative text-center">
                {/* Step Number / Icon */}
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg-surface transition-colors"
                >
                  <step.icon className="h-7 w-7 text-gold relative z-10" />
                </div>

                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+40px)] hidden w-[calc(100%-80px)] overflow-hidden lg:block">
                    {/* Dim baseline */}
                    <div className="h-px w-full bg-border" />
                    {/* Glowing moving line */}
                    <div
                      ref={(el) => {
                        lineRefs.current[index] = el;
                      }}
                      className="absolute top-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0"
                    />
                  </div>
                )}

                <h3 className="font-display text-lg font-medium text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
