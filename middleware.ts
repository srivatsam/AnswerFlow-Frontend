import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLogin = !!req.auth;

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoutes = DEFAULT_LOGIN_REDIRECT.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return null;
  }
  if (isAuthRoutes) {
    if (isLogin) {
      return Response.redirect(new URL("/user/profile", nextUrl));
    }
    return null;
  }
  if (!isLogin && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
