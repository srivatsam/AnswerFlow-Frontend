"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const createBot = async (formData: FormData) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  try {
    const response = await fetch(`${APIBACKEND}/create_bot/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("botName"),
        system_prompt: formData.get("botPurpose"),
        tone: formData.get("toneOfVoice"),
      }),
    });

    const responseData = await response.json();
    if (responseData.status == "error") {
      throw new Error(`${responseData.message}`);
    }
    return { success: "Bot Created Successfully", data: responseData };
  } catch (error) {
    return { error: "Something Sent Wrong" };
  }
};
