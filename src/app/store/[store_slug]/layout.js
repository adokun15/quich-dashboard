"use client";

import store from "@/utils/state/store.js";
import { Provider } from "react-redux";

export default function StoreLayout({ children }) {
  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  );
}
