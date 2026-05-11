"use server";

import { updateTag } from "next/cache";

//Change existing store information
export async function StoreUpdate({ updates }) {
  //Authenticate

  //Proceed to backend

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/store`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer SOME-TOKEN-VALUE`,
      },
      body: JSON.stringify({
        updates,
      }),
    },
  );

  const store = await res.json();
  //Return Error if available;

  if (!store?.status && store?.code == 400) {
    return {
      error: store?.details,
    };
  }

  if (!store?.status && store?.code == 500) {
    return {
      error: store?.message || "",
    };
  }

  const id = store?.status && store?.data?.id;

  console.log(id);
  //  revalidatePath("/admin/products");

  //Invalidate Product
  updateTag("store");

  return id;
}
