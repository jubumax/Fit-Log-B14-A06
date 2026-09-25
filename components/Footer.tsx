import { Dumbbell } from "lucide-react";


export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">

          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-ink">
            <Dumbbell className="h-4 w-4" strokeWidth={2.5} />
          </span>
          
          <span className="font-display text-base tracking-wide text-white">FITLOG</span>
        </div>

        <p className="text-center text-xs text-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
        
      </div>
    </footer>
  );
}
