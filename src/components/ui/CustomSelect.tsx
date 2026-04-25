"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  error?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  icon,
  className = "",
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm transition-all duration-300 outline-none ${
          isOpen
            ? "border-gold bg-bg-surface shadow-[var(--shadow-glow)]"
            : error 
            ? "border-danger bg-bg-elevated/50" 
            : "border-border bg-bg-elevated/50 hover:border-gold/50"
        }`}
      >
        <div className="flex items-center gap-2 truncate text-text-primary">
          {icon && <span className="text-text-muted">{icon}</span>}
          <span className={!selectedOption ? "text-text-muted" : "truncate"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180 text-gold" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 top-full z-50 mt-2 w-full origin-top transform overflow-hidden rounded-xl border border-border bg-bg-surface/95 backdrop-blur-xl shadow-xl transition-all duration-300 ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="max-h-60 overflow-y-auto py-1 hide-scrollbar">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                  value === option.value
                    ? "bg-gold/10 text-gold font-medium"
                    : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
