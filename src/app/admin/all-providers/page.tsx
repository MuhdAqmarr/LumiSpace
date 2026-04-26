"use client";

import { useEffect, useState } from "react";
import { Store, MapPin, Mail, Phone, Globe, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getProviders } from "@/lib/services/provider-service";
import { Provider } from "@/lib/types";
import Image from "next/image";

export default function AllProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProviders(getProviders());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const statusConfig = {
    approved: { label: "Approved", icon: CheckCircle2, cls: "bg-success/10 text-success border-success/20" },
    pending: { label: "Pending", icon: Clock, cls: "bg-warning/10 text-warning border-warning/20" },
    suspended: { label: "Suspended", icon: XCircle, cls: "bg-danger/10 text-danger border-danger/20" },
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-text-primary mb-2">All Providers</h1>
        <p className="text-text-secondary">Platform-wide view of all registered venue providers.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {(["approved", "pending", "suspended"] as const).map((status) => {
          const count = providers.filter(p => p.status === status).length;
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className={`rounded-2xl border p-6 ${cfg.cls}`}>
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">{cfg.label}</span>
              </div>
              <p className="font-display text-4xl">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Provider List */}
      <div className="glass-strong rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-xl text-text-primary">Registered Providers ({providers.length})</h2>
        </div>
        <div className="divide-y divide-border">
          {providers.map((provider) => {
            const cfg = statusConfig[provider.status as keyof typeof statusConfig] || statusConfig.pending;
            const Icon = cfg.icon;
            return (
              <div key={provider.id} className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-bg-elevated/50 transition-colors">
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl bg-bg-elevated border border-border flex items-center justify-center shrink-0 relative overflow-hidden">
                  {provider.logoUrl ? (
                    <Image src={provider.logoUrl} alt={provider.brandName} fill className="object-cover" />
                  ) : (
                    <Store className="w-7 h-7 text-text-muted" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-display text-lg text-text-primary">{provider.brandName}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium border ${cfg.cls}`}>
                      <Icon className="w-3 h-3" /> {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-1">{provider.tagline}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{provider.city}, {provider.country}</span>
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{provider.contactEmail}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{provider.contactPhone}</span>
                    {provider.websiteUrl && (
                      <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{provider.websiteUrl}</span>
                    )}
                  </div>
                </div>

                {/* ID & Date */}
                <div className="shrink-0 text-right">
                  <p className="font-mono text-xs text-text-muted">{provider.id}</p>
                  <p className="text-xs text-text-muted mt-1">Since {new Date(provider.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
