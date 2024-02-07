"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const getBillings = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
  const responseStripe = await fetch(
    `${APIBACKEND}/payment/invoices/${userId}`,
    {
      method: "GET",
    }
  );
  const responseStripeData = await responseStripe.json();
  console.log(responseStripeData);
  return responseStripe;
};
