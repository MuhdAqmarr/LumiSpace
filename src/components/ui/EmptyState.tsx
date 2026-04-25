/* ===================================================================
   LumiSpace — EmptyState
   Reusable empty/no-results state with icon and CTA.
   =================================================================== */

import { type LucideIcon, Inbox } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  /** Lucide icon to display */
  icon?: LucideIcon;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** CTA link */
  actionHref?: string;
  /** CTA label */
  actionLabel?: string;
  /** Custom className */
  className?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description = "There's nothing to display at the moment.",
  actionHref,
  actionLabel = "Go back",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg-surface">
        <Icon className="h-7 w-7 text-text-muted" />
      </div>
      <h3 className="font-display text-xl font-medium text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-gold px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-bg no-underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
