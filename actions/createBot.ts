"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";
export const createBot = async (formData: FormData) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
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

  console.log(responseData);
  if (responseData.status == "error") {
    console.log(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  revalidateTag("bot");
  return { success: "Bot Created Successfully", data: responseData };
};
