"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { getUserPlan } from "./getUserPlan";
export const getUserBots = async () => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  console.log("userId", userId);
  const userPlan = (await getUserPlan()).userPlan;
  console.log(userPlan);
  try {
    const response = await fetch(`${APIBACKEND}/get_bots/${userId}`, {
      method: "GET",
    });
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.status != "success") {
      throw new Error(`HTTP error! Status: ${responseData.status}`);
    }
    return {
      success: "get user plan",
      bots: responseData.bots,
      userPlan: userPlan,
    };
  } catch (error) {
    console.error(error);
    return { error: "can`t get user plan" };
  }
};
