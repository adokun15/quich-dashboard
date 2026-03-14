//all modal trigger!
//Use global state management for user cart!

import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "modal",
  initialState: {
    cart_modal: false,
    product_modal: false,
  },
  reducers: {
    CartModalToggle: (state) => {
      state.cart_modal = !state.cart_modal;
    },
  },
});

export const { CartModalToggle } = ModalSlice.actions;

export const { reducer: ModalReducer } = ModalSlice;
