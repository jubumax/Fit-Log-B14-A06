"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LuArrowLeft,
  LuBookmark,
  LuCalendarPlus,
  LuClock3,
  LuFlame,
  LuStar,
} from "react-icons/lu";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

type WorkoutDetailsProps = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const { planIds, hydrated, addToPlan, saveForLater, isInPlan, isSaved } =
    usePlan();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  function handleAddToPlan() {
    const result = addToPlan(workout.id);

    if (result === "added") {
      toast.success("Added to today's plan.");
    }

    if (result === "exists") {
      toast.info("This workout is already in today's plan.");
    }

    if (result === "limit") {
      toast.error("Today's plan can contain up to 5 lifts.");
    }
  }

  function handleSave() {
    const result = saveForLater(workout.id);

    if (result === "saved") {
      toast.success("Workout saved for later.");
    }

    if (result === "exists") {
      toast.info("This workout is already saved.");
    }
  }

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:pt-8 lg:pb-16">
      {" "}
      <Link
        href="/#library"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
      >
        {" "}
        <LuArrowLeft size={16} />
        Back to library{" "}
      </Link>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#272b33] bg-[#15171c]">
          <Image
            src={workout.image}
            alt={workout.name}
            width={588}
            height={773}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h1 className="display-font text-3xl font-bold uppercase leading-[0.9] sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-4 pb-3 leading-6 text-white/55">
            {workout.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-black uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#272b33] bg-[#1E2330]">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", String(workout.sets)],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} minutes`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
              ["RATING", String(workout.rating)],
            ].map(([label, value], index, array) => (
              <div
                key={label}
                className={`flex items-center justify-between ${
                  index !== array.length - 1 ? "border-b border-[#272b33]" : ""
                } px-3 py-2.5`}
              >
                <span className="text-[10px] font-bold tracking-wider text-[#9CA3AF]">
                  {label}
                </span>

                <span className="text-xs text-white">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <h2 className="text-[16px] font-extrabold uppercase">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="shrink-0 text-sm font-bold text-[#ccff00]">
                    {index + 1}.
                  </span>

                  <p className="text-sm leading-5 text-white/60">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-7 flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={handleAddToPlan}
              disabled={!hydrated || (planIds.length >= 5 && !alreadyInPlan)}
              className={`inline-flex min-w-0 w-fit items-center justify-center gap-1 rounded-[12px] px-1.5 py-2 text-xs font-black transition sm:gap-2 sm:px-4 sm:text-sm ${
                alreadyInPlan
                  ? "cursor-not-allowed border border-[#ccff00]/30 bg-[#1E2330] text-[#ccff00] opacity-40"
                  : "bg-[#ccff00] text-black hover:bg-[#d8ff33]"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <LuCalendarPlus size={16} />
              {alreadyInPlan ? "In today's plan ✓" : "Add to today's plan"}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!hydrated}
              className={`inline-flex min-w-0 w-fit items-center justify-center gap-1 rounded-[12px] px-1.5 py-2 text-xs font-bold transition sm:gap-2 sm:px-6 sm:text-sm ${
                alreadySaved
                  ? "cursor-not-allowed border border-white/15 bg-[#1E2330] text-white/60 opacity-40"
                  : "border border-white/15 text-white hover:border-white/40"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <LuBookmark size={16} />
              {alreadySaved ? "Saved ✓" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
