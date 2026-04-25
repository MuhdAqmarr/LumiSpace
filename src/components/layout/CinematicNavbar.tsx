"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

export default function CinematicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/providers", label: "Providers" },
    { href: "/become-a-provider", label: "List Your Venue" },
    { href: "/admin/login", label: "Provider Login" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong shadow-[var(--shadow-md)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-text-primary no-underline"
        >
          <Sparkles className="h-6 w-6 text-gold" />
          <span className="font-display text-xl font-medium tracking-wide">
            LumiSpace
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wider uppercase text-text-secondary transition-colors duration-300 hover:text-gold no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/venues"
            className="rounded-full border border-gold px-6 py-2.5 text-sm font-medium tracking-wider uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-bg no-underline"
          >
            Find a Venue
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-text-primary md:hidden"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-[var(--ease-out-expo)] overflow-hidden ${
          isMobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong border-t border-border px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium tracking-wider uppercase text-text-secondary transition-colors duration-300 hover:text-gold no-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/venues"
              onClick={() => setIsMobileOpen(false)}
              className="mt-2 rounded-full border border-gold px-6 py-2.5 text-center text-sm font-medium tracking-wider uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-bg no-underline"
            >
              Find a Venue
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
