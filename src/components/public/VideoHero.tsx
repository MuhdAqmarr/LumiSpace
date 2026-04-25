"use client";

import Link from "next/link";
import { ArrowRight, Search, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import HeroAtmosphereCanvas from "@/components/webgl/HeroAtmosphereCanvas";

export default function VideoHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Gradient (video fallback) */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Soft spotlight overlay */}
      <div className="absolute inset-0 gradient-spotlight" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-clay/5 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Three.js Particle Atmosphere */}
      <HeroAtmosphereCanvas />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-[var(--nav-height)] text-center">
        {/* Eyebrow */}
        <ScrollReveal delay={0.2} distance={30}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-gold bg-bg-surface/50 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Premium Venue Marketplace
            </span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.4} distance={50}>
          <h1 className="font-display text-5xl font-medium leading-[1.1] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
            Find the room
            <br />
            <span className="italic text-gold">where the night</span>
            <br />
            begins.
          </h1>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal delay={0.6} distance={40}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
            Discover cinematic halls, gardens, rooftops, and private spaces from
            trusted venue providers across Malaysia.
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={0.8} distance={30}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton strength={15}>
              <Link
                href="/venues"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bg no-underline transition-all duration-300 hover:bg-gold-light hover:shadow-[var(--shadow-glow)]"
              >
                <div className="absolute inset-0 z-0 animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  Find a Venue
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={10}>
              <Link
                href="/become-a-provider"
                className="flex items-center gap-2 rounded-full border border-border-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-gold hover:text-gold no-underline"
              >
                List Your Venue
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={1.0} distance={40}>
          <div className="mx-auto mt-16 max-w-4xl">
            <SearchBar />
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-text-muted">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  const [city, setCity] = useState("");
  const [eventType, setEventType] = useState("");

  return (
    <div className="glass rounded-2xl border border-border-gold p-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {/* Location */}
        <div className="flex items-center gap-3 rounded-xl bg-bg-elevated/50 px-4 py-3">
          <MapPin className="h-4 w-4 shrink-0 text-gold" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          >
            <option value="">Any location</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Petaling Jaya">Petaling Jaya</option>
            <option value="Shah Alam">Shah Alam</option>
          </select>
        </div>

        {/* Event Type */}
        <div className="flex items-center gap-3 rounded-xl bg-bg-elevated/50 px-4 py-3">
          <Calendar className="h-4 w-4 shrink-0 text-gold" />
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          >
            <option value="">Any event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Dinner">Corporate Dinner</option>
            <option value="Product Launch">Product Launch</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Seminar">Seminar</option>
            <option value="Birthday">Birthday</option>
          </select>
        </div>

        {/* Search Button */}
        <Link
          href={`/venues${city || eventType ? `?city=${city}&eventType=${eventType}` : ""}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-bg transition-all duration-300 hover:bg-gold-light no-underline"
        >
          <Search className="h-4 w-4" />
          Search
        </Link>
      </div>
    </div>
  );
}
