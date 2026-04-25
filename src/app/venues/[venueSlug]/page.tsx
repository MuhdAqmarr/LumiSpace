"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Maximize, Calendar, ShieldCheck, FileText } from "lucide-react";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import { getVenueBySlug } from "@/lib/services/venue-service";
import { getProviderById } from "@/lib/services/provider-service";
import { Venue, Provider } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const venueSlug = params.venueSlug as string;

  const [venue, setVenue] = useState<Venue | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const v = getVenueBySlug(venueSlug);
    if (v) {
      setVenue(v);
      const p = getProviderById(v.providerId);
      if (p) setProvider(p);
    }
    setLoading(false);
  }, [venueSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!venue || !provider) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl text-text-primary mb-4">Venue not found</h1>
        <p className="text-text-secondary mb-8">The venue you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <button onClick={() => router.back()} className="text-gold hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full pt-[var(--nav-height)]">
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
          
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-16">
            <Link href="/venues" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors mb-6 w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to venues
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Link href={`/p/${provider.slug}`} className="text-gold text-sm font-medium tracking-wider uppercase hover:underline">
                  {provider.brandName}
                </Link>
                <h1 className="mt-2 font-display text-5xl md:text-6xl text-text-primary leading-tight">
                  {venue.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold" /> {venue.city}, {venue.country}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gold" /> {venue.capacityMin}-{venue.capacityMax} guests</span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-gold" /> {venue.sizeSqft} sqft</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4">
                <div className="text-left md:text-right">
                  <p className="text-sm text-text-secondary uppercase tracking-wider">Starting from</p>
                  <p className="font-display text-3xl text-gold">{formatPrice(venue.priceFrom)}</p>
                </div>
                <Link href={`/book/${venue.slug}`} className="bg-gold text-bg px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all">
                  Request to Book
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* About */}
              <div>
                <h2 className="font-display text-3xl text-text-primary mb-6">About the Space</h2>
                <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed max-w-none">
                  <p>{venue.longDescription}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-3xl text-text-primary mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-gold" /> Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2 text-text-secondary text-sm bg-bg-surface p-3 rounded-xl border border-border">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              <div>
                <h2 className="font-display text-3xl text-text-primary mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-gold" /> Ideal For
                </h2>
                <div className="flex flex-wrap gap-3">
                  {venue.eventTypes.map(type => (
                    <span key={type} className="px-4 py-2 rounded-full border border-border-gold text-gold text-sm bg-gold/5">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="glass-strong rounded-2xl p-6 border border-border-gold sticky top-24">
                <h3 className="font-display text-2xl text-text-primary mb-4">Venue Rules</h3>
                <ul className="space-y-4">
                  {venue.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                      <FileText className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Location</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{venue.address}<br/>{venue.city}, {venue.country}</p>
                </div>
                <Link href={`/book/${venue.slug}`} className="mt-8 w-full block text-center bg-gold text-bg px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all">
                  Check Availability
                </Link>
              </div>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
