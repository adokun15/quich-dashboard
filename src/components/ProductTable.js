/* Show Table */
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
//import { Menu } from "@headlessui/react";
//import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function ProductTableInfo({
  products,
  currentPage,
  totalProduct,
}) {
  return (
    <main className="p-6 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <input
          placeholder="Search product..."
          className="w-80 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        <div className="flex gap-2">
          <button className="text-sm font-medium text-gray-600 hover:text-black">
            Sort
          </button>
          <button className="text-sm font-medium text-gray-600 hover:text-black">
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-xl bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">S/N</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products?.length > 0 &&
              products.map((p, index) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {p.name}
                  </td>

                  <td className="px-6 py-4 text-gray-700">₦{p.price}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        p.mark_soldout
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {p.mark_soldout ? "Sold out" : "Available"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
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
          <button className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
            100
            <FontAwesomeIcon icon={faChevronDown} />
          </button>

          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button className="px-3 py-2 hover:bg-gray-100">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="px-3 py-2 border-l hover:bg-gray-100">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
