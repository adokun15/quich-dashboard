//Use global state management for user cart!
import cookies from "js-cookies";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 1000,
    cart: [
      {
        productName: "Moimoi",
        qty: 5,
        //role,
        price: 200,
        productId: "id-1",
        //stock: productQty,
        total: 1000,
        productImage: null,
      },
    ],
  },
  reducers: {
    getCart: (state, action) => {
      const active_store = action.payload?.storeId;

      const cartInCookies = cookies.getItem(`quich_${active_store}`);

      const cart = cartInCookies ? JSON.parse(cartInCookies) : state?.cart;

      state.cart = cart;
    },

    addSingleItemToCart: (state, action) => {
      const { item, store } = action?.payload;

      //destructed Item Object
      const {
        productName,
        productImage,
        qty,
        price,
        merchantId,
        productId,

        //    role, //new
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
          (prev) => prev.productId === productId,
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
              productName,
              qty,
              role,
              price,
              productId,
              //stock: productQty,
              total: amt,
              productImage,
            },
            ...previousCartItem?.cart,
          ];
        }

        //update cart:
        cookies.setItem(
          `quich_${store}`,
          JSON.stringify({
            cart,
            merchantId,
            cartId: previousCartItem?.cartId,
            totalPrice: cart?.reduce((acc, cur) => acc + cur?.total, 0),
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
            productName,
            total: amt,
            qty,
            // stock: productQty,
            role,
            price,
            productId,
            productImage,
          },
        ];

        //Set pre cookies
        cookies().set(
          `quich_${store}`,
          JSON.stringify({
            cart,
            merchantId,
            cartId: generateRandomDigit,
            totalPrice: +qty * +price,
          }),
          {
            expires: 2 * 24 * 60 * 60 * 1000,
          },
        );
      }

      state.cart = cart;
      // return {};
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
        (item) => item.productId === itemId,
      );

      if (status === "ADD") {
        totalPrice += +allCartItem.totalPrice + +oldItem.price;
        const newItems = allCartItem.cart.map((item) => {
          return {
            ...item,
            qty: item.productId === itemId ? +item?.qty + 1 : +item.qty,
            total:
              item.productId === itemId
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
            qty: item.productId === itemId ? +item?.qty - 1 : +item.qty,
            total:
              item.productId === itemId
                ? (+item?.qty - 1) * +item.price
                : +item.total,
          };
        });
        cart = [...newItems];

        if (+oldItem.qty === 1) {
          const othercart = allCartItem.cart.filter(
            (item) => item.productId !== itemId,
          );
          cart = [...othercart];
          totalPrice = othercart?.reduce((acc, cur) => acc + cur?.total, 0);
        }
      }

      cookies.setItem(
        `quich_${store}`,
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

      state.cart += cart;
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
        (item) => item.productId !== itemId,
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
    },
  },
});

export const { getCart, removeItemFromCart, updateCart, addSingleItemToCart } =
  cartSlice.actions;

export const { reducer: cartReducer } = cartSlice;
