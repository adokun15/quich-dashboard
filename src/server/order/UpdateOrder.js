"use server";
import { getToken } from "@/utils/local-access";
import { updateTag } from "next/cache";

// Update customerda
export async function UpdateOrderDetail({ updates, customer_id, order_id }) {
  //Prevent bad field;

  //Authenticated change
  /*
  const token = await getToken();

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
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders/${order_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer default`,
      },
      body: JSON.stringify({
        customer_id,
        updates,
      }),
    },
  );

  const order = await res.json();
  //Return Error if available

  if (!order?.status) {
    return {
      error: {
        message: order?.message,
        code: order?.code,
        details: order?.details,
      },
    };
  }

  //Invalidate cache
  updateTag("single_order");

  //rETURN data: status,note, address
  return order?.order;
}
