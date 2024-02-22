"use server";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const getHistoryAction = async (chatId: string) => {
  try {
    const response = await fetch(`${APIBACKEND}/get_history/${chatId}`, {
      method: "GET",
      next: { tags: ["chat"] },
    });
    const data = await response.json();

    console.log(data.history);
    if (data.status == "error") {
      return { error: `${data.message}` };
    } else {
      return data.history;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
