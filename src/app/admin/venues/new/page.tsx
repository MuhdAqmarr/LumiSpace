"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { getCurrentUser, getProviderIdForUser } from "@/lib/services/auth-service";
import { createVenue } from "@/lib/services/venue-service";
import { useToast } from "@/components/ui/Toast";
import VenueForm, { VenueFormValues } from "@/components/admin/VenueForm";

export default function NewVenuePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: VenueFormValues) => {
    setIsSubmitting(true);
    try {
      const user = getCurrentUser();
      if (!user) throw new Error("Not authenticated");

      const providerId = getProviderIdForUser(user.id);
      if (!providerId) throw new Error("Provider not found");

      createVenue({
        providerId,
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
        galleryUrls: [],
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

      toast("Venue created! It has been saved as a draft.", "success");
      router.push("/admin/venues");
    } catch (err) {
      toast("Failed to create venue. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/30">
          <Plus className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h1 className="font-display text-4xl text-text-primary">Add New Venue</h1>
          <p className="text-text-secondary mt-1">Fill in the details below to list your space on LumiSpace.</p>
        </div>
      </div>

      <VenueForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
