"use client";
import { updatePlan } from "@/actions/updatePlan";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type props = {
  userPlan:
    | {
        success: string;
        userPlan: any;
        error?: undefined;
      }
    | {
        error: string;
        success?: undefined;
        userPlan?: undefined;
      };
};
export function UpgradePlan({ userPlan }: props) {
  const [isPending, startTransition] = useTransition();
  const onPlanSubmit = (planName: string) => {
    startTransition(async () => {
      const updatePlanPromise = await updatePlan(planName);
      if (updatePlanPromise.success) {
        toast.success(updatePlanPromise.success);
      }
      if (updatePlanPromise.error) {
        toast.error(updatePlanPromise.error);
      }
    });
  };
  useEffect(() => {
    if (isPending) {
      toast.loading("Loading ...!");
    }
  }, [isPending]);
  if (userPlan.userPlan !== "Pro") {
    return (
      <div className="rounded-[10px] p-6 bg-[#373737] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-medium">Upgrade plan</h3>
          <p className="text-[14px] text-[#30B616]">
            Enjoy bigger knowledgebase & number of bots
          </p>
          <button
            disabled={isPending}
            onClick={() =>
              onPlanSubmit(userPlan.userPlan === "Basic" ? "starter" : "pro")
            }
            className={`text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 ${
              isPending && "cursor-not-allowed opacity-40"
            }`}
          >
            {userPlan.userPlan == "Starter"
              ? "Upgrade ($199/month)"
              : "Upgrade ($69/month)"}
          </button>
        </div>
      </div>
    );
  } else return null;
}
