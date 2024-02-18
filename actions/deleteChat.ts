"use server";

import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const deleteChat = async (chatID: string) => {
  try {
    const response = await fetch(`${APIBACKEND}/delete_history/${chatID}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    } else {
      revalidateTag("chatsTitle");
      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
