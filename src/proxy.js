// Simple proxy used by Next to control routing for specific paths.
import { NextResponse } from "next/server";
import { VerifyUserSession } from "./server/session/verifySessionCookies";

export default async function proxy(request) {
  const cookie = request.cookies?.get("quich-session")?.value || null;

  const session = await VerifyUserSession(cookie);

  // If the request is for /settings or any subpath, redirect to /login.
  if (!session || !session?.userId) {
    const loginAbsolute = new URL("/login", request.url).toString();
    return NextResponse.redirect(loginAbsolute);
  }
  return NextResponse.next();
}

// Routes this proxy should run on. Include subpaths for settings.
export const config = {
  // Ensure both /settings and nested paths are matched.
  matcher: [
    "/",
    "/billing",
    "/onboard",
    "/products",
    "/settings",
    "/products/:path*",
    "/settings/:path*",
  ],
};
