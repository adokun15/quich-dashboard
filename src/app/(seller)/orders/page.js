import { ToggleButton } from "@/components/ToggleButton";
import { faPen, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function OrdersPage() {
  const orders = [];

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
            <span>create</span>
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
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">Orders</h2>
            <p className="text-muted text-2">
              Keep track of all your business sales.
            </p>
          </div>
          <button className="px-6 bg-white shadow border-none text-underline text-primary">
            <FontAwesomeIcon className="mr-3" icon={faPlus} />
            <span>create</span>
          </button>
        </div>

        <article className="flex px-4 justify-between">
          <div>
            <p className="text-3 font-medium">Total Orders: 8 </p>
          </div>

          <div>
            <input
              className=" min-w-2xl rounded-full pl-2 "
              placeholder="Search product by name"
            />
          </div>
        </article>

        <table className="w-full  text-gray-500  text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                OrderID
              </th>
              <th className="px-6 py-3 text-nowrap">Customer</th>
              <th className="px-6 py-3 text-nowrap">Amt</th>
              <th className="px-6 py-3 text-nowrap">Status</th>
              <th className="px-6 py-3 text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ahmed. 09067575746</td>
              <td>NGN6000</td>
              <td>Confirmed</td>

              <td>
                <FontAwesomeIcon icon={faPen} />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divide-y-2"> </div>
      </main>
    </>
  );
}
