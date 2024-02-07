"use server";

import { auth } from "@/auth";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";

export const setUserName = async (formData: FormData) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";

  if (formData.get("firstName") && formData.get("lastName")) {
    await db.user.update({
      where: { id: session?.user.id },
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        image: formData.get("image") as string,
      },
    });
    revalidateTag("userData");
    return { success: "user updated Successfully" };
  } else {
    throw new Error(`something went wrong`);
  }
};
