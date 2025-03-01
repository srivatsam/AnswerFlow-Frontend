"use server";
import { auth } from "@/auth";
import db from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { setUserName } from "./setUserName";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";

export const updateInfo = async (formData: FormData) => {
  const session = await auth();
  const userId = true ? session?.user.id : "clrzn68tz0000pckk65117wnz";

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
      await db.billingInfo.update({ where: { userId }, data: billingData });
      await setUserName(formData);
      revalidateTag("billingInfo");
      return { success: "Updated Billing Info Successfully" };
    } catch (error) {
      console.error(error);
      return { error: `${getErrorMessage(error)}` };
    }
  } else {
    console.error(`You are not authorized`);
    return { error: `You are not authorized` };
  }
};
