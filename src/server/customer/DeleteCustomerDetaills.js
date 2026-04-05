import { getToken } from "@/utils/local-access";

// Update customerda
export async function UpdateCustomerDetail({ store_id, customer_id }) {
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
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers/${customer_id}`,
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

  const customer = await res.json();
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
  return { name: customer?.customer?.name };
}
