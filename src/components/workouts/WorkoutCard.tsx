import Image from "next/image";
import Link from "next/link";

import { Workout } from "@/types/workout";
import WorkoutStats from "./WorkoutStats";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#25282f] bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#101114]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="display-font text-2xl font-bold uppercase">
          {workout.name}
        </h3>

        <p className="mt-2 line-clamp-1 text-sm text-white/45">
          {workout.equipment}
        </p>

        <div className="mt-5">
          <WorkoutStats
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}