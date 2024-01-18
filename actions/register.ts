"use server";

import { RegisterSchema } from "@/schemas";
import db from "@/utils/db";
import { z } from "zod";

import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/utils/dbFunctions/user";
import { APIBACKEND } from "@/utils/constData";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validations = RegisterSchema.safeParse(values);
  if (!validations.success) {
    return { error: "Invalid Inputs" };
  }
  const { name, email, password } = validations.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exitUser = await getUserByEmail(email);
  if (exitUser) {
    return { error: "Email taken" };
  }
  await db.user.create({ data: { name, email, password: hashedPassword } });

  // const res = await fetch(`${APIBACKEND}/create_user`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     name: name,
  //     email: email,
  //     pwd: hashedPassword,
  //     phone: "011",
  //   }),
  // });
  // const data = await res.json();
  // if (data.status == "error") {
  //   return { error: "Email Taken" };
  // }

  return { success: "User Created Successfully" };
};
