"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  error,
  className = "",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Internal state for the calendar view (which month/year we are looking at)
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  });

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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate calendar days
  const days = [];
  // Empty slots before 1st day
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    const isSelected = value === dateStr;
    const isToday = new Date().toISOString().split("T")[0] === dateStr;

    days.push(
      <button
        key={i}
        type="button"
        onClick={() => {
          onChange(dateStr);
          setIsOpen(false);
        }}
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 ${
          isSelected
            ? "bg-gold text-bg font-semibold shadow-md shadow-gold/20"
            : isToday
            ? "bg-bg-elevated text-gold border border-gold/30 hover:bg-gold/10"
            : "text-text-primary hover:bg-bg-elevated hover:text-gold"
        }`}
      >
        {i}
      </button>
    );
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Format display value
  let displayValue = "";
  if (value) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      displayValue = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    }
  }

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
        <div className="flex items-center gap-3 truncate text-text-primary">
          <CalendarIcon className="h-4 w-4 text-text-muted shrink-0" />
          <span className={!value ? "text-text-muted" : "truncate"}>
            {displayValue || placeholder}
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 top-full z-[9999] mt-2 p-4 w-[280px] origin-top transform rounded-xl border border-border bg-bg-surface/95 backdrop-blur-xl shadow-xl transition-all duration-300 ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={handlePrevMonth} className="p-1 text-text-muted hover:text-gold transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-text-primary">
            {monthNames[month]} {year}
          </span>
          <button type="button" onClick={handleNextMonth} className="p-1 text-text-muted hover:text-gold transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="w-8 h-8 flex items-center justify-center text-[10px] uppercase font-semibold text-text-muted">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    </div>
  );
}
