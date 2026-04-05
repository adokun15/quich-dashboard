"use server";

export const verifyIdentity = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return {
        message: data?.message || "Something went wrong!",
        status: data?.status,
      };
    }

    return { message: "Welcome!", status: data?.status };
  } catch (e) {
    return { message: e?.message, status: false };
  }
};
