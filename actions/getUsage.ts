"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
export const getUserUsage = async () => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  try {
    const response = await fetch(`${APIBACKEND}/usage/${userId}`, {
      method: "GET",
      next: { tags: ["userPlan"] },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status != "success") {
      throw new Error(`${responseData.status}`);
    }
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
