"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, CalendarDays, CheckCircle2, Clock, AlertCircle, Store } from "lucide-react";
import { getCurrentUser, getProviderIdForUser, isPlatformAdmin } from "@/lib/services/auth-service";
import { getProviderStats, getBookingsByProviderId, getBookings } from "@/lib/services/booking-service";
import { getVenues } from "@/lib/services/venue-service";
import { getProviders } from "@/lib/services/provider-service";
import { Booking } from "@/lib/types";
import Image from "next/image";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0, thisMonth: 0 });
  const [platformStats, setPlatformStats] = useState({ providers: 0, venues: 0, bookings: 0, pendingProviders: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]); // Can be bookings or providers
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (user.role === "platform_admin") {
        setIsSuperAdmin(true);
        const allBookings = getBookings();
        const allVenues = getVenues();
        const allProviders = getProviders();
        const pendingProviders = allProviders.filter(p => p.status === "pending");
        
        setPlatformStats({
          providers: allProviders.length,
          venues: allVenues.length,
          bookings: allBookings.length,
          pendingProviders: pendingProviders.length,
        });

        // For Super Admin, we show pending providers first, then all providers
        if (pendingProviders.length > 0) {
          setRecentBookings(pendingProviders.slice(0, 5));
        } else {
          // If no pending, show latest registered providers
          const sortedProviders = [...allProviders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setRecentBookings(sortedProviders.slice(0, 5));
        }

      } else {

        const providerId = getProviderIdForUser(user.id);
        if (providerId) {
          setStats(getProviderStats(providerId));
          const allBookings = getBookingsByProviderId(providerId);
          allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setRecentBookings(allBookings.slice(0, 5));
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-text-primary mb-2">Dashboard Overview</h1>
        <p className="text-text-secondary">
          {isSuperAdmin
            ? "Platform-wide overview of LumiSpace."
            : "Welcome back. Here's what's happening with your venues today."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {isSuperAdmin ? (
          <>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Providers</h3>
                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{platformStats.providers}</p>
            </div>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Venues</h3>
                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{platformStats.venues}</p>
            </div>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Bookings</h3>
                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                  <CalendarDays className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{platformStats.bookings}</p>
            </div>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Pending Providers</h3>
                <div className="w-8 h-8 rounded-full bg-warning/10 text-warning flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{platformStats.pendingProviders}</p>
            </div>
          </>
        ) : (
          <>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Pending Requests</h3>
                <div className="w-8 h-8 rounded-full bg-warning/10 text-warning flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{stats.pending}</p>
            </div>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Approved Events</h3>
                <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{stats.approved}</p>
            </div>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Bookings</h3>
                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                  <CalendarDays className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{stats.total}</p>
            </div>
            <div className="glass-strong p-6 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">New This Month</h3>
                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-4xl text-text-primary">{stats.thisMonth}</p>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="glass-strong rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-2xl text-text-primary">
            {isSuperAdmin ? "Provider Management" : "Recent Booking Requests"}
          </h2>
          <Link href={isSuperAdmin ? "/admin/all-providers" : "/admin/bookings"} className="text-sm text-gold hover:underline">
            View All
          </Link>
        </div>
        
        {recentBookings.length > 0 ? (
          <div className="divide-y divide-border">
            {recentBookings.map((item) => {
              const isProvider = (item as any).brandName !== undefined;
              
              if (isProvider) {
                const isPending = item.status === "pending";
                return (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg-elevated/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0 relative overflow-hidden">
                        {item.heroImageUrl ? (
                          <Image src={item.heroImageUrl} alt={item.brandName} fill className="object-cover opacity-50" />
                        ) : (
                          <Store className="w-6 h-6 text-gold" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-display text-lg text-text-primary">{item.brandName}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium border ${
                            isPending ? 'bg-warning/10 text-warning border-warning/20' : 'bg-success/10 text-success border-success/20'
                          }`}>
                            {isPending ? "Pending Review" : "Active Partner"}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {item.city}, {item.country} • Registered {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link 
                      href="/admin/all-providers"
                      className="shrink-0 px-6 py-2 bg-gold text-bg rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors text-center"
                    >
                      {isPending ? "Review Registration" : "Manage Provider"}
                    </Link>
                  </div>
                );
              }

              const booking = item as Booking;
              return (
                <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg-elevated/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm text-text-primary">{booking.bookingCode}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        booking.status === 'approved' ? 'bg-success/10 text-success border-success/20' :
                        booking.status === 'rejected' ? 'bg-danger/10 text-danger border-danger/20' :
                        'bg-warning/10 text-warning border-warning/20'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      <span className="text-text-primary">{booking.customerName}</span> requests to book for <span className="text-text-primary">{booking.eventDate}</span>
                    </p>
                  </div>
                  <Link 
                    href={`/admin/bookings/${booking.id}`}
                    className="shrink-0 px-4 py-2 border border-border-gold rounded-lg text-sm text-gold hover:bg-gold hover:text-bg transition-colors text-center"
                  >
                    Review Details
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <AlertCircle className="w-8 h-8 text-text-muted mb-3" />
            <p className="text-text-secondary">No recent activity found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
