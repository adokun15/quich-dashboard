"use server";
import { cookies } from "next/headers";

export const getToken = async () => {
  const c = await cookies();
  const token = c.get("quich_login_token");

  if (token) {
    return token.value;
  }

  return null;
};

export const deleteToken = async () => {
  //.removeItem("quich_login_token");
};
