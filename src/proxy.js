// Simple proxy used by Next to control routing for specific paths.
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
export default async function proxy(req) {
  const host = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;

  let subdomain = host?.split(".")[0];

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
    const cookie = await cookies();

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
  matcher: ["/", "/checkout", "/admin/:path*"],
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
