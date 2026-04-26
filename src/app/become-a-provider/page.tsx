"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Store, CheckCircle, ArrowRight } from "lucide-react";
import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import { createProvider } from "@/lib/services/provider-service";
import { createVenue } from "@/lib/services/venue-service";
import { registerUser } from "@/lib/services/auth-service";
import CustomSelect from "@/components/ui/CustomSelect";

import CustomNumberInput from "@/components/ui/CustomNumberInput";
import { providerRegistrationSchema, ProviderRegistrationFormValues } from "@/lib/schemas/provider-schema";

export default function BecomeProviderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProviderRegistrationFormValues>({
    resolver: zodResolver(providerRegistrationSchema),
    defaultValues: {
      brandName: "",
      tagline: "",
      description: "",
      ownerFullName: "",
      password: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      city: "",
      country: "Malaysia",
      firstVenueName: "",
      firstVenueType: "",
      capacityMin: undefined,
      capacityMax: undefined,
      priceFrom: undefined,
      firstVenueDescription: "",
      brandHeaderImageUrl: "",
      venueHeroImageUrl: "",
      heroVideoUrl: "",
    },
  });


  const onSubmit = async (data: ProviderRegistrationFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 1. Create Admin Account (Profile)
      const profile = registerUser(
        data.contactEmail,
        data.password,
        data.ownerFullName,
        data.contactPhone,
        "provider_admin"
      );

      // 2. Create Provider
      const provider = createProvider({
        brandName: data.brandName,
        tagline: data.tagline,
        description: data.description,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        address: data.address,
        city: data.city,
        country: data.country,
        heroImageUrl: data.brandHeaderImageUrl || undefined,
        themeJson: { webglPreset: "gold", accentColor: "#C8A96A" }, // default theme
        ownerId: profile.id,
        story: "A new standard for premium spaces.",
      });

      // 3. Create Initial Venue
      createVenue({
        providerId: provider.id,
        name: data.firstVenueName,
        shortDescription: data.firstVenueDescription.substring(0, 150) + "...",
        longDescription: data.firstVenueDescription,
        venueType: data.firstVenueType,
        capacityMin: data.capacityMin,
        capacityMax: data.capacityMax,
        sizeSqft: 1000, // default/placeholder
        address: data.address,
        city: data.city,
        country: data.country,
        priceFrom: data.priceFrom,
        amenities: ["Wi-Fi", "Parking"], // defaults
        rules: ["No smoking indoors"], // defaults
        eventTypes: ["Corporate Event", "Private Dinner", "Wedding"], // defaults
        heroImageUrl: data.venueHeroImageUrl || undefined,
        heroVideoUrl: data.heroVideoUrl || undefined,
        galleryUrls: [],
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <CinematicNavbar />
        <main className="min-h-screen bg-bg flex items-center justify-center pt-[var(--nav-height)] px-6">
          <div className="max-w-xl w-full text-center">
            <div className="mx-auto w-24 h-24 bg-success/10 rounded-full flex items-center justify-center border border-success/20 mb-8">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">Application Received</h1>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Thank you for applying to list your venue on LumiSpace. Our team will review your application and contact you within 24-48 hours with next steps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="px-8 py-3 bg-bg-surface border border-border rounded-full text-sm font-medium hover:bg-bg-elevated transition-colors text-text-primary">
                Back to Home
              </Link>
              <Link href="/admin/login" className="px-8 py-3 bg-gold text-bg rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors">
                Provider Login
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CinematicNavbar />
      <main className="min-h-screen bg-bg pt-[calc(var(--nav-height)+40px)] pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-bg-surface border border-border-gold">
               <Building2 className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-text-primary mb-6">List Your Venue</h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Join Malaysia&apos;s most premium venue booking marketplace. Showcase your space, manage bookings seamlessly, and grow your events business.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-8 md:p-12 border border-border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              
              {/* Section 1: Brand Info */}
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
                  <Store className="w-6 h-6 text-gold" />
                  Provider Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Brand/Company Name *</label>
                    <input 
                      type="text"
                      {...register("brandName")}
                      placeholder="e.g. Lumiere Estates"
                      className={`w-full bg-bg border ${errors.brandName ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    {errors.brandName && <p className="mt-1 text-xs text-danger">{errors.brandName.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Tagline *</label>
                    <input 
                      type="text"
                      {...register("tagline")}
                      placeholder="e.g. Curating extraordinary spaces for unforgettable moments."
                      className={`w-full bg-bg border ${errors.tagline ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    {errors.tagline && <p className="mt-1 text-xs text-danger">{errors.tagline.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Brand Description *</label>
                    <textarea 
                      {...register("description")}
                      rows={4}
                      placeholder="Tell us about your brand, history, and the types of experiences you offer..."
                      className={`w-full bg-bg border ${errors.description ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors resize-none`}
                    />
                    {errors.description && <p className="mt-1 text-xs text-danger">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Owner Full Name *</label>
                      <input 
                        type="text"
                        {...register("ownerFullName")}
                        placeholder="e.g. John Doe"
                        className={`w-full bg-bg border ${errors.ownerFullName ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                      />
                      {errors.ownerFullName && <p className="mt-1 text-xs text-danger">{errors.ownerFullName.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Admin Password *</label>
                      <input 
                        type="password"
                        {...register("password")}
                        placeholder="At least 8 characters"
                        className={`w-full bg-bg border ${errors.password ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                      />
                      {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Contact Email *</label>
                    <input 
                      type="email"
                      {...register("contactEmail")}
                      placeholder="hello@brand.com"
                      className={`w-full bg-bg border ${errors.contactEmail ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    {errors.contactEmail && <p className="mt-1 text-xs text-danger">{errors.contactEmail.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Contact Phone *</label>
                    <input 
                      type="tel"
                      {...register("contactPhone")}
                      placeholder="+60 12-345 6789"
                      className={`w-full bg-bg border ${errors.contactPhone ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    {errors.contactPhone && <p className="mt-1 text-xs text-danger">{errors.contactPhone.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">HQ Address *</label>
                    <input 
                      type="text"
                      {...register("address")}
                      placeholder="Street address"
                      className={`w-full bg-bg border ${errors.address ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors mb-4`}
                    />
                    {errors.address && <p className="mt-1 text-xs text-danger">{errors.address.message}</p>}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <CustomSelect
                          options={[
                            { value: "", label: "Select City..." },
                            { value: "Kuala Lumpur", label: "Kuala Lumpur" },
                            { value: "Petaling Jaya", label: "Petaling Jaya" },
                            { value: "Shah Alam", label: "Shah Alam" },
                            { value: "Penang", label: "Penang" },
                            { value: "Johor Bahru", label: "Johor Bahru" },
                          ]}
                          value={watch("city")}
                          onChange={(val) => setValue("city", val, { shouldValidate: true })}
                          error={!!errors.city}
                          placeholder="Select City..."
                        />
                        {errors.city && <p className="mt-1 text-xs text-danger">{errors.city.message}</p>}
                      </div>
                      <div>
                        <input 
                          type="text"
                          {...register("country")}
                          readOnly
                          className="w-full bg-bg/50 border border-border rounded-xl px-4 py-3 text-text-muted cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Brand Header Image URL (Optional)</label>
                    <input 
                      type="url"
                      {...register("brandHeaderImageUrl")}
                      placeholder="https://images.unsplash.com/brand-header..."
                      className={`w-full bg-bg border ${errors.brandHeaderImageUrl ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    <p className="mt-2 text-[10px] text-text-muted italic">This high-quality image will be the face of your brand profile.</p>
                  </div>
                </div>

              </div>

              {/* Section 2: First Venue */}
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
                  <Building2 className="w-6 h-6 text-gold" />
                  Your Primary Venue
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Venue Name *</label>
                    <input 
                      type="text"
                      {...register("firstVenueName")}
                      placeholder="e.g. The Grand Ballroom"
                      className={`w-full bg-bg border ${errors.firstVenueName ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    {errors.firstVenueName && <p className="mt-1 text-xs text-danger">{errors.firstVenueName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Venue Type *</label>
                    <CustomSelect
                      options={[
                        { value: "", label: "Select type..." },
                        { value: "Ballroom", label: "Ballroom" },
                        { value: "Rooftop", label: "Rooftop" },
                        { value: "Garden", label: "Garden" },
                        { value: "Loft Hall", label: "Loft Hall" },
                        { value: "Pavilion", label: "Pavilion" },
                        { value: "Seminar Room", label: "Seminar Room" },
                        { value: "Other", label: "Other" },
                      ]}
                      value={watch("firstVenueType")}
                      onChange={(val) => setValue("firstVenueType", val, { shouldValidate: true })}
                      error={!!errors.firstVenueType}
                      placeholder="Select type..."
                    />
                    {errors.firstVenueType && <p className="mt-1 text-xs text-danger">{errors.firstVenueType.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Minimum Capacity *</label>
                    <CustomNumberInput
                      value={watch("capacityMin")}
                      onChange={(val) => setValue("capacityMin", val, { shouldValidate: true })}
                      min={1}
                      max={10000}
                      error={!!errors.capacityMin}
                      placeholder="e.g. 50"
                      className="!bg-bg"
                    />
                    {errors.capacityMin && <p className="mt-1 text-xs text-danger">{errors.capacityMin.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Maximum Capacity *</label>
                    <CustomNumberInput
                      value={watch("capacityMax")}
                      onChange={(val) => setValue("capacityMax", val, { shouldValidate: true })}
                      min={1}
                      max={100000}
                      error={!!errors.capacityMax}
                      placeholder="e.g. 500"
                      className="!bg-bg"
                    />
                    {errors.capacityMax && <p className="mt-1 text-xs text-danger">{errors.capacityMax.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Starting Price (RM) *</label>
                    <CustomNumberInput
                      value={watch("priceFrom")}
                      onChange={(val) => setValue("priceFrom", val, { shouldValidate: true })}
                      min={1}
                      max={1000000}
                      error={!!errors.priceFrom}
                      placeholder="e.g. 15000"
                      className="!bg-bg"
                    />
                    {errors.priceFrom && <p className="mt-1 text-xs text-danger">{errors.priceFrom.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Venue Description *</label>
                    <textarea 
                      {...register("firstVenueDescription")}
                      rows={4}
                      placeholder="Describe the atmosphere, features, and ideal events for this space..."
                      className={`w-full bg-bg border ${errors.firstVenueDescription ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors resize-none`}
                    />
                    {errors.firstVenueDescription && <p className="mt-1 text-xs text-danger">{errors.firstVenueDescription.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary mb-2">Venue Hero Image URL *</label>
                    <input 
                      type="url"
                      {...register("venueHeroImageUrl")}
                      placeholder="https://images.unsplash.com/venue-hero..."
                      className={`w-full bg-bg border ${errors.venueHeroImageUrl ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
                    />
                    {errors.venueHeroImageUrl && <p className="mt-1 text-xs text-danger">{errors.venueHeroImageUrl.message}</p>}
                  </div>

                </div>
              </div>



              <div className="pt-8 border-t border-border flex justify-end">
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
                    <>Submit Application <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
