"use server";
import { getToken } from "@/utils/local-access";
import { revalidateTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";

// Update customerda
export async function DeleteOrderDetail({ customer_id, order_id }) {
  //Prevent bad field;

  /*
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
  */

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders/${order_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer token`,
      },
      body: JSON.stringify({
        customer_id,
      }),
    },
  );

  const deleted_order = await res.json();
  //Return Error if available

  console.log(deleted_order);
  if (!deleted_order?.status) {
    return {
      error: {
        message: deleted_order?.message,
        code: deleted_order?.code,
      },
    };
  }

  //Invalidate cahche
  updateTag("orders");

  redirect("/admin/orders");
}
