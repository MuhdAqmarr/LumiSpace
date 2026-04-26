"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { getBookings } from "@/lib/services/booking-service";
import { getProviderById } from "@/lib/services/provider-service";
import { getVenueById } from "@/lib/services/venue-service";
import { Booking } from "@/lib/types";
import Link from "next/link";
import CustomSelect from "@/components/ui/CustomSelect";

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providerNames, setProviderNames] = useState<Record<string, string>>({});
  const [venueNames, setVenueNames] = useState<Record<string, string>>({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const all = getBookings();
    // Sort newest first
    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setBookings(all);

    // Resolve names
    const pNames: Record<string, string> = {};
    const vNames: Record<string, string> = {};
    all.forEach(b => {
      if (!pNames[b.providerId]) {
        const p = getProviderById(b.providerId);
        pNames[b.providerId] = p?.brandName ?? b.providerId;
      }
      if (!vNames[b.venueId]) {
        const v = getVenueById(b.venueId);
        vNames[b.venueId] = v?.name ?? b.venueId;
      }
    });
    setProviderNames(pNames);
    setVenueNames(vNames);
    setLoading(false);
  }, []);

  const filtered = filterStatus === "all" ? bookings : bookings.filter(b => b.status === filterStatus);

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
        <h1 className="font-display text-4xl text-text-primary mb-2">All Bookings</h1>
        <p className="text-text-secondary">Platform-wide view of all booking requests.</p>
      </div>

      {/* Filter */}
      <div className="bg-bg-surface rounded-2xl border border-border p-4 mb-8 flex items-center gap-4 relative z-10">
        <div className="w-[200px]">
          <CustomSelect
            options={[
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter Status"
          />
        </div>
        <span className="text-sm text-text-muted">{filtered.length} booking{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Bookings List */}
      <div className="glass-strong rounded-2xl border border-border overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-border">
            {filtered.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-bg-elevated/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm font-medium text-text-primary">{booking.bookingCode}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium border ${
                        booking.status === "approved" ? "bg-success/10 text-success border-success/20" :
                        booking.status === "rejected" ? "bg-danger/10 text-danger border-danger/20" :
                        "bg-warning/10 text-warning border-warning/20"
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-text-muted mb-1">Customer</p>
                        <p className="text-sm text-text-primary font-medium">{booking.customerName}</p>
                        <p className="text-xs text-text-secondary">{booking.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-1">Provider</p>
                        <p className="text-sm text-text-primary font-medium">{providerNames[booking.providerId]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-1">Venue</p>
                        <p className="text-sm text-text-primary font-medium">{venueNames[booking.venueId]}</p>
                        <p className="text-xs text-text-secondary">{booking.eventType} ({booking.guestCount} pax)</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-1">Date & Time</p>
                        <p className="text-sm text-text-primary font-medium flex items-center gap-1.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-gold" /> {booking.eventDate}
                        </p>
                        <p className="text-xs text-text-secondary flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold" /> {booking.startTime} – {booking.endTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-gold rounded-xl text-sm font-medium text-gold hover:bg-gold hover:text-bg transition-colors"
                    >
                      Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center">
            <p className="text-text-secondary">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
