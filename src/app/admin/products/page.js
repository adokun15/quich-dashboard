import { ToggleButton } from "@/components/ToggleButton";
import {
  faChevronRight,
  faPen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@/components/card";
import ProductTableInfo from "@/components/ProductTable";
import CreateButtonAction from "@/components/CreateButton";

const getStoreProducts = async ({ filter = {} }) => {
  try {
    // Get User Cookies first: 30mins
    //const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //if (!user_token) {
    // redirect("/");
    // }

    //Filter
    const filterstring = Object.entries(filter)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products?${filterstring}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token-value`,
        },
      },
    );

    const data = await res.json();
    console.log(data);
    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: data?.message, status_code: data?.status_code };
    }

    return data?.data;
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export default async function ProductsPage({ searchParams }) {
  const filter = await searchParams;
  /* if (products?.statusCode === 500) {
    return (
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">Products</h2>
            <p className="text-muted text-2">
              Manage all items and inventory on your store
            </p>
          </div>
          <button className="px-6">
            <FontAwesomeIcon className="mr-3" icon={faPlus} />
            <span>Add</span>
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

        <p className="text-center text-2xl">{products?.message}</p>
      </main>
    );
  }
*/
  const products = await getStoreProducts({ filter });
  return (
    <>
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-2xl font-medium">Products</h2>
            <p className="text-muted text-2">
              Manage all items and inventory on your store
            </p>
          </div>

          <CreateButtonAction to="/admin/products/new">
            <span className="">Create Product</span>
            <FontAwesomeIcon
              className="text-primary hover:text-text"
              icon={faPlus}
            />
          </CreateButtonAction>
        </div>

        <ProductTableInfo {...products} />
      </main>
    </>
  );
}
