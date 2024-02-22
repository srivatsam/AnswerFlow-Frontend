"use server";

import { APIBACKEND } from "@/utils/constData";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";
import { revalidateTag } from "next/cache";

export const deleteChat = async (chatID: string) => {
  try {
    const response = await fetch(`${APIBACKEND}/delete_history/${chatID}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.status == "error") {
      return { error: `${data.message}` };
    } else {
      revalidateTag("chatsTitle");
      return { success: "Chat Deleted Successfully" };
    }
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
