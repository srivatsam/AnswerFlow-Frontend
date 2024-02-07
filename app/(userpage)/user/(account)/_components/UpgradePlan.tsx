"use client";
import { updatePlan } from "@/actions/updatePlan";
import React, { useTransition } from "react";
import { toast } from "sonner";

export function UpgradePlan() {
  const [isPending, startTransition] = useTransition();
  const onPlanSubmit = (planName: string) => {
    startTransition(() => {
      const setPlanPromise = updatePlan(planName);
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Plan Upgraded Successfully",
        error: (error) => `${error.message}`,
      });
    });
  };
  return (
    <button
      onClick={() => onPlanSubmit("pro")}
      className="text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 "
    >
      Upgrade ($299/month)
    </button>
  );
}
