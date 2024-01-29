"use server";

import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const deleteBot = async (botId: string) => {
  const response = await fetch(`${APIBACKEND}/delete_bot/${botId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "error") {
    console.log(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  revalidateTag("bots");
  return { success: "Bot Created Successfully", data: responseData };
};
