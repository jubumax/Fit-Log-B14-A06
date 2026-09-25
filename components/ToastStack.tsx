"use client";

import { CheckCircle2 } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function ToastStack() {
  const { toasts } = usePlan();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:right-6 sm:left-auto">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-surface2 px-4 py-3 text-sm text-white shadow-xl shadow-black/40 animate-toast-in"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
