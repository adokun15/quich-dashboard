"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Update customerda
export async function RegisterUserToAccount(prev, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  //Validate
  if (name && name?.trim()?.length < 3) {
    return { error: "Name too short!" };
  }

  if (!isNaN(name)) {
    return { error: "Invalid name!" };
  }

  if (password && password.length < 8) {
    return { error: "Password too short!" };
  }

  if (!email || !email?.includes("@")) {
    return { error: "Invalid Email" };
  }

  if (!password || password.trim().length == 0) {
    return { error: "Invalid Password" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({ email, password, name }),
    },
  );

  console.log(res);
  const auth = await res.json();

  console.log(auth);

  if (!auth?.status) {
    return {
      error: auth?.message,
    };
  }

  //save to cookie
  const cookieStore = await cookies();

  cookieStore.set("quich_token", auth?.data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3 * 24 * 60 * 60,
    path: "/",
  });

  //Redirect
  redirect(`/admin`);
}
