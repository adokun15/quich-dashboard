//

"use client";

import { ProductModalToggle } from "@/utils/state/modal/modalSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function ItemsListInStore({ products }) {
  //const {product_modal} = useSelector(s => s.modal)

  //Dispatch with payload
  const dispatch = useDispatch();

  const openModal = (product) => {
    dispatch(ProductModalToggle({ product }));
  };

  return (
    <div>
      {/*   <p className="text-red-600 font-bold tracking-wider font-oswald text-center my-10">
        {isError && (error?.message || "Could not load Store!")}
      </p>
 */}

      {/*!isError && (*/}

      <ul
        className="grid-cols-1 w-full gap-4 
      sm:grid-cols-2 md:grid-cols-3 
      grid gap-x-4 justify-normal
       gap-y-2 max-w-full"
      >
        {products?.length > 0 &&
          products?.map((product) => (
            <li
              onClick={() => openModal(product)}
              key={product.id}
              className=" hover:cursor-pointer mx-auto bg-primary90
              shadow shadow-gray-200 pb-4 overflow-hidden w-fit h-fit"
            >
              <Image
                src={
                  product?.images ? product?.images[0] : "/icons/gray_logo.png"
                }
                alt={product?.name}
                width={200}
                height={250}
                className="w-auto h-auto"
              />
              <p className="mx-2 mt-4 text-based font-medium text-pretty text-teal-900 font-sans_serif">
                {product?.name}
              </p>
              <p className=" mx-2 font-medium text-muted text-desc tracking-wide font-roboto">
                NGN{product?.price}
              </p>
            </li>
          ))}
        {products && products.length === 0 && (
          <p className="text-center my-3 text-xl font-oswald">
            No product available at the moment
          </p>
        )}
      </ul>
    </div>
  );
}
