export type YourPlanType = {
  plan: planNameType;
  method: "monthly" | "annual";
};

export type planNameType = "basic" | "starter" | "pro";
