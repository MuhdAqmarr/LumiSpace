import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Sparkles className="h-6 w-6 text-gold" />
              <span className="font-display text-xl font-medium text-text-primary">
                LumiSpace
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Discover cinematic halls, gardens, rooftops, and private spaces
              from trusted venue providers across Malaysia.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted font-body">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/venues", label: "Browse Venues" },
                { href: "/venues", label: "Kuala Lumpur" },
                { href: "/venues", label: "Petaling Jaya" },
                { href: "/venues", label: "Shah Alam" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-gold no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted font-body">
              For Providers
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/become-a-provider", label: "Become a Provider" },
                { href: "/admin/login", label: "Provider Login" },
                { href: "/admin", label: "Dashboard" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-gold no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted font-body">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="h-4 w-4 text-gold" />
                hello@lumispace.my
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="h-4 w-4 text-gold" />
                +60 3-1234 5678
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="h-4 w-4 text-gold" />
                Kuala Lumpur, Malaysia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} LumiSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold border border-gold/20">
              Demo Marketplace
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
