import React from "react";

import { getBillingInfo } from "@/actions/getBillingInfo";
import { getUserData } from "@/actions/getUserData";
import { ProfileForm } from "../_components/ProfileForm";

export default async function Profile() {
  const billingInfo = await getBillingInfo();
  const userInfo = await getUserData();
  try {
    if (billingInfo && userInfo) {
      return (
        <div className="flex flex-col bg-[rgb(19,19,19)] rounded-[10px] p-4 lg:p-12 gap-4 lg:gap-10 justify-start items-start w-full lg:w-[600px]">
          <h1 className="text-[28px] font-bold">Profile Settings</h1>
          <ProfileForm
            userInfo={userInfo}
            billingInfo={billingInfo.billingInfo!}
          />
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
