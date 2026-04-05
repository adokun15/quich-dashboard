import { getToken } from "@/utils/local-access";

// Update customerda
export async function DeleteMerchantAccount({ merchant_id }) {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      merchant_id,
    }),
  });

  const user = await res.json();
  //Return Error if available

  if (user?.error) {
    return {
      error: {
        message: user?.error?.message,
        status: user?.error?.status,
      },
    };
  }

  //rETURN data
  return { user };
}
