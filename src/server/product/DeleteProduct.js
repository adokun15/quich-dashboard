"use server";
import { getToken } from "@/utils/local-access";
import { DeleteProductImage } from "./ProductImage";

// Update customerda
export async function DeleteProductAction({ product_id, hasFile }) {
  //Prevent bad field;
  /* const token = await getToken();

  if (!token) {
    return {
      error: {
        message: "Access Denied. Login to continue",
        status: 401,
      },
    };
  }
*/

  if (hasFile)
    await DeleteProductImage({ filepath: hasFile, productId: product_id });

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${product_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer SOME-TOKEN-VALUE`,
      },
    },
  );

  const product = await res.json();
  //Return Error if available

  if (!product?.status) {
    return {
      error: {
        message: product?.error?.message,
        status: product?.error?.status,
      },
    };
  }

  //rETURN data
  return product;
}
