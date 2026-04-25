"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Building2, ArrowRight, Search } from "lucide-react";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitTextReveal from "@/components/motion/SplitTextReveal";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import { getApprovedProviders } from "@/lib/services/provider-service";
import { getVenuesByProviderId } from "@/lib/services/venue-service";
import { Provider } from "@/lib/types";

interface ProviderWithCount extends Provider {
  venueCount: number;
}

const presetColors: Record<string, { accent: string; glow: string }> = {
  gold:   { accent: "#C8A96A", glow: "rgba(200,169,106,0.12)" },
  neon:   { accent: "#7B68EE", glow: "rgba(123,104,238,0.12)" },
  garden: { accent: "#6B8E6B", glow: "rgba(107,142,107,0.12)" },
};

export default function ProvidersPage() {
  const [providers, setProviders] = useState<ProviderWithCount[]>([]);
  const [filtered, setFiltered] = useState<ProviderWithCount[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const approved = getApprovedProviders();
    const withCount: ProviderWithCount[] = approved.map((p) => ({
      ...p,
      venueCount: getVenuesByProviderId(p.id).filter(
        (v) => v.status === "published"
      ).length,
    }));
    setProviders(withCount);
    setFiltered(withCount);
    setLoading(false);
  }, []);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setFiltered(providers);
    } else {
      setFiltered(
        providers.filter(
          (p) =>
            p.brandName.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q)
        )
      );
    }
  }, [query, providers]);

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen bg-bg">

        {/* Hero */}
        <section className="relative pt-[calc(var(--nav-height)+60px)] pb-16 overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <ScrollReveal delay={0.1}>
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold border border-gold/30 rounded-full px-4 py-1.5">
                Trusted Venue Providers
              </span>
            </ScrollReveal>

            <SplitTextReveal
              text="Our Premium Providers"
              as="h1"
              className="font-display text-5xl md:text-6xl text-text-primary mb-5"
              delay={0.2}
            />

            <ScrollReveal delay={0.4}>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                Every provider on LumiSpace is handpicked and vetted for quality,
                reliability, and exceptional event experiences.
              </p>
            </ScrollReveal>

            {/* Search */}
            <ScrollReveal delay={0.5}>
              <div className="relative mt-10 max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city or specialty…"
                  className="w-full bg-bg-surface border border-border rounded-full pl-11 pr-5 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-gold transition-colors"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Provider Grid */}
        <section className="pb-24 mx-auto max-w-7xl px-6 lg:px-8">

          {loading ? (
            <LoadingState message="Loading providers…" />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No providers found"
              description={
                query
                  ? `No providers match "${query}". Try a different search.`
                  : "No approved providers yet. Check back soon."
              }
              actionHref="/"
              actionLabel="Back to Home"
            />
          ) : (
            <>
              {/* Count */}
              <ScrollReveal>
                <p className="text-sm text-text-muted mb-8">
                  Showing <span className="text-gold font-medium">{filtered.length}</span> provider{filtered.length !== 1 ? "s" : ""}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((provider, i) => {
                  const preset = provider.themeJson?.webglPreset ?? "gold";
                  const colors = presetColors[preset] ?? presetColors.gold;

                  return (
                    <ScrollReveal key={provider.id} delay={i * 0.08}>
                      <Link
                        href={`/p/${provider.slug}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-surface transition-all duration-500 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_0_40px_var(--glow)] no-underline h-full"
                        style={{
                          ["--accent" as string]: colors.accent,
                          ["--glow" as string]: colors.glow,
                        }}
                      >
                        {/* Hero Image */}
                        <div
                          className="relative h-40 overflow-hidden bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${provider.heroImageUrl || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop"}')`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/30 to-transparent" />

                          {/* Venue count badge */}
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-bg/60 backdrop-blur-sm border border-border px-3 py-1">
                            <Building2 className="h-3 w-3 text-text-muted" />
                            <span className="text-xs text-text-muted">
                              {provider.venueCount} {provider.venueCount === 1 ? "venue" : "venues"}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          <h2 className="font-display text-xl font-medium text-text-primary mb-1 group-hover:text-gold transition-colors duration-300">
                            {provider.brandName}
                          </h2>
                          <p
                            className="text-sm italic mb-3"
                            style={{ color: colors.accent }}
                          >
                            &ldquo;{provider.tagline}&rdquo;
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
                            {provider.description}
                          </p>

                          <div className="mt-5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs text-text-muted">
                              <MapPin className="h-3 w-3" style={{ color: colors.accent }} />
                              {provider.city}, {provider.country}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium transition-colors duration-300 group-hover:gap-2" style={{ color: colors.accent }}>
                              View Spaces
                              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
