"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, Building2, Settings, LogOut, Sparkles, Menu, X, Store } from "lucide-react";
import { isAuthenticated, getCurrentUser, logout, getProviderIdForUser } from "@/lib/services/auth-service";
import { getProviderById } from "@/lib/services/provider-service";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<{ displayName: string; email: string; role: string } | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Is this the login page?
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
    if (!isLoginPage) {
      if (!isAuthenticated()) {
        router.replace("/admin/login");
      } else {
        const u = getCurrentUser();
        if (u) {
          let name = u.fullName;
          const isSuper = u.role === "platform_admin";
          
          if (!isSuper) {
            const providerId = getProviderIdForUser(u.id);
            if (providerId) {
              const provider = getProviderById(providerId);
              if (provider) name = provider.brandName;
            }
          } else {
            name = "LumiSpace Admin";
          }

          setUser({ displayName: name, email: u.email, role: u.role });
          setIsSuperAdmin(isSuper);
        }
      }
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  // Don't render until mounted to prevent hydration mismatch with localStorage
  if (!mounted) return null;

  // If login page, just return children without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated (and not login page), render nothing while redirecting
  if (!isAuthenticated()) {
    return null;
  }

  const navLinks = isSuperAdmin
    ? [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/all-providers", label: "All Providers", icon: Store },
        { href: "/admin/all-venues", label: "All Venues", icon: Building2 },
        { href: "/admin/all-bookings", label: "All Bookings", icon: CalendarDays },
      ]
    : [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
        { href: "/admin/venues", label: "Venues", icon: Building2 },
        { href: "/admin/provider-profile", label: "Provider Profile", icon: Settings },
      ];

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Mobile Header & Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[var(--nav-height)] bg-bg-surface border-b border-border z-50 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-text-primary no-underline">
          <Sparkles className="h-5 w-5 text-gold" />
          <span className="font-display text-lg font-medium tracking-wide">
            LumiSpace
          </span>
        </Link>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-text-primary">
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-bg-surface border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand */}
        <div className="h-24 flex items-center px-8 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-text-primary no-underline">
            <Sparkles className="h-6 w-6 text-gold" />
            <span className="font-display text-xl font-medium tracking-wide">
              LumiSpace
            </span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-8 border-b border-border">
          <p className="text-sm font-medium text-text-primary truncate">{user?.displayName}</p>
          <p className="text-xs text-text-muted truncate mt-1">{user?.email}</p>
          <div className="mt-3 inline-flex px-2 py-1 rounded bg-gold/10 border border-gold/20 text-[10px] uppercase tracking-wider text-gold">
            {isSuperAdmin ? "Platform Admin" : "Provider Admin"}
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-gold/10 text-gold border border-gold/20' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent'
                }`}
              >
                <link.icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-text-muted'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-text-secondary hover:text-danger hover:bg-danger/10 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pt-[var(--nav-height)] lg:pt-0">
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
