"use client";

import Link from "next/link";
import { ArrowRight, Search, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import HeroAtmosphereCanvas from "@/components/webgl/HeroAtmosphereCanvas";
import CustomSelect from "@/components/ui/CustomSelect";

export default function VideoHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30"
        >
          <source src="https://www.pexels.com/download/video/34431086/" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/80 to-bg" />
      </div>

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
            Where your
            <br />
            <span className="italic text-gold">cinematic vision</span>
            <br />
            finds its stage.
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

  const locationOptions = [
    { value: "", label: "Any location" },
    { value: "Kuala Lumpur", label: "Kuala Lumpur" },
    { value: "Petaling Jaya", label: "Petaling Jaya" },
    { value: "Shah Alam", label: "Shah Alam" },
  ];

  const eventTypeOptions = [
    { value: "", label: "Any event type" },
    { value: "Wedding", label: "Wedding" },
    { value: "Corporate Dinner", label: "Corporate Dinner" },
    { value: "Product Launch", label: "Product Launch" },
    { value: "Exhibition", label: "Exhibition" },
    { value: "Seminar", label: "Seminar" },
    { value: "Birthday", label: "Birthday" },
  ];

  return (
    <div className="glass rounded-2xl border border-border-gold p-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {/* Location */}
        <CustomSelect
          options={locationOptions}
          value={city}
          onChange={setCity}
          placeholder="Any location"
          icon={<MapPin className="h-4 w-4 text-gold" />}
        />

        {/* Event Type */}
        <CustomSelect
          options={eventTypeOptions}
          value={eventType}
          onChange={setEventType}
          placeholder="Any event type"
          icon={<Calendar className="h-4 w-4 text-gold" />}
        />

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
