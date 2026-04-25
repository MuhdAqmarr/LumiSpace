"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Building2 } from "lucide-react";
import { providers } from "@/lib/data/providers";
import { venues } from "@/lib/data/venues";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";

export default function FeaturedProviders() {
  const approvedProviders = providers.filter((p) => p.status === "approved");

  return (
    <section className="relative py-24 lg:py-32 gradient-spotlight">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Trusted Providers
            </span>
          </ScrollReveal>
          <SplitTextReveal
            text="Meet the providers"
            as="h2"
            className="mt-4 font-display text-4xl font-medium text-text-primary md:text-5xl lg:text-6xl"
            delay={0.2}
          />
          <ScrollReveal delay={0.3}>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Each provider brings their own unique character, story, and collection of
              extraordinary spaces.
            </p>
          </ScrollReveal>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {approvedProviders.map((provider, index) => {
            const venueCount = venues.filter(
              (v) => v.providerId === provider.id && v.status === "published"
            ).length;

            return (
              <ScrollReveal key={provider.id} delay={index * 0.15} distance={50}>
                <Link
                  href={`/p/${provider.slug}`}
                  className="group relative block overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_var(--glow-color)] no-underline"
                  style={{ "--glow-color": `${provider.themeJson?.accentColor || '#C8A96A'}22` } as React.CSSProperties}
                >
                  {/* Animated Shine Border */}
                  <div 
                    className="absolute -inset-[100%] z-0 animate-[spin_6s_linear_infinite] opacity-30 transition-opacity duration-500 group-hover:opacity-100" 
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0 280deg, ${provider.themeJson?.accentColor || '#C8A96A'} 360deg)`
                    }}
                  />

                  {/* Static Default Border */}
                  <div className="absolute inset-0 z-0 rounded-2xl border border-border transition-colors duration-500" />

                  {/* Inner Card Container */}
                  <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-[15px] bg-bg-surface">
                    {/* Hero Gradient */}
                    <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          background: getProviderGradient(index),
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/30 to-transparent" />

                      {/* Provider WebGL Preset Badge */}
                      <div className="absolute top-4 left-4 rounded-full bg-bg/60 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                        style={{ color: provider.themeJson?.accentColor || '#C8A96A' }}
                      >
                        {provider.themeJson?.webglPreset === "gold"
                          ? "✦ Gold Luxury"
                          : provider.themeJson?.webglPreset === "neon"
                            ? "◈ Industrial Neon"
                            : "❀ Garden Estate"}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-xl font-medium text-text-primary transition-colors duration-300"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {provider.brandName}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
                          style={{ color: provider.themeJson?.accentColor || '#C8A96A' }}
                        />
                      </div>

                      <p className="mt-2 text-sm italic text-text-secondary flex-1">
                        &ldquo;{provider.tagline}&rdquo;
                      </p>

                      <div className="mt-5 flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {provider.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {venueCount} {venueCount === 1 ? "venue" : "venues"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getProviderGradient(index: number): string {
  const gradients = [
    "linear-gradient(135deg, #1a1510 0%, #2a1f15 30%, #C8A96A33 70%, #C8A96A11 100%)",
    "linear-gradient(135deg, #0a0a15 0%, #15152a 30%, #7B68EE33 70%, #7B68EE11 100%)",
    "linear-gradient(135deg, #0a120a 0%, #152015 30%, #6B8E6B33 70%, #6B8E6B11 100%)",
  ];
  return gradients[index % gradients.length];
}
