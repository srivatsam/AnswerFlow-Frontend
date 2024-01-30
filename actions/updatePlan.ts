"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const updatePlan = async (plan: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clrzn68tz0000pckk65117wnz";
  const planId = plan == "pro" ? "3" : plan == "starter" ? "2" : "1";

  if (userId) {
    const response = await fetch(`${APIBACKEND}/set_plan/${userId}/${planId}`, {
      method: "PUT",
    });

    const responseData = await response.json();

    if (responseData.status === "error") {
      console.error(responseData.message);
      throw new Error(`ERROR FROM SERVER :${responseData.message}`);
    }

    revalidateTag("userPlan");
    return { success: "Set The Plan Successfully" };
  } else {
    console.error(`ERROR FROM SERVER :You are not authorized`);
    return new Error("You are not authorized");
  }
};
