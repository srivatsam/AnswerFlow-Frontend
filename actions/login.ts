"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validations = LoginSchema.safeParse(values);
  if (!validations.success) {
    console.error(`ERROR FROM SERVER Invalid Inputs`);
    return new Error("Invalid Inputs");
  }
  const { email, password } = validations.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/setup",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.error(`ERROR FROM SERVER :${error}`);
          return new Error("Email or Password is Wrong");

        default:
          console.error(`ERROR FROM SERVER :${error}`);
          return new Error("Something went Wrong");
      }
    }
  }
  return { success: "Login Successfully" };
};
