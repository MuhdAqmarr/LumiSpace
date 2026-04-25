"use client";

import { useEffect, useState } from "react";
import { Save, Store, Mail, Phone, MapPin } from "lucide-react";
import { getCurrentUser, getProviderIdForUser } from "@/lib/services/auth-service";
import { getProviderById } from "@/lib/services/provider-service";
import { Provider } from "@/lib/types";

export default function AdminProviderProfilePage() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const providerId = getProviderIdForUser(user.id);
      if (providerId) {
        setProvider(getProviderById(providerId) || null);
      }
    }
    setLoading(false);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return <div>Provider profile not found.</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-text-primary mb-2">Provider Profile</h1>
        <p className="text-text-secondary">Manage your public brand identity and contact information.</p>
      </div>

      <div className="glass-strong rounded-3xl border border-border p-8">
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-lg font-medium text-text-primary mb-6 flex items-center gap-2">
              <Store className="w-5 h-5 text-gold" /> Brand Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Brand Name</label>
                <input 
                  type="text" 
                  defaultValue={provider.brandName}
                  className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Tagline</label>
                <input 
                  type="text" 
                  defaultValue={provider.tagline}
                  className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">Brand Description</label>
                <textarea 
                  rows={4}
                  defaultValue={provider.description}
                  className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-medium text-text-primary mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" /> Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> Public Email</label>
                <input 
                  type="email" 
                  defaultValue={provider.contactEmail}
                  className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2"><Phone className="w-4 h-4" /> Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue={provider.contactPhone}
                  className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</label>
                <input 
                  type="text" 
                  defaultValue={provider.address}
                  className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors mb-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    defaultValue={provider.city}
                    className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors"
                  />
                  <input 
                    type="text" 
                    defaultValue={provider.country}
                    className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit"
              disabled={isSaving}
              className="bg-gold text-bg px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <><span className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4" /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
