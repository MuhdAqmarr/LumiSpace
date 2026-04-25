/* ===================================================================
   LumiSpace — TypeScript Type Definitions
   Multi-provider venue booking marketplace
   =================================================================== */

// ─── User Roles ───────────────────────────────────────────────────
export type UserRole =
  | "guest"
  | "customer"
  | "provider_admin"
  | "provider_staff"
  | "platform_admin";

export type ProviderStatus = "pending" | "approved" | "suspended";
export type VenueStatus = "draft" | "published" | "archived";
export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled";

// ─── Profile ──────────────────────────────────────────────────────
export interface Profile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ─── Provider ─────────────────────────────────────────────────────
export interface ProviderTheme {
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  heroStyle?: "cinematic" | "editorial" | "minimal";
  webglPreset?: "gold" | "neon" | "garden" | "none";
}

export interface Provider {
  id: string;
  ownerId: string;
  brandName: string;
  slug: string;
  tagline: string;
  description: string;
  story: string;
  logoUrl?: string;
  heroVideoUrl?: string;
  heroImageUrl?: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl?: string;
  address: string;
  city: string;
  country: string;
  status: ProviderStatus;
  themeJson?: ProviderTheme;
  createdAt: string;
  updatedAt: string;
}

// ─── Venue ────────────────────────────────────────────────────────
export interface Venue {
  id: string;
  providerId: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  venueType: string;
  capacityMin: number;
  capacityMax: number;
  sizeSqft?: number;
  address: string;
  city: string;
  country: string;
  priceFrom?: number;
  heroImageUrl?: string;
  heroVideoUrl?: string;
  galleryUrls: string[];
  amenities: string[];
  rules: string[];
  eventTypes: string[];
  status: VenueStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Venue Availability ──────────────────────────────────────────
export interface VenueAvailabilityRule {
  id: string;
  venueId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  isActive: boolean;
}

export interface VenueBlockedDate {
  id: string;
  venueId: string;
  blockedDate: string;
  reason?: string;
  createdAt: string;
}

// ─── Booking ──────────────────────────────────────────────────────
export interface Booking {
  id: string;
  bookingCode: string;
  providerId: string;
  venueId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  organizationName?: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  setupNotes?: string;
  specialRequests?: string;
  status: BookingStatus;
  adminNote?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  oldStatus?: BookingStatus;
  newStatus: BookingStatus;
  changedBy?: string;
  note?: string;
  createdAt: string;
}

// ─── Time Slot ────────────────────────────────────────────────────
export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
