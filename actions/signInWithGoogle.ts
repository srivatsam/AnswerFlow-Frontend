"use server";

import { signIn } from "@/auth";

export const signInWithGoogle = async () => {
  signIn("google", { callbackUrl: "/setup" });
};
