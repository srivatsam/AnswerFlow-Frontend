"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { getUserPlan } from "./getUserPlan";
export const getUserBots = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
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
    }
    return {
      success: "get user plan",
      bots: responseData.bots,
      userPlan: userPlan,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
