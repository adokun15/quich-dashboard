"use server";

import { getUserFromToken } from "./GetUser";

// /pages/api/me.ts

export default async function handler(req, res) {}

export const verifyIdentity = async (token) => {
  try {
    //  const user = await getUserFromToken(token)

    // if (!user) return res.status(401).json({ error: "Unauthorized" })

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/verify`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

  
    if (!data?.status) {
      return {
        message: data?.message || "Something went wrong!",
        status: data?.status,
      };
    }

    return data?.data; //userId, onboarded, email, store_slug
  } catch (e) {
    return { message: e?.message, status: false };
  }
};
