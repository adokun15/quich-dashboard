/* Show Table */
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductTableInfo() {
  return (
    <main>
      {/* Search, Filter, Sort; */}
      <article className="flex px-4 justify-between">
        <div>
          <input
            className=" min-w-2xl rounded-full pl-2 "
            placeholder="Search product by name"
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
              S/N
            </th>
            <th className="px-6 py-3 text-nowrap">Product</th>
            <th className="px-6 py-3 text-nowrap">Price</th>
            <th className="px-6 py-3 text-nowrap">Mark as Soldout</th>
            <th className="px-6 py-3 text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Wiper Diaper</td>
            <td>NGN600</td>
            <td>wew</td>
            <td>
              <FontAwesomeIcon icon={faPen} />
            </td>
          </tr>
        </tbody>
      </table>

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
    </main>
  );
}
