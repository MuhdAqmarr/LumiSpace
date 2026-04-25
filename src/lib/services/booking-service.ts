/* ===================================================================
   LumiSpace — Booking Service
   Manages booking lifecycle (mock data + localStorage-ready)
   =================================================================== */

import { Booking, BookingStatus, BookingStatusHistory, TimeSlot } from "@/lib/types";
import { bookings as seedBookings } from "@/lib/data/bookings";
import { generateId, generateBookingCode } from "@/lib/utils";

const STORAGE_KEY = "lumispace_bookings";
const HISTORY_KEY = "lumispace_booking_history";

function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return seedBookings;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedBookings));
    return seedBookings;
  }
  return JSON.parse(stored);
}

function saveBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function getStoredHistory(): BookingStatusHistory[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveHistory(history: BookingStatusHistory[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ─── Read Operations ──────────────────────────────────────────────

export function getBookings(): Booking[] {
  return getStoredBookings();
}

export function getBookingById(id: string): Booking | undefined {
  return getStoredBookings().find((b) => b.id === id);
}

export function getBookingByCode(bookingCode: string): Booking | undefined {
  return getStoredBookings().find((b) => b.bookingCode === bookingCode);
}

export function getBookingsByProviderId(providerId: string): Booking[] {
  return getStoredBookings().filter((b) => b.providerId === providerId);
}

export function getBookingsByVenueId(venueId: string): Booking[] {
  return getStoredBookings().filter((b) => b.venueId === venueId);
}

export function getBookingsByStatus(
  providerId: string,
  status: BookingStatus
): Booking[] {
  return getStoredBookings().filter(
    (b) => b.providerId === providerId && b.status === status
  );
}

// ─── Availability ─────────────────────────────────────────────────

/** Check if a specific slot is available for a venue on a given date */
export function isSlotAvailable(
  venueId: string,
  eventDate: string,
  startTime: string,
  endTime: string
): boolean {
  const bookings = getStoredBookings();
  return !bookings.some(
    (b) =>
      b.venueId === venueId &&
      b.eventDate === eventDate &&
      b.startTime === startTime &&
      b.endTime === endTime &&
      (b.status === "pending" || b.status === "approved")
  );
}

/** Get all unavailable slots for a venue on a given date */
export function getUnavailableSlots(
  venueId: string,
  eventDate: string
): { startTime: string; endTime: string }[] {
  const bookings = getStoredBookings();
  return bookings
    .filter(
      (b) =>
        b.venueId === venueId &&
        b.eventDate === eventDate &&
        (b.status === "pending" || b.status === "approved")
    )
    .map((b) => ({ startTime: b.startTime, endTime: b.endTime }));
}

/** Generate time slots for a venue on a given date */
export function generateTimeSlots(
  venueId: string,
  eventDate: string
): TimeSlot[] {
  const unavailable = getUnavailableSlots(venueId, eventDate);

  // Default time slots (morning, afternoon, evening, night)
  const defaultSlots = [
    { startTime: "09:00", endTime: "13:00" },
    { startTime: "13:00", endTime: "17:00" },
    { startTime: "14:00", endTime: "18:00" },
    { startTime: "17:00", endTime: "21:00" },
    { startTime: "18:00", endTime: "22:00" },
    { startTime: "18:00", endTime: "23:00" },
    { startTime: "19:00", endTime: "23:00" },
  ];

  return defaultSlots.map((slot) => ({
    ...slot,
    isAvailable: !unavailable.some(
      (u) => u.startTime === slot.startTime && u.endTime === slot.endTime
    ),
  }));
}

// ─── Write Operations ─────────────────────────────────────────────

export interface CreateBookingInput {
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
}

export function createBooking(input: CreateBookingInput): Booking {
  const bookings = getStoredBookings();
  const now = new Date().toISOString();

  const newBooking: Booking = {
    ...input,
    id: `book-${generateId()}`,
    bookingCode: generateBookingCode(),
    status: "pending",
    adminNote: undefined,
    reviewedBy: undefined,
    reviewedAt: undefined,
    createdAt: now,
    updatedAt: now,
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  // Create initial status history entry
  addStatusHistory(newBooking.id, undefined, "pending", undefined, "Booking request submitted");

  return newBooking;
}

export function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  adminNote?: string,
  reviewedBy?: string
): Booking | undefined {
  const bookings = getStoredBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) return undefined;

  const oldStatus = bookings[index].status;
  const now = new Date().toISOString();

  bookings[index] = {
    ...bookings[index],
    status,
    adminNote: adminNote || bookings[index].adminNote,
    reviewedBy: reviewedBy || bookings[index].reviewedBy,
    reviewedAt: now,
    updatedAt: now,
  };

  saveBookings(bookings);

  // Add to status history
  addStatusHistory(
    bookingId,
    oldStatus,
    status,
    reviewedBy,
    adminNote || `Status changed from ${oldStatus} to ${status}`
  );

  return bookings[index];
}

// ─── Status History ───────────────────────────────────────────────

function addStatusHistory(
  bookingId: string,
  oldStatus: BookingStatus | undefined,
  newStatus: BookingStatus,
  changedBy?: string,
  note?: string
): void {
  const history = getStoredHistory();
  history.push({
    id: `hist-${generateId()}`,
    bookingId,
    oldStatus,
    newStatus,
    changedBy,
    note,
    createdAt: new Date().toISOString(),
  });
  saveHistory(history);
}

export function getBookingHistory(bookingId: string): BookingStatusHistory[] {
  return getStoredHistory().filter((h) => h.bookingId === bookingId);
}

// ─── Stats ────────────────────────────────────────────────────────

export function getProviderStats(providerId: string) {
  const bookings = getBookingsByProviderId(providerId);
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return {
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    total: bookings.length,
    thisMonth: bookings.filter((b) => b.createdAt.startsWith(thisMonth)).length,
  };
}
