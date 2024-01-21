"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
export const getUserPlan = async () => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  try {
    const response = await fetch(`${APIBACKEND}/get_user/${userId}`, {
      method: "GET",
    });
    const responseData = await response.json();
    if (responseData.status != "success") {
      throw new Error(`HTTP error! Status: ${responseData.status}`);
    }
    return { success: "get user plan", userPlan: responseData.user.plan.name };
  } catch (error) {
    console.error(error);
    return { error: "can`t get user plan" };
  }
};
