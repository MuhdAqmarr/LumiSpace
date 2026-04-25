"use client";

import { Search, Calendar, Send, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";

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
                {/* Step Number */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border-gold bg-bg-surface">
                  <step.icon className="h-7 w-7 text-gold" />
                </div>

                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+40px)] hidden w-[calc(100%-80px)] lg:block">
                    <div className="h-px w-full bg-gradient-to-r from-border-gold to-transparent" />
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
