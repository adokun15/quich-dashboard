"use server";
import { getToken } from "@/utils/local-access";

// Update customerda
export async function AddNewCategory({ name }) {
  //Prevent bad field;
  //  const token = await getToken();

  //if (!token) {
  ///  return {
  ///     error: {
  ///       message: "Access Denied. Login to continue",
  ///      status: 401,
  //    },
  //  };
  // }

  console.log(name);
  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer some-tokem`,
      },
      body: JSON.stringify({ name }),
    },
  );

  const category = await res.json();

  if (!category?.status) {
    return { error: "Something Went Wrong!" };
  }
  //Return Error if available

  /*
  if (category?.error){
    return {
      error: {
        message: customer?.error?.message,
        status: ca?.error?.status,
      },
    };
  }
*/

  //rETURN data
  return category?.id;
}
