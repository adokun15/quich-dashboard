// Simple proxy used by Next to control routing for specific paths.
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";

export default async function proxy(req) {
  const host = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;

  const currentHost =
    process.env.NODE_ENV === "production"
      ? host.replace(`.${process.env.NEXT_PUBLIC_APP_DOMAIN}`, "")
      : host.split(":")[0].split(".")[0]; // e.g. "admin" from admin.localhost

  const subdomain = currentHost;

  if (subdomain === "admin") {
    // Auth routes
    if (pathname.startsWith("/login")) {
      return NextResponse.rewrite(new URL(`/auth/login`, req.url));
    }
    if (pathname.startsWith("/verify-request")) {
      return NextResponse.rewrite(new URL(`/auth/verify-request`, req.url));
    }
    // Onboarding
    if (pathname.startsWith("/onboarding")) {
      return NextResponse.rewrite(new URL(`${pathname}`, req.url));
    }

    // Dynamic storeId — e.g. /[storeId], /[storeId]/settings, /[storeId]/products
    const storeIdMatch = pathname.match(/^\/([^\/]+)(\/.*)?$/);

    /*      
    const res = await updateSession(req);
    const hasSession = res.cookies.get("");
    if (!hasSession) {
      return NextResponse.redirect(
        new URL(
          `https://admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}/login`,
          req.url,
        ),
      );
    }
    return res;
*/

    if (storeIdMatch) {
      const storeId = storeIdMatch[1]; // e.g. "store_abc123"
      const rest = storeIdMatch[2] || ""; // e.g. "/settings" or ""
      return NextResponse.rewrite(new URL(`/admin/${storeId}${rest}`, req.url));
    }

    // Admin root — /
    return NextResponse.rewrite(new URL(`/admin`, req.url));
  }

  // ─── STORE SUBDOMAIN (public) ─────────────────────────────────────

  if (pathname === "/checkout") {
    return NextResponse.rewrite(
      new URL(`/store/${subdomain}/checkout`, req.url),
    );
  }

  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/store/${subdomain}`, req.url));
  }

  // All other store paths — e.g. /products, /products/[id]
  return NextResponse.rewrite(
    new URL(`/store/${subdomain}${pathname}`, req.url),
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
