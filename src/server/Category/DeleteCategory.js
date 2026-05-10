"use server";
import { getToken } from "@/utils/local-access";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteSingleCategory({ category_id }) {
  //Prevent bad field;
  //  const token = await getToken();

  //if (!token) {
  ///  return {
  ///     error: {
  ///       message: "Access Denied. Login to continue",
  ///      status: 401,
  //    },
  //  };
  // }

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category/${category_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer some-token`,
      },
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

  //INvalidate Tag
  updateTag("category");

  //Reroute
  redirect("/admin/category");
}
