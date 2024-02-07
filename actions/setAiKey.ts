"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";

export const setAiKey = async (formData: FormData) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";

  const response = await fetch(`${APIBACKEND}/update_user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      openai_api_key: formData.get("openai_api_key"),
    }),
  });
  const user = await db.user.update({
    where: { id: session?.user.id },
    data: { openai_api_key: formData.get("openai_api_key") as string },
  });
  const responseData = await response.json();
  if (responseData.status == "error") {
    console.error(responseData.message);
    throw new Error(`${responseData.message}`);
  }
  if (!user) {
    throw new Error(`user not found`);
  }
  revalidateTag("user");
  return { message: "AI Key Added Successfully" };
};
