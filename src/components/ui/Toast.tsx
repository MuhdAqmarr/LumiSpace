/* ===================================================================
   LumiSpace — Toast Notification System
   Lightweight toast notification with auto-dismiss.
   =================================================================== */

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────── */
type ToastVariant = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

/* ─── Context ────────────────────────────────────────────────────── */
const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

/* ─── Icon Map ───────────────────────────────────────────────────── */
const iconMap = {
  success: CheckCircle2,
  error: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: "text-success border-success/30 bg-success/10",
  error: "text-danger border-danger/30 bg-danger/10",
  warning: "text-warning border-warning/30 bg-warning/10",
  info: "text-gold border-gold/30 bg-gold/10",
};

/* ─── Provider ───────────────────────────────────────────────────── */
interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, message, variant }]);

      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => {
          const Icon = iconMap[t.variant];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 backdrop-blur-xl shadow-[var(--shadow-lg)] transition-all duration-300 animate-slide-in ${colorMap[t.variant]}`}
              style={{ minWidth: 280, maxWidth: 420 }}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm text-text-primary">{t.message}</p>
              <button
                onClick={() => dismissToast(t.id)}
                className="shrink-0 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
