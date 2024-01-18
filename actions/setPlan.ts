"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";

export const setPlan = async (formData: FormData, planFromLocal: string) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  const planId =
    planFromLocal == "pro" ? "3" : planFromLocal == "starter" ? "2" : "1";

  if (formData && userId) {
    const billingData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      city: formData.get("city") as string,
      company: formData.get("company") as string,
      country: formData.get("country") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      pinCode: formData.get("pinCode") as string,
      email: formData.get("email") as string,
      userId: session?.user.id as string,
    };

    try {
      await db.billingInfo.create({ data: billingData });
    } catch (error) {
      return { error: "Something went Wrong Id Should be Uniq" };
    }

    try {
      const response = await fetch(
        `${APIBACKEND}/set_plan/${userId}/${planId}`,
        {
          method: "PUT",
        }
      );

      const responseData = await response.json();

      if (responseData.status === "error") {
        throw new Error(responseData.message);
      }

      return { success: "Set The Plan Successfully" };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  }

  return { error: "You are not authorized" };
};
