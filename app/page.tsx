"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown, { SortKey } from "@/components/SortDropdown";
import { LoadingLibrary } from "@/components/Loading";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
        )
      : [...workouts];
    list = [...list];
    if (sort === "duration") list.sort((a, b) => a.duration - b.duration);
    if (sort === "calories") list.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [workouts, sort, query]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Workout Library
            </p>
            <h1 className="font-display text-4xl uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Train with intent.
              <br />
              Log every set.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
            >
              Browse Workouts
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface lg:max-w-none">
            <Image
              src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
              alt="Athlete mid-lift"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Library */}
      <section id="library" className="mx-auto max-w-content scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl uppercase text-white sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          {!loading && workouts.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or tag"
                  className="w-44 rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-accent sm:w-56"
                />
              </div>
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          )}
        </div>

        {loading && <LoadingLibrary />}

        {!loading && error && (
          <p className="rounded-lg border border-line bg-surface p-6 text-center text-sm text-muted">
            Couldn&apos;t load the workout library. Please try again shortly.
          </p>
        )}

        {!loading && !error && sorted.length === 0 && (
          <p className="rounded-lg border border-line bg-surface p-6 text-center text-sm text-muted">
            No lifts match &ldquo;{query}&rdquo;.
          </p>
        )}

        {!loading && !error && sorted.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
