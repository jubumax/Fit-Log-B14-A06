import type { Metadata } from "next";

import PlanClient from "@/components/plan/PlanClient";

export const metadata: Metadata = {
  title: "My Plan",
};

export default function MyPlanPage() {
  return <PlanClient />;
}
