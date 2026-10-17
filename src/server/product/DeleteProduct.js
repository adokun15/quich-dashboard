"use server";
import { getToken } from "@/utils/local-access";
import { DeleteProductImage } from "./ProductImage";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Delete product: permanently
export async function DeleteProductAction({ product_id, hasFile }) {
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

  if (hasFile)
    await DeleteProductImage({ filepath: hasFile, productId: product_id });

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${product_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `quich_token=${token}`,
      },
      cache: "no-store",
    },
  );

  const product = await res.json();
  //Return Error if available

  if (!product?.status) {
    return {
      error: {
        message: product?.message,
        code: product?.code,
      },
    };
  }

  revalidateTag("products");

  redirect("/admin/products");
}
