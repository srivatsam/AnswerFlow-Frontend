import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/utils/db";
import { getUserById } from "@/utils/dbFunctions/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const userExist = await getUserById(user.id as string);
      if (!userExist || !userExist.emailVerified) {
        return false;
      }
      if (userExist.password == null) {
        return false;
      }
      return true;
    }, // @ts-ignore
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      // console.log(session);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const exitUser = await getUserById(token.sub);
      if (!exitUser) return token;
      token.role = exitUser.role;
      // console.log(token);
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
