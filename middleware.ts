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
  console.log("middleware log", user);

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoutes = DEFAULT_LOGIN_REDIRECT.includes(nextUrl.pathname);

  // return page for all api-auth routes
  if (isApiAuthRoutes) {
    return null;
  }
  // if user he login and has plan return /user/profile
  // if user he login and has no plan return /payment
  // if user he not login return the public routes (/home)
  if (isPublicRoutes) {
    if (isLogin) {
      if (!user.plan) {
        return Response.redirect(new URL("/payment", nextUrl));
      }
      return Response.redirect(new URL("/user/profile", nextUrl));
    }
    return null;
  }

  // if user he login and has plan return /user/profile
  // if user he login and has no plan return /payment
  // if user he not login return the auth routes (login , register)
  if (isAuthRoutes) {
    if (isLogin) {
      if (!user.plan) {
        return Response.redirect(new URL("/payment", nextUrl));
      }
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
    if (nextUrl.pathname === "/payment/success") {
      return null;
    }
    if (isLogin && user.plan) {
      return Response.redirect(new URL("/user/profile", nextUrl));
    }
    if (!isLogin) {
      return Response.redirect(new URL("/register", nextUrl));
    }
  }
  return null;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
