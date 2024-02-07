"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const getPastChat = async (botId: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
  try {
    const response = await fetch(
      `${APIBACKEND}/get_history_titles/${userId}/${botId}`,
      {
        method: "GET",
        next: { tags: ["chatsTitle"] },
      }
    );
    const data = await response.json();

    console.log(data);
    if (data.status == "error") {
      throw new Error(`${data.message}`);
    }
    return data.history;
  } catch (error) {
    console.error(error);
    return null;
  }
};
