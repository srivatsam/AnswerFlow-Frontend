"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { getUserPlan } from "./getUserPlan";
export const getUserBots = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
  console.log("userId", userId);
  const userPlan = (await getUserPlan()).userPlan;
  console.log(userPlan);
  try {
    const response = await fetch(`${APIBACKEND}/get_bots/${userId}`, {
      method: "GET",
      next: { tags: ["bots"] },
    });
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.status != "success") {
      throw new Error(`${responseData.status}`);
    } else {
      return {
        success: "get user plan",
        bots: responseData.bots,
        userPlan: userPlan,
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
