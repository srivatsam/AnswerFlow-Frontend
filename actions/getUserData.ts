"use server";

import { auth } from "@/auth";
import { getUserById } from "@/utils/dbFunctions/user";
import { revalidatePath } from "next/cache";

export const getUserData = async () => {
  const session = await auth();
  const exitUser = await getUserById(session?.user.id as string);
  revalidatePath("/user/profile");
  if (!exitUser) {
    console.error(`Not authorized`);
    return null;
  } else {
    return exitUser;
  }
};
