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

  if (formData.get("openai_api_key")) {
    const response = await fetch(`${APIBACKEND}/update_user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openai_api_key: formData.get("openai_api_key"),
      }),
    });
    await db.user.update({
      where: { id: session?.user.id },
      data: { openai_api_key: formData.get("openai_api_key") as string },
    });
    const responseData = await response.json();
    // console.log(responseData);
    if (responseData.status == "error") {
      console.error(responseData.message);
      throw new Error(`ERROR FROM SERVER :${responseData.message}`);
    }
    revalidateTag("user");
    return { success: "AI Key Added Successfully" };
  } else {
    throw new Error(`ERROR FROM SERVER :AI Key  not found `);
  }
};
