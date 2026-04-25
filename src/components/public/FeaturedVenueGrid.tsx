"use client";

import Link from "next/link";
import { MapPin, Users, ArrowUpRight } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { providers } from "@/lib/data/providers";
import { formatPrice } from "@/lib/utils";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";

export default function FeaturedVenueGrid() {
  const featuredVenues = venues.filter((v) => v.status === "published").slice(0, 6);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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

        {/* Venue Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredVenues.map((venue, index) => {
            const provider = providers.find((p) => p.id === venue.providerId);
            return (
              <ScrollReveal key={venue.id} delay={index * 0.1} distance={50}>
                <Link
                  href={`/venues/${venue.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-bg-surface transition-all duration-500 hover:border-border-gold hover:shadow-[var(--shadow-glow)] no-underline"
                >
                  {/* Image Placeholder / Gradient */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        background: getVenueGradient(index),
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
              </ScrollReveal>
            );
          })}
        </div>

        {/* View All CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 rounded-full border border-border-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-bg no-underline"
            >
              View All Venues
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
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
