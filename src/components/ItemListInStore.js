//

"use client";

import Image from "next/image";

export default function ItemsListInStore({ products, openModal }) {
  return (
    <div>
      {/*   <p className="text-red-600 font-bold tracking-wider font-oswald text-center my-10">
        {isError && (error?.message || "Could not load Store!")}
      </p>
 */}

      {/*!isError && (*/}

      <ul className="md:grid block gap-4 md:grid-cols-2 my-5 space-y-4 md:space-y-0">
        {products &&
          products?.length > 0 &&
          products?.map((product) => (
            <li
              onClick={() => openModal(product?.productId)}
              key={product.productId}
              className="rounded-2xl hover:cursor-pointer m-auto shadow  shadow-gray-200 pb-4  overflow-hidden w-fit"
            >
              <Image
                src={product?.productImage}
                alt={product?.productName}
                className="max-h-[300px] min-w-[300px] max-w-[320px] min-h-4/5"
              />
              <p className="mx-2 mt-4 text-2xl font-bold text-pretty text-teal-900 font-sans_serif">
                {product?.productName}
              </p>
              <p className=" mx-2 font-bold tracking-wide font-roboto">
                NGN{+product?.price}
              </p>
            </li>
          ))}
        {(!products || products.length === 0) && (
          <p className="text-center my-3 text-xl font-oswald">
            No product available at the moment
          </p>
        )}
      </ul>
    </div>
  );
}
