"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { getCurrentUser, getProviderIdForUser } from "@/lib/services/auth-service";
import { getBookingsByProviderId } from "@/lib/services/booking-service";
import { getVenuesByProviderId } from "@/lib/services/venue-service";
import { Booking, Venue } from "@/lib/types";
import CustomSelect from "@/components/ui/CustomSelect";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Record<string, Venue>>({});
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const providerId = getProviderIdForUser(user.id);
      if (providerId) {
        // Fetch bookings
        const allBookings = getBookingsByProviderId(providerId);
        allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(allBookings);

        // Fetch venues for name mapping
        const providerVenues = getVenuesByProviderId(providerId);
        const venueMap: Record<string, Venue> = {};
        providerVenues.forEach(v => { venueMap[v.id] = v; });
        setVenues(venueMap);
      }
    }
    setLoading(false);
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    const matchesSearch = 
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display text-4xl text-text-primary mb-2">Bookings</h1>
          <p className="text-text-secondary">Manage and review all your venue booking requests.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-bg-surface rounded-2xl border border-border p-4 mb-8 flex flex-col md:flex-row gap-4 relative z-10">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by name, email, or booking code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-text-muted shrink-0 hidden md:block" />
          <div className="w-full md:w-[180px]">
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
        </div>
      </div>

      {/* Bookings List */}
      <div className="glass-strong rounded-2xl border border-border overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredBookings.map((booking) => {
              const venue = venues[booking.venueId];
              return (
                <div key={booking.id} className="p-6 hover:bg-bg-elevated/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-medium text-text-primary">{booking.bookingCode}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium border ${
                          booking.status === 'approved' ? 'bg-success/10 text-success border-success/20' :
                          booking.status === 'rejected' ? 'bg-danger/10 text-danger border-danger/20' :
                          'bg-warning/10 text-warning border-warning/20'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-text-muted mb-1">Customer</p>
                          <p className="text-sm text-text-primary font-medium">{booking.customerName}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{booking.customerEmail}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted mb-1">Venue</p>
                          <p className="text-sm text-text-primary font-medium">{venue?.name || 'Unknown Venue'}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{booking.eventType} ({booking.guestCount} pax)</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted mb-1">Date & Time</p>
                          <p className="text-sm text-text-primary font-medium flex items-center gap-1.5">
                            <CalendarIcon className="w-3.5 h-3.5 text-gold" /> {booking.eventDate}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold" /> {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-center justify-end">
                      <Link 
                        href={`/admin/bookings/${booking.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-gold rounded-xl text-sm font-medium text-gold hover:bg-gold hover:text-bg transition-colors"
                      >
                        Review Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 text-center">
            <h3 className="text-lg font-medium text-text-primary mb-2">No bookings found</h3>
            <p className="text-text-secondary">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
