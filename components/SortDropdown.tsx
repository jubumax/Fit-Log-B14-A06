"use client";

import { ChevronDown } from "lucide-react";

export type SortKey = "duration" | "calories" | "rating";

const options: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];


export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <label className="relative inline-flex items-center gap-2 text-sm text-gray-300">

      <span className="hidden sm:inline">Sort By</span>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-9 text-sm font-medium text-white outline-none focus:border-accent"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface">
              {o.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />

      </div>
    </label>
  );
}
