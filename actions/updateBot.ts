"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const updateBot = async (formData: FormData, botId: string) => {
  console.log(formData, botId);
  const session = await auth();
  // const userId = process.env.NODE_ENV == "production" ? session?.user.id : "clrzn68tz0000pckk65117wnz";
  const response = await fetch(`${APIBACKEND}/update_bot/${botId}`, {
    method: "PUT",
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
    return { error: `${responseData.message}` };
  } else {
    revalidateTag("bot");
    return { success: "Bot Updated Successfully", data: responseData };
  }
};
