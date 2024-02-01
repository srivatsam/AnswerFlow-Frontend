"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";

export const setUserName = async (formData: FormData) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clrzn68tz0000pckk65117wnz";

  if (formData.get("firstName") && formData.get("lastName")) {
    await db.user.update({
      where: { id: session?.user.id },
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        image: formData.get("image") as string,
      },
    });
    revalidateTag("user");
    return { success: "AI Key Added Successfully" };
  } else {
    throw new Error(`ERROR FROM SERVER :AI Key  not found `);
  }
};
