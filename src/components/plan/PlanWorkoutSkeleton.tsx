export default function PlanWorkoutSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#272b33] bg-[#15171c] p-4 sm:flex-row sm:items-center">
      {/* Image */}
      <div className="h-28 w-full shrink-0 animate-pulse rounded-xl bg-white/10 sm:w-40" />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="h-7 w-2/3 animate-pulse rounded bg-white/10" />

        <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-white/10" />

        <div className="mt-4 flex gap-4">
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="h-9 w-28 animate-pulse rounded-full bg-white/10" />
        <div className="size-9 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
}
