"use server";
import db from "@/utils/db";

import bcrypt from "bcryptjs";
import { getUserById } from "@/utils/dbFunctions/user";
import { auth } from "@/auth";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";

export const resetPassword = async (e: FormData) => {
  const session = await auth();
  const userId = session?.user.id;

  const exitUser = await getUserById(userId!);

  if (!exitUser) {
    console.error(`ERROR FROM SERVER user not found `);
    return { error: `User Not Found ` };
  }
  if (exitUser) {
    const isRightPassword = await bcrypt.compare(
      e.get("currentPassword") as string,
      exitUser.password!
    );
    if (!isRightPassword) {
      return { error: `Wrong Password ,Try Again` };
    }
    try {
      const hashedPassword = await bcrypt.hash(
        e.get("newPassword") as string,
        10
      );
      await db.user.update({
        where: { id: session?.user.id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      console.error(`ERROR FROM SERVER :${error}`);
      return { error: getErrorMessage(error) };
    }
    return { success: "Password Updated Successfully" };
  }
};
