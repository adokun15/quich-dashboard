import ErrorComponent from "@/components/ErrorComponent";
import OrdersTableInfo from "@/components/OrdersTable";
import { ToggleButton } from "@/components/ToggleButton";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cacheTag } from "next/cache";

//Access cookies for token;
const getOrdersData = async ({ filter }) => {
  "use cache";
  cacheTag("orders");

  try {
    //Get User Cookies first: 30mins
    //  const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //  if (!user_token) {
    //    redirect("/");
    // }

    //Filter
    const filterstring = Object.entries(filter)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders?${filterstring}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: { message: data?.message, code: data?.code } };
    }

    return data.data;
  } catch (e) {
    return { error: { message: e?.message } };
  }
};

export default async function OrdersPage({ searchParams }) {
  const filter = await searchParams;

  const orders = await getOrdersData({ filter });

  if (orders?.error) {
    return <ErrorComponent error={orders?.error} />;
  }

  return (
    <>
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between">
          <div className="px-4">
            <h2 className="text-2xl font-medium">Orders</h2>
            <p className="text-muted text-2">
              Keep track of all your business sales.
            </p>
          </div>

          <button className="space-x-2 cursor-pointer">
            <span className="font-medium  text-base text-muted">
              How are orders created
            </span>
            <FontAwesomeIcon className="text-primary " icon={faInfoCircle} />
          </button>
        </div>

        <OrdersTableInfo {...orders} />
      </main>
    </>
  );
}
