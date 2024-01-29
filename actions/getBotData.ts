"use server";
import { APIBACKEND } from "@/utils/constData";

export const getBotData = async (botId: string) => {
  try {
    const response = await fetch(`${APIBACKEND}/get_bot/${botId}`, {
      method: "GET",
      next: { tags: ["bot"] },
    });
    const data = await response.json();

    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    }
    return data.bot;
  } catch (error) {
    console.error(error);
    return null;
  }
};
