"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dumbbell, Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";


const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();
  const [open, setOpen] = useState(false);


  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-ink">
            <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg tracking-wide text-white">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active ? "text-accent" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-white"
          >
            Saved {savedCount}
          </Link>

          <button
            className="ml-1 text-gray-300 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>


      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  active ? "bg-surface2 text-accent" : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
