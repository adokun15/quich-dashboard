"use server";
import { getToken } from "@/utils/local-access";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function DeleteSingleCategory({ category_id }) {
  //Prevent bad field;

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

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category/${category_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `quich_token=${token}`,
      },
      cache: "no-store",
    },
  );

  const category = await res.json();

  if (!category?.status) {
    return {
      error: {
        message: category?.message,
        code: category?.code,
      },
    };
  }

  //Reroute
  redirect("/admin/category");
}
