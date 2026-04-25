"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { venueSchema, VenueFormValues } from "@/lib/schemas/venue-schema";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomNumberInput from "@/components/ui/CustomNumberInput";
import { Venue } from "@/lib/types";

interface VenueFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<VenueFormValues>;
  onSubmit: (data: VenueFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const VENUE_TYPE_OPTIONS = [
  { value: "Ballroom", label: "Ballroom" },
  { value: "Rooftop", label: "Rooftop" },
  { value: "Pavilion", label: "Pavilion" },
  { value: "Garden", label: "Garden" },
  { value: "Loft", label: "Loft" },
  { value: "Seminar Room", label: "Seminar Room" },
  { value: "Conference Hall", label: "Conference Hall" },
  { value: "Gallery", label: "Gallery" },
  { value: "Other", label: "Other" },
];

const inputClass = (hasError: boolean) =>
  `w-full bg-bg-surface border ${
    hasError ? "border-danger" : "border-border"
  } rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-gold transition-colors placeholder:text-text-muted`;

const textareaClass = (hasError: boolean) =>
  `w-full bg-bg-surface border ${
    hasError ? "border-danger" : "border-border"
  } rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-gold transition-colors placeholder:text-text-muted resize-none`;

/** Convert Venue data → form default values */
export function venueToFormValues(venue: Venue): VenueFormValues {
  return {
    name: venue.name,
    shortDescription: venue.shortDescription,
    longDescription: venue.longDescription,
    venueType: venue.venueType,
    capacityMin: venue.capacityMin,
    capacityMax: venue.capacityMax,
    sizeSqft: venue.sizeSqft,
    address: venue.address,
    city: venue.city,
    country: venue.country,
    priceFrom: venue.priceFrom ?? 0,
    heroImageUrl: venue.heroImageUrl ?? "",
    heroVideoUrl: venue.heroVideoUrl ?? "",
    amenities: venue.amenities.join(", "),
    rules: venue.rules.join("\n"),
    eventTypes: venue.eventTypes.join(", "),
  };
}

export default function VenueForm({ mode, defaultValues, onSubmit, isSubmitting }: VenueFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<VenueFormValues>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      venueType: "",
      capacityMin: 50,
      capacityMax: 200,
      sizeSqft: undefined,
      address: "",
      city: "",
      country: "Malaysia",
      priceFrom: 5000,
      heroImageUrl: "",
      heroVideoUrl: "",
      amenities: "",
      rules: "",
      eventTypes: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) reset({ ...defaultValues });
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* ─── Section 1: Basic Info ──────────────────────────── */}
      <div className="glass-strong rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="font-display text-xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/30">1</span>
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Venue Name *</label>
            <input {...register("name")} placeholder="e.g. Grand Ballroom" className={inputClass(!!errors.name)} />
            {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Short Description *</label>
            <input {...register("shortDescription")} placeholder="A one-line summary shown on listing cards..." className={inputClass(!!errors.shortDescription)} />
            {errors.shortDescription && <p className="mt-1 text-xs text-danger">{errors.shortDescription.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Full Description *</label>
            <textarea {...register("longDescription")} rows={6} placeholder="Describe your venue in detail — architecture, atmosphere, facilities, and experience..." className={textareaClass(!!errors.longDescription)} />
            {errors.longDescription && <p className="mt-1 text-xs text-danger">{errors.longDescription.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Venue Type *</label>
            <CustomSelect
              options={VENUE_TYPE_OPTIONS}
              value={watch("venueType")}
              onChange={(val) => setValue("venueType", val, { shouldValidate: true })}
              error={!!errors.venueType}
              placeholder="Select venue type..."
            />
            {errors.venueType && <p className="mt-1 text-xs text-danger">{errors.venueType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Event Types * <span className="text-text-muted font-normal">(comma-separated)</span></label>
            <input {...register("eventTypes")} placeholder="e.g. Wedding, Corporate Dinner, Product Launch" className={inputClass(!!errors.eventTypes)} />
            {errors.eventTypes && <p className="mt-1 text-xs text-danger">{errors.eventTypes.message}</p>}
          </div>
        </div>
      </div>

      {/* ─── Section 2: Capacity & Pricing ─────────────────────── */}
      <div className="glass-strong rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="font-display text-xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/30">2</span>
          Capacity & Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Minimum Capacity (pax) *</label>
            <CustomNumberInput
              value={watch("capacityMin")}
              onChange={(val) => setValue("capacityMin", val, { shouldValidate: true })}
              min={1} max={10000}
              error={!!errors.capacityMin}
              placeholder="e.g. 50"
            />
            {errors.capacityMin && <p className="mt-1 text-xs text-danger">{errors.capacityMin.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Maximum Capacity (pax) *</label>
            <CustomNumberInput
              value={watch("capacityMax")}
              onChange={(val) => setValue("capacityMax", val, { shouldValidate: true })}
              min={1} max={100000}
              error={!!errors.capacityMax}
              placeholder="e.g. 500"
            />
            {errors.capacityMax && <p className="mt-1 text-xs text-danger">{errors.capacityMax.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Venue Size (sqft)</label>
            <CustomNumberInput
              value={watch("sizeSqft") ?? 0}
              onChange={(val) => setValue("sizeSqft", val || undefined, { shouldValidate: true })}
              min={0} max={1000000}
              placeholder="e.g. 5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Starting Price (RM) *</label>
            <CustomNumberInput
              value={watch("priceFrom")}
              onChange={(val) => setValue("priceFrom", val, { shouldValidate: true })}
              min={1} max={10000000}
              error={!!errors.priceFrom}
              placeholder="e.g. 15000"
            />
            {errors.priceFrom && <p className="mt-1 text-xs text-danger">{errors.priceFrom.message}</p>}
          </div>
        </div>
      </div>

      {/* ─── Section 3: Location ──────────────────────────────── */}
      <div className="glass-strong rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="font-display text-xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/30">3</span>
          Location
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Street Address *</label>
            <input {...register("address")} placeholder="e.g. 88 Jalan Sultan Ismail, Bukit Bintang" className={inputClass(!!errors.address)} />
            {errors.address && <p className="mt-1 text-xs text-danger">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">City *</label>
              <input {...register("city")} placeholder="e.g. Kuala Lumpur" className={inputClass(!!errors.city)} />
              {errors.city && <p className="mt-1 text-xs text-danger">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Country *</label>
              <input {...register("country")} placeholder="e.g. Malaysia" className={inputClass(!!errors.country)} />
              {errors.country && <p className="mt-1 text-xs text-danger">{errors.country.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Section 4: Media ─────────────────────────────────── */}
      <div className="glass-strong rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="font-display text-xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/30">4</span>
          Media
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Hero Image URL</label>
            <input {...register("heroImageUrl")} placeholder="https://images.unsplash.com/..." className={inputClass(!!errors.heroImageUrl)} />
            {errors.heroImageUrl && <p className="mt-1 text-xs text-danger">{errors.heroImageUrl.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Hero Video URL</label>
            <input {...register("heroVideoUrl")} placeholder="https://videos.pexels.com/..." className={inputClass(!!errors.heroVideoUrl)} />
            {errors.heroVideoUrl && <p className="mt-1 text-xs text-danger">{errors.heroVideoUrl.message}</p>}
          </div>
        </div>
      </div>

      {/* ─── Section 5: Details ───────────────────────────────── */}
      <div className="glass-strong rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <h2 className="font-display text-xl text-text-primary flex items-center gap-3 pb-4 border-b border-border">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/30">5</span>
          Amenities & Rules
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Amenities <span className="text-text-muted font-normal">(comma-separated)</span>
            </label>
            <textarea {...register("amenities")} rows={3} placeholder="e.g. Stage, Sound System, Wi-Fi, Parking, Catering Kitchen" className={textareaClass(!!errors.amenities)} />
            {errors.amenities && <p className="mt-1 text-xs text-danger">{errors.amenities.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Venue Rules <span className="text-text-muted font-normal">(one per line)</span>
            </label>
            <textarea {...register("rules")} rows={4} placeholder={"No smoking indoors\nSound cutoff after 11:00 PM\nBooking approval required"} className={textareaClass(!!errors.rules)} />
            {errors.rules && <p className="mt-1 text-xs text-danger">{errors.rules.message}</p>}
          </div>
        </div>
      </div>

      {/* ─── Submit ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        <Link href="/admin/venues" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Venues
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-gold text-bg px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><div className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> {mode === "create" ? "Create Venue" : "Save Changes"}</>
          )}
        </button>
      </div>
    </form>
  );
}
