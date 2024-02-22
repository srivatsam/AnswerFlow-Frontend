"use server";

import { auth } from "@/auth";
import db from "@/utils/db";
import { revalidateTag } from "next/cache";

export const setUserName = async (formData: FormData) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";

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
    return { success: "User Updated Successfully" };
  } else {
    return { error: "something went wrong" };
  }
};
