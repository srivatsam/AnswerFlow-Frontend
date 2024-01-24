import { planNameType } from "@/types/plan";
import { create } from "zustand";
type planType = {
  plan: planNameType;
  method: "monthly" | "annual";
  setPlan: (value: {
    plan: planNameType;
    method: "monthly" | "annual";
  }) => void;
};
export const usePlan = create<planType>((set) => ({
  plan: "basic",
  method: "monthly",
  setPlan: ({ plan, method }) => {
    set({ plan: plan, method: method });
  },
}));
