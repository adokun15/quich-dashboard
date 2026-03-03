import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import { ToggleButton } from "@/components/ToggleButton";
import { getProducts } from "@/server/product/GetProducts";
import { faPen, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
//Product list Page:
export default async function ProductsPage() {
  //  const products = await getProducts("store_id");
  const products = [];

  if (products?.statusCode === 500) {
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
          <button className="px-6 bg-white shadow border-none text-underline text-primary">
            <FontAwesomeIcon className="mr-3" icon={faPlus} />
            <span>Add</span>
          </button>
        </div>

        <article className="flex px-4 justify-between">
          <div>
            <p className="text-3 font-medium">Total Products: 8 </p>
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
              <td>
                <ToggleButton defaultState={true} />
              </td>
              <td>
                <FontAwesomeIcon icon={faPen} />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="divide-y-2">
          {/*products &&
              products?.map((product) => (
                <div
                  className="px-4  py-2 flex items-center justify-between"
                  key={product?.productId}
                >
                  <div>
                    <p className="text-4 font-medium">{product?.name}</p>
                    <p className="text-2">NGN400</p>
                  </div>

                  <div className="flex gap-3">
                    <p>Yes</p>
                    <p>Edit</p>
                  </div>
                </div>
              ))*/}
        </div>

        {/*
        <div className="flex justify-between items-center">
          <p>
            Total product: <span className="text-xl font-semibold">3 / 30</span>
          </p>

          <div className="flex gap-x-4">
            <button>prev</button>
            <button>next</button>
          </div>
          </div>
     */}
      </main>
    </>
  );
}
