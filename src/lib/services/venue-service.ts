/* ===================================================================
   LumiSpace — Venue Service
   Manages venue CRUD operations (mock data + localStorage-ready)
   =================================================================== */

import { Venue } from "@/lib/types";
import { venues as seedVenues } from "@/lib/data/venues";
import { generateId, slugify } from "@/lib/utils";

const STORAGE_KEY = "lumispace_venues";

function getStoredVenues(): Venue[] {
  if (typeof window === "undefined") return seedVenues;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedVenues));
    return seedVenues;
  }
  return JSON.parse(stored);
}

function saveVenues(venues: Venue[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(venues));
}

export function getVenues(): Venue[] {
  return getStoredVenues();
}

export function getPublishedVenues(): Venue[] {
  return getStoredVenues().filter((v) => v.status === "published");
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return getStoredVenues().find((v) => v.slug === slug);
}

export function getVenueById(id: string): Venue | undefined {
  return getStoredVenues().find((v) => v.id === id);
}

export function getVenuesByProviderId(providerId: string): Venue[] {
  return getStoredVenues().filter((v) => v.providerId === providerId);
}

export function searchVenues(filters: {
  city?: string;
  eventType?: string;
  minCapacity?: number;
  keyword?: string;
  providerId?: string;
}): Venue[] {
  let results = getPublishedVenues();

  if (filters.city) {
    results = results.filter(
      (v) => v.city.toLowerCase() === filters.city!.toLowerCase()
    );
  }

  if (filters.eventType) {
    results = results.filter((v) =>
      v.eventTypes.some(
        (et) => et.toLowerCase() === filters.eventType!.toLowerCase()
      )
    );
  }

  if (filters.minCapacity) {
    results = results.filter((v) => v.capacityMax >= filters.minCapacity!);
  }

  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(kw) ||
        v.shortDescription.toLowerCase().includes(kw) ||
        v.city.toLowerCase().includes(kw)
    );
  }

  if (filters.providerId) {
    results = results.filter((v) => v.providerId === filters.providerId);
  }

  return results;
}

export function createVenue(
  input: Omit<Venue, "id" | "slug" | "status" | "createdAt" | "updatedAt">
): Venue {
  const venues = getStoredVenues();
  const now = new Date().toISOString();
  const newVenue: Venue = {
    ...input,
    id: `venue-${generateId()}`,
    slug: slugify(input.name),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  venues.push(newVenue);
  saveVenues(venues);
  return newVenue;
}

export function updateVenue(
  id: string,
  input: Partial<Venue>
): Venue | undefined {
  const venues = getStoredVenues();
  const index = venues.findIndex((v) => v.id === id);
  if (index === -1) return undefined;
  venues[index] = {
    ...venues[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  saveVenues(venues);
  return venues[index];
}
