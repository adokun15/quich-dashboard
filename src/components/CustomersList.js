/*import Card from "@/components/Card.jsx";
import Input from "@/components/Input.jsx";
import { useGetAllCustomersQuery } from "@/state/endpoints/customers.js";
import { TableSkeleton } from "@/helper/Skeletons.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CustomersComponent() {
  const [query, setQuery] = useState("");

  const { customers, loading, fetching, isError, error } =
    useGetAllCustomersQuery(null, {
      selectFromResult: ({ isLoading, isError, error, isFetching, data }) => {
        return {
          loading: isLoading,
          fetching: isFetching,
          error,
          isError,
          customers: data?.customers?.filter((customer) => {
            return (
              customer?.email?.toLowerCase().includes(query.toLowerCase()) ||
              customer?.phone?.includes(query.toLowerCase())
            );
          }),
        };
      },
    });

  return (
    <>
      <Card className="flex justify-between flex-wrap space-y-3 md:space-y-0">
        <h2 className="text-xl fira-sans-medium ">Customers</h2>
        <Input
          placeholder="Search by Email or Number"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </Card>

      {isError && <p>{error?.message}</p>}

      {(fetching || loading) && <TableSkeleton />}
      {!loading && !fetching && !isError && (
        <Card className="relative overflow-x-auto">
          {customers && customers?.length > 0 && (
            <table className="w-full text-gray-500  text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Customer Id
                  </th>
                  <th className="px-6 py-3">Customer Name</th>
                  <th className="px-6 py-3">Customer Email</th>
                  <th className="px-6 py-3">Connect</th>
                  <th className="px-6 py-3">View Info</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((customer) => (
                  <tr className="odd:bg-white even:bg-gray-100 border-b hover:bg-gray-50">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {customer?.code}
                    </th>
                    <td className="px-6 py-4">{customer?.name}</td>
                    <td className="px-6 py-4">{customer?.email}</td>
                    <td className="px-6 py-4">+234{customer?.phone}</td>
                    <td className="text-nowrap px-6 py-4 ">
                      <Link
                        className="bg-teal-700 text-white p-3 hover:bg-teal-500 rounded-full"
                        to={`${customer?.code}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {(!customers || customers.length === 0) && <p>No Customers!</p>}
        </Card>
      )}
    </>
  );
}
*/