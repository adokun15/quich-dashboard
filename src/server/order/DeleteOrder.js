import { getToken } from "@/utils/local-access";

// Update customerda
export async function DeleteOrderDetail({ store_id, order_id }) {
  //Prevent bad field;

  //AUTHENTICATE
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
      }),
    },
  );

  const order = await res.json();
  //Return Error if available

  if (customer?.error) {
    return {
      error: {
        message: customer?.error?.message,
        status: customer?.error?.status,
      },
    };
  }

  //rETURN data
  return { order };
}
