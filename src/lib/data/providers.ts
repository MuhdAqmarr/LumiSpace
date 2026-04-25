/* ===================================================================
   LumiSpace — Seed Data: Providers
   3 premium venue providers in Malaysia
   =================================================================== */

import { Provider } from "@/lib/types";

export const providers: Provider[] = [
  {
    id: "prov-001",
    ownerId: "user-001",
    brandName: "Lumiere Grand Hall",
    slug: "lumiere-grand-hall",
    tagline: "A heritage ballroom restored for modern celebrations.",
    description:
      "Lumiere Grand Hall is a restored heritage ballroom in the heart of Kuala Lumpur. With soaring ceilings, crystal chandeliers, and warm stone walls, Lumiere creates a stage for unforgettable evenings — from grand weddings to corporate galas.",
    story:
      "Built in 1928 as the Grand Oriental Ballroom, Lumiere was restored in 2021 by a team of architects and designers who saw beauty in decay. Every crack in the marble tells a story. Every chandelier was hand-restored. Today, Lumiere stands as a bridge between heritage and modern celebration — a space where history meets production, and every event becomes part of the building's legacy.",
    logoUrl: undefined,
    heroVideoUrl: undefined,
    heroImageUrl: "https://images.unsplash.com/photo-1542551433-28956b7c5361?q=80&w=2000&auto=format&fit=crop",
    contactEmail: "hello@lumieregrandhall.com",
    contactPhone: "+60 12-345 6789",
    websiteUrl: "https://lumieregrandhall.com",
    address: "88 Jalan Sultan Ismail, Bukit Bintang",
    city: "Kuala Lumpur",
    country: "Malaysia",
    status: "approved",
    themeJson: {
      accentColor: "#C8A96A",
      backgroundColor: "#080706",
      textColor: "#F7F1E8",
      heroStyle: "cinematic",
      webglPreset: "gold",
    },
    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2026-01-10T14:30:00Z",
  },
  {
    id: "prov-002",
    ownerId: "user-002",
    brandName: "Urban Loft Collective",
    slug: "urban-loft-collective",
    tagline: "Industrial spaces for launches, exhibitions, and modern gatherings.",
    description:
      "Urban Loft Collective transforms raw industrial spaces in Petaling Jaya into powerful event venues. Exposed concrete, steel beams, and neon accents create an edgy atmosphere perfect for product launches, art exhibitions, tech meetups, and creative celebrations.",
    story:
      "What started as an abandoned printing factory in 2019 became PJ's most sought-after event destination. Urban Loft Collective was born from the belief that rough spaces create the most honest experiences. We kept the concrete. We added the light. We let the space speak — and now, every event that happens here carries an edge that polished ballrooms can never replicate.",
    logoUrl: undefined,
    heroVideoUrl: undefined,
    heroImageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
    contactEmail: "book@urbanloft.co",
    contactPhone: "+60 11-234 5678",
    websiteUrl: "https://urbanloft.co",
    address: "15 Jalan 51A/223, Seksyen 51A",
    city: "Petaling Jaya",
    country: "Malaysia",
    status: "approved",
    themeJson: {
      accentColor: "#7B68EE",
      backgroundColor: "#0A0A0F",
      textColor: "#E8E8F0",
      heroStyle: "editorial",
      webglPreset: "neon",
    },
    createdAt: "2025-08-20T08:00:00Z",
    updatedAt: "2026-02-05T11:00:00Z",
  },
  {
    id: "prov-003",
    ownerId: "user-003",
    brandName: "Gardenia Event Estate",
    slug: "gardenia-event-estate",
    tagline: "Garden ceremonies and open-air celebrations framed by nature.",
    description:
      "Gardenia Event Estate offers lush garden venues in Shah Alam, perfect for intimate ceremonies, outdoor dinners, and nature-framed celebrations. Glass marquees, botanical archways, and sunset-facing lawns create a naturally premium experience.",
    story:
      "Gardenia began as a family estate surrounded by frangipani trees and koi ponds. When the matriarch of the family decided to share the grounds with others, she envisioned a place where celebrations would feel like coming home — surrounded by greenery, birdsong, and golden afternoon light. Today, Gardenia hosts weddings, garden parties, and corporate retreats that feel less like events and more like memories being made in real time.",
    logoUrl: undefined,
    heroVideoUrl: undefined,
    heroImageUrl: "https://images.unsplash.com/photo-1505069358249-166943e8ea2a?q=80&w=2000&auto=format&fit=crop",
    contactEmail: "events@gardeniaestate.my",
    contactPhone: "+60 13-456 7890",
    websiteUrl: "https://gardeniaestate.my",
    address: "Lot 7, Persiaran Kayangan, Seksyen 7",
    city: "Shah Alam",
    country: "Malaysia",
    status: "approved",
    themeJson: {
      accentColor: "#6B8E6B",
      backgroundColor: "#0A0E08",
      textColor: "#F0F5E8",
      heroStyle: "cinematic",
      webglPreset: "garden",
    },
    createdAt: "2025-10-01T09:00:00Z",
    updatedAt: "2026-03-15T16:00:00Z",
  },
];
