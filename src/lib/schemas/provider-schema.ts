/* ===================================================================
   LumiSpace — Provider Registration Validation Schema (Zod)
   =================================================================== */

import { z } from "zod";

export const providerRegistrationSchema = z.object({
  // Provider details
  brandName: z
    .string()
    .min(2, "Brand name must be at least 2 characters")
    .max(100, "Brand name must be under 100 characters"),

  tagline: z
    .string()
    .min(10, "Tagline must be at least 10 characters")
    .max(200, "Tagline must be under 200 characters"),

  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description must be under 1000 characters"),

  contactEmail: z
    .string()
    .email("Please enter a valid email address"),

  contactPhone: z
    .string()
    .min(8, "Phone number must be at least 8 characters"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),

  city: z
    .string()
    .min(2, "City is required"),

  country: z
    .string()
    .min(2, "Country is required"),

  // First venue details
  firstVenueName: z
    .string()
    .min(2, "Venue name must be at least 2 characters"),

  firstVenueType: z
    .string()
    .min(1, "Please select a venue type"),

  capacityMin: z
    .number({ error: "Minimum capacity is required" })
    .int()
    .min(1, "Minimum capacity must be at least 1"),

  capacityMax: z
    .number({ error: "Maximum capacity is required" })
    .int()
    .min(1, "Maximum capacity must be at least 1"),

  priceFrom: z
    .number({ error: "Starting price is required" })
    .min(0, "Price must be positive"),

  firstVenueDescription: z
    .string()
    .min(20, "Venue description must be at least 20 characters")
    .max(500, "Venue description must be under 500 characters"),

  // Branding (optional URLs for MVP)
  heroImageUrl: z.string().optional().or(z.literal("")),
  heroVideoUrl: z.string().optional().or(z.literal("")),
  logoUrl: z.string().optional().or(z.literal("")),
});

export type ProviderRegistrationFormValues = z.infer<
  typeof providerRegistrationSchema
>;
