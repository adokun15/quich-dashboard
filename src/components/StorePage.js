"use client";

import { getCart } from "@/utils/state/cart/cartslice";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreProfile from "./StoreProfile";
//import { SingleItemDisplay } from "./SingleProductItem";
import Cart from "./Cart";
import SingleItemDisplay from "./SingleProductItem";

/*

import { SingleItemDisplay } from "@/components/SingleProductItem.jsx";
import StoreProductsList from "@/components/productsList.jsx";
import StoreProfile from "@/components/StoreProfile.jsx";
import Cart from "@/components/Cart.jsx";

import { useState } from "react";
import Button from "@/components/Button.jsx";
import { Link, useParams } from "react-router-dom";

import {
  useAddSingleItemToCartMutation,
  useGetAllStoreItemsQuery,
  useGetCartQuery,
  useGetMerchantQuery,
} from "@/state/endpoints/store.js";
import { Naira } from "@/helper/Naira.jsx";
*/

export default function StorePageComponent({ children }) {
  const { store_slug: storeLink } = useParams();

  const [isCart, setToggle] = useState(false);
  const [itemId, setItemId] = useState(null);

  //For Cart and singleItem
  const [storeModalOpen, setModalToggle] = useState(false);

  const toggleModalCart = () => {
    setToggle(true);
    setModalToggle((p) => !p);
  };

  const toggleModalItem = (id = null) => {
    setToggle(false);
    setItemId(id);
    setModalToggle((p) => !p);
  };

  //load cart;
  const { cart, totalPrice } = useSelector((state) => state.cart);

  //Dispatch function
  const dispatch = useDispatch();

  //Load cart once
  useEffect(() => {
    dispatch(getCart({ storeId: storeLink }));
  }, [dispatch, storeLink]);

  //const [addToCart, { data: added_message }] = useAddSingleItemToCartMutation({
  //  fixedCacheKey: "add_to_cart",
  // });

  //const { isLoading, isError } = useGetAllStoreItemsQuery(storeLink, {
  //  skip: !storeLink,
  //  fixedCacheKey: "store-items",
  //});

  // const { isError: isMerchantError, error: merchantError } =
  // useGetMerchantQuery(storeLink, {
  //   fixedCacheKey: "store-merchant",
  // });

  return (
    <main className="relative md:flex md:h-screen">
      <>
        <SingleItemDisplay
          modal={storeModalOpen && !isCart}
          itemId={itemId}
          close={toggleModalItem}
        />

        <Cart close={toggleModalCart} modal={storeModalOpen && isCart} />
      </>

      <main>{children}</main>

      <div className="pb-16 md:mx-[10vw] mx-1 my-[3vh]">
        {cart && cart?.length >= 1 && (
          // !isLoading &&
          // !isError &&
          //!isMerchantError && (
          <div className="fixed right-0 px-3 w-full py-2 bottom-0">
            <button
              className="w-full md:w-fit transition flex md:justify-self-end md:gap-7 justify-between font-sans_serif text-4xl px-4 py-2 bg-teal-800 rounded-full text-white"
              onClick={toggleModalCart}
            >
              <p>{cart?.length}</p>
              <p>Cart</p>
              NGN{totalPrice}
            </button>
          </div>
        )}

        {/*!isLoading && !isError && ()*/}
        <Link
          href="/auth"
          className="bg-white w-fit h-fit block px-4 mx-auto py-2 shadow hover:shadow-gray-300 mt-10 transition text-xl fira-sans-regular text-teal-800 "
        >
          Create your own Store
        </Link>
      </div>
    </main>
  );
}
