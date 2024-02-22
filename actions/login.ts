"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getErrorMessage } from "@/utils/errorHandle/getErrorMessage";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validations = LoginSchema.safeParse(values);
  if (!validations.success) {
    console.error(`ERROR FROM SERVER Invalid Inputs`);
    return { error: `Invalid Inputs` };
  }
  const { email, password } = validations.data;
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.error(`${error}`);
          return { error: getErrorMessage(error) };

        default:
          console.error(`${error}`);
          return { error: getErrorMessage(error) };
      }
    }
  }
  return { success: `User Login Successfully` };
};
