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

      <ul className="grid-cols-2 md:grid-cols-3 grid gap-x-3 gap-y-6 max-w-full">
        {products?.length > 0 &&
          products?.map((product) => (
            <li
              onClick={() => openModal(product)}
              key={product.product_id}
              className=" hover:cursor-pointer mx-auto bg-primary90
              shadow shadow-gray-200 pb-4 overflow-hidden w-54 h-fit"
            >
              <Image
                src={
                  product?.product_img
                    ? product?.product_img[0]
                    : "/icons/gray_logo.png"
                }
                alt={product?.product_name}
                width={120}
                height={120}
                className=""
              />
              <p className="mx-2 mt-4 text-based font-medium text-pretty text-teal-900 font-sans_serif">
                {product?.product_name}
              </p>
              <p className=" mx-2 font-medium text-muted text-desc tracking-wide font-roboto">
                NGN{product?.amount}
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
