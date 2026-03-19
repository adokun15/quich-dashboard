import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function SingleCategory() {
  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">Category</h2>
        </article>

        <article className="flex items-center gap-3">
          {/* Edit, View Order, Delete */}
          <button className="text-danger">View</button>
          <button className="text-danger">Share</button>
        </article>
      </section>

      <form className=" space-y-4">
        <Card>
          <div>
            <p>Name</p>
            <input />
          </div>

          <div>
            <p>Visibility</p>
            <input />
          </div>
        </Card>

        <Card className="space-y-3">
          <article>
            <h3 className="font-semibold">Products</h3>
            <p className="text-desc text-muted">Add product to this category</p>
          </article>
          <div>
            <ul className="list-disc text-based">
              <li className="">
                <p>Milk</p>
              </li>
              <li>
                <p>Cowbell</p>
              </li>
            </ul>
          </div>
          <button className="underline">Add Product</button>
        </Card>
      </form>
      <article className="flex justify-between">
        <button>Save</button>
        <button>Delete</button>
      </article>
    </main>
  );
}
