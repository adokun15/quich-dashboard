"use server";
export const getProducts = async (storeId) => {
  //Anybody can read this

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/store/${storeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json(); //{ naem: 'helen'}

    if (data?.message && data?.status) return data; //{}

    console.log(data);
    return data;
  } catch (e) {
    return { error: e?.message, status: 500 };
  }
};
