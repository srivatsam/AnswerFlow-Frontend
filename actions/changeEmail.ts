"use server";
import db from "@/utils/db";
import { getUserById } from "@/utils/dbFunctions/user";
import { auth } from "@/auth";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";

export const changeEmail = async (e: FormData) => {
  const session = await auth();
  const userId = session?.user.id;

  const exitUser = await getUserById(userId!);

  if (!exitUser) {
    console.error(`ERROR FROM SERVER user not found`);
    return { error: `User Not Found!` };
  }
  if (exitUser) {
    try {
      await db.user.update({
        where: { id: exitUser.id },
        data: { email: e.get("email") as string },
      });
    } catch (error) {
      console.error(`ERROR FROM SERVER :${error}`);
      return { error: getErrorMessage(error) };
    }
    return { success: "Email Updated Successfully" };
  }
};
