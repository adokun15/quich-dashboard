import { getToken } from "@/utils/local-access";

// Update customerda
export async function UpdateCustomerDetail({ updates, store_id, product_id }) {
  //Prevent bad field;
  const token = await getToken();

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
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${product_id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        store_id,
        updates,
      }),
    },
  );

  const product = await res.json();
  //Return Error if available

  if (product?.error) {
    return {
      error: {
        message: product?.error?.message,
        status: product?.error?.status,
      },
    };
  }

  //rETURN data
  return { product };
}
