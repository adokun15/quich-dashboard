/* Show Table */
"use client";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faFilter,
  faPen,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { SelectActionButton } from "./select";
import PaginateButton from "./PaginateButton";
import useQueryParams from "@/utils/state/FilterParams";
import { useRouter } from "next/navigation";

//Actions;

export default function OrdersTableInfo({ orders, total_orders, page }) {
  const router = useRouter();

  const toOrderId = (id) => {
    router.push(`/admin/orders/${id}`);
  };

  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <main className=" bg-white px-4 space-y-4 py-6 rounded">
      {/* Search, Filter, Sort; */}
      <article className="flex justify-between">
        {/* Bug: wont filter number expect u remove the '0' */}
        <SearchInput
          placeholder="Search Order by id, customer name"
          className="w-80 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        <div>
          <div className="flex gap-2">
            <SelectActionButton
              title="Sort"
              logo={faSort}
              className="text-sm font-medium gap-x-2 
          items-center flex  text-gray-600 hover:text-black"
            >
              <li>By Name</li>
              <li>By Price</li>
              <li>By Date</li>
            </SelectActionButton>
            <SelectActionButton
              title="Filter"
              logo={faFilter}
              className="text-sm font-medium gap-x-2 
            items-center flex  text-gray-600 hover:text-black"
            >
              <li>category</li>
              <button className="bg-primary text-white border-2 rounded-full">
                Apply filter
              </button>
            </SelectActionButton>
          </div>
        </div>
      </article>

      {orders?.length === 0 && (
        <p className="text-center font-medium text-xl">Order not found</p>
      )}

      {orders?.length > 0 && (
        <>
          <div className="overflow-hidden rounded-xl ">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
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
                      <td className="px-6 font-medium text-base capitalize py-4 text-gray-700">
                        <Link
                          className="border-b-primary border-dashed border-b-2"
                          href={`orders/${order?.order_id}`}
                        >
                          #{order?.order_id}
                        </Link>
                      </td>
                      <td className="px-6 capitalize py-4 text-gray-700">
                        <h3 className="font-medium">{order?.customer_name}</h3>
                        <p className="font-muted">0{order?.customer_phone}</p>
                      </td>
                      <td className="space-x-1 px-6 capitalize py-4 text-gray-700">
                        NGN
                        <span className="text-xl  font-medium">
                          {Number(order?.total_amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 capitalize py-4 text-gray-700 capitalize">
                        <span className=" rounded-full  bg-input border px-3 py-1">
                          {order?.status}
                        </span>
                      </td>
                      <td className="px-6 capitalize py-4 text-gray-700">
                        {order?.order_creation &&
                          new Date(order?.order_creation).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Total <span className="font-semibold">{total_orders}</span>
            </p>

            <article className="flex items-center gap-4">
              <SelectActionButton
                title={queryParams?.get("limit") || 30}
                logo_right={true}
                logo_style="text-black"
                logo={faChevronDown}
              >
                <li>
                  <button
                    onClick={() =>
                      setQueryParams({
                        limit: 30,
                      })
                    }
                  >
                    30
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setQueryParams({
                        limit: 50,
                      })
                    }
                  >
                    50
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setQueryParams({
                        limit: 100,
                      })
                    }
                  >
                    100
                  </button>
                </li>
              </SelectActionButton>
              <PaginateButton total_item_length={total_orders} />
            </article>
          </div>
        </>
      )}
    </main>
  );
}
