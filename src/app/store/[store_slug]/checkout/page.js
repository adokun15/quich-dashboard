"use client";

import Card from "@/components/card";
import ErrorText from "@/components/errorText";
import { CreateOrder } from "@/server/order/CreateOrder";
import { getCart } from "@/utils/state/cart/cartslice";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Checkout() {
  const { store_slug: storeLink } = useParams();

  const [customerName, setCustomerName] = useState({
    enteredValue: "",
    error: null,
  });
  const [customerPhone, setCustomerPhone] = useState({
    enteredValue: "",
    error: null,
  });

  //load cart;
  const { cart, store_id } = useSelector((state) => state.cart);

  //Dispatch function
  const dispatch = useDispatch();

  //Load cart once
  useEffect(() => {
    dispatch(getCart({ storeId: storeLink }));
  }, [dispatch, storeLink]);

  //Monitor Changes;
  const handlerCustomerPhone = (e) => {
    const phone = +e.target.value;

    //Check for more condition
    if (typeof phone !== "number" || isNaN(phone)) {
      setCustomerPhone((p) => {
        return {
          error: "Enter a valid phone number!",
          enteredValue: p?.enteredValue,
        };
      });

      return;
    }
    setCustomerPhone(() => {
      return {
        error: "",
        enteredValue: phone,
      };
    });
  };

  const handlerCustomerName = (e) => {
    const value = e.target.value;

    //Check for more condition
    if (!isNaN(+value) && value !== "") {
      setCustomerName((prev) => {
        return {
          error: "Enter a valid String for your name",
          enteredValue: prev?.enteredValue,
        };
      });
      return;
    }

    setCustomerName(() => {
      return {
        error: "",
        enteredValue: value,
      };
    });
  };

  const checkoutHandler = async () => {
    //Validate input

    //name
    if (customerName?.enteredValue.length <= 2) {
      setCustomerName((prev) => {
        return {
          error: "Enter a valid String",
          enteredValue: prev?.enteredValue,
        };
      });
      return;
    }

    //phone number
    if (String(customerPhone?.enteredValue).length !== 10) {
      setCustomerPhone((p) => {
        return {
          error: "Incomplete phone number",
          enteredValue: p.enteredValue,
        };
      });
      return;
    }

    const order = await CreateOrder({
      cart,
      store_id,
      customer: {
        name: customerName?.enteredValue,
        phone: customerPhone?.enteredValue,
      },
    });

    console.log(order);
    /*  
    console.log({
      customer: {
        phone: String(customerPhone.enteredValue),
        email: customerEmail.enteredValue,
        name: customerName.enteredValue,
      },
      storeLink,
      items: data?.cart,
      merchantId: data?.merchantId,
      cartId: data?.cartId,
    });
    
    await paymentRequest({
      customer: {
        phone: String(customerPhone.enteredValue),
        email: customerEmail.enteredValue,
        name: customerName.enteredValue,
      },
      storeLink,
      items: data?.cart,
      merchantId: data?.merchantId,
      cartId: data?.cartId,
    })
      .unwrap()
      .then((data) => {
        if (!data) return;
        //Provide route
        window.location.href = data.url;

        //Clear cookie
        clearCookie(storeLink);

        //Save latest
        localStorage.setItem("code", data.code);
      }) //url
      .catch((err) => {
        setPaymentError(
          err?.data?.message ||
            "SOMETHING WENT WRONG. CAN'T REACH PAYMENT GATEWAY"
        );
      });*/
  };
  console.log(cart);
  return (
    <main className="md:w-3/5 my-5 md:mx-auto space-y-4 overflow-x-hidden">
      <h1 className="font-sans_serif md:text-5xl text-3xl border-b-2 w-fit m-auto px-3 border-l-2  text-center md:text-start text-teal-800">
        CheckOut
      </h1>
      {<ErrorText>{""}</ErrorText>}
      <Card className="space-y-4 mx-4 shadow shadow-gray-300">
        <h2 className="font-bold text-2xl font-sans_serif">
          Customer Information
        </h2>
        <label className="text-xl mt-4 block font-roboto">
          <span>Name</span>
          {customerName.error && (
            <span className="block text-[16px] text-red-600">
              {customerName?.error}
            </span>
          )}
          <input
            onChange={handlerCustomerName}
            value={customerName.enteredValue}
            required
            placeholder="Enter your Name"
          />
        </label>

        <label className="text-xl mt-4 block font-roboto">
          <span>Active WhatApp Contact</span>
          {customerPhone.error && (
            <span className="block text-[16px] text-red-600">
              {customerPhone?.error}
            </span>
          )}
          <input
            clx="w-full font-roboto text-xl"
            onChange={handlerCustomerPhone}
            value={customerPhone.enteredValue}
            placeholder="Allow merchant reach out to you"
          />
        </label>
      </Card>

      <Card className="mx-4 space-y-4">
        <h2 className="font-bold text-2xl font-sans_serif">Cart Items</h2>
        <p>
          <Link className="hover:underline my-3 text-teal-700" href={`/`}>
            <FontAwesomeIcon icon={faArrowLeft} /> Keep Shopping
          </Link>
        </p>

        {cart && cart?.length > 0 && (
          <ul className="divide-y-2">
            {cart?.map((item) => (
              <li
                key={item?.productId}
                className="flex justify-between md:gap-6 "
              >
                <div className="space-x-3">
                  <h2 className="font-bold text-xl font-oswald">{item.name}</h2>
                  <p className="italic text-gray-400">x {item.qty}</p>
                </div>
                <article>NGN{item.total}</article>
              </li>
            ))}
          </ul>
        )}

        <p className="my-4 flex items-center justify-between">
          <span className=" text-2xl font-bold font-sans_serif">Total</span>
          NGN{cart?.reduce((acc, cur) => acc + cur.total, 0)}
        </p>
      </Card>

      <button
        onClick={checkoutHandler}
        className="bg-teal-800 hover:bg-teal-700 transition-colors w-full font-roboto text-xl tracking-wider md:w-fit md:mx-auto mx-4 text-white px-4 py-2 rounded"
      >
        Complete Order
        {/*isLoading ? <Loader /> : "Make Payment"*/}
      </button>
    </main>
  );
}
