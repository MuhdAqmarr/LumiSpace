"use client";

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

export default function ProviderCTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-bg-surface to-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <ScrollReveal distance={30}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border-gold bg-bg-surface/50 px-4 py-2 backdrop-blur-sm mb-8">
            <Building2 className="h-4 w-4 text-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              For Venue Owners
            </span>
          </div>
        </ScrollReveal>

        <SplitTextReveal
          text="Own a venue?"
          as="h2"
          className="font-display text-4xl font-medium text-text-primary md:text-5xl lg:text-6xl"
          delay={0.2}
        />

        <ScrollReveal delay={0.4}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Build your cinematic venue page and manage bookings from one dashboard.
            Join Malaysia&apos;s premium venue marketplace.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton strength={15}>
              <Link
                href="/become-a-provider"
                className="group relative flex overflow-hidden rounded-full p-[2px] no-underline transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
              >
                <div className="absolute -inset-[100%] z-0 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#ffffff_360deg)] opacity-40" />
                <div className="relative z-10 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bg transition-colors duration-300 group-hover:bg-gold-light">
                  Become a Provider
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </MagneticButton>
            <MagneticButton strength={10}>
              <Link
                href="/admin/login"
                className="flex items-center gap-2 rounded-full border border-border-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-gold hover:text-gold no-underline"
              >
                Provider Login
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Stats with AnimatedCounter */}
        <ScrollReveal delay={0.6}>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
            <div>
              <AnimatedCounter
                end={3}
                className="font-display text-3xl font-medium text-gold"
              />
              <div className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                Providers
              </div>
            </div>
            <div>
              <AnimatedCounter
                end={6}
                className="font-display text-3xl font-medium text-gold"
              />
              <div className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                Venues
              </div>
            </div>
            <div>
              <AnimatedCounter
                end={500}
                suffix="+"
                className="font-display text-3xl font-medium text-gold"
              />
              <div className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                Max Capacity
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
