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
/*
import { Button } from "@/components/ui/button.jsx";
import Card from "@/components/Card.jsx";
import AddProduct from "@/pages/prompts/add-product.jsx";
import { useGetUserQuery } from "@/state/endpoints/user.js";
import { useGetMerchantQuery } from "@/state/endpoints/store.js";
import DemoProductImg from "@/asset/product-demo.png";

import {
  useGetAllProductQuery,
  useRemoveSingleProductMutation,
} from "@/state/endpoints/products.js";
import { Naira } from "@/helper/Naira.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProductTableSkeleton } from "@/helper/Skeletons.jsx";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Settings2 } from "lucide-react";

export default function ProductComponent() {
  const [query, setQuery] = useState("");

  const [DashboardModal, toggleModal] = useState(false);

  //User Db
  const { data: currentUserData, isLoading: userLoading } = useGetUserQuery();

  //Mechant user
  const { data: currentMerchantData } = useGetMerchantQuery(
    `${currentUserData?.link}_${currentUserData?.userId}`,
    { skip: !currentUserData?.link }
  );

  //Trigger And control single product edit
  const controlledProductModal = () => {
    toggleModal((s) => !s);
  };

  //Get All product from Database
  const {
    productsList,
    productLoading,
    productFetching,
    isProductError,
    productError,
  } = useGetAllProductQuery(currentUserData?.link, {
    skip: !currentUserData?.link,
    selectFromResult: (res) => {
      return {
        productLoading: res.isLoading,
        productFetching: res.isFetching,
        isProductError: res.isError,
        productError: res.error,
        productsList: res?.data?.products
          ?.map((product) => {
            return {
              ...product,
              productName: product?.productName?.toLowerCase(),
            };
          })
          .filter((product) =>
            product?.productName?.includes(query.toLowerCase())
          ),
      };
    },
  });

  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useRemoveSingleProductMutation();

  //complete
  const triggerDeleteProduct = async (data) => {
    await deleteProduct({
      hasImage: data?.img,
      uid: currentUserData?.userId,
      link: currentUserData?.link,
      productId: data?.id,
    })
      .then(() => {
        toast.success(`Item has been removed!`);
      })
      .catch((err) => {
        toast.error(
          err?.message || err?.data?.message || "Could not delete product"
        );
      });
  };

  return (
    <>
      <AddProduct
        link={currentUserData?.link}
        uid={currentUserData?.userId}
        bank={currentUserData?.account}
        phone={currentMerchantData?.phone}
        modal={DashboardModal}
        controlModal={controlledProductModal}
      />

      {isProductError && <p>{productError?.message}</p>}

      {!isProductError && (
        <Card className="flex justify-between">
          <h2 className="text-xl fira-sans-medium t">Products</h2>
          <Button
            onClick={controlledProductModal}
            clxName="bg-teal-800 text-white"
          >
            {productsList ? "Create new product" : "+ Add product"}
          </Button>
        </Card>
      )}

      {!isProductError && (
        <Card className="items-center flex justify-between pb-4">
          <Button variant="link">
            <p>Filter Product</p>
            <span>
              <Settings2 />
            </span>
          </Button>
          <input
            className="block py-2 px-4 outline-none  focus:border-teal-800 focus:ring-teal-800 ring-1 w-80 rounded-lg border border-gray-300 text-sm text-gray-900  bg-gray-100"
            placeholder="Search For Product by name"
            onChange={(e) => setQuery(e.target.value?.toLowerCase())}
          />
        </Card>
      )}

      {(userLoading || productLoading || productFetching) && (
        <ProductTableSkeleton />
      )}

      {!userLoading && !productLoading && !productFetching && !productError && (
        <Card className="relative overflow-x-auto">
          {productsList && productsList.length > 0 && (
            <>
              <table className="w-full text-gray-500  text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-nowrap">Product Image</th>
                    <th className="px-6 py-3 text-nowrap">Orders</th>
                    <th className="px-6 py-3 text-nowrap">Published</th>
                    <th className="px-6 py-3 text-nowrap"> Price</th>
                    <th className="px-6 py-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((product) => (
                    <tr
                      key={product?.productId}
                      className="odd:bg-white  border-b hover:bg-gray-100"
                    >
                      <td
                        className={`${
                          product?.productImage && " overflow-hidden"
                        } w-6 my-4 h-6 px-6 py-4`}
                      >
                        <img
                          src={
                            product?.productImage !== "" &&
                            product?.productImage
                              ? product?.productImage
                              : DemoProductImg
                          }
                          alt={product?.productName}
                          className={
                            product?.productImage && "aspect-square bg-cover"
                          }
                        />
                      </td>

                      <th className="px-6 py-4 font-medium text-gray-900 text-nowrap whitespace-nowrap">
                        {product?.productName?.toLowerCase()}
                      </th>
                      <td className="px-6 py-4">{product?.orders?.length}</td>
                      <td className="px-6 py-4 text-nowrap">
                        {product?.published ? "Yes" : "No"}
                      </td>

                      
                      <td className="px-6 font-roboto py-4 font-bold text-xl text-nowrap">
                        <Naira>{+product?.price}</Naira>
                      </td>
                      <td className="px-6 flex gap-2 items-center py-4">
                        <>
                          <button
                            className="hover:bg-yellow-300 hover:text-yellow-700
                           transition-colors duration-500 text-xl border border-solid bg-yellow-500 border-yellow-500 p-1 px-3 text-white rounded"
                          >
                            <Link
                              to={`/dashboard/products/${product?.productId}`}
                            >
                              View
                            </Link>
                          </button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="text-xl text-white bg-red-600 rounded p-1 px-3">
                                Delete
                              </Button>
                            </DialogTrigger>

                            <DialogContent>
                              <DialogTitle>
                                Delete {product?.productName}?
                              </DialogTitle>
                              <Button
                                variant="destructive"
                                onClick={async () =>
                                  triggerDeleteProduct({
                                    id: product?.productId,
                                    name: product?.productName,
                                    img: product?.productImage,
                                  })
                                }
                              >
                                {deleteProductLoading
                                  ? "deleting..."
                                  : "Delete"}
                              </Button>
                              <DialogClose>Close</DialogClose>
                            </DialogContent>
                          </Dialog>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {(!productsList || productsList.length === 0) &&
            !userLoading &&
            !productLoading &&
            !productFetching && <p>No product available.</p>}
        </Card>
      )}
    </>
  );
}
*/