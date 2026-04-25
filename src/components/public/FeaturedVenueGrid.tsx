"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Users, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { venues } from "@/lib/data/venues";
import { providers } from "@/lib/data/providers";
import { formatPrice } from "@/lib/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";
import { useGsap } from "@/components/motion/GsapProvider";

// Desktop 3D settings
const TOTAL_ITEMS = 12; // 6 venues duplicated
const ANGLE_STEP = 360 / TOTAL_ITEMS;
const RADIUS = 650; // Increased radius to add space between cards

function StarryBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random stars only on client to avoid hydration mismatch
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-gold animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 2}px var(--color-gold)`,
          }}
        />
      ))}
    </div>
  );
}

export default function FeaturedVenueGrid() {
  const { prefersReducedMotion } = useGsap();
  const cylinderRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const featuredVenues = venues.filter((v) => v.status === "published").slice(0, 6);
  // Duplicate for smooth 3D loop
  const carouselItems = [...featuredVenues, ...featuredVenues];

  useEffect(() => {
    // Only animate the 3D cylinder if we have the ref and motion is allowed
    // and if the viewport is large enough (we handle mobile via CSS)
    if (!cylinderRef.current || prefersReducedMotion || window.innerWidth < 768) return;

    // Set initial 3D rotation based on mouse or just auto-rotate
    tweenRef.current = gsap.to(cylinderRef.current, {
      rotationY: "-=360",
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
  };

  // The Venue Card component for reuse
  const VenueCardNode = ({ venue, index, is3D = false }: { venue: typeof featuredVenues[0], index: number, is3D?: boolean }) => {
    const provider = providers.find((p) => p.id === venue.providerId);
    
    return (
      <Link
        href={`/venues/${venue.slug}`}
        className={`group block overflow-hidden rounded-2xl border border-border bg-bg-surface transition-all duration-500 hover:border-border-gold hover:shadow-[var(--shadow-glow)] no-underline flex-shrink-0 ${is3D ? 'absolute top-0 left-1/2 -translate-x-1/2 w-[320px]' : 'w-[300px] md:w-[350px] relative snap-center'}`}
        style={is3D ? {
          transform: `rotateY(${index * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
          backfaceVisibility: "hidden", // Hide back sides for a cleaner look
        } : {}}
      >
        {/* Venue Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 bg-cover bg-center"
            style={{
              backgroundImage: `url('${venue.heroImageUrl || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop"}')`,
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />

          {/* Price Badge */}
          {venue.priceFrom && (
            <div className="absolute top-4 right-4 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm border border-border-gold">
              From {formatPrice(venue.priceFrom)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-xl font-medium text-text-primary group-hover:text-gold transition-colors duration-300">
                {venue.name}
              </h3>
              <p className="mt-1 text-sm text-gold/80">
                {provider?.brandName}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-text-muted transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
            {venue.shortDescription}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {venue.city}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {venue.capacityMin}–{venue.capacityMax} guests
            </span>
          </div>

          {/* Event Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {venue.eventTypes.slice(0, 3).map((type) => (
              <span
                key={type}
                className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs text-text-muted"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <StarryBackground />
      {/* Background ambient lighting for the carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none hidden md:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Featured Spaces
            </span>
          </ScrollReveal>
          <SplitTextReveal
            text="Venues that inspire"
            as="h2"
            className="mt-4 font-display text-4xl font-medium text-text-primary md:text-5xl lg:text-6xl"
            delay={0.2}
          />
          <ScrollReveal delay={0.3}>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              From heritage ballrooms to industrial lofts and garden estates — discover
              spaces designed for extraordinary events.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Carousel Container */}
      {prefersReducedMotion ? (
        // Fallback Grid for Reduced Motion
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredVenues.map((venue, i) => (
              <ScrollReveal key={venue.id} delay={i * 0.1}>
                <VenueCardNode venue={venue} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Mobile: Horizontal Snap Scroll */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 hide-scrollbar">
            {featuredVenues.map((venue, i) => (
              <VenueCardNode key={`mobile-${i}`} venue={venue} index={i} />
            ))}
          </div>

          {/* Desktop: 3D Cylinder Carousel */}
          <div
            className="hidden md:flex justify-center items-center h-[550px]"
            style={{ perspective: "1500px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cylinderRef}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(-800px)" }}
            >
              {carouselItems.map((venue, i) => (
                <VenueCardNode key={`3d-${i}`} venue={venue} index={i} is3D={true} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* View All CTA */}
      <ScrollReveal delay={0.4}>
        <div className="mt-12 text-center relative z-10">
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 rounded-full border border-border-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-bg no-underline"
          >
            View All Venues
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

function getVenueGradient(index: number): string {
  const gradients = [
    "linear-gradient(135deg, #1a1510 0%, #2a1f15 40%, #C8A96A22 100%)",
    "linear-gradient(135deg, #0f1518 0%, #152025 40%, #6BA8C822 100%)",
    "linear-gradient(135deg, #12101a 0%, #1a152a 40%, #7B68EE22 100%)",
    "linear-gradient(135deg, #151510 0%, #1a1a12 40%, #9D6B5322 100%)",
    "linear-gradient(135deg, #0a120a 0%, #152015 40%, #6B8E6B22 100%)",
    "linear-gradient(135deg, #14100e 0%, #201a16 40%, #D4BC8522 100%)",
  ];
  return gradients[index % gradients.length];
}
