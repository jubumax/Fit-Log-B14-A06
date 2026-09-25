"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PlanEntry, Workout } from "@/lib/types";


const STORAGE_KEY = "fitlog:entries";
const PLAN_CAP = 5;

interface ToastItem {
  id: number;
  message: string;
}

interface PlanContextValue {
  planItems: PlanEntry[];
  savedItems: PlanEntry[];
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeEntry: (id: number, status: "plan" | "saved") => void;
  markDone: (id: number) => void;
  planCount: number;
  savedCount: number;
  planFull: boolean;
  toasts: ToastItem[];
  showToast: (message: string) => void;
  hydrated: boolean
}


const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<PlanEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // storage full or unavailable (ignore)
    }
  }, [entries, hydrated]);


  const showToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const planItems = useMemo(
    () => entries.filter((e) => e.status === "plan").sort((a, b) => a.addedAt - b.addedAt),
    [entries]
  );
  const savedItems = useMemo(
    () => entries.filter((e) => e.status === "saved").sort((a, b) => a.addedAt - b.addedAt),
    [entries]
  );

  const isInPlan = useCallback(
    (id: number) => entries.some((e) => e.workout.id === id && e.status === "plan"),
    [entries]
  );
  const isSaved = useCallback(
    (id: number) => entries.some((e) => e.workout.id === id && e.status === "saved"),
    [entries]
  );


  const addToPlan = useCallback(
    (workout: Workout) => {
      if (isInPlan(workout.id)) {
        showToast(`${workout.name} is already in today's plan`);
        return;
      }
      if (planItems.length >= PLAN_CAP) {
        showToast("Today's plan is full — finish a lift or remove one first");
        return;
      }
      setEntries((prev) => [
        ...prev,
        { workout, status: "plan", done: false, addedAt: Date.now() },
      ]);
      showToast("Added to today's plan");
    },
    [isInPlan, planItems.length, showToast]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      if (isSaved(workout.id)) {
        showToast(`${workout.name} is already saved`);
        return;
      }
      setEntries((prev) => [
        ...prev,
        { workout, status: "saved", done: false, addedAt: Date.now() },
      ]);
      showToast("Saved for later");
    },
    [isSaved, showToast]
  );

  const removeEntry = useCallback(
    (id: number, status: "plan" | "saved") => {
      setEntries((prev) => prev.filter((e) => !(e.workout.id === id && e.status === status)));
      showToast(status === "plan" ? "Removed from today's plan" : "Removed from saved");
    },
    [showToast]
  );

  const markDone = useCallback(
    (id: number) => {
      setEntries((prev) =>
        prev.map((e) => (e.workout.id === id && e.status === "plan" ? { ...e, done: !e.done } : e))
      );
      const entry = entries.find((e) => e.workout.id === id && e.status === "plan");
      showToast(entry && !entry.done ? "Marked as done" : "Marked as not done");
    },
    [entries, showToast]
  );

  const value: PlanContextValue = {
    planItems,
    savedItems,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    removeEntry,
    markDone,
    planCount: planItems.length,
    savedCount: savedItems.length,
    planFull: planItems.length >= PLAN_CAP,
    toasts,
    showToast,
    hydrated,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}


export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}

export const PLAN_CAP_SIZE = PLAN_CAP;
