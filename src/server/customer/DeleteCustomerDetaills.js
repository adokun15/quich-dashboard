"use server";
import { getToken } from "@/utils/local-access";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Update customer details
export async function DeleteCustomerDetail({ customer_id }) {
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

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers/${customer_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `quich_token=${token}`,
      },
      cache: "no-store",
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

  //Invalidate Cache
  revalidateTag("customers");

  redirect("/admin/customers");
}
