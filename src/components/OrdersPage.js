/*
import Card from "@/components/Card.jsx";
import Input from "@/components/Input.jsx";
import { Naira } from "@/helper/Naira.jsx";
import { useGetAllOrdersQuery } from "@/state/endpoints/orders.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TableSkeleton } from "@/helper/Skeletons.jsx";
import { TableCardDate } from "@/helper/DateFormat.js";
export default function OrdersComponent() {
  const [query, setQuery] = useState("");
  const [querystatus, setQueryStatus] = useState("all");

  const { orders, isLoading, isFetching, isError, error } =
    useGetAllOrdersQuery(null, {
      selectFromResult: (res) => {
        return {
          ...res,
          orders: res?.data?.orders?.filter((order) => {
            return (
              `${order?.orderId}`.includes(query) &&
              (order?.status === querystatus || querystatus === "all")
            );
          }),
        };
      },
    });

  return (
    <>
      <h2 className="text-xl fira-sans-medium ">Orders</h2>
      <Card className="flex justify-between flex-wrap space-y-3 md:space-y-0">
        <Input
          placeholder="Search by Order Id"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <select
          onChange={(e) => setQueryStatus(e.target.value)}
          className="
          block py-2 px-1 outline-none  focus:border-teal-800 focus:ring-teal-800 ring-1 w-fit rounded-lg border border-gray-300 text-sm text-gray-900  bg-gray-100"
        >
          <option value={"all"}>All</option>
          <option value={"pending"}>Pending</option>
          <option value={"success"}>Successful</option>
        </select>
      </Card>

      {isError && <p>{error?.message || "Could not get Orders List!"}</p>}

      {(isLoading || isFetching) && !isError && <TableSkeleton />}
      {!isLoading && !isFetching && !isError && (
        <Card className="relative overflow-x-auto">
          {orders?.length > 0 && (
            <table className="w-full text-gray-500  text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Order Amount</th>
                  <th className="px-6 py-3">Customer Contact</th>
                  <th className="px-6 py-3">Order Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <>
                    <tr
                      className={`odd:bg-white border-l  
                     even:bg-gray-100 border-b hover:bg-gray-50`}
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {order.orderId}
                      </th>
                      <td
                        className={`${
                          order?.status === "success"
                            ? "text-green-700"
                            : "text-orange-600"
                        } px-6 py-4 font-bold font-roboto tracking-wider`}
                      >
                        {order?.status}
                      </td>
                      <td className="text-nowrap px-6 py-4 font-roboto text-black font-bold text-xl">
                        <Naira>{order?.amount} </Naira>
                      </td>
                      <td className="px-6 py-4">
                        {order?.customer?.phone || "null"}
                      </td>
                      <td className="text-nowrap px-6 py-4 ">
                        {TableCardDate(order?.paidAt)}
                      </td>{" "}
                      <td className="px-6 py-4  hover:underline">
                        <Link
                          className="bg-teal-700 text-white p-3 hover:bg-teal-500 rounded-full"
                          to={`${order?.orderDocId}`}
                        >
                          View
                        </Link>{" "}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          )}
          {(!orders || orders.length === 0) && <p>No Orders.</p>}
        </Card>
      )}
    </>
  );
}

*/