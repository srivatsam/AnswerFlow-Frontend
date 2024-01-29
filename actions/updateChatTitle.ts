"use server";

import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const updateChatTitle = async (chatID: string, name: string) => {
  try {
    const response = await fetch(
      `${APIBACKEND}/update_history_title/${chatID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
        }),
      }
    );
    const data = await response.json();

    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    }
    revalidateTag("chatsTitle");
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
