import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";


export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">

        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-3 text-xs text-gray-300">
          
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
    </Link>
  );
}
