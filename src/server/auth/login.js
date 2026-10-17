"use server";
import { getToken } from "@/utils/local-access";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

// Update customerda
export async function LoginUserToAccount(prev, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !email?.includes("@")) {
    return { error: "Invalid Email" };
  }

  if (!password || password.trim().length == 0) {
    return { error: "Invalid Password" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  const auth = await res.json();

  console.log(auth);
  if (!auth?.status) {
    return {
      error: auth?.message,
    };
  }

  //Invalidate Cache;
  //updateTag("category");

  //Redirect
  redirect(`/admin`);
}
