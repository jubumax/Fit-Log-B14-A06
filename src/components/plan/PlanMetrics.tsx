type PlanMetricsProps = {
  exercises: number;
  minutes: number;
  calories: number;
};

export default function PlanMetrics({
  exercises,
  minutes,
  calories,
}: PlanMetricsProps) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#272b33] bg-[#15171c]">
      <div className="border-r border-[#272b33] p-5 text-center">
        <p className="display-font text-3xl font-bold text-[#ccff00]">
          {exercises}
        </p>

        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
          Exercises
        </p>
      </div>

      <div className="border-r border-[#272b33] p-5 text-center">
        <p className="display-font text-3xl font-bold">{minutes}</p>

        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
          Minutes
        </p>
      </div>

      <div className="p-5 text-center">
        <p className="display-font text-3xl font-bold">{calories}</p>

        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
          Calories
        </p>
      </div>
    </div>
  );
}
