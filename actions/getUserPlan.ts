"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
export const getUserPlan = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
  try {
    const response = await fetch(`${APIBACKEND}/get_user/${userId}`, {
      method: "GET",
      next: { tags: ["userPlan"] },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status != "success") {
      throw new Error(`HTTP error! Status: ${responseData.status}`);
    }
    if (responseData.user.plan !== null) {
      return {
        success: "get user plan",
        userPlan: responseData.user.plan.name,
      };
    } else {
      return {
        success: "get user plan",
        userPlan: undefined,
      };
    }
  } catch (error) {
    console.error(error);
    return { error: "can`t get user plan" };
  }
};
