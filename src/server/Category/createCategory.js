"use server";
import { getToken } from "@/utils/local-access";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Update customerda
export async function AddNewCategory(prev, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("quich_token")?.value;

  if (!token) {
    return {
      error: {
        message: "Access Denied. Login to continue",
        status: 401,
      },
    };
  }
  const name = formData.get("category");

  if (!name || !isNaN(name)) {
    return { error: "Invalid name" };
  }

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `quich_token=${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({ name: name?.toLowerCase() }),
    },
  );

  const category = await res.json();

  if (!category?.status) {
    return {
      error: category?.message,
    };
  }

  //Redirect
  redirect(`/admin/category/${category?.id}`);
}
