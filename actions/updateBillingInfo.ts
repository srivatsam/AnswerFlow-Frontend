"use server";
import { auth } from "@/auth";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";

export const updateBillingInfo = async (formData: FormData) => {
  const session = await auth();
  const userId = true ? session?.user.id : "1";

  if (formData && userId) {
    const billingData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
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
      await db.billingInfo.update({ where: { userId }, data: billingData });
      revalidateTag("billingInfo");
      return { success: "Updated Billing Info Successfully" };
    } catch (error) {
      console.error(error);
      return new Error("Something went Wrong User Should Be Uniq");
    }
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return new Error("You are not authorized");
  }
};
