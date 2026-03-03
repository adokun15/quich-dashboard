"use server";
const { cookies } = require("next/headers");

//Get User Data: (Email, name, verification)
export const getUser = async () => {
  const cookie = await cookies();

  const cookieStore = cookie.get("quich-session")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieStore}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res?.ok) {
      return { error: "Could not get user!", status: 500 };
    }

    const data = await res.json(); //{ naem: 'helen'}
    //const data = await res.json();

    return data;
  } catch (e) {
    return { error: e?.message, status: 500 };
  }
};
