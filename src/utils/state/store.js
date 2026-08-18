import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cartslice";
import { ModalReducer } from "./modal/modalSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: ModalReducer,
  },
});

export default store;
