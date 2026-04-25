/* ===================================================================
   LumiSpace — LoadingState
   Reusable full-page or inline loading spinner.
   =================================================================== */

interface LoadingStateProps {
  /** Full page spinner or inline */
  fullPage?: boolean;
  /** Custom message */
  message?: string;
  /** Custom className */
  className?: string;
}

export default function LoadingState({
  fullPage = false,
  message = "Loading...",
  className = "",
}: LoadingStateProps) {
  if (fullPage) {
    return (
      <div className={`min-h-screen bg-bg flex flex-col items-center justify-center ${className}`}>
        <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin" />
        <p className="mt-4 text-sm text-text-muted tracking-wider uppercase">{message}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      <p className="mt-3 text-sm text-text-muted tracking-wider uppercase">{message}</p>
    </div>
  );
}
