"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, Clock, Users, Building2, MapPin, CheckCircle2 } from "lucide-react";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import CustomTimePicker from "@/components/ui/CustomTimePicker";
import CustomNumberInput from "@/components/ui/CustomNumberInput";
import { useToast } from "@/components/ui/Toast";
import { getVenueBySlug } from "@/lib/services/venue-service";
import { getProviderById } from "@/lib/services/provider-service";
import { createBooking } from "@/lib/services/booking-service";
import { bookingSchema, BookingFormValues } from "@/lib/schemas/booking-schema";
import { Venue, Provider } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const venueSlug = params.venueSlug as string;

  const [venue, setVenue] = useState<Venue | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventType: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      guestCount: undefined,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      organizationName: "",
      setupNotes: "",
      specialRequests: "",
    },
  });

  useEffect(() => {
    const v = getVenueBySlug(venueSlug);
    if (v) {
      setVenue(v);
      const p = getProviderById(v.providerId);
      if (p) setProvider(p);
    }
    setLoading(false);
  }, [venueSlug]);

  const onSubmit = async (data: BookingFormValues) => {
    if (!venue || !provider) return;
    setIsSubmitting(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newBooking = createBooking({
        ...data,
        providerId: provider.id,
        venueId: venue.id,
      });

      router.push(`/booking/confirmation/${newBooking.bookingCode}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast("Something went wrong. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState fullPage message="Loading venue..." />;
  }

  if (!venue || !provider) {
    return (
      <ErrorState
        fullPage
        title="Venue not found"
        description="The venue you're looking for doesn't exist or has been removed."
        onRetry={() => router.back()}
      />
    );
  }

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen bg-bg pt-[var(--nav-height)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8">
          <Link href={`/venues/${venue.slug}`} className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to {venue.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h1 className="font-display text-4xl text-text-primary mb-2">Request to Book</h1>
                <p className="text-text-secondary">Please fill in your event details. The provider will review your request and confirm availability.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                
                {/* Section 1: Event Details */}
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 text-gold text-sm font-medium border border-border-gold">1</span>
                    Event Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Event Type *</label>
                      <CustomSelect
                        options={[
                          { value: "", label: "Select event type..." },
                          ...venue.eventTypes.map(type => ({ value: type, label: type })),
                          { value: "Other", label: "Other" }
                        ]}
                        value={watch("eventType") || ""}
                        onChange={(val) => setValue("eventType", val as any, { shouldValidate: true })}
                        error={!!errors.eventType}
                        placeholder="Select event type..."
                      />
                      {errors.eventType && <p className="mt-1 text-xs text-danger">{errors.eventType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Guest Count *</label>
                      <CustomNumberInput
                        value={watch("guestCount")}
                        onChange={(val) => setValue("guestCount", val, { shouldValidate: true })}
                        min={venue.capacityMin}
                        max={venue.capacityMax}
                        error={!!errors.guestCount}
                        placeholder={`Capacity: ${venue.capacityMin} - ${venue.capacityMax}`}
                      />
                      {errors.guestCount && <p className="mt-1 text-xs text-danger">{errors.guestCount.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Event Date *</label>
                      <CustomDatePicker
                        value={watch("eventDate") || ""}
                        onChange={(val) => setValue("eventDate", val, { shouldValidate: true })}
                        error={!!errors.eventDate}
                        placeholder="Select event date"
                      />
                      {errors.eventDate && <p className="mt-1 text-xs text-danger">{errors.eventDate.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Start Time *</label>
                      <CustomTimePicker
                        value={watch("startTime") || ""}
                        onChange={(val) => setValue("startTime", val, { shouldValidate: true })}
                        error={!!errors.startTime}
                        placeholder="Select start time"
                      />
                      {errors.startTime && <p className="mt-1 text-xs text-danger">{errors.startTime.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">End Time *</label>
                      <CustomTimePicker
                        value={watch("endTime") || ""}
                        onChange={(val) => setValue("endTime", val, { shouldValidate: true })}
                        error={!!errors.endTime}
                        placeholder="Select end time"
                      />
                      {errors.endTime && <p className="mt-1 text-xs text-danger">{errors.endTime.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Info */}
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 text-gold text-sm font-medium border border-border-gold">2</span>
                    Contact Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
                      <input 
                        type="text"
                        {...register("customerName")}
                        placeholder="John Doe"
                        className={`w-full bg-bg-surface border ${errors.customerName ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                      />
                      {errors.customerName && <p className="mt-1 text-xs text-danger">{errors.customerName.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Email Address *</label>
                      <input 
                        type="email"
                        {...register("customerEmail")}
                        placeholder="john@example.com"
                        className={`w-full bg-bg-surface border ${errors.customerEmail ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                      />
                      {errors.customerEmail && <p className="mt-1 text-xs text-danger">{errors.customerEmail.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Phone Number *</label>
                      <input 
                        type="tel"
                        {...register("customerPhone")}
                        placeholder="+60 12-345 6789"
                        className={`w-full bg-bg-surface border ${errors.customerPhone ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                      />
                      {errors.customerPhone && <p className="mt-1 text-xs text-danger">{errors.customerPhone.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Organization/Company (Optional)</label>
                      <input 
                        type="text"
                        {...register("organizationName")}
                        placeholder="Your Company Sdn Bhd"
                        className={`w-full bg-bg-surface border ${errors.organizationName ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                      />
                      {errors.organizationName && <p className="mt-1 text-xs text-danger">{errors.organizationName.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 3: Additional Details */}
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 text-gold text-sm font-medium border border-border-gold">3</span>
                    Additional Details
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Setup Requirements (Optional)</label>
                      <textarea 
                        {...register("setupNotes")}
                        rows={3}
                        placeholder="e.g. Theatre seating, AV setup required, catering area..."
                        className={`w-full bg-bg-surface border ${errors.setupNotes ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors resize-none`}
                      />
                      {errors.setupNotes && <p className="mt-1 text-xs text-danger">{errors.setupNotes.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Special Requests (Optional)</label>
                      <textarea 
                        {...register("specialRequests")}
                        rows={3}
                        placeholder="Any other special requirements or questions for the provider?"
                        className={`w-full bg-bg-surface border ${errors.specialRequests ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors resize-none`}
                      />
                      {errors.specialRequests && <p className="mt-1 text-xs text-danger">{errors.specialRequests.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gold text-bg px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Request</>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="glass-strong rounded-2xl p-6 border border-border-gold sticky top-28">
                <h3 className="font-display text-xl text-text-primary mb-6">Booking Summary</h3>
                
                <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-bg-surface border border-border">
                    {venue.images && venue.images[0] ? (
                      <Image 
                        src={venue.images[0]} 
                        alt={venue.name} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{venue.name}</h4>
                    <p className="text-xs text-text-secondary mt-1">{provider.brandName}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
                      <MapPin className="w-3 h-3 text-gold" />
                      {venue.city}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Base Price</span>
                    <span className="text-text-primary font-medium">{formatPrice(venue.priceFrom)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Final price will be confirmed by provider based on your requirements.</span>
                  </div>
                </div>

                <div className="bg-bg-elevated/50 p-4 rounded-xl border border-border">
                  <h4 className="text-sm font-medium text-text-primary flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-gold" /> No payment required yet
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    You won&apos;t be charged. Your request will be sent to the venue provider for review and approval.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
