"use server";

import { cookies } from "next/headers";

export const createSessionCookies = async ({ idToken }) => {
  const cookieStore = await cookies();

  if (!idToken) {
    return { error: true, message: "Invalid ID Token!" };
  }

  const expiresIn = 60 * 60 * 24 * 3 * 1000;

  try {
    const cookie = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/auth/session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );

    const c = await cookie.json();

    if (c?.message && c?.statusCode) {
      throw new Error(c?.message);
    }

    const options = {
      maxAge: expiresIn,
      httpOnly: process.env.NODE_ENV === "development",
      secure: process.env.NODE_ENV === "production",
    };

    cookieStore.set("quich-session", c?.cookie, options);
    return { isSuccess: true };
  } catch (error) {
    //Status, StatusCode, message
    throw new Error(error?.message);
  }
};
