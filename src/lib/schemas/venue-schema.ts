/* ===================================================================
   LumiSpace — Venue Validation Schema (Zod)
   =================================================================== */

import { z } from "zod";

export const venueSchema = z.object({
  name: z
    .string()
    .min(3, "Venue name must be at least 3 characters")
    .max(100, "Venue name must be under 100 characters"),

  shortDescription: z
    .string()
    .min(20, "Short description must be at least 20 characters")
    .max(200, "Short description must be under 200 characters"),

  longDescription: z
    .string()
    .min(100, "Full description must be at least 100 characters")
    .max(3000, "Full description must be under 3000 characters"),

  venueType: z
    .string()
    .min(1, "Please select a venue type"),

  capacityMin: z
    .number({ error: "Minimum capacity is required" })
    .int("Must be a whole number")
    .min(1, "Minimum capacity must be at least 1"),

  capacityMax: z
    .number({ error: "Maximum capacity is required" })
    .int("Must be a whole number")
    .min(1, "Maximum capacity must be at least 1"),

  sizeSqft: z
    .number()
    .int("Must be a whole number")
    .min(1)
    .optional(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),

  city: z
    .string()
    .min(2, "City is required"),

  country: z
    .string()
    .min(2, "Country is required"),

  priceFrom: z
    .number({ error: "Starting price is required" })
    .min(1, "Price must be at least 1"),

  heroImageUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  heroVideoUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  amenities: z
    .string()
    .max(1000)
    .optional(),

  rules: z
    .string()
    .max(1000)
    .optional(),

  eventTypes: z
    .string()
    .min(1, "Please specify at least one event type"),
}).refine((data) => data.capacityMax >= data.capacityMin, {
  message: "Maximum capacity must be greater than or equal to minimum",
  path: ["capacityMax"],
});

export type VenueFormValues = z.infer<typeof venueSchema>;
