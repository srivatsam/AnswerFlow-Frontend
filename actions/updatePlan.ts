"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";
export const updatePlan = async (plan: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
  const planId = plan == "pro" ? "3" : plan == "starter" ? "2" : "1";

  if (userId) {
    // const response = await fetch(`${APIBACKEND}/set_plan/${userId}/${planId}`, {
    //   method: "PUT",
    // });
    const responseStripe = await fetch(
      `${APIBACKEND}/payment/change_plan/${userId}/${planId}`,
      {
        method: "GET",
      }
    );
    // const responseData = await response.json();
    const responseStripeData = await responseStripe.json();

    console.log(responseStripeData);
    if (responseStripeData.status === "error") {
      console.error(responseStripeData.message);
      return { error: responseStripeData.message };
    } else {
      revalidateTag("userPlan");
      return {
        success:
          "Plan changed successfully, your billing plan will be updated from next billing cycle.",
      };
    }
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return { error: "You are not authorized" };
  }
};
