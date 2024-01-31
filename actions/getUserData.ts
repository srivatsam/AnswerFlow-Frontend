"use server";

import { auth } from "@/auth";
import { getUserById } from "@/utils/dbFunctions/user";

export const getUserData = async () => {
  const session = await auth();
  const exitUser = await getUserById(session?.user.id as string);
  if (!exitUser) {
    console.error(`Not authorized`);
    return new Error("Something Went Wrong Try Again");
  } else {
    return exitUser;
  }
};
