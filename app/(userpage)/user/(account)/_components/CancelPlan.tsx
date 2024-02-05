"use client";
import { cancelPlan } from "@/actions/cancelPlan";
import React from "react";

export function CancelPlan() {
  return (
    <button
      onClick={() => cancelPlan()}
      className="text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 "
    >
      Cancel Subscription
    </button>
  );
}
