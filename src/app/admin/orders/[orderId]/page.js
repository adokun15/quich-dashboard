import SingleOrderInfo from "@/components/SingleOrderInfo";

//Fetch single data
const getSingleOrder = async (id) => {
  try {
    // Get User Cookies first: 30mins
    //const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //if (!user_token) {
    // redirect("/");
    // }

    //Translate token to storeId;
    const store_id = "c5b2c5a4-26f4-4806-b156-cab3db6ba716";
    if (!id) return;

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders/${id}?store_id=${store_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    //if (!data?.status) {
    // Prompt modal if cookie has expired

    //Show modal if store name don't match!
    // return { error: data?.message, status_code: data?.status_code };
    //}

    return data.order;
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function SingleOrderPage({ params }) {
  const { orderId } = await params;
  const order = await getSingleOrder(orderId);
  return <SingleOrderInfo order={order} />;
}
