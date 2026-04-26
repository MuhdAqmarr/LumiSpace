"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Users, DollarSign } from "lucide-react";
import { getVenues } from "@/lib/services/venue-service";
import { getProviderById } from "@/lib/services/provider-service";
import { Venue } from "@/lib/types";
import Image from "next/image";

export default function AllVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [providerNames, setProviderNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const all = getVenues();
    setVenues(all);
    // Resolve provider names
    const names: Record<string, string> = {};
    all.forEach(v => {
      if (!names[v.providerId]) {
        const p = getProviderById(v.providerId);
        names[v.providerId] = p?.brandName ?? v.providerId;
      }
    });
    setProviderNames(names);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-text-primary mb-2">All Venues</h1>
        <p className="text-text-secondary">Platform-wide view of all listed venues across every provider.</p>
      </div>

      {/* Count badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
        <Building2 className="w-4 h-4" />
        {venues.length} total venues
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-bg-surface rounded-2xl border border-border overflow-hidden flex flex-col hover:border-gold/40 transition-colors">
            {/* Image */}
            <div className="aspect-video relative bg-bg-elevated">
              {venue.heroImageUrl ? (
                <Image src={venue.heroImageUrl} alt={venue.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-text-muted" />
                </div>
              )}
              {/* Status pill */}
              <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium border ${
                venue.status === "published" ? "bg-success/80 text-success border-success/40" :
                venue.status === "draft" ? "bg-warning/80 text-warning border-warning/40" :
                "bg-danger/80 text-danger border-danger/40"
              }`}>
                {venue.status}
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div>
                <p className="font-display text-lg text-text-primary">{venue.name}</p>
                <p className="text-xs text-gold mt-0.5">{providerNames[venue.providerId]}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{venue.city}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{venue.capacityMin}–{venue.capacityMax} pax</span>
                {venue.priceFrom && (
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />RM {venue.priceFrom.toLocaleString()}</span>
                )}
              </div>
              <p className="text-xs text-text-muted font-mono">{venue.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
