// Controls logged-in state

//Redirect to onboarding, login or Home page based on the token;
import { NextResponse } from "next/server";

export default async function middleware(req) {
 
  return NextResponse.next();
}

// Routes Middleware should  run on
/*export const config = {
  matcher: [
    "/settings",
    "/profile",
    "/onboarding",
    "/mods",
    "/tourneys",
    "/sponsors",
  ],
};
*/