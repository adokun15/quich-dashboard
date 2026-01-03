//Sidebar

import { faHome, faObjectGroup } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faFileInvoice,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Sidebar() {
  return (
    <main
      className="flex flex-row md:flex-col text-3 md:bg-primary700 h-fit md:rounded-2xl gap-x-4 w-full
     overflow-x-auto md:max-w-[20%] lg:max-w- text-xl gap-y-2"
    >
      <article className="flex md:px-6 px-4 w-fit md:w-full gap-2 bg-primary700 items-center py-4 rounded">
        <FontAwesomeIcon className="text-primary" icon={faHome} />
        <p>
          <Link href="/store">Store</Link>
        </p>
      </article>

      <article className="flex md:px-6 px-2 w-fit md:w-full bg-primary700 gap-2 items-center py-4 rounded">
        <FontAwesomeIcon icon={faBagShopping} className="text-primary" />
        <p>
          <Link href="/products">Products</Link>
        </p>
      </article>

      <article className="flex  md:px-6 px-2 w-fit md:w-full gap-2  bg-primary700 items-center py-4 rounded">
        <FontAwesomeIcon icon={faFileInvoice} className="text-primary" />{" "}
        <p>
          <Link href="/orders">Orders</Link>
        </p>
      </article>
    </main>
  );
}
