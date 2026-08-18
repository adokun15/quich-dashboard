"use server";

import { cookies } from "next/headers";

export async function CreateLoginCookie({ refresh_token, access_token }) {
  const cookieStore = await cookies();

  cookieStore.set("quichshop_refresh_token", refresh_token, {
    secure: false,
    sameSite: "lax",
    domain:
      process.env.NODE_ENV === "production"
        ? "https://quich.shop"
        : "http://localhost:3000",
  });

  cookieStore.set("quichshop_access_token", access_token, {
    secure: false,
    sameSite: "lax",
    domain:
      process.env.NODE_ENV === "production"
        ? "http://quich.shop"
        : "http://localhost:3000",
  });
}

export async function GetAccessToken() {
  const cookieStore = await cookies();

  const token = cookieStore.get("quichshop_access_token");

  return token ?? token.value.toString();
}
