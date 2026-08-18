"use client";
/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveItemFromCartMutation,
} from "@/state/endpoints/store.js";
import InputNumber from "@/helper/InputNumber.jsx";
import { useEffect } from "react";
import { Naira } from "../helper/Naira.jsx";
import { Dialog, DialogContent } from "./ui/dialog.jsx";
*/

import { removeItemFromCart, updateCart } from "@/utils/state/cart/cartslice";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import ButtonNumber from "./ButtonNumber";

export default function Cart({ trigger: close, modal }) {
  const { store_slug } = useParams();

  //const { data: cart } = useGetCartQuery(store_slug, { skip: !storeLink });

  //get latest cart item
  const { cart, totalPrice, cartId, store_id } = useSelector(
    (state) => state.cart,
  );

  const dispatch = useDispatch();

  //Cart action: Update
  const incrementHandler = (id) => {
    dispatch(updateCart({ itemId: id, status: "ADD", store_id, store_slug }));
  };
  const decrementHandler = (id) => {
    dispatch(updateCart({ itemId: id, status: "LESS", store_id, store_slug }));
  };

  //Cart action: Remove
  const removeItem = (id) => {
    dispatch(removeItemFromCart({ itemId: id, store_slug, storeId: store_id }));
  };

  //Close modal if cart is empty

  return (
    <Modal show={modal}>
      <main className="bg-white">
        <div className="space-y-3  flex items-center">
          <h1 className="grow md:text-3xl text-center text-3xl font-sans_serif">
            Cart #{cartId}
          </h1>
          <button
            onClick={close}
            className="bg-gray-100 w-fit px-3 rounded-full"
          >
            <FontAwesomeIcon
              className="text-yellow-300 hover:text-yellow-400 transition-colors"
              icon={faX}
            />
          </button>
        </div>
        <div className="divide-y-2 my-6">
          {cart &&
            cart?.length > 0 &&
            cart?.map((item) => (
              <li key={item.product_id} className="list-none">
                <div className="flex px-4">
                  <h1 className="grow text-xl ">{item?.product_name}</h1>
                  <button onClick={() => removeItem(item.product_id)}>
                    <FontAwesomeIcon className="text-[16px]" icon={faX} />
                  </button>
                </div>

                <ButtonNumber
                  value={item?.qty}
                  type={"cart"}
                  decrement={() => decrementHandler(item.product_id)}
                  increment={() => incrementHandler(item.product_id)}
                />

                <p className="flex my-2 space-x-3">
                  <span className="font-bold font-roboto ">Total</span>
                  NGN{item?.total}
                </p>
              </li>
            ))}
        </div>
        <div>
          <Link onClick={close} href="checkout" className="block">
            <button
              className="bg-yellow-300  text-blue-950 w-full mt-5 py-2 rounded font-roboto
              transition flex md:justify-self-end md:gap-7 px-4 justify-between text-2xl 
              "
            >
              <p>{cart?.length}</p>
              <p>Checkout</p>
              NGN{cart?.reduce((acc, cur) => acc + cur?.total, 0)}
            </button>
          </Link>
        </div>
      </main>
    </Modal>
  );
}

/*

  <Dialog open={modal} onOpenChange={close}>
      <DialogContent>
        <div className="space-y-3 flex items-center">
          <h1 className="grow md:text-3xl text-center text-3xl font-sans_serif">
            Cart
          </h1>
          <Button onClick={close} className="bg-gray-100 w-fit px-3 rounded-full">
            <FontAwesomeIcon
              className="text-yellow-300 hover:text-yellow-400 transition-colors"
              icon={faX}
            />
          </Button>
        </div>
        <div className="divide-y-2 my-6">
          {cart?.cart?.map((item) => (
            <li key={item.productId} className="list-none">
              <div className="flex px-4">
                <h1 className="grow text-xl ">{item?.productName}</h1>
                <Button onClick={() => removeItem(item.productId)}>
                  <FontAwesomeIcon className="text-[16px]" icon={faX} />
                </Button>
              </div>

              <InputNumber
                value={+item?.qty}
                max={+item.stock}
                type={"cart"}
                decrement={() => decrementHandler(item.productId)}
                increment={() => incrementHandler(item.productId)}
              />
              <p className="flex my-2 space-x-3">
                <span className="font-bold font-roboto ">Total</span>
                <Naira>{item?.total}</Naira>
              </p>
            </li>
          ))}
        </div>

        <div>
          <Link onClick={close} to="checkout" className="block">
            <button
              className="bg-yellow-300  text-blue-950 w-full mt-5 py-2 rounded font-roboto
          transition flex md:justify-self-end md:gap-7 px-4 justify-between text-2xl 
          "
            >
              <p>{cart?.cart?.length}</p>
              <p>Checkout</p>
              <Naira>{cart?.totalPrice}</Naira>
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  
*/
