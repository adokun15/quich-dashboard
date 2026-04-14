"use server";
import { getToken } from "@/utils/local-access";

// Update customerda
export async function UpdateProductDetail({ updates, product_id }) {
  //Prevent bad field;
  //const token = await getToken();
  /*
  if (!token) {
    return {
      error: {
        message: "Access Denied. Login to continue",
        status: 401,
      },
    };
  }
*/

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${product_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer SOME-TOKEN-VALUE`,
      },
      body: JSON.stringify({ updates }),
    },
  );

  const product = await res.json();
  //Return Error if available;

  /*if (!product?.status) {
    return {
      error: {
        message: product?.error?.message,
        status: product?.error?.status,
      },
    };
  }*/

  //rETURN data
  return product.data;
}
