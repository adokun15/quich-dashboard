/*import { useGetAllStoreItemsQuery } from "@/state/endpoints/store.js";
import { Loader } from "@/helper/Loading.jsx";
import { Naira } from "@/helper/Naira.jsx";
import demo from "@/asset/product-demo.png";
import { useParams } from "react-router-dom";
*/

import ItemsListInStore from "./ItemListInStore";

export default function StoreProductsList({ store_slug, products }) {
  // const {
  // data: products,
  //    isLoading,
  //  isError,
  //   error,
  // } = useGetAllStoreItemsQuery(store_slug, {
  //   skip: !store_slug,
  //   fixedCacheKey: "store-items",
  // });

  //if (isLoading) {
  //  return <Loader />;
  //}

  return <ItemsListInStore products={products} />;
}

/*
 */
