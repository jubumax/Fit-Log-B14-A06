"use client";

import { useEffect, useState } from "react";

import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";

import WorkoutCardSkeleton from "@/components/workouts/WorkoutCardSkeleton";
import WorkoutCard from "@/components/workouts/WorkoutCard";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWorkouts() {
    try {
      setLoading(true);
      setError("");

      const data = await getWorkouts();
      setWorkouts(data);
    } catch {
      setError("Unable to load workouts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <section id="library" className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
      <div className="mb-10">
        <h2 className="display-font text-4xl font-bold uppercase sm:text-5xl">
          The Library
        </h2>

        <p className="mt-3 text-white/50">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <WorkoutCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="text-sm text-white/60">{error}</p>

          <button
            type="button"
            onClick={loadWorkouts}
            className="mt-5 rounded-full bg-[#ccff00] px-5 py-2 text-sm font-bold text-black"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
