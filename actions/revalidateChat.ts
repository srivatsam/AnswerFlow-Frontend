"use server";
import { revalidateTag } from "next/cache";

export const revalidateChat = () => {
  revalidateTag("chatsTitle");
  revalidateTag("chat");
};
