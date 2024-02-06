"use client";
import { cancelPlan } from "@/actions/cancelPlan";
import React, { useTransition } from "react";
import { toast } from "sonner";

export function CancelPlan() {
  const [isPending, startTransition] = useTransition();
  const onPlanCancel = () => {
    startTransition(() => {
      const setPlanPromise = cancelPlan();
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Plan Seated Successfully",
        error: "Something Went Wrong",
      });
    });
  };
  return (
    <button
      onClick={onPlanCancel}
      className="text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 "
    >
      Cancel Subscription
    </button>
  );
}
