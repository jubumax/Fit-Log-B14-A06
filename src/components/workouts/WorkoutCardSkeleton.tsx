export default function WorkoutCardSkeleton() {
  return (
    <div className="group block overflow-hidden rounded-2xl border border-[#25282f] bg-[#15171c]">
      {/* Image */}
      <div className="aspect-[16/9] animate-pulse bg-white/10" />

      <div className="p-5">
        {/* Muscle tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-white/10" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-white/10" />
        </div>

        {/* Title */}
        <div className="h-7 w-3/4 animate-pulse rounded bg-white/10" />

        {/* Equipment */}
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-white/10" />

        {/* Stats */}
        <div className="mt-5 flex gap-4">
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
