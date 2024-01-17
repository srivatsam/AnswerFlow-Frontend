import Credential from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./utils/dbFunctions/user";
import Google from "next-auth/providers/google";

import bcrypt from "bcryptjs";
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credential({
      async authorize(credentials) {
        const validations = LoginSchema.safeParse(credentials);
        if (validations.success) {
          const { email, password } = validations.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
