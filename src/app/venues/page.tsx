"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import VenueCard from "@/components/public/VenueCard";
import { searchVenues } from "@/lib/services/venue-service";
import { getProviders } from "@/lib/services/provider-service";
import { Venue, Provider } from "@/lib/types";
import { Search } from "lucide-react";

function VenueListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [venues, setVenues] = useState<Venue[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  
  // Filters
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [eventType, setEventType] = useState(searchParams.get("eventType") || "");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  useEffect(() => {
    setProviders(getProviders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    const results = searchVenues({ city, eventType, keyword });
    setVenues(results);

    // Update URL
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (eventType) params.set("eventType", eventType);
    if (keyword) params.set("keyword", keyword);
    router.replace(`/venues?${params.toString()}`);
  };

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen pt-[var(--nav-height)] pb-24">
        {/* Header */}
        <div className="bg-bg-surface border-b border-border py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="font-display text-4xl font-medium text-text-primary md:text-5xl">
              Discover Venues
            </h1>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Explore our curated collection of cinematic halls, rooftop spaces, and heritage estates.
            </p>

            {/* Filter Bar */}
            <div className="mt-8 glass rounded-2xl border border-border p-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="rounded-xl bg-bg-elevated/50 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
                />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-xl bg-bg-elevated/50 px-4 py-3 text-sm text-text-primary outline-none"
                >
                  <option value="">Any location</option>
                  <option value="Kuala Lumpur">Kuala Lumpur</option>
                  <option value="Petaling Jaya">Petaling Jaya</option>
                  <option value="Shah Alam">Shah Alam</option>
                </select>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="rounded-xl bg-bg-elevated/50 px-4 py-3 text-sm text-text-primary outline-none"
                >
                  <option value="">Any event type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate Dinner">Corporate Dinner</option>
                  <option value="Product Launch">Product Launch</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Birthday">Birthday</option>
                </select>
                <button
                  onClick={handleSearch}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-bg transition-all duration-300 hover:bg-gold-light"
                >
                  <Search className="h-4 w-4" />
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-medium text-text-secondary">
              Showing {venues.length} {venues.length === 1 ? 'venue' : 'venues'}
            </h2>
          </div>

          {venues.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {venues.map((venue, i) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  provider={providers.find((p) => p.id === venue.providerId)}
                  gradientIndex={i}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-bg-surface/50 py-24 text-center">
              <Search className="h-10 w-10 text-text-muted mb-4" />
              <h3 className="text-lg font-medium text-text-primary">No venues found</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Try adjusting your search filters to find what you&apos;re looking for.
              </p>
              <button 
                onClick={() => {
                  setKeyword(""); setCity(""); setEventType("");
                  setTimeout(handleSearch, 0);
                }}
                className="mt-6 text-sm text-gold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function VenuesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" /></div>}>
      <VenueListingContent />
    </Suspense>
  );
}
