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
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? "top-4 max-w-[95%] lg:max-w-5xl rounded-full glass-strong shadow-[0_0_40px_rgba(200,169,106,0.15)] border border-border"
          : "top-0 max-w-full bg-transparent border-transparent"
      }`}
    >
      <nav className={`mx-auto flex w-full items-center justify-between transition-all duration-500 ${
        isScrolled ? "px-6 py-2.5" : "px-6 py-4 lg:px-8 max-w-7xl"
      }`}>
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
            className="group relative overflow-hidden rounded-full p-[1px] no-underline"
          >
            <div className="absolute -inset-[100%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(200,169,106,1)_360deg)] opacity-70" />
            <div className="absolute inset-0 z-0 rounded-full border border-gold/30" />
            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-bg px-6 py-2.5 text-sm font-medium tracking-wider uppercase text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-bg">
              Find a Venue
            </div>
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
