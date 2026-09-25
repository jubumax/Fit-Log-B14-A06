"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ActionResult = "added" | "exists" | "limit";

type SaveResult = "saved" | "exists";

type PlanContextType = {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  hydrated: boolean;

  addToPlan: (id: number) => ActionResult;
  removeFromPlan: (id: number) => void;

  saveForLater: (id: number) => SaveResult;
  removeFromSaved: (id: number) => void;

  markDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | null>(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

function readIds(key: string): number[] {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is number => typeof id === "number");
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>(() => readIds(PLAN_KEY));
  const [savedIds, setSavedIds] = useState<number[]>(() => readIds(SAVED_KEY));
  const [doneIds, setDoneIds] = useState<number[]>(() => readIds(DONE_KEY));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(PLAN_KEY, JSON.stringify(planIds));
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [planIds, savedIds, doneIds, hydrated]);

  function addToPlan(id: number): ActionResult {
    if (planIds.includes(id)) {
      return "exists";
    }

    if (planIds.length >= 5) {
      return "limit";
    }

    setPlanIds((prev) => [...prev, id]);

    return "added";
  }

  function removeFromPlan(id: number) {
    setPlanIds((prev) => prev.filter((item) => item !== id));
    setDoneIds((prev) => prev.filter((item) => item !== id));
  }
  function saveForLater(id: number): SaveResult {
    if (savedIds.includes(id)) {
      return "exists";
    }

    setSavedIds((prev) => [...prev, id]);

    return "saved";
  }

  function removeFromSaved(id: number) {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  }

  function markDone(id: number) {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function isInPlan(id: number) {
    return planIds.includes(id);
  }

  function isSaved(id: number) {
    return savedIds.includes(id);
  }

  function isDone(id: number) {
    return doneIds.includes(id);
  }

  return (
    <PlanContext.Provider
      value={{
        planIds,
        savedIds,
        doneIds,
        hydrated,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        markDone,
        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
