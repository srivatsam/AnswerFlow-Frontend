"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";
import { setUserName } from "./setUserName";
import { YourPlanType } from "@/types/plan";

export const setPlan = async (
  formData: FormData,
  planFromLocal: YourPlanType
) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  const planId =
    planFromLocal.plan == "pro"
      ? "3"
      : planFromLocal.plan == "starter"
      ? "2"
      : "1";

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
      await db.billingInfo.upsert({
        where: { userId: session?.user.id as string },
        update: billingData,
        create: billingData,
      });
    } catch (error) {
      return { status: "error", message: "Can Set Billing Info Twice" };
    }

    const response = await fetch(`${APIBACKEND}/set_plan/${userId}/${planId}`, {
      method: "PUT",
    });
    const responseData = await response.json();
    const price_id =
      planFromLocal.method == "annual"
        ? responseData.user.plan.price_y_id
        : responseData.user.plan.price_m_id;
    console.log("-----------------", price_id);

    const responseStripe = await fetch(
      `${APIBACKEND}/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: price_id,
          user_id: userId,
          email: formData.get("email"),
          name: formData.get("firstName"),
          address: {
            line1: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            postal_code: formData.get("pinCode"),
            country: formData.get("country"),
          },
          success_page: `${process.env.NEXTAUTH_URL}/payment/success`,
          cancel_page: `${process.env.NEXTAUTH_URL}`,
        }),
      }
    );
    const responseStripeData = await responseStripe.json();
    console.log(responseStripeData);

    if (
      responseData.status === "error" ||
      responseStripeData.status === "error"
    ) {
      console.error(responseData.message);
      console.error(responseStripeData.message);
      return { status: "error", message: responseData.message };
    }

    revalidateTag("userPlan");
    return {
      status: "success",
      message: "Set The Plan Successfully",
      url: responseStripeData.url,
    };
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return { status: "error", message: "You are not authorized" };
  }
};
