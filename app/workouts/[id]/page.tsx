"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Bookmark, CalendarPlus, Clock3, Flame, Star } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import { LoadingPlan } from "@/components/Loading";

const specRows = (w: Workout) => [
  { label: "Equipment", value: w.equipment },
  { label: "Difficulty", value: w.difficulty },
  { label: "Sets", value: String(w.sets) },
  { label: "Reps", value: w.reps },
  { label: "Duration", value: `${w.duration} min` },
  { label: "Calories", value: `${w.caloriesBurned} kcal` },
  { label: "Rating", value: String(w.rating) },
];

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null | undefined>(undefined);
  const { addToPlan, addToSaved, isInPlan, isSaved, planFull } = usePlan();

  useEffect(() => {
    let cancelled = false;
    getWorkout(params.id)
      .then((data) => {
        if (!cancelled) setWorkout(data);
      })
      .catch(() => {
        if (!cancelled) setWorkout(null);
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (workout === undefined) {
    return <LoadingPlan />;
  }

  if (workout === null) {
    notFound();
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <section className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-surface lg:aspect-auto">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
            {specRows(workout).map((row) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
                <dt className="uppercase tracking-wide text-muted">{row.label}</dt>
                <dd className="font-medium text-white">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center gap-5 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-accent" />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-accent" />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-accent" />
              {workout.rating}
            </span>
          </div>

          <h2 className="mt-8 font-display text-xl uppercase text-white">Instructions</h2>
          <ol className="mt-3 space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface2 text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan || planFull}
              className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <CalendarPlus className="h-4 w-4" />
              {inPlan ? "Added to plan" : planFull ? "Plan is full" : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              disabled={saved}
              className="flex items-center justify-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark className="h-4 w-4" />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
