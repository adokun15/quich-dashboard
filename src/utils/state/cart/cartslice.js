//Use global state management for user cart!
import cookies from "js-cookies";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    cart: [],
    merchant_id: "",
    cartId: "",
  },
  reducers: {
    getCart: (state, action) => {
      const active_store = action.payload?.storeId;

      const cartInCookies = cookies.getItem(`quich_${active_store}`);

      const { cart, merchant_id, cartId, totalPrice } = cartInCookies
        ? JSON.parse(cartInCookies)
        : {};

      //Initialize
      state.cart = cart || [];
      state.merchant_id = merchant_id || "";
      state.cartId = cartId || "";
      state.totalPrice = totalPrice || 0;
    },

    addSingleItemToCart: (state, action) => {
      const { item, store } = action?.payload;

      //destructed Item Object
      const {
        product_name,
        product_img,
        price,
        merchant_id,
        product_id,
        qty,

        //   //role, //new
        //  productQty,
      } = item;

      //Cookies
      const cookieCartItem = cookies.getItem(`quich_${store}`);

      //previous Info Loaded
      const previousCartItem = cookieCartItem && JSON.parse(cookieCartItem);

      //empty Again
      let cart = [];

      if (previousCartItem) {
        //reloaded
        cart = [...previousCartItem?.cart];

        //previous item INDEX
        const existingCartItemIndex = previousCartItem.cart?.findIndex(
          (prev) => prev.product_id === product_id,
        );

        //Previous Item that exist before
        const oneItem = previousCartItem?.cart[existingCartItemIndex];

        if (oneItem) {
          //New Item to be ( added ) to item by: total: price*qty, qty: prev.qty + new qty
          const newCartList = {
            ...oneItem,
            qty: +oneItem.qty + +qty,
            total: (+qty + Number(oneItem.qty)) * +price,
          };

          cart[existingCartItemIndex] = newCartList;
        } else {
          //New Item
          const amt = qty * price;
          cart = [
            {
              product_name,
              product_id,
              qty,
              price,
              total: amt,
              product_img,
              //role,
              //stock: productQty,
            },
            ...previousCartItem?.cart,
          ];
        }

        const totalPrice = cart?.reduce((acc, cur) => acc + cur?.total, 0);

        //update State;
        state.cart = cart;
        state.merchant_id = merchant_id;
        state.cartId = previousCartItem?.cartId;
        state.totalPrice = totalPrice;

        //update cart:
        cookies.setItem(
          `quich_${store}`,
          JSON.stringify({
            cart,
            merchant_id,
            cartId: previousCartItem?.cartId,
            totalPrice,
          }),
          {
            expires: 2 * 24 * 60 * 60 * 1000,
          },
        );
      } else {
        //order id generator
        const date = new Date();
        const generateRandomDigit = date.getTime();

        //Store Initially
        const amt = qty * price;
        cart = [
          {
            product_name,
            total: amt,
            qty,
            // stock: productQty,
            //role,
            price,
            product_id,
            product_img,
          },
        ];

        const cart_data = {
          cart,
          merchant_id,
          cartId: generateRandomDigit,
          totalPrice: +qty * +price,
        };

        //Set pre cookies
        cookies.setItem(`quich_${store}`, JSON.stringify(cart_data), {
          expires: 2 * 24 * 60 * 60 * 1000,
        });

        //update State;
        state.cart = cart_data.cart;
        state.merchant_id = cart_data.merchant_id;
        state.cartId = cart_data.cartId;
        state.totalPrice = cart_data.totalPrice;
      }
    },

    updateCart: (state, action) => {
      const { status, itemId, store } = action.payload;

      //Cookies
      const cookieCartItem = cookies.getItem(`quich_${store}`);

      //previous Info Loaded
      const allCartItem = cookieCartItem && JSON.parse(cookieCartItem);

      //empty Again
      let cart = [];
      let totalPrice = 0;

      //item to be updated
      const oldItem = allCartItem.cart?.find(
        (item) => item.product_id === itemId,
      );

      if (status === "ADD") {
        totalPrice += +allCartItem.totalPrice + +oldItem.price;
        const newItems = allCartItem.cart.map((item) => {
          return {
            ...item,
            qty: item.product_id === itemId ? +item?.qty + 1 : +item.qty,
            total:
              item.product_id === itemId
                ? (+item?.qty + 1) * +item.price
                : +item.total,
          };
        });
        cart = [...newItems];
      }
      if (status === "LESS") {
        totalPrice += +allCartItem.totalPrice - +oldItem.price;
        const newItems = allCartItem.cart.map((item) => {
          return {
            ...item,
            qty: item.product_id === itemId ? +item?.qty - 1 : +item.qty,
            total:
              item.product_id === itemId
                ? (+item?.qty - 1) * +item.price
                : +item.total,
          };
        });
        cart = [...newItems];

        if (+oldItem.qty === 1) {
          const othercart = allCartItem.cart.filter(
            (item) => item.product_id !== itemId,
          );
          cart = [...othercart];
          totalPrice = othercart?.reduce((acc, cur) => acc + cur?.total, 0);
        }
      }

      //update State;
      state.cart = cart;
      state.merchant_id = allCartItem.merchant_id;
      state.cartId = allCartItem.cartId;
      state.totalPrice = totalPrice;

      cookies.setItem(
        `quich_${store}`,
        JSON.stringify({
          cart,
          merchant_id: allCartItem.merchant_id,
          cartId: allCartItem.cartId,
          totalPrice,
        }),
        {
          expires: 2 * 24 * 60 * 60 * 1000,
        },
      );
    },

    removeItemFromCart: (state, action) => {
      const { itemId, storeId } = action.payload;

      //Cookies
      const cookieCartItem = cookies.getItem(`quich_${storeId}`);

      //previous Info Loaded
      const allCartItem = cookieCartItem && JSON.parse(cookieCartItem);

      //empty Again
      let cart = [];
      let totalPrice = 0;

      const othercart = allCartItem.cart.filter(
        (item) => item.product_id !== itemId,
      );
      cart = [...othercart];

      totalPrice = othercart?.reduce((acc, cur) => acc + cur?.total, 0);

      cookies.setItem(
        `quich_${storeId}`,
        JSON.stringify({
          cart,
          merchantId: allCartItem.merchantId,
          cartId: allCartItem.cartId,
          totalPrice,
        }),
        {
          expires: 2 * 24 * 60 * 60 * 1000,
        },
      );

      state.cart = cart;
      state.merchant_id = allCartItem.merchant_id;
      state.cartId = allCartItem.cartId;
      state.totalPrice = totalPrice;
    },
  },
});

export const { getCart, removeItemFromCart, updateCart, addSingleItemToCart } =
  cartSlice.actions;

export const { reducer: cartReducer } = cartSlice;
