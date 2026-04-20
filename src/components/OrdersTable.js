/* Show Table */
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

//Actions;

export default function OrdersTableInfo({ orders, total_orders, page }) {
  return (
    <main>
      {/* Search, Filter, Sort; */}
      <article className="flex px-4 justify-between">
        <div>
          <input
            className=" min-w-2xl rounded-full pl-2 "
            placeholder="Search order"
          />
        </div>

        <div>
          <button>Sort</button>
          <button>Filter</button>
        </div>
      </article>

      {/* Customer data */}
      <table className="w-full  text-gray-500  text-left">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
          <tr className="">
            <th scope="col" className="px-6 py-3">
              OrderId
            </th>
            <th className="px-6 py-3 text-nowrap">Customer</th>
            <th className="px-6 py-3 text-nowrap">Total amt</th>
            <th className="px-6 py-3 text-nowrap">Status</th>
            <th className="px-6 py-3 text-nowrap">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders?.length > 0 &&
            orders?.map((order) => (
              <tr key={order?.order_id}>
                <td>
                  <Link href={`orders/${order?.order_id}`}>
                    #{order?.order_id}
                  </Link>
                </td>
                <td>
                  <h3>{order?.customer_name}</h3>
                  <p>{order?.customer_phone}</p>
                </td>
                <td>NGN{order?.total_amount}</td>
                <td className="capitalize">{order?.status}</td>
                <td>{new Date(order?.order_creation).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Limit, Paginate */}
      <div className="flex justify-between">
        <p className="text-3 font-medium grow">Total {total_orders} </p>

        <article className="flex gap-4">
          <button>
            {" "}
            <span>100</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div>
            <button>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
