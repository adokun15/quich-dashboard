// Simple proxy used by Next to control routing for specific paths.
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";
export default async function proxy(req) {
  const host = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;

  let subdomain = host?.split(".")[0];

  //Authentication Domain
  if (subdomain === "auth" && pathname?.startsWith("/login")) {
    return NextResponse.rewrite(new URL(`/auth/login`, req.url));
  }

  if (subdomain === "auth" && pathname?.startsWith("/confirm-login")) {
    return NextResponse.rewrite(new URL(`/auth/confirm-login`, req.url));
  }

  //Auth protection;
  if (
    subdomain === "auth" &&
    !pathname?.startsWith("/login") &&
    !pathname?.startsWith("/confirm-login")
  ) {
    return NextResponse.rewrite(new URL(`/auth/not_found`, req.url));
  }

  //Onboarding
  if (subdomain === "onboarding") {
    /* local storage: Check Cookie if still active */
    /* db: Check if onboarding was completed ---> store.name.com */
    /* or: Check Current step and proceed */
    // return NextResponse.rewrite(new URL(`/auth/not_found`, req.url));
  }

  // Store Routes
  if (pathname === "/checkout") {
    return NextResponse.rewrite(
      new URL(`/store/${subdomain}/checkout`, req.url),
    );
  }

  if (pathname === "/" && !pathname?.startsWith("/admin")) {
    return NextResponse.rewrite(new URL(`/store/${subdomain}`, req.url));
  }

  //Admin Page:
  if (pathname?.startsWith("/admin")) {
    await updateSession(req);

    // if (!cookie.get("quich-session")) {
    //Validate here and Cache Request

    //Home or Login
    // return NextResponse.redirect(new URL("/", req.url));
    //}
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Ensure both /settings and nested paths are matched.
  matcher: ["/login", "/confirm-login", "/", "/checkout", "/admin/:path*"],
};

//Validate /admin Paths
/**
 "use server";
const { cookies } = require("next/headers");

//Get User Data: (Email, name, verification)
export const getUser = async () => {
  const cookie = await cookies();

  const cookieStore = cookie.get("quich-session")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieStore}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res?.ok) {
      return { error: "Could not get user!", status: 500 };
    }

    const data = await res.json(); //{ naem: 'helen'}
    //const data = await res.json();

    return data;
  } catch (e) {
    return { error: e?.message, status: 500 };
  }
};

 */
