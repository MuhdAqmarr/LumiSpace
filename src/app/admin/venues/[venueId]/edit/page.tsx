"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { getVenueById, updateVenue } from "@/lib/services/venue-service";
import { useToast } from "@/components/ui/Toast";
import VenueForm, { VenueFormValues, venueToFormValues } from "@/components/admin/VenueForm";
import { Venue } from "@/lib/types";

export default function EditVenuePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const venueId = params.venueId as string;

  const [venue, setVenue] = useState<Venue | null>(null);
  const [defaultValues, setDefaultValues] = useState<Partial<VenueFormValues>>();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const v = getVenueById(venueId);
    if (v) {
      setVenue(v);
      setDefaultValues(venueToFormValues(v));
    }
    setLoading(false);
  }, [venueId]);

  const handleSubmit = async (data: VenueFormValues) => {
    if (!venue) return;
    setIsSubmitting(true);
    try {
      updateVenue(venue.id, {
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        venueType: data.venueType,
        capacityMin: data.capacityMin,
        capacityMax: data.capacityMax,
        sizeSqft: data.sizeSqft,
        address: data.address,
        city: data.city,
        country: data.country,
        priceFrom: data.priceFrom,
        heroImageUrl: data.heroImageUrl || undefined,
        heroVideoUrl: data.heroVideoUrl || undefined,
        amenities: data.amenities
          ? data.amenities.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        rules: data.rules
          ? data.rules.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
        eventTypes: data.eventTypes
          ? data.eventTypes.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      });

      toast({ title: "Venue Updated!", message: "Your changes have been saved.", type: "success" });
      router.push("/admin/venues");
    } catch {
      toast({ title: "Error", message: "Failed to save changes. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <p className="text-text-secondary">Venue not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/30">
          <Edit className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h1 className="font-display text-4xl text-text-primary">Edit Venue</h1>
          <p className="text-text-secondary mt-1">Editing: <span className="text-gold">{venue.name}</span></p>
        </div>
      </div>

      {defaultValues && (
        <VenueForm
          mode="edit"
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
