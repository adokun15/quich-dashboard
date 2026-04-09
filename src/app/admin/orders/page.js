import OrdersTableInfo from "@/components/OrdersTable";
import { ToggleButton } from "@/components/ToggleButton";
import { faPen, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Access cookies for token;
const getOrdersData = async () => {
  try {
    // Get User Cookies first: 30mins
    //  const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //  if (!user_token) {
    //    redirect("/");
    // }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders`,
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
      return { error: data?.message, status_code: data?.status_code };
    }

    return data.data;
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function OrdersPage() {
  const orders = await getOrdersData();

  console.log(orders);

  if (orders?.statusCode === 500) {
    return (
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">Orders</h2>
            <p className="text-muted text-2">
              Keep track of all your business sales.
            </p>
          </div>
          <button className="px-6">
            <FontAwesomeIcon className="mr-3" icon={faPlus} />
            <span>Add</span>
          </button>
        </div>
        <div className="flex gap-2">
          <input
            className=" rounded-full pl-2 "
            placeholder="Search product by name"
          />
          <button className="px-6 text-nowrap">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <p className="text-center text-2xl">{orders?.message}</p>
      </main>
    );
  }

  return (
    <>
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between">
          <div className="px-4">
            <h2 className="text-6">Orders</h2>
            <p className="text-muted text-2">
              Keep track of all your business sales.
            </p>
          </div>

          <button className="text-primary ">How are Orders created ?</button>
        </div>

        <OrdersTableInfo {...orders} />
      </main>
    </>
  );
}
