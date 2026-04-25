"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, MapPin, Users, Plus, ArrowUpRight, Edit } from "lucide-react";
import { getCurrentUser, getProviderIdForUser } from "@/lib/services/auth-service";
import { getVenuesByProviderId } from "@/lib/services/venue-service";
import { Venue } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const providerId = getProviderIdForUser(user.id);
      if (providerId) {
        setVenues(getVenuesByProviderId(providerId));
      }
    }
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
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display text-4xl text-text-primary mb-2">Venues</h1>
          <p className="text-text-secondary">Manage your spaces listed on LumiSpace.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-gold text-bg px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all">
          <Plus className="w-4 h-4" /> Add New Venue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="glass-strong rounded-2xl border border-border overflow-hidden flex flex-col">
            {/* Image placeholder */}
            <div className="aspect-video bg-bg-surface border-b border-border relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-bg/80 via-bg/20 to-transparent" />
              <div className="absolute top-4 right-4 px-2 py-1 rounded bg-bg/80 text-[10px] uppercase tracking-wider font-medium text-gold border border-border-gold backdrop-blur-sm">
                {venue.status}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-display text-xl text-text-primary mb-1">{venue.name}</h3>
                <p className="text-sm text-text-muted">{venue.venueType}</p>
              </div>

              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  {venue.city}, {venue.country}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="w-4 h-4 text-gold shrink-0" />
                  {venue.capacityMin} - {venue.capacityMax} pax
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Building2 className="w-4 h-4 text-gold shrink-0" />
                  {formatPrice(venue.priceFrom)} starting
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-6 border-t border-border">
                <button className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-bg-elevated border border-border rounded-lg text-sm text-text-primary hover:text-gold hover:border-gold transition-colors">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <Link 
                  href={`/venues/${venue.slug}`}
                  target="_blank"
                  className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-transparent border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  View Public <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
