"use server";

import { getUserByEmail } from "@/utils/dbFunctions/user";
import { RegisterSchema } from "@/schemas";

import { z } from "zod";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import { login } from "./login";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validations = RegisterSchema.safeParse(values);
  if (!validations.success) {
    console.error(`ERROR FROM SERVER Invalid Inputs`);
    return { error: "Invalid Inputs" };
  }
  const { email, password } = validations.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exitUser = await getUserByEmail(email);
  if (exitUser) {
    console.error(`ERROR FROM SERVER Email taken`);
    return { error: "Email taken" };
  }
  try {
    await db.user.create({
      data: { email, password: hashedPassword },
    });
    await login({ email, password });
  } catch (error) {
    console.error(`${error}`);
    return { error: getErrorMessage(error) };
  }
  return { success: "User Created Successfully" };
};
