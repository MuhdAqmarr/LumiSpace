/* ===================================================================
   LumiSpace — Booking Validation Schema (Zod)
   =================================================================== */

import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),

  customerEmail: z
    .string()
    .email("Please enter a valid email address"),

  customerPhone: z
    .string()
    .min(8, "Phone number must be at least 8 characters")
    .max(20, "Phone number must be under 20 characters"),

  organizationName: z
    .string()
    .max(100, "Organization name must be under 100 characters")
    .optional()
    .or(z.literal("")),

  eventType: z
    .string()
    .min(1, "Please select an event type"),

  eventDate: z
    .string()
    .min(1, "Please select a date")
    .refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const date = new Date(val);
        date.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: "Event date must be today or in the future" }
    ),

  startTime: z
    .string()
    .min(1, "Please select a start time"),

  endTime: z
    .string()
    .min(1, "Please select an end time"),

  guestCount: z
    .number({ error: "Guest count is required" })
    .int("Guest count must be a whole number")
    .min(1, "Guest count must be at least 1"),

  setupNotes: z
    .string()
    .max(500, "Setup notes must be under 500 characters")
    .optional()
    .or(z.literal("")),

  specialRequests: z
    .string()
    .max(500, "Special requests must be under 500 characters")
    .optional()
    .or(z.literal("")),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
