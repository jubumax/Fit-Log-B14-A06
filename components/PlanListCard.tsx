"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { PlanEntry } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function PlanListCard({ entry }: { entry: PlanEntry }) {
  const { removeEntry, markDone } = usePlan();
  const { workout, status, done } = entry;

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-surface2 sm:h-16 sm:w-24">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base uppercase text-white">
          {workout.name}
          {done && <span className="ml-2 text-xs text-accent">Done</span>}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-300">
          <span className="flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-lg border border-line px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:border-accent"
        >
          View Details
        </Link>
        {status === "plan" && (
          <button
            onClick={() => markDone(workout.id)}
            aria-label="Mark as done"
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
              done ? "border-accent text-accent" : "border-line text-gray-300 hover:border-accent"
            }`}
          >
            <Check className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => removeEntry(workout.id, status)}
          aria-label="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gray-300 hover:border-red-400 hover:text-red-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
