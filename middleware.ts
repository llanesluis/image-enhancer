import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/api/webhooks/clerk", "/api/webhooks/stripe"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // https://clerk.com/docs/references/nextjs/auth-middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
