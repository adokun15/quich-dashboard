// Simple proxy used by Next to control routing for specific paths.

import { NextResponse } from "next/server";

export default async function proxy(req) {
  const { pathname } = req.nextUrl;

  // Authentication pages
  if (pathname === "/login" || pathname.startsWith("/login/")) {
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }

  if (pathname === "/register" || pathname.startsWith("/register/")) {
    return NextResponse.rewrite(new URL(`/auth/signup`, req.url));
  }

  // Seller dashboard: preserve the original route.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  // Routes already using the internal storefront prefix
  // should not be rewritten again.
  if (pathname === "/store" || pathname.startsWith("/store/")) {
    return NextResponse.next();
  }

  // Public storefront:
  const segments = pathname.split("/").filter(Boolean);
  const storeName = segments[0];

  if (storeName) {
    return NextResponse.rewrite(
      new URL(`/store/${segments.join("/")}`, req.url),
    );
  }

  // Root route: leave it available for your landing page.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};

/*import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";

export default async function proxy(req) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("quich_token");

  // Auth routes
  if (pathname.startsWith("/login")) {
    return NextResponse.rewrite(new URL(`/auth/login`, req.url));
  }
  if (pathname.startsWith("/register")) {
    return NextResponse.rewrite(new URL(`/auth/signup`, req.url));
  }

  if (pathname.startsWith("/admin")) {
    //  if (!token) {
    //  return NextResponse.redirect(new URL("/login", request.url));
    // }

    // Dynamic storeId — e.g. /[storeId], /[storeId]/settings, /[storeId]/products
    const storeIdMatch = pathname.match(/^\/([^\/]+)(\/.*)?$/);

    if (storeIdMatch) {
      const storeId = storeIdMatch[1]; // e.g. "store_abc123"
      const rest = storeIdMatch[2] || ""; // e.g. "/settings" or ""
      return NextResponse.rewrite(new URL(`/admin/${storeId}${rest}`, req.url));
    }

    return NextResponse.next();
    // return NextResponse.rewrite(new URL(`/admin`, req.url));
  }

  //dynamic store name
  //STORE SUBDOMAIN (public)
  if (pathname === "/checkout") {
    return NextResponse.rewrite(new URL(`/store/bland/checkout`, req.url));
  }

  if (pathname === "/store") {
    return NextResponse.rewrite(new URL(`/store/bland`, req.url));
  }

  //All other store paths — e.g. /products, /products/[id]
  // return NextResponse.rewrite(
  //   new URL(`/store/${subdomain}${pathname}`, req.url),
  //);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
*/
