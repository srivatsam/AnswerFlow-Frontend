"use server";

import { APIBACKEND } from "@/utils/constData";

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
  return { success: "Bot Created Successfully", data: responseData };
};
