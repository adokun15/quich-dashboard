//Sidebar

import { faHome, faObjectGroup } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <main className="flex flex-col  w-[20%] max-w-2xl text-xl gap-y-6">
      <div className="space-y-6">
        <article className="flex bg-card2 px-6 w-full gap-2 items-center py-4 rounded">
          <FontAwesomeIcon icon={faHome} />
          <p>Home</p>
        </article>

        <article className="flex bg-card2 px-6 w-full gap-2 items-center py-4 rounded">
          <FontAwesomeIcon icon={faBagShopping} />
          <p>Products</p>
        </article>
      </div>

      <div>
        <article className="flex bg-card2 px-6 w-full gap-2 items-center py-4 rounded">
          <FontAwesomeIcon icon={faShoppingBag} />
          <p>Edit Category</p>
        </article>
      </div>
    </main>
  );
}
