// Category info;

import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

//Max per all store: 15;
export default function CategoryListData({ category, pages, total_category }) {
  return (
    <div>
      <header className="flex justify-between">
        <article>
          <h3>Category</h3>
          <p className="text-muted">Group products into different category</p>
        </article>
        <article className="flex">
          <button>Share</button>
          <button>
            <Link href="/admin/category/new">Create</Link>
          </button>
        </article>
      </header>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <article className="grow">
          <input placeholder="Search category" />
        </article>

        <button>Filter</button>
      </div>

      {/* Data Display */}
      {category && category.length === 0 && <p>No Category yet</p>}
      {category && category.length > 0 && (
        <table className="w-full  text-gray-500  text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th className="px-6 py-3 text-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((c) => (
              <tr key={c?.id}>
                <td>
                  <h3>
                    <Link href={`/admin/category/${c?.id}`}>{c?.name}</Link>
                  </h3>
                </td>
                <td>{c?.isvisible ? "Visible" : "Not visible"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Limit, Paginate */}
      <div className="flex justify-between">
        <p className="text-3 font-medium grow">Total 8 </p>

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
    </div>
  );
}
