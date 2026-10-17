import ErrorComponent from "@/components/ErrorComponent";
import SingleOrderInfo from "@/components/SingleOrderInfo";
import { cacheTag } from "next/cache";
import { cookies } from "next/headers";

//Fetch single data
const getSingleOrder = async (id) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    //Translate token to storeId;
    const store_id = "c5b2c5a4-26f4-4806-b156-cab3db6ba716";
    if (!id) return;

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders/${id}?store_id=${store_id}`,
      {
        method: "GET",
        headers: {
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
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
