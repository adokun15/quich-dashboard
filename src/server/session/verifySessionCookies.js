"use server";

export async function VerifyUserSession(sessionCookie) {
  if (!sessionCookie) {
    return { error: true, message: "Not Logged In" };
  }

  try {
    const session = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/auth/session`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionCookie}`,
          "Content-Type": "application/json",
        },
      }
    );

    const d = await session.json();

    return d?.data || null;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error?.message,
    };
  }
}
