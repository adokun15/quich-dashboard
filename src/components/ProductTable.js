"use client";
/* Show Table */
import {
  faChevronDown,
  faFilter,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SelectActionButton } from "./select";
import useQueryParams from "@/utils/state/FilterParams";
import SearchInput from "./SearchInput";
import PaginateButton from "./PaginateButton";

export default function ProductTableInfo({
  products,
  currentPage,
  totalProduct,
}) {
  const router = useRouter();

  const toProductId = (id) => {
    router.push(`/admin/products/${id}`);
  };

  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <main className="p-6 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <SearchInput
          placeholder="Search product..."
          className="w-80 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        {/*
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
          */}
      </div>

      {/* Table */}
      <div className="overflow-hidden  rounded-xl ">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
            </tr>
          </thead>

          <tbody className="">
            {products?.length > 0 &&
              products.map((p, index) => (
                <tr
                  key={p.id}
                  onClick={() => toProductId(p?.id)}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 flex font-medium text-gray-900">
                    <div>
                      {!p.images && (
                        <Image
                          src={p.images[0]}
                          height={10}
                          width={10}
                          la
                          alt={p.name}
                        />
                      )}
                    </div>
                    <p>{p.name}</p>
                  </td>

                  <td className="px-6 capitalize py-4 text-gray-700">
                    {p?.category_name || "--"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">₦{p.price}</td>

                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-base`}>
                      {p.mark_soldout ? "Sold out" : p?.quantity}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Total <span className="font-semibold">{totalProduct}</span>
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
          <PaginateButton total_item_length={totalProduct} />
        </article>
      </div>
    </main>
  );
}
