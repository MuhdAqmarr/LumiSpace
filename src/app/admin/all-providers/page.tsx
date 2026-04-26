"use client";

import { useEffect, useState } from "react";
import { Store, MapPin, Mail, Phone, Globe, CheckCircle2, Clock, XCircle, ShieldCheck, ShieldAlert, Eye, X, BookOpen, Quote } from "lucide-react";
import { getProviders, updateProviderStatus } from "@/lib/services/provider-service";
import { Provider } from "@/lib/types";
import Image from "next/image";
import { useToast } from "@/components/ui/Toast";

export default function AllProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const { toast } = useToast();

  const loadProviders = () => {
    setProviders(getProviders());
  };

  useEffect(() => {
    loadProviders();
    setLoading(false);
  }, []);

  const handleUpdateStatus = (id: string, status: "approved" | "pending" | "suspended", name: string) => {
    const updated = updateProviderStatus(id, status);
    if (updated) {
      toast(`Provider "${name}" has been ${status}.`, status === "approved" ? "success" : "warning");
      loadProviders();
      // Update selected provider if it's the one being updated
      if (selectedProvider?.id === id) {
        setSelectedProvider({ ...selectedProvider, status });
      }
    } else {
      toast("Failed to update provider status.", "error");
    }
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
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
              <div key={provider.id} className="p-6 flex flex-col xl:flex-row xl:items-center gap-6 hover:bg-bg-elevated/50 transition-colors">
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
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted">{provider.id}</p>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <p className="text-[10px] text-text-muted">Since {new Date(provider.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</p>
                  </div>
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
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-bg-surface transition-all"
                  >
                    <Eye className="w-4 h-4" /> View Info
                  </button>
                  {provider.status !== "approved" && (
                    <button
                      onClick={() => handleUpdateStatus(provider.id, "approved", provider.brandName)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success border border-success/30 rounded-xl text-sm font-medium hover:bg-success hover:text-white transition-all"
                    >
                      <ShieldCheck className="w-4 h-4" /> Approve
                    </button>
                  )}
                  {provider.status !== "suspended" && (
                    <button
                      onClick={() => handleUpdateStatus(provider.id, "suspended", provider.brandName)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-danger/10 text-danger border border-danger/30 rounded-xl text-sm font-medium hover:bg-danger hover:text-white transition-all"
                    >
                      <ShieldAlert className="w-4 h-4" /> Suspend
                    </button>
                  )}
                  {provider.status === "suspended" && (
                    <button
                      onClick={() => handleUpdateStatus(provider.id, "pending", provider.brandName)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning border border-warning/30 rounded-xl text-sm font-medium hover:bg-warning hover:text-white transition-all"
                    >
                      <Clock className="w-4 h-4" /> Set Pending
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-bg/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-bg-surface border border-border rounded-3xl shadow-[var(--shadow-2xl)] overflow-hidden flex flex-col animate-scale-in">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg-elevated/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0 relative overflow-hidden">
                  {selectedProvider.logoUrl ? (
                    <Image src={selectedProvider.logoUrl} alt={selectedProvider.brandName} fill className="object-cover" />
                  ) : (
                    <Store className="w-6 h-6 text-text-muted" />
                  )}
                </div>
                <div>
                  <h2 className="font-display text-xl text-text-primary">{selectedProvider.brandName}</h2>
                  <p className="text-sm text-text-secondary">{selectedProvider.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProvider(null)}
                className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Top Section: Overview & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" /> About Provider
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedProvider.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Quote className="w-3.5 h-3.5" /> Provider Story
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed italic border-l-2 border-gold/30 pl-4">
                      {selectedProvider.story}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 bg-bg-elevated/30 p-6 rounded-2xl border border-border">
                  <div>
                    <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">Current Status</h3>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[selectedProvider.status].cls}`}>
                      {selectedProvider.status === "approved" ? <CheckCircle2 className="w-3.5 h-3.5" /> : selectedProvider.status === "suspended" ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {statusConfig[selectedProvider.status].label}
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                      <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Contact Email
                      </h3>
                      <p className="text-sm text-text-primary truncate">{selectedProvider.contactEmail}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Contact Phone
                      </h3>
                      <p className="text-sm text-text-primary">{selectedProvider.contactPhone}</p>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Location
                      </h3>
                      <p className="text-sm text-text-primary">{selectedProvider.address}</p>
                      <p className="text-xs text-text-secondary">{selectedProvider.city}, {selectedProvider.country}</p>
                    </div>
                    {selectedProvider.websiteUrl && (
                      <div>
                        <h3 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Globe className="w-3 h-3" /> Website
                        </h3>
                        <a href={selectedProvider.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gold hover:underline truncate block">
                          {selectedProvider.websiteUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Visuals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Hero Image</h3>
                  <div className="aspect-video bg-bg-elevated rounded-2xl border border-border relative overflow-hidden shadow-inner">
                    {selectedProvider.heroImageUrl ? (
                      <Image src={selectedProvider.heroImageUrl} alt="Hero" fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">No image provided</div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Hero Video URL</h3>
                  <div className="aspect-video bg-bg-elevated rounded-2xl border border-border flex items-center justify-center p-6 text-center shadow-inner">
                    {selectedProvider.heroVideoUrl ? (
                      <p className="text-xs text-gold break-all font-mono">{selectedProvider.heroVideoUrl}</p>
                    ) : (
                      <p className="text-xs text-text-muted">No video provided</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-bg-elevated/50 flex items-center justify-end gap-3">
              {selectedProvider.status !== "approved" && (
                <button
                  onClick={() => handleUpdateStatus(selectedProvider.id, "approved", selectedProvider.brandName)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-success text-white rounded-xl text-sm font-semibold hover:bg-success/90 transition-all shadow-lg shadow-success/20"
                >
                  <ShieldCheck className="w-4 h-4" /> Approve Provider
                </button>
              )}
              {selectedProvider.status !== "suspended" && (
                <button
                  onClick={() => handleUpdateStatus(selectedProvider.id, "suspended", selectedProvider.brandName)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-danger text-white rounded-xl text-sm font-semibold hover:bg-danger/90 transition-all shadow-lg shadow-danger/20"
                >
                  <ShieldAlert className="w-4 h-4" /> Suspend Provider
                </button>
              )}
              <button
                onClick={() => setSelectedProvider(null)}
                className="px-6 py-2.5 bg-bg border border-border rounded-xl text-sm font-semibold text-text-primary hover:bg-bg-elevated transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

