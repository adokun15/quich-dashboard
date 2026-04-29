//all modal trigger!
//Use global state management for user cart!

import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "modal",
  initialState: {
    cart_modal: false,
    product_modal: { show: false, product: {} },
    admin_modal: false,
    dropdown: { tag: null, show: null },
    toaster_modal: { type: null, show: false, message: "", title: "" },
  },
  reducers: {
    ToasterModalToggle: (state, action) => {
      if (!state.toaster_modal.show) {
        state.toaster_modal = {
          type: action.payload.type,
          message: action.payload.message,
          title: action.payload.title,
        };
      }

      state.product_modal.show = !state.toaster_modal.show;
    },

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

export const { CartModalToggle, ProductModalToggle, ToasterModalToggle } =
  ModalSlice.actions;

export const { reducer: ModalReducer } = ModalSlice;
