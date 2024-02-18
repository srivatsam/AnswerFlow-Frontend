"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const getBillings = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
  const responseStripe = await fetch(
    `${APIBACKEND}/payment/invoices/${userId}`,
    {
      method: "GET",
    }
  );
  const responseStripeData = await responseStripe.json();
  console.log(responseStripeData);
  if (responseStripeData.status === "error") {
    return null;
  } else {
    return responseStripeData.invoices;
  }
};
