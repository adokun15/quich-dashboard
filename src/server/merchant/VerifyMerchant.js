"use server";

import { getUserFromToken } from "./GetUser";

// /pages/api/me.ts
export default async function handler(req, res) {}

export const verifyIdentity = async () => {
  try {
    // const cookieStore = await cookies();
    // const token = cookieStore.get("quich_token")?.value;
    if (!token) {
      return {
        error: {
          message: "Access Denied. Login to continue",
          status: 401,
        },
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/auth`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return {
        message: data?.message || "Something went wrong!",
        status: data?.status,
      };
    }

    return true; //userId, onboarded, email, store_slug
  } catch (e) {
    return { message: e?.message, status: false };
  }
};
