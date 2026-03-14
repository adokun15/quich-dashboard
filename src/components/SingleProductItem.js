"use client";

import { addSingleItemToCart } from "@/utils/state/cart/cartslice";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Image from "next/image";
import ButtonNumber from "./ButtonNumber";

/*
import { useParams } from "react-router-dom";
import {
  useAddSingleItemToCartMutation,
  useGetAllStoreItemsQuery,
  useGetCartQuery,
} from "@/state/endpoints/store.js";
import { Loader } from "@/helper/Loading.jsx";
import Button from "./Button.jsx";

import InputNumber from "@/helper/InputNumber.jsx";
import { useEffect, useState } from "react";
import { Naira } from "@/helper/Naira.jsx";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog.jsx";
*/

export default function SingleItemDisplay({ product, close, modal: isOpen }) {
  //Get store link
  const { store_slug: storeLink } = useParams();

  //Quantity
  const [qty, setQty] = useState(1);

  //Load current Cart
  //const { prevItem } = useGetCartQuery(storeLink, {
  //  skip: !storeLink,
  //  selectFromResult: ({ data }) => {
  //  return {
  //       prevItem: data?.cart.find((item) => item.productId === itemId),
  //    };
  //  },
  // });

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //Add to Cart
  const CartHandler = (item) => {
    dispatch(
      addSingleItemToCart({
        item: { ...item, price: item?.amount, qty },
        store: storeLink,
      }),
    );

    //Close Modal
    close();

    //Reset Quantity
    setQty(1);
  };

  //Increment qty
  const incrementHandler = () => {
    setQty((prev) => prev + 1);
  };

  //Decrement qty
  const decrementHandler = () => {
    setQty((prev) => prev - 1);
  };

  //const [maxStockLeft, setMaxStockLeft] = useState(0);
  //const [prevPriceAdded, setPrice] = useState(0);

  //useEffect(() => {
  //if (prevItem) {
  //  setMaxStockLeft(+prevItem.stock - +prevItem?.qty);
  // } else {
  //  setMaxStockLeft(+product?.productQty);
  // }
  //}, [prevItem, product?.productQty]);

  //if (isLoading) {
  //  return "..."
  // }

  //  let theValueLimitReached =
  //  (+prevItem?.total || 0) + qty * +product?.price >
  //product?.productQty * product?.price;

  return (
    <Modal show={isOpen}>
      <div className="bg-white relative">
        <h1 className="text-center md:text-3xl  text-2xl font-sans_serif">
          {product?.product_name}
        </h1>

        {/*product?.product_img && (
          <div>
            <Image
              src={product?.product_img[0] || null}
              width={160}
              height={160}
              className="mx-auto block"
              alt="product"
            />
          </div>
        )*/}

        {product?.description && (
          <div className=" text-xl space-x-2 my-4 font-roboto text-gray-500">
            <span className="text-yellow-400 text-3xl font-serif ">~</span>
            <span>{product?.description}</span>
          </div>
        )}

        <div className="my-2 ">
          <ButtonNumber
            increment={incrementHandler}
            decrement={decrementHandler}
            value={qty}
          />
        </div>

        <p className="flex my-2 space-x-3">
          <span className="font-bold font-roboto ">Amount</span>
          NGN{+product?.amount}
        </p>

        <div className="my-4 flex gap-4 flex-wrap">
          <button
            // disabled={theValueLimitReached}
            onClick={() => CartHandler(product)}
            type="button"
            //  clxName="flex disabled:opacity-40 justify-between gap-4 w-full bg-teal-800 text-white"
          >
            <p>Add to Cart</p>
            {/* <Naira>
              {theValueLimitReached
              ? prevItem?.total
              : (+prevItem?.total || 0) + qty * +product?.price}
              </Naira> 
              */}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**    <Dialog open={modal} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>
          <h1 className=" text-center md:text-3xl  text-2xl font-sans_serif">
            {product?.productName}
          </h1>
        </DialogTitle>

        {product?.productImage && (
          <div>
            <img
              src={product?.productImage}
              width={160}
              height={160}
              className="mx-auto block"
              alt="product"
            />
          </div>
        )}

        {product?.description && (
          <div className=" text-xl space-x-2 my-4 font-roboto text-gray-500">
            <span className="text-yellow-400 text-3xl font-serif ">~</span>
            <span>{product?.description}</span>
          </div>
        )}

        <div className="my-2 ">
          <InputNumber
            increment={incrementHandler}
            decrement={decrementHandler}
            value={qty}
            max={maxStockLeft}
          />
        </div>

        <p className="flex my-2 space-x-3">
          <span className="font-bold font-roboto ">Price</span>
          <Naira>{+product?.price}</Naira>
        </p>

        <div className="my-4 flex gap-4 flex-wrap">
          <Button
            disabled={theValueLimitReached}
            onClick={() => CartHandler(product)}
            type="button"
            clxName="flex disabled:opacity-40 justify-between gap-4 w-full bg-teal-800 text-white"
          >
            <p>Add to Cart</p>
            <Naira>
              {theValueLimitReached
                ? prevItem?.total
                : (+prevItem?.total || 0) + qty * +product?.price}
            </Naira>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
 */
