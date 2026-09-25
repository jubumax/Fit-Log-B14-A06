"use client";

import Image from "next/image";
import Link from "next/link";
import { LuCheck, LuClock3, LuFlame, LuStar, LuX } from "react-icons/lu";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

type PlanWorkoutCardProps = {
  workout: Workout;
  mode: "plan" | "saved";
};

export default function PlanWorkoutCard({
  workout,
  mode,
}: PlanWorkoutCardProps) {
  const { removeFromPlan, removeFromSaved, markDone, isDone } = usePlan();

  const done = isDone(workout.id);

  function handleRemove() {
    if (mode === "plan") {
      removeFromPlan(workout.id);
      toast.success("Removed from today's plan.");
    } else {
      removeFromSaved(workout.id);
      toast.success("Removed from saved workouts.");
    }
  }

  function handleDone() {
    markDone(workout.id);
    toast.success(`${workout.name} marked as done.`);
  }

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-[#272b33] bg-[#15171c] p-4 sm:flex-row sm:items-center">
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:w-40">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="display-font text-2xl font-bold uppercase">
          {workout.name}
        </h3>

        <p className="mt-1 text-sm text-white/40">{workout.equipment}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <LuClock3 size={14} className="text-[#ccff00]" />
            {workout.duration} min
          </span>

          <span className="inline-flex items-center gap-1.5">
            <LuFlame size={14} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="inline-flex items-center gap-1.5">
            <LuStar size={14} className="fill-[#ccff00] text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold transition hover:border-white/40"
        >
          View Details
        </Link>

        {mode === "plan" && (
          <button
            type="button"
            onClick={handleDone}
            disabled={done}
            className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LuCheck size={15} />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={handleRemove}
          className="grid size-9 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-red-400/40 hover:text-red-400"
          aria-label={`Remove ${workout.name}`}
        >
          <LuX size={16} />
        </button>
      </div>
    </article>
  );
}
