"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface CustomNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  error?: boolean;
  placeholder?: string;
  className?: string;
}

export default function CustomNumberInput({
  value,
  onChange,
  min = 1,
  max = 10000,
  error,
  placeholder,
  className = "",
}: CustomNumberInputProps) {
  const [internalValue, setInternalValue] = useState<string>(value ? value.toString() : "");

  useEffect(() => {
    if (value !== undefined && value.toString() !== internalValue) {
      setInternalValue(value.toString());
    }
  }, [value]);

  const handleBlur = () => {
    let num = parseInt(internalValue, 10);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    setInternalValue(num.toString());
    onChange(num);
  };

  const handleIncrement = () => {
    let num = parseInt(internalValue, 10);
    if (isNaN(num)) num = min;
    else num++;
    if (num > max) num = max;
    setInternalValue(num.toString());
    onChange(num);
  };

  const handleDecrement = () => {
    let num = parseInt(internalValue, 10);
    if (isNaN(num)) num = min;
    else num--;
    if (num < min) num = min;
    setInternalValue(num.toString());
    onChange(num);
  };

  return (
    <div
      className={`flex items-center justify-between w-full rounded-xl border bg-bg-surface px-2 transition-all duration-300 ${
        error ? "border-danger" : "border-border hover:border-gold/50 focus-within:border-gold focus-within:shadow-[var(--shadow-glow)]"
      } ${className}`}
    >
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={internalValue}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9]/g, "");
          setInternalValue(val);
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full bg-transparent px-2 py-3 text-sm text-text-primary outline-none"
      />
      <div className="flex flex-col border-l border-border pl-2 my-1 mr-1 gap-1">
        <button
          type="button"
          onClick={handleIncrement}
          disabled={parseInt(internalValue, 10) >= max}
          className="p-0.5 rounded text-text-muted hover:bg-gold/10 hover:text-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={parseInt(internalValue, 10) <= min}
          className="p-0.5 rounded text-text-muted hover:bg-gold/10 hover:text-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-colors"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
