"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";
import { setUserName } from "./setUserName";

export const setPlan = async (formData: FormData, planFromLocal: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
  const planId =
    planFromLocal == "pro" ? "3" : planFromLocal == "starter" ? "2" : "1";

  if (formData && userId) {
    const billingData = {
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      company: formData.get("company") as string,
      address: formData.get("address") as string,
      country: formData.get("country") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      phoneCode: formData.get("phoneCode") as string,
      pinCode: formData.get("pinCode") as string,
      userId: session?.user.id as string,
    };

    try {
      await setUserName(formData);
      await db.billingInfo.create({ data: billingData });
    } catch (error) {
      console.error(error);
      return new Error("Something went Wrong User Should Be Uniq");
    }

    const response = await fetch(`${APIBACKEND}/set_plan/${userId}/${planId}`, {
      method: "PUT",
    });

    const responseData = await response.json();

    if (responseData.status === "error") {
      console.error(responseData.message);
      throw new Error(`ERROR FROM SERVER :${responseData.message}`);
    }

    revalidateTag("userPlan");
    return { success: "Set The Plan Successfully" };
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return new Error("You are not authorized");
  }
};
