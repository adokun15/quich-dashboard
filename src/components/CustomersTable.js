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

export default function CustomersTableInfo({ customers, total_customers }) {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <main className="p-6 bg-white">
      {/* Search, Filter, Sort; */}
      <article className="flex items-center justify-between mb-6">
        <SearchInput
          placeholder="Search customer by name"
          className="w-80 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        <div className="flex gap-2">
          <SelectActionButton
            title="Sort"
            logo={faSort}
            className="text-sm font-medium gap-x-2 
          items-center flex  text-gray-600 hover:text-black"
          >
            <p>sorttt</p>
          </SelectActionButton>
          <SelectActionButton
            title="Filter"
            logo={faFilter}
            className="text-sm font-medium gap-x-2 
            items-center flex  text-gray-600 hover:text-black"
          >
            <p>category</p>
            <button className="bg-primary text-white border-2 rounded-full">
              Apply filter
            </button>
          </SelectActionButton>
        </div>
      </article>

      {/* Customer data */}
      {customers?.length === 0 && (
        <p className="text-xl font-medium text-muted">No customer found</p>
      )}

      {customers?.length > 0 && (
        <>
          <div className="overflow-hidden rounded-xl ">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    S/N
                  </th>
                  <th colSpan="3" scope="col" className="px-6 py-3">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-nowrap">Tag</th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.length &&
                  customers?.map((customer, i) => (
                    <tr key={customer?.customer_id}>
                      <td
                        colSpan="1"
                        className="px-6 capitalize py-2 text-gray-700"
                      >
                        {i + 1}
                      </td>
                      <td
                        colSpan="3"
                        className="px-6 capitalize py-2 text-gray-700"
                      >
                        <Link
                          className="space-y-2"
                          href={`/admin/customers/${customer?.customer_id}`}
                        >
                          <h3 className="text-base font-medium">
                            {customer?.name}
                          </h3>
                          <p className="text-base text-muted">
                            0{customer?.phone}
                          </p>
                        </Link>
                      </td>
                      <td className="px-6 capitalize py-2 text-gray-700">
                        {customer?.tag || "--"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Limit, Paginate */}
          <div className="flex justify-between">
            <p className="text-3 font-medium grow">Total {total_customers}</p>

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
              <PaginateButton total_item_length={total_customers} />
            </article>
          </div>
        </>
      )}
    </main>
  );
}
