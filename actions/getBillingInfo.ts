"use server";

import { auth } from "@/auth";
import db from "@/utils/db";
import { getUserById } from "@/utils/dbFunctions/user";

export const getBillingInfo = async () => {
  const session = await auth();
  const exitUser = await getUserById(session?.user.id as string);
  if (!exitUser) {
    console.error(`Not authorized`);
    return null;
  }
  try {
    const billingInfo = await db.billingInfo.findUnique({
      where: { userId: exitUser.id },
    });
    return {
      success: "billingInfo fetched successfully",
      billingInfo,
    };
  } catch (error) {
    console.error(`ERROR FROM SERVER :${error}`);
    return null;
  }
};
