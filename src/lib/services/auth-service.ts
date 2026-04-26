/* ===================================================================
   LumiSpace — Auth Service
   Demo authentication for provider admin login
   =================================================================== */

import { Profile, UserRole } from "@/lib/types";

const AUTH_KEY = "lumispace_auth";

// Demo credentials
const DEMO_ACCOUNTS: { email: string; password: string; profile: Profile }[] = [
  {
    email: "provider@lumispace.test",
    password: "password123",
    profile: {
      id: "user-001",
      email: "provider@lumispace.test",
      fullName: "Aminah Hassan",
      phone: "+60 12-345 6789",
      role: "provider_admin",
      createdAt: "2025-06-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    },
  },
  {
    email: "urban@lumispace.test",
    password: "password123",
    profile: {
      id: "user-002",
      email: "urban@lumispace.test",
      fullName: "Rizal Ibrahim",
      phone: "+60 11-234 5678",
      role: "provider_admin",
      createdAt: "2025-08-01T00:00:00Z",
      updatedAt: "2026-02-01T00:00:00Z",
    },
  },
  {
    email: "gardenia@lumispace.test",
    password: "password123",
    profile: {
      id: "user-003",
      email: "gardenia@lumispace.test",
      fullName: "Siti Nurhaliza Kamal",
      phone: "+60 13-456 7890",
      role: "provider_admin",
      createdAt: "2025-10-01T00:00:00Z",
      updatedAt: "2026-03-01T00:00:00Z",
    },
  },
  {
    email: "admin@lumispace.test",
    password: "admin123",
    profile: {
      id: "user-superadmin",
      email: "admin@lumispace.test",
      fullName: "LumiSpace Admin",
      phone: "+60 3-0000 0000",
      role: "platform_admin" as UserRole,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    },
  },
];

export interface LoginResult {
  success: boolean;
  error?: string;
  profile?: Profile;
}

export function login(email: string, password: string): LoginResult {
  const account = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );

  if (!account) {
    return { success: false, error: "Invalid email or password" };
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(account.profile));
  }

  return { success: true, profile: account.profile };
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getCurrentUser(): Profile | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(AUTH_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function getProviderIdForUser(userId: string): string | undefined {
  // Map user IDs to provider IDs
  const mapping: Record<string, string> = {
    "user-001": "prov-001",
    "user-002": "prov-002",
    "user-003": "prov-003",
  };
  return mapping[userId];
}

export function isPlatformAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === "platform_admin";
}

/** Get demo credentials for display on login page */
export function getDemoCredentials() {
  return DEMO_ACCOUNTS.map((a) => ({
    email: a.email,
    password: a.password,
    providerName:
      a.profile.id === "user-001"
        ? "Lumiere Grand Hall"
        : a.profile.id === "user-002"
          ? "Urban Loft Collective"
          : "Gardenia Event Estate",
  }));
}
