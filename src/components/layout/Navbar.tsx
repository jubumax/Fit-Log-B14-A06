"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavLogo from "@/assets/logo.png";
import { LuMenu, LuX } from "react-icons/lu";

import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { planIds, savedIds, hydrated } = usePlan();

  const planCount = hydrated ? planIds.length : 0;
  const savedCount = hydrated ? savedIds.length : 0;

  const workoutActive = pathname === "/" || pathname.startsWith("/workouts");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0d0e11]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-9 place-items-center">
            <Image
              src={NavLogo}
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </span>

          <span className="display-font text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              workoutActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-medium transition ${
              planActive ? "text-[#ccff00]" : "text-white/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
          >
            Plan
            <span className="grid size-5 place-items-center rounded-full bg-[#ccff00] text-xs text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
          >
            Saved
            <span className="grid size-5 place-items-center rounded-full bg-white/10 text-xs">
              {savedCount}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="grid size-10 place-items-center rounded-lg border border-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <LuX size={21} /> : <LuMenu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/5 px-5 py-3 md:hidden">
          <nav className="flex flex-col items-center">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-bold ${
                  workoutActive ? "text-[#ccff00]" : "text-white/70"
                }`}
              >
                Workouts
              </Link>

              <Link
                href="/my-plan?tab=plan"
                className={`text-sm font-bold ${
                  planActive ? "text-[#ccff00]" : "text-white/70"
                }`}
              >
                My Plan
              </Link>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Link
                href="/my-plan?tab=plan"
                className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[11px] font-bold text-black"
              >
                Plan {planCount}
              </Link>

              <Link
                href="/my-plan?tab=saved"
                className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-bold text-white"
              >
                Saved {savedCount}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
