import React from "react";
import { BillingInfoForm } from "./BillingInfoForm";
import { getBillingInfo } from "@/actions/getBillingInfo";

export default async function Profile() {
  try {
    const billingInfo = await getBillingInfo();
    if ("billingInfo" in billingInfo && billingInfo.billingInfo) {
      return (
        <div className="flex flex-col bg-[rgb(19,19,19)] rounded-[10px] p-12 gap-10 justify-start items-start">
          <h1 className="text-[28px] font-bold">Profile Settings</h1>
          <BillingInfoForm billingInfo={billingInfo.billingInfo} />
        </div>
      );
    } else {
      console.error("Billing info not available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching billing info:", error);
  }
}
