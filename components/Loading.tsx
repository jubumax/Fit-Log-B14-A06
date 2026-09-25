export function LoadingLibrary() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">

      <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
      
      <p className="text-sm text-muted">Loading workouts…</p>

    </div>
  );
}


export function LoadingPlan() {

  return (
    <div className="flex items-center justify-center gap-3 py-12 text-sm text-muted">
      
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-accent" />
      Loading workouts…
      
    </div>
  );
}
