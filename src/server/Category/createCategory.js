"use server";
import { getToken } from "@/utils/local-access";
import { redirect } from "next/navigation";

// Update customerda
export async function AddNewCategory(prev, formData) {
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
        Authorization: `Bearer some-tokem`,
      },
      body: JSON.stringify({ name: name?.toLowerCase() }),
    },
  );

  const category = await res.json();

  console.log(category);

  if (!category?.status) {
    return {
      error: category?.message,
    };
  }

  //Invalidate Cache;

  //Redirect
  return category?.status && redirect(`/admin/category/${category?.id}`);
}
