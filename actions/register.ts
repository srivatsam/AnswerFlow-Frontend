"use server";

import { getUserByEmail } from "@/utils/dbFunctions/user";
import { RegisterSchema } from "@/schemas";

import { z } from "zod";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import { login } from "./login";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validations = RegisterSchema.safeParse(values);
  if (!validations.success) {
    console.error(`ERROR FROM SERVER Invalid Inputs`);
    return new Error("Invalid Inputs");
  }
  const { email, password } = validations.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exitUser = await getUserByEmail(email);
  if (exitUser) {
    console.error(`ERROR FROM SERVER Email taken`);
    return new Error("Email taken");
  }
  try {
    await db.user.create({
      data: { email, password: hashedPassword },
    });

    await login({ email, password });
  } catch (error) {
    console.error(`${error}`);
    return new Error("Email taken");
  }
  return { success: "User Created Successfully" };
};
