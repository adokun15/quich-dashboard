/* Show Table */
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Actions;

export default function CustomersTableInfo({
  customers,
  total_customers,
  page,
}) {
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
              Customer
            </th>
            <th className="px-6 py-3 text-nowrap">Tag</th>
            <th className="px-6 py-3 text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.length &&
            customers?.map((customer) => (
              <tr key={customer?.customer_id}>
                <td>
                  <h3>{customer?.name}</h3>
                  <p>0{customer?.phone}</p>
                </td>
                <td>{customer?.tag || "No tag"}</td>
                <td>Edit</td>
              </tr>
            ))}
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
