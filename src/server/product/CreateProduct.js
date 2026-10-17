"use server";
import { getToken } from "@/utils/local-access";
import { revalidatePath, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function CreateProductAction(prev, formData) {
  //Auth;
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

  let error = [];

  const name = formData.get("name");
  const price = formData.get("price");
  const desc = formData.get("desc");
  const quantity = formData.get("quantity");

  if (!name) {
    error.push({ field: "name", message: "Invalid name" });
  }

  if (isNaN(price)) {
    error.push({ field: "price", message: "Invalid price" });
  }

  if (desc && desc?.length > 300) {
    error.push({ field: "desc", message: "Description is too long!" });
  }

  if (quantity && Number(quantity) > 100) {
    error.push({ field: "quantity", message: "Max Quantity allowed is 100" });
  }

  if (error.length > 0) {
    return { error };
  }

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `quich_token=${token}`,
      },
      cache: "no-store",

      body: JSON.stringify({
        name,
        price,
        quantity: quantity || 0,
        description: desc || "",
      }),
    },
  );

  const product = await res.json();
  //Return Error if available;

  if (!product?.status && product?.code == 400) {
    return {
      error: product?.details,
    };
  }

  if (!product?.status && product?.code == 500) {
    return {
      error: product?.message || "",
    };
  }

  const id = product?.status && product?.data?.id;

  //revalidatePath("/admin/products");
  redirect(`/admin/products/${id}`);
}
