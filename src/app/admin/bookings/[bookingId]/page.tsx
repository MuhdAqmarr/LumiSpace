"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Clock, Calendar as CalendarIcon, MapPin, Users, FileText, User } from "lucide-react";
import { getCurrentUser } from "@/lib/services/auth-service";
import { getBookingById, updateBookingStatus } from "@/lib/services/booking-service";
import { getVenueById } from "@/lib/services/venue-service";
import { Booking, Venue } from "@/lib/types";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    const b = getBookingById(bookingId);
    if (b) {
      setBooking(b);
      setAdminNote(b.adminNote || "");
      const v = getVenueById(b.venueId);
      if (v) setVenue(v);
    }
    setLoading(false);
  }, [bookingId]);

  const handleStatusChange = async (newStatus: "approved" | "rejected") => {
    const user = getCurrentUser();
    if (!user || !booking) return;

    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API
      const updated = updateBookingStatus(booking.id, newStatus, adminNote, user.id);
      if (updated) setBooking(updated);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!booking || !venue) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl text-text-primary mb-4">Booking Not Found</h1>
        <Link href="/admin/bookings" className="text-gold hover:underline">Return to Bookings</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Bookings
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-4xl text-text-primary mb-2">Booking {booking.bookingCode}</h1>
          <p className="text-text-secondary text-sm">Requested on {new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className={`px-4 py-2 rounded-full text-sm font-medium border inline-flex items-center gap-2 w-fit
          ${booking.status === 'approved' ? 'bg-success/10 text-success border-success/20' :
            booking.status === 'rejected' ? 'bg-danger/10 text-danger border-danger/20' :
            'bg-warning/10 text-warning border-warning/20'
          }`}
        >
          {booking.status === 'pending' && <Clock className="w-4 h-4" />}
          {booking.status === 'approved' && <CheckCircle className="w-4 h-4" />}
          {booking.status === 'rejected' && <XCircle className="w-4 h-4" />}
          Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="glass-strong rounded-2xl border border-border p-6">
            <h2 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gold" /> Customer Information
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs text-text-muted mb-1">Full Name</p>
                <p className="text-sm text-text-primary">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Organization</p>
                <p className="text-sm text-text-primary">{booking.organizationName || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Email</p>
                <p className="text-sm text-text-primary">{booking.customerEmail}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Phone</p>
                <p className="text-sm text-text-primary">{booking.customerPhone}</p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="glass-strong rounded-2xl border border-border p-6">
            <h2 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gold" /> Event Details
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div className="col-span-2">
                <p className="text-xs text-text-muted mb-1">Venue</p>
                <p className="text-sm text-text-primary font-medium">{venue.name}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Date</p>
                <p className="text-sm text-text-primary">{booking.eventDate}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Time</p>
                <p className="text-sm text-text-primary">{booking.startTime} - {booking.endTime}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Event Type</p>
                <p className="text-sm text-text-primary">{booking.eventType}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Guest Count</p>
                <p className="text-sm text-text-primary">{booking.guestCount} pax</p>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="glass-strong rounded-2xl border border-border p-6">
            <h2 className="text-lg font-medium text-text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" /> Additional Notes
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-2">Setup Requirements</p>
                <div className="bg-bg-surface p-4 rounded-xl text-sm text-text-secondary border border-border">
                  {booking.setupNotes || "No setup notes provided."}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">Special Requests</p>
                <div className="bg-bg-surface p-4 rounded-xl text-sm text-text-secondary border border-border">
                  {booking.specialRequests || "No special requests provided."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <div className="glass-strong rounded-2xl border border-border-gold p-6 sticky top-6">
            <h2 className="text-lg font-medium text-text-primary mb-4">Management Actions</h2>
            
            <div className="mb-6">
              <label className="block text-xs font-medium text-text-secondary mb-2">Internal Admin Note (visible to staff)</label>
              <textarea 
                rows={3}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add notes about pricing, setup confirmation, etc."
                className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <div className="space-y-3">
              <button
                disabled={isUpdating || booking.status === 'approved'}
                onClick={() => handleStatusChange('approved')}
                className="w-full bg-success text-bg px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-success/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? <span className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                {booking.status === 'approved' ? 'Approved' : 'Approve Booking'}
              </button>
              
              <button
                disabled={isUpdating || booking.status === 'rejected'}
                onClick={() => handleStatusChange('rejected')}
                className="w-full bg-transparent border border-danger text-danger px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-danger/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {booking.status === 'rejected' ? 'Rejected' : 'Reject Booking'}
              </button>
            </div>
            
            {booking.reviewedAt && (
              <p className="text-xs text-text-muted mt-4 text-center">
                Last updated: {new Date(booking.reviewedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
