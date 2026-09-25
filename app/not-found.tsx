import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface2 text-accent">
        <Dumbbell className="h-7 w-7" />
      </span>
      <p className="font-display text-6xl text-accent">404</p>
      <h1 className="font-display text-2xl uppercase text-white sm:text-3xl">
        This set isn&apos;t on the board
      </h1>
      <p className="max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Head back
        to the library and pick a lift instead.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink"
      >
        Back to workouts
      </Link>
    </section>
  );
}
