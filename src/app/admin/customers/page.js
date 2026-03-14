import { ToggleButton } from "@/components/ToggleButton";
import { faPen, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Access cookies for token;
const getCustomersData = async () => {
  try {
    // Get User Cookies first: 30mins
    const cookie = await cookies();
    const user_token = cookie?.get("quich_login_token");

    if (!user_token) {
      redirect("/");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token?.value}`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: data?.message, status_code: data?.status_code };
    }

    return {
      data: {
        merchant: {}, //From the token; 'name, store_name, slug_id, user_id'
        customers: [],
        total_customers: 13,
      },
    };
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function CustomersPage() {
  const customers = [];

  if (customers?.statusCode === 500) {
    return (
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">customers</h2>
            <p className="text-muted text-2">
              Keep track of all your business sales.
            </p>
          </div>
          <button className="px-6">
            <FontAwesomeIcon className="mr-3" icon={faPlus} />
            <span>create</span>
          </button>
        </div>
        <div className="flex gap-2">
          <input
            className=" rounded-full pl-2 "
            placeholder="Search product by name"
          />
          <button className="px-6 text-nowrap">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <p className="text-center text-2xl">{customers?.message}</p>
      </main>
    );
  }

  return (
    <>
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">customers</h2>
            <p className="text-muted text-2">Know who is buying from you</p>
          </div>
        </div>

        <article className="flex px-4 justify-between">
          <div>
            <p className="text-3 font-medium">Total customers: 8 </p>
          </div>

          <div>
            <input
              className=" min-w-2xl rounded-full pl-2 "
              placeholder="Search product by name"
            />
          </div>
        </article>

        <table className="w-full  text-gray-500  text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                CustomerID
              </th>
              <th className="px-6 py-3 text-nowrap">Customer Name</th>
              <th className="px-6 py-3 text-nowrap">Customer Phone</th>
              <th className="px-6 py-3 text-nowrap">Total Amount</th>
              <th className="px-6 py-3 text-nowrap">Blacklist</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ahmed.</td>
              <td>09067575746</td>
              <td>NGN60000</td>
              <td>
                <FontAwesomeIcon icon={faPen} />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divide-y-2"> </div>
      </main>
    </>
  );
}
