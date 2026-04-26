"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ChevronDown, Store, UserCircle } from "lucide-react";

export default function CinematicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-full ${
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
        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="/providers"
            className="text-sm font-medium tracking-wider uppercase text-text-secondary transition-colors duration-300 hover:text-gold no-underline"
          >
            Providers
          </Link>

          {/* Providers Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium tracking-wider uppercase text-text-secondary transition-colors duration-300 hover:text-gold">
              For Providers
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
              isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}>
              <div className="w-56 glass-strong rounded-2xl border border-border p-2 shadow-2xl overflow-hidden">
                <Link
                  href="/become-a-provider"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest text-text-secondary hover:text-gold hover:bg-gold/5 transition-all no-underline group"
                >
                  <Store className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors" />
                  List Your Venue
                </Link>
                <Link
                  href="/admin/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest text-text-secondary hover:text-gold hover:bg-gold/5 transition-all no-underline group"
                >
                  <UserCircle className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors" />
                  Provider Login
                </Link>
              </div>
            </div>
          </div>

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
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong border-t border-border px-6 pb-8 pt-4">
          <div className="flex flex-col gap-5">
            <Link
              href="/providers"
              onClick={() => setIsMobileOpen(false)}
              className="text-sm font-medium tracking-wider uppercase text-text-secondary hover:text-gold no-underline"
            >
              Providers
            </Link>
            
            <div className="pt-2 border-t border-border/50">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-4">For Providers</p>
              <div className="flex flex-col gap-4 pl-2">
                <Link
                  href="/become-a-provider"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium text-text-secondary hover:text-gold no-underline"
                >
                  <Store className="w-4 h-4 text-gold" />
                  List Your Venue
                </Link>
                <Link
                  href="/admin/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium text-text-secondary hover:text-gold no-underline"
                >
                  <UserCircle className="w-4 h-4 text-gold" />
                  Provider Login
                </Link>
              </div>
            </div>

            <Link
              href="/venues"
              onClick={() => setIsMobileOpen(false)}
              className="mt-2 rounded-full border border-gold px-6 py-3 text-center text-sm font-medium tracking-wider uppercase text-gold hover:bg-gold hover:text-bg no-underline transition-all"
            >
              Find a Venue
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
