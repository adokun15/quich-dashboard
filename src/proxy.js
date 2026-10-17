// Simple proxy used by Next to control routing for specific paths.
import { cookies } from "next/headers";
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
