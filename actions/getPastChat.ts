"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const getPastChat = async (botId: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clrzn68tz0000pckk65117wnz";
  try {
    const response = await fetch(
      `${APIBACKEND}/get_history_titles/${userId}/${botId}`,
      {
        method: "GET",
        next: { tags: ["chatsTitle"] },
      }
    );
    const data = await response.json();

    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    }
    console.log(data);
    return data.history;
  } catch (error) {
    console.error(error);
    return null;
  }
};
