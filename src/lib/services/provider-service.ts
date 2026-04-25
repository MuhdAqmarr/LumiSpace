/* ===================================================================
   LumiSpace — Provider Service
   Manages provider CRUD operations (mock data + localStorage-ready)
   =================================================================== */

import { Provider } from "@/lib/types";
import { providers as seedProviders } from "@/lib/data/providers";
import { generateId, slugify } from "@/lib/utils";

const STORAGE_KEY = "lumispace_providers";

function getStoredProviders(): Provider[] {
  if (typeof window === "undefined") return seedProviders;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProviders));
    return seedProviders;
  }
  return JSON.parse(stored);
}

function saveProviders(providers: Provider[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
}

export function getProviders(): Provider[] {
  return getStoredProviders();
}

export function getApprovedProviders(): Provider[] {
  return getStoredProviders().filter((p) => p.status === "approved");
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return getStoredProviders().find((p) => p.slug === slug);
}

export function getProviderById(id: string): Provider | undefined {
  return getStoredProviders().find((p) => p.id === id);
}

export function createProvider(
  input: Omit<Provider, "id" | "slug" | "status" | "createdAt" | "updatedAt">
): Provider {
  const providers = getStoredProviders();
  const now = new Date().toISOString();
  const newProvider: Provider = {
    ...input,
    id: `prov-${generateId()}`,
    slug: slugify(input.brandName),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  providers.push(newProvider);
  saveProviders(providers);
  return newProvider;
}

export function updateProvider(
  id: string,
  input: Partial<Provider>
): Provider | undefined {
  const providers = getStoredProviders();
  const index = providers.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  providers[index] = {
    ...providers[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  saveProviders(providers);
  return providers[index];
}
