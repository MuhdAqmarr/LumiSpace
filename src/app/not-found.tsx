/* ===================================================================
   LumiSpace — 404 Not Found Page
   =================================================================== */

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center gradient-hero">
      {/* Decorative orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[150px]" />

      <div className="relative z-10">
        <div className="mb-8 inline-flex items-center justify-center h-20 w-20 rounded-2xl border border-border-gold bg-bg-surface">
          <Sparkles className="h-8 w-8 text-gold" />
        </div>

        <h1 className="font-display text-6xl md:text-8xl font-medium text-text-primary mb-4">
          404
        </h1>
        <p className="text-xl text-text-secondary mb-2">Page not found</p>
        <p className="text-text-muted max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to discovering extraordinary venues.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bg transition-all duration-300 hover:bg-gold-light hover:shadow-[var(--shadow-glow)] no-underline"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <Link
            href="/venues"
            className="flex items-center gap-2 rounded-full border border-border-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-gold hover:text-gold no-underline"
          >
            Browse Venues
          </Link>
        </div>
      </div>
    </div>
  );
}
