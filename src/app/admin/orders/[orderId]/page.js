import ErrorComponent from "@/components/ErrorComponent";
import SingleOrderInfo from "@/components/SingleOrderInfo";
import { cacheTag } from "next/cache";

//Fetch single data
const getSingleOrder = async (id) => {
  "use cache";
  cacheTag("single_order");

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
    if (!data?.status) {
      return { error: { message: data?.message, code: data?.code } };
    }

    return data.order;
  } catch (e) {
    return { error: { message: e?.message } };
  }
};

export async function generateMetadata({ params }) {
  "use cache";
  const { orderId } = await params;
  const order = await getSingleOrder(orderId);

  if (order?.error) {
    return {
      title: "Order not Found!",
    };
  }

  return {
    title: `Order | #${order?.id} - ${order?.customer_name}`,
    openGraph: {
      title: `Order | #${order?.id} - ${order?.customer_name}`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function SingleOrderPage({ params }) {
  const { orderId } = await params;
  const order = await getSingleOrder(orderId);

  if (order?.error) {
    return <ErrorComponent error={order?.error} />;
  }
  return <SingleOrderInfo order={order} />;
}
