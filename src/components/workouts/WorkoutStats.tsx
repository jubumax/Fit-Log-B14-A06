import { LuClock3, LuFlame, LuStar } from "react-icons/lu";

type WorkoutStatsProps = {
  duration: number;
  calories: number;
  rating: number;
};

export default function WorkoutStats({
  duration,
  calories,
  rating,
}: WorkoutStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-white/55">
      <span className="flex items-center gap-1.5">
        <LuClock3 size={14} />
        {duration} min
      </span>

      <span className="flex items-center gap-1.5">
        <LuFlame size={14} />
        {calories} kcal
      </span>

      <span className="flex items-center gap-1.5">
        <LuStar size={14} />
        {rating}
      </span>
    </div>
  );
}