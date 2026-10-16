"use server";

import { getToken } from "@/utils/local-access";

// Update customerda
export async function UpdateMerchantSettings({ updates }) {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer token`,
    },
    body: JSON.stringify({ updates }),
  });

  const merchant = await res.json();
  //Return Error if available

  if (!merchant?.status) {
    return {
      error: {
        message: merchant?.message,
        code: merchant?.code,
        details: merchant?.details,
      },
    };
  }

  //Invalidate cache
  updateTag("merchant");

  //rETURN data: status,note, address
  return merchant;
}
