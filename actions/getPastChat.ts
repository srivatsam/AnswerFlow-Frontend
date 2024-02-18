"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const getPastChat = async (botId: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
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
    } else {
      return data.history;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
