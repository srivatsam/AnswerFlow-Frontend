"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";
import { revalidateTag } from "next/cache";

export const setAiKey = async (formData: FormData) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";

  try {
    const user = await db.user.update({
      where: { id: session?.user.id },
      data: { openai_api_key: formData.get("openai_api_key") as string },
    });
    if (!user) {
      return { error: "user not found" };
    }
  } catch (error) {
    return { error: `${getErrorMessage(error)}` };
  }

  const response = await fetch(`${APIBACKEND}/update_user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      openai_api_key: formData.get("openai_api_key"),
    }),
  });
  const responseData = await response.json();
  if (responseData.status == "error") {
    console.error(responseData.message);
    return { error: `${responseData.message}` };
  } else {
    revalidateTag("user");
    return { success: "AI Key Added Successfully" };
  }
};
