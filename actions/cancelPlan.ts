"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const cancelPlan = async () => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  const responseStripe = await fetch(
    `${APIBACKEND}/payment/cancel_subscription/${userId}`,
    {
      method: "GET",
    }
  );
  const responseStripeData = await responseStripe.json();
  if (responseStripeData.status == "error") {
    console.error(responseStripeData.message);
    throw new Error(`${responseStripeData.message}`);
  }
  console.log(responseStripeData);
  return responseStripe;
};
