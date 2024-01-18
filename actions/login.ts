"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validations = LoginSchema.safeParse(values);
  if (!validations.success) {
    return { error: "Invalid Inputs" };
  }
  const { email, password } = validations.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/setup" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email or Password is Wrong" };

        default:
          return { error: "Something went Wrong" };
      }
    }
  }
  return { success: "Login Successfully" };
};
