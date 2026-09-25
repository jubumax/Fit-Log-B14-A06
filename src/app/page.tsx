import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import WorkoutLibrary from "@/components/home/WorkoutLibrary";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkoutLibrary />
    </>
  );
}
