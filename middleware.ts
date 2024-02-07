import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { getUser } from "./actions/getUser";
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl, auth } = req;
  const isLogin = !!req.auth;

  const user = await getUser();
  console.log("middle", user);
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoutes = DEFAULT_LOGIN_REDIRECT.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return null;
  }
  if (isAuthRoutes) {
    if (isLogin) {
      console.log("user login");
      if (!user.plan) {
        console.log("user has no plan");
        return Response.redirect(new URL("/payment", nextUrl));
      }
      console.log("user has plan and login");
      return Response.redirect(new URL("/user/profile", nextUrl));
    }
    return null;
  }
  if (!isPublicRoutes && !nextUrl.pathname.startsWith("/payment")) {
    if (isLogin) {
      if (!user.plan) return Response.redirect(new URL("/payment", nextUrl));
    }
    if (!isLogin) {
      return Response.redirect(new URL("/register", nextUrl));
    }
  }
  if (nextUrl.pathname.startsWith("/payment")) {
    if (isLogin && user.name)
      return Response.redirect(new URL("/user/profile", nextUrl));
  }
  return null;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
