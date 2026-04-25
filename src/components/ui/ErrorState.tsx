/* ===================================================================
   LumiSpace — ErrorState
   Reusable error display with retry option.
   =================================================================== */

import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  /** Full page or inline */
  fullPage?: boolean;
  /** Title text */
  title?: string;
  /** Error description */
  description?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Custom className */
  className?: string;
}

export default function ErrorState({
  fullPage = false,
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-danger/30 bg-danger/10">
        <AlertTriangle className="h-7 w-7 text-danger" />
      </div>
      <h3 className="font-display text-xl font-medium text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-full border border-border-gold px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-bg"
        >
          Try Again
        </button>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        {content}
      </div>
    );
  }

  return <div className="py-20">{content}</div>;
}
