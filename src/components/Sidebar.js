//Sidebar

"use client";

import {
  faHouse,
  faBox,
  faLayerGroup,
  faReceipt,
  faUsers,
  faStore,
  faCircleQuestion,
  faMessage,
  faLightbulb,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavItem from "./NavItem";

const navigation = [
  { href: "/admin", label: "Overview", icon: faHouse },
  { href: "/admin/products", label: "Products", icon: faBox },
  { href: "/admin/category", label: "Categories", icon: faLayerGroup },
  { href: "/admin/orders", label: "Orders", icon: faReceipt },
  { href: "/admin/customers", label: "Customers", icon: faUsers },
  { href: "/admin/store", label: "Store", icon: faStore },
];

export default function Sidebar({ open = false, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 h-full w-full bg-black/40 md:hidden"
        />
      )}

      <aside
        id="dashboard-sidebar"
        aria-label="Dashboard navigation"
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-border bg-white
          transition-transform duration-200 ease-out
          md:sticky md:top-0 md:z-auto md:h-[calc(100vh-5rem)]
          md:translate-x-0 md:rounded-xl md:border
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile sidebar heading */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5 md:hidden">
          <span className="font-semibold text-text">Menu</span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-muted hover:bg-background hover:opacity-100"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Store management
          </p>

          <nav className="space-y-1">
            {navigation.map(({ href, label, icon }) => (
              <NavItem key={href} href={href} onClick={onClose}>
                <FontAwesomeIcon icon={icon} className="w-4 shrink-0" />
                <span>{label}</span>
              </NavItem>
            ))}
          </nav>
        </div>

        {/* Support section */}
        <div className="border-t border-border p-3">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Help & support
          </p>

          <a
            href="mailto:support@quich.shop"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-background hover:text-text"
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="w-4" />
            Contact support
          </a>

          <a
            href="https://quichshop.canny.io/what-should-we-add"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-background hover:text-text"
          >
            <FontAwesomeIcon icon={faLightbulb} className="w-4" />
            Feature requests
            <FontAwesomeIcon icon={faMessage} className="ml-auto text-xs" />
          </a>
        </div>
      </aside>
    </>
  );
}

/*
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
        
        <p>Home</p>
      </NavItem>

      <NavItem
        href="/admin/products"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        
        <p>Products</p>
      </NavItem>

      <NavItem
        href="/admin/category"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        
        <p>Category</p>
      </NavItem>
      <NavItem
        href="/admin/orders"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        
        <p>Orders</p>
      </NavItem>

      <NavItem
        href="/admin/customers"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        
        <p>Customers</p>
      </NavItem>

      <NavItem
        href="/admin/store"
        className="flex px-6 rounded-full py-2 gap-2 items-center"
      >
        
        <p>Store</p>
      </NavItem>
    </main>
  );
}
*/
