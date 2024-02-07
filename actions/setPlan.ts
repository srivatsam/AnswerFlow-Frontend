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
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
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
      await db.billingInfo.create({ data: billingData });
    } catch (error) {
      console.error(error);
      return null;
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
          success_page:
            "http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/payment/success",
          cancel_page:
            "http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com",
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
      throw null;
    }

    revalidateTag("userPlan");
    return {
      success: "Set The Plan Successfully",
      url: responseStripeData.url,
    };
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return;
  }
};
