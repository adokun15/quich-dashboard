"use server";
import { getToken } from "@/utils/local-access";
import { revalidateTag } from "next/cache";

export async function UpdateCategoryDetail({ updates, category_id }) {
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

  if (updates?.name && !isNaN(updates?.name)) {
    return { error: { message: "Invalid name" } };
  }

  try {
    //Proceed to Backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category/${category_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token`,
        },
        body: JSON.stringify({ updates }),
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

    revalidateTag("single_category");

    return { id: category?.data?.id };
  } catch (e) {
    return {
      error: {
        message: e?.message,
        code: 500,
      },
    };
  }
}
