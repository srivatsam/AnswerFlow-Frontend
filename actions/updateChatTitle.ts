"use server";

import { APIBACKEND } from "@/utils/constData";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";
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
      return { error: `${data.message}` };
    } else {
      revalidateTag("chatsTitle");
      return { success: "Title Updated Successfully" };
    }
  } catch (error) {
    console.error(error);
    return { error: `${getErrorMessage(error)}` };
  }
};
