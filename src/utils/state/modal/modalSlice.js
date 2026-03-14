//all modal trigger!
//Use global state management for user cart!

import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "modal",
  initialState: {
    cart_modal: false,
    product_modal: { show: false, product: {} },
  },
  reducers: {
    CartModalToggle: (state) => {
      state.cart_modal = !state.cart_modal;
    },

    ProductModalToggle: (state, action) => {
      if (!state.product_modal.show) {
        state.product_modal.product = action.payload.product;
      }

      state.product_modal.show = !state.product_modal.show;
    },
  },
});

export const { CartModalToggle, ProductModalToggle } = ModalSlice.actions;

export const { reducer: ModalReducer } = ModalSlice;
