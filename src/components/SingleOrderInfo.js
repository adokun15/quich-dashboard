import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function SingleOrderInfo() {
  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">#123243</h2>
          <p className="text-desc text-muted">23 march 2026 18:14</p>
        </article>

        <article className="flex items-center gap-3">
          {/* Edit, View Order, Delete */}
          <button className="text-danger">...</button>

          <div>
            <button className="text-danger">
              {" "}
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="text-danger">
              {" "}
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <Card className="p-0 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Order Status</h2>
            <button className="bg-muted px-4 py-1 space-x-2 rounded">
              <span>Cancelled</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>

          {/* Item List */}
          <div className="border-b-border py-4 border-b">
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <article>
                  <h3 className="text-base font-semibold">Item Name 1</h3>
                  <p className="text-desc text-muted">
                    <span>NGN10</span> x <span>40</span>
                  </p>
                </article>
                <p className="font-semibold">NGN400</p>
              </li>

              <li className="flex items-center justify-between">
                <article>
                  <h3 className="text-base font-semibold">Item Name 2</h3>
                  <p className="text-desc text-muted">
                    <span>NGN400</span> x <span>35</span>
                  </p>
                </article>
                <p className="font-semibold">NGN3,500</p>
              </li>
            </ul>
          </div>
          {/* Item List Total */}
          <div className="flex justify-between">
            <p>Total</p>
            <p className="font-semibold">NGN8000</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Customer </h2>
            <button className="bg-input px-4 py-1 text-white rounded">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Name</p>
            <p className="text-desc text-muted">David</p>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Phone</p>
            <p className="text-desc text-muted">+234 705 741 3268</p>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Member since</p>
            <p className="text-desc text-muted">13 march 2026</p>
          </div>
        </Card>
      </section>
    </main>
  );
}
