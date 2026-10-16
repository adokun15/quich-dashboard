"use server";

import { redirect } from "next/navigation";
import { createClientFromSupabase } from "./client";
import { cookies } from "next/headers";
import { createServerClientSupabase } from "./server";
//Get Token
export const getSbToken = async () => {
  const cookieStore = await cookies();

  //Get specific project cookie
  const hasToken = cookieStore.has("");

  if (!hasToken) return null;

  return cookieStore.get("")?.value;
};

//Signout User
export const signOutUser = async () => {
  const { error } = (await createServerClientSupabase()).auth.signOut();

  if (error) {
    return {
      error: {
        message: error?.message,
        code: error?.code,
      },
    };
  }

  //Full Path
  redirect("/login");
};
