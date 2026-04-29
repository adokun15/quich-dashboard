"use server";
import { getToken } from "@/utils/local-access";
import { revalidateTag } from "next/cache";

// Update customerda
export async function UpdateCustomerDetail({ updates, customer_id }) {
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

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers/${customer_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ass`,
      },
      body: JSON.stringify({
        updates,
      }),
    },
  );

  const customer = await res.json();
  //Return Error if available

  if (!customer?.status) {
    return {
      error: {
        message: customer?.message,
        code: customer?.code,
      },
    };
  }

  console.log(customer);

  //Invalidate Cache
  revalidateTag("single-customer");

  //rETURN data
  return { name: "" };
}
