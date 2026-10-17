import ErrorComponent from "@/components/ErrorComponent";
import OrdersTableInfo from "@/components/OrdersTable";
import { ToggleButton } from "@/components/ToggleButton";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";

//Access cookies for token;
const getOrdersData = async ({ filter }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }
    //Filter
    const filterstring = new URLSearchParams(
      Object.entries(filter).reduce((params, [key, value]) => {
        if (value !== undefined && value !== null) {
          params[key] = String(value);
        }
        return params;
      }, {}),
    ).toString();

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders?${filterstring}`,
      {
        method: "GET",
        headers: {
          Cookie: `quich_token=${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return { error: { message: data?.message, code: data?.code } };
    }

    return data.data;
  } catch (e) {
    return { error: { message: e?.message } };
  }
};

export const metadata = {
  title: "Orders Page",
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
