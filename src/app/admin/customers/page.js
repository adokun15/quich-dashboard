import CustomersTableInfo from "@/components/CustomersTable";
import { ToggleButton } from "@/components/ToggleButton";
import {
  faInfoCircle,
  faPen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Access cookies for token;
const getCustomersData = async ({ filters }) => {
  try {
    // Get User Cookies first: 30mins
    // const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //   if (!user_token) {
    //   redirect("/");
    // }

    //Filter
    const filterstring = Object.entries(filters)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers?${filterstring}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token-ok`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: data?.message, status_code: data?.status_code };
    }

    return data.data;
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function CustomersPage({ searchParams }) {
  const filters = await searchParams;

  const customers = await getCustomersData({ filters });

  if (customers?.statusCode === 500) {
    return (
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">Customers</h2>
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
            <h2 className="text-2xl font-medium">Customers</h2>
            <p className="text-muted text-2">Manage Customer Relationship</p>
          </div>

          <button className="space-x-2 cursor-pointer">
            <span className="font-medium  text-base text-muted">
              How are customers added
            </span>
            <FontAwesomeIcon className="text-primary " icon={faInfoCircle} />
          </button>
        </div>

        <CustomersTableInfo {...customers} />
      </main>
    </>
  );
}
