import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WorkoutDetails from "@/components/details/WorkoutDetails";
import { getWorkoutById } from "@/lib/api";

export const metadata: Metadata = {
  title: "Details",
};

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workoutId = Number(id);

  if (!Number.isInteger(workoutId)) {
    notFound();
  }

  const workout = await getWorkoutById(workoutId);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}
