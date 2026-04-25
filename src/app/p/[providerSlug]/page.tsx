"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Mail, Phone, Building2 } from "lucide-react";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import VenueCard from "@/components/public/VenueCard";
import ProviderSignatureScene from "@/components/webgl/ProviderSignatureScene";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getProviderBySlug } from "@/lib/services/provider-service";
import { getVenuesByProviderId } from "@/lib/services/venue-service";
import { Provider, Venue } from "@/lib/types";

export default function ProviderLandingPage() {
  const params = useParams();
  const router = useRouter();
  const providerSlug = params.providerSlug as string;

  const [provider, setProvider] = useState<Provider | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getProviderBySlug(providerSlug);
    if (p) {
      setProvider(p);
      setVenues(getVenuesByProviderId(p.id).filter(v => v.status === "published"));
    }
    setLoading(false);
  }, [providerSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl text-text-primary mb-4">Provider not found</h1>
        <p className="text-text-secondary mb-8">This venue provider doesn&apos;t exist or is currently unavailable.</p>
        <button onClick={() => router.push('/')} className="text-gold hover:underline">Go to Home</button>
      </div>
    );
  }

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen bg-bg">
        {/* Provider Hero */}
        <section className="relative pt-[calc(var(--nav-height)+40px)] pb-24 border-b border-border overflow-hidden">
          {/* Theme background based on provider's webglPreset */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 background: provider.themeJson?.webglPreset === 'neon' ? 'radial-gradient(circle at 50% 0%, rgba(123, 104, 238, 0.4) 0%, transparent 70%)' :
                             provider.themeJson?.webglPreset === 'garden' ? 'radial-gradient(circle at 50% 0%, rgba(107, 142, 107, 0.4) 0%, transparent 70%)' :
                             'radial-gradient(circle at 50% 0%, rgba(200, 169, 106, 0.3) 0%, transparent 70%)'
               }}
          />

          {/* Three.js Provider Signature Scene */}
          <ProviderSignatureScene preset={provider.themeJson?.webglPreset || "gold"} />
          
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <ScrollReveal>
              <div className="mb-6 mx-auto flex items-center justify-center w-20 h-20 rounded-2xl bg-bg-surface border border-border">
                 <Building2 className="w-8 h-8 text-gold" />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-5xl md:text-7xl text-text-primary mb-4">
                {provider.brandName}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-xl italic text-gold mb-8">
                &ldquo;{provider.tagline}&rdquo;
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
                {provider.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {provider.city}, {provider.country}</span>
                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> {provider.contactEmail}</span>
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> {provider.contactPhone}</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Venues Grid */}
        <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl text-text-primary">Our Spaces</h2>
            <p className="mt-4 text-text-secondary">Discover {venues.length} extraordinary venues by {provider.brandName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue, i) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                provider={provider}
                gradientIndex={i}
                href={`/p/${provider.slug}/${venue.slug}`}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
