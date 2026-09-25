export default function Loading() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:pt-8 lg:pb-16">
      {/* Back link */}
      <div className="mb-8 h-5 w-32 animate-pulse rounded bg-white/10" />

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Image */}
        <div className="aspect-square animate-pulse overflow-hidden rounded-3xl border border-[#272b33] bg-[#15171c]" />

        {/* Content */}
        <div>
          {/* Title */}
          <div className="h-10 w-3/4 animate-pulse rounded bg-white/10 sm:h-12" />

          {/* Description */}
          <div className="mt-5 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
          </div>

          {/* Muscle groups */}
          <div className="mb-4 mt-4 flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
          </div>

          {/* Workout information */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#272b33] bg-[#1E2330]">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-3 py-2.5 ${
                  index !== 6 ? "border-b border-[#272b33]" : ""
                }`}
              >
                <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-7">
            <div className="h-5 w-28 animate-pulse rounded bg-white/10" />

            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex gap-3">
                  <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-white/10" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="h-10 w-48 animate-pulse rounded-[12px] bg-white/10" />
            <div className="h-10 w-36 animate-pulse rounded-[12px] bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
