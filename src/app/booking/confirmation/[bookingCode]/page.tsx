"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, Clock, MapPin, Building2, Copy, FileText, ArrowRight } from "lucide-react";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import { getBookingByCode } from "@/lib/services/booking-service";
import { getVenueById } from "@/lib/services/venue-service";
import { getProviderById } from "@/lib/services/provider-service";
import { Booking, Venue, Provider } from "@/lib/types";

export default function BookingConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const bookingCode = params.bookingCode as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const b = getBookingByCode(bookingCode);
    if (b) {
      setBooking(b);
      const v = getVenueById(b.venueId);
      if (v) {
        setVenue(v);
        const p = getProviderById(v.providerId);
        if (p) setProvider(p);
      }
    }
    setLoading(false);
  }, [bookingCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date nicely
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-MY', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!booking || !venue || !provider) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl text-text-primary mb-4">Booking not found</h1>
        <p className="text-text-secondary mb-8">We couldn&apos;t find a booking with the code <span className="text-gold">{bookingCode}</span>.</p>
        <button onClick={() => router.push('/venues')} className="text-gold hover:underline">Browse Venues</button>
      </div>
    );
  }

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen bg-bg pt-[calc(var(--nav-height)+40px)] pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center border border-success/20 mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">Request Submitted</h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Your booking request has been sent to the venue provider. They will review it and get back to you shortly.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="glass-strong rounded-3xl border border-border-gold overflow-hidden mb-8">
            {/* Header / Code */}
            <div className="bg-bg-surface/80 border-b border-border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Booking Reference</p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl text-gold">{booking.bookingCode}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="text-text-muted hover:text-gold transition-colors p-1"
                    title="Copy booking code"
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-warning text-sm font-medium">
                Pending Approval
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-border">
                {/* Venue Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">Venue Details</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-bg-elevated border border-border flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-text-primary">{venue.name}</h4>
                      <p className="text-sm text-text-muted mt-1">{provider.brandName}</p>
                      <p className="text-sm text-text-secondary flex items-center gap-1.5 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-gold" /> {venue.city}, {venue.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-text-primary">{formatDate(booking.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-text-primary">{booking.startTime} - {booking.endTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FileText className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-text-primary">{booking.eventType} ({booking.guestCount} guests)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="pt-8">
                <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Name</p>
                    <p className="text-sm text-text-primary">{booking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Email</p>
                    <p className="text-sm text-text-primary">{booking.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Phone</p>
                    <p className="text-sm text-text-primary">{booking.customerPhone}</p>
                  </div>
                  {booking.organizationName && (
                    <div>
                      <p className="text-xs text-text-muted mb-1">Organization</p>
                      <p className="text-sm text-text-primary">{booking.organizationName}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <h4 className="text-lg font-medium text-text-primary mb-2">What happens next?</h4>
            <p className="text-sm text-text-secondary mb-8">
              The venue provider will contact you via email or phone to confirm availability and discuss pricing. Keep your booking reference handy!
            </p>
            <Link 
              href="/venues" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-gold rounded-full text-sm font-medium text-gold hover:bg-gold hover:text-bg transition-colors"
            >
              Explore more venues <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
