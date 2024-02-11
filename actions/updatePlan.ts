"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";
export const updatePlan = async (plan: string) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  const planId = plan == "pro" ? "3" : plan == "starter" ? "2" : "1";

  if (userId) {
    const response = await fetch(`${APIBACKEND}/set_plan/${userId}/${planId}`, {
      method: "PUT",
    });
    const responseStripe = await fetch(
      `${APIBACKEND}/payment/change_plan/${userId}/${planId}`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    const responseStripeData = await responseStripe.json();

    console.log(responseStripeData);
    if (responseData.status === "error") {
      console.error(responseData.message);
      return { status: "error", message: responseData.message };
    }

    revalidateTag("userPlan");
    return { success: "Set The Plan Successfully" };
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return { status: "error", message: "You are not authorized" };
  }
};
