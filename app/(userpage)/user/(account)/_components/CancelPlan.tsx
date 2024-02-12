"use client";
import { cancelPlan } from "@/actions/cancelPlan";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

export function CancelPlan() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onPlanCancel = () => {
    startTransition(() => {
      const setPlanPromise = cancelPlan().then((data) => {
        router.push("/payment");
      });
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Plan Cancel Successfully",
        error: (error) => `${error.message}`,
      });
    });
  };
  return (
    <button
      disabled={isPending}
      onClick={onPlanCancel}
      className={`text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 ${
        isPending && "cursor-not-allowed opacity-40"
      }`}
    >
      Cancel Subscription
    </button>
  );
}
