import { getToken } from "@/utils/local-access";

// Update customerda
export async function UpdateOrderDetail({
  updates,
  store_id,
  customer_id,
  order_id,
}) {
  //Prevent bad field;

  //Authenticated change
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
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders/${order_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        store_id,
        customer_id,
        updates,
      }),
    },
  );

  const order = await res.json();
  //Return Error if available

  if (order?.error) {
    return {
      error: {
        message: order?.error?.message,
        status: order?.error?.status,
      },
    };
  }

  //rETURN data
  return { order };
}
