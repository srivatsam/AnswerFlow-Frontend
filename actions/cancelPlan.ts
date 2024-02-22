"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const cancelPlan = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
  const responseStripe = await fetch(
    `${APIBACKEND}/payment/cancel_subscription/${userId}`,
    {
      method: "GET",
    }
  );
  const responseStripeData = await responseStripe.json();
  if (responseStripeData.status == "error") {
    console.error(responseStripeData.message);
    return { error: `${responseStripeData.message}` };
  } else {
    console.log(responseStripeData);
    return responseStripeData;
  }
};
