"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        hideProgressBar
        toastClassName="text-sm"
        style={{ width: "320px" }}
      />
    </PlanProvider>
  );
}
