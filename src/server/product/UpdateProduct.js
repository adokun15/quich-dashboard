"use server";
import { getToken } from "@/utils/local-access";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Update customerda
export async function UpdateProductDetail({ updates, product_id }) {
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

  try {
    //Proceed to Backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${product_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
        body: JSON.stringify({ updates }),
      },
    );

    const product = await res.json();
    //Return Error if available;

    if (!product?.status) {
      return {
        error: {
          message: product?.message,
          code: product?.code,
        },
      };
    }

    revalidateTag("single_product");

    return { data: product?.data };
  } catch (e) {
    return {
      error: {
        message: e?.message,
        code: 500,
      },
    };
  }
}
