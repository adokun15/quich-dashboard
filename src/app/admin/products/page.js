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

const getStoreProducts = async () => {
  try {
    // Get User Cookies first: 30mins
    const cookie = await cookies();
    const user_token = cookie?.get("quich_login_token");

    if (!user_token) {
      redirect("/");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products`,
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
        products: [],
        current_page: 2, // 10 - 20 ordered
        total_products: 130,
      },
    };
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function ProductsPage() {
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
  return (
    <>
      <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
        <div className="flex justify-between px-4">
          <div>
            <h2 className="text-6">Products</h2>
            <p className="text-muted text-2">
              Manage all items and inventory on your store
            </p>
          </div>

          <p className="text-3 text-primary font-medium">
            Add product via whatsapp{" "}
          </p>
        </div>

        <ProductTableInfo />
      </main>
    </>
  );
}
