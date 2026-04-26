"use client";

import { useMemo } from "react";
import { Clock } from "lucide-react";
import CustomSelect from "./CustomSelect";

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export default function CustomTimePicker({
  value,
  onChange,
  placeholder = "Select time",
  error,
  className,
}: CustomTimePickerProps) {
  // Generate 30-min intervals
  const timeOptions = useMemo(() => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        // format 24h for value (e.g., "14:30")
        const valueFormat = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        
        // format 12h for label (e.g., "02:30 PM")
        const ampm = h >= 12 ? "PM" : "AM";
        const displayH = h % 12 || 12;
        const labelFormat = `${displayH.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
        
        options.push({ value: valueFormat, label: labelFormat });
      }
    }
    return options;
  }, []);

  return (
    <CustomSelect
      options={timeOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={<Clock className="h-4 w-4 text-text-muted group-hover:text-gold transition-colors" />}
      error={error}
      className={className}
    />
  );
}
