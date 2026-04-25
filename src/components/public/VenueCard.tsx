import Link from "next/link";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { Venue, Provider } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface VenueCardProps {
  venue: Venue;
  provider?: Provider;
  gradientIndex?: number;
  href?: string;
}

export function getVenueGradient(index: number): string {
  const gradients = [
    "linear-gradient(135deg, #1a1510 0%, #2a1f15 40%, #C8A96A22 100%)",
    "linear-gradient(135deg, #0f1518 0%, #152025 40%, #6BA8C822 100%)",
    "linear-gradient(135deg, #12101a 0%, #1a152a 40%, #7B68EE22 100%)",
    "linear-gradient(135deg, #151510 0%, #1a1a12 40%, #9D6B5322 100%)",
    "linear-gradient(135deg, #0a120a 0%, #152015 40%, #6B8E6B22 100%)",
    "linear-gradient(135deg, #14100e 0%, #201a16 40%, #D4BC8522 100%)",
  ];
  return gradients[index % gradients.length];
}

export default function VenueCard({ venue, provider, gradientIndex = 0, href }: VenueCardProps) {
  const linkHref = href || `/venues/${venue.slug}`;

  return (
    <Link
      href={linkHref}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-surface transition-all duration-500 hover:border-border-gold hover:shadow-[var(--shadow-glow)] no-underline flex flex-col h-full"
    >
      {/* Image Placeholder / Gradient */}
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: getVenueGradient(gradientIndex),
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />

        {/* Price Badge */}
        {venue.priceFrom && (
          <div className="absolute top-4 right-4 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm border border-border-gold">
            From {formatPrice(venue.priceFrom)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-medium text-text-primary group-hover:text-gold transition-colors duration-300">
              {venue.name}
            </h3>
            {provider && (
              <p className="mt-1 text-sm text-gold/80">
                {provider.brandName}
              </p>
            )}
          </div>
          <ArrowUpRight className="h-5 w-5 text-text-muted transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-text-secondary flex-grow">
          {venue.shortDescription}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {venue.city}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {venue.capacityMin}–{venue.capacityMax} guests
          </span>
        </div>

        {/* Event Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {venue.eventTypes.slice(0, 3).map((type) => (
            <span
              key={type}
              className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs text-text-muted"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
