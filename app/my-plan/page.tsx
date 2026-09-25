"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, Search } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import PlanListCard from "@/components/PlanListCard";
import { LoadingPlan } from "@/components/Loading";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const [tab, setTab] = useState<Tab>("plan");
  const [query, setQuery] = useState("");
  const { planItems, savedItems, hydrated } = usePlan();

  const baseItems = tab === "plan" ? planItems : savedItems;
  const q = query.trim().toLowerCase();
  const activeItems = q
    ? baseItems.filter(
        (e) =>
          e.workout.name.toLowerCase().includes(q) ||
          e.workout.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
      )
    : baseItems;

  const totals = planItems.reduce(
    (acc, e) => {
      acc.minutes += e.workout.duration;
      acc.calories += e.workout.caloriesBurned;
      return acc;
    },
    { minutes: 0, calories: 0 }
  );

  return (
    <section className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl uppercase text-white sm:text-4xl">My Plan</h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Exercises", value: planItems.length },
          { label: "Minutes", value: totals.minutes },
          { label: "Calories", value: totals.calories },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-line bg-surface p-4 text-center sm:p-6"
          >
            <p className="font-display text-2xl text-accent sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-muted sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 border-b border-line sm:border-b-0">
          {(
            [
              { key: "plan", label: "Today's Plan" },
              { key: "saved", label: "Saved" },
            ] as { key: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors sm:mb-0 sm:border-b-2 ${
                tab === t.key
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {baseItems.length > 0 && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this list"
              className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-accent sm:w-56"
            />
          </div>
        )}
      </div>
      <div className="border-b border-line sm:hidden" />

      <div className="mt-6">
        {!hydrated && <LoadingPlan />}

        {hydrated && activeItems.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface px-6 py-16 text-center">
            <ClipboardList className="h-10 w-10 text-accent" />
            <h2 className="font-display text-xl uppercase text-white">Nothing here yet</h2>
            <p className="max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {hydrated && activeItems.length > 0 && (
          <div className="flex flex-col gap-4">
            {activeItems.map((entry) => (
              <PlanListCard key={`${entry.status}-${entry.workout.id}`} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
