"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const setAiKey = async (formData: FormData) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  try {
    const response = await fetch(`${APIBACKEND}/update_user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openai_api_key: formData.get("aiKey"),
      }),
    });

    const responseData = await response.json();
    // console.log(responseData);
    if (responseData.status == "error") {
      throw new Error(`${responseData.message}`);
    }
    return { success: "AI Key Added Successfully" };
  } catch (error) {
    return { error: "Something Sent Wrong" };
  }
};
