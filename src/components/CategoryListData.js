// Category info;
"use client";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchInput from "./SearchInput";
import useQueryParams from "@/utils/state/FilterParams";
import { useRouter } from "next/navigation";

//Max per all store: 15;
export default function CategoryListData({ category, total_category }) {
  const router = useRouter();

  const toCategoryId = (id) => {
    router.push(`/admin/category/${id}`);
  };

  return (
    <div className="p-6 rounded bg-white">
      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <SearchInput
          placeholder="Search category..."
          className="w-80 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        {/*<button>Filter</button>*/}
      </div>

      {/* Data Display */}
      {category && category.length === 0 && <p>No Category yet</p>}
      {category && category.length > 0 && (
        <div className="overflow-hidden rounded-xl ">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th className="px-6 py-3 text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {category?.map((c) => (
                <tr
                  onClick={() => toCategoryId(c?.id)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                  key={c?.id}
                >
                  <td className="capitalize px-6 py-4 text-gray-700">
                    <h3>
                      <Link href={`/admin/category/${c?.id}`}>{c?.name}</Link>
                    </h3>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {c?.isvisible ? "Visible" : "Not visible"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Limit, Paginate */}
      <div className="flex justify-between">
        <p className="text-sm text-gray-600">
          Total <span className="font-semibold">{total_category}</span>
        </p>{" "}
      </div>
    </div>
  );
}
