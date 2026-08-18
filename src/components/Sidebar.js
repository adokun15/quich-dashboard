//Sidebar

import { faHome, faObjectGroup } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faFileInvoice,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <main
      className="flex flex-row md:flex-col
       max-w-fit shrink text-3
       md:bg-primary90 border-r-2 
       border-r-primary70 h-fit md:rounded-tr-xl md:rounded-br-xl shadow-xl  
       gap-x-4 w-full
      text-xl gap-y-2 pr-8 pl-2 py-2"
    >
      <NavItem
        href="/admin"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        {/* <FontAwesomeIcon icon={faBagShopping} className="text-primary" />*/}
        <p>Home</p>
      </NavItem>

      <NavItem
        href="/admin/products"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        {/* <FontAwesomeIcon icon={faBagShopping} className="text-primary" />*/}
        <p>Products</p>
      </NavItem>

      <NavItem
        href="/admin/category"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        {/* <FontAwesomeIcon icon={faBagShopping} className="text-primary" />*/}
        <p>Category</p>
      </NavItem>
      <NavItem
        href="/admin/orders"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        {/* <FontAwesomeIcon icon={faBagShopping} className="text-primary" />*/}
        <p>Orders</p>
      </NavItem>

      <NavItem
        href="/admin/customers"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        {/* <FontAwesomeIcon icon={faBagShopping} className="text-primary" />*/}
        <p>Customers</p>
      </NavItem>

      <NavItem
        href="/admin/store"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        {/* <FontAwesomeIcon icon={faBagShopping} className="text-primary" />*/}
        <p>Store</p>
      </NavItem>
    </main>
  );
}
