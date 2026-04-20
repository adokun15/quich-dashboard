"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { SelectActionButton } from "./select";
import Link from "next/link";

export default function SingleOrderInfo({ order }) {
  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">#{order?.id}</h2>
          <p className="text-desc text-muted">
            {`${new Date(order?.created_at).toLocaleDateString()} ${new Date(order?.created_at).toLocaleTimeString()}`}
          </p>
        </article>

        <article className="flex items-center gap-3">
          {/* Edit, View Order, Delete */}
          <button className="text-danger">...</button>

          <div>
            <button className="text-danger">
              Share
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <Card className="p-0 space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Order Status</h2>
            <SelectActionButton title={order?.status}>
              <ul>
                <li>Pending</li>
                <li>Cancelled</li>
                <li>Delivered</li>
              </ul>
            </SelectActionButton>
          </div>

          {/* Item List */}
          <div className="border-b-border py-4 border-b">
            <ul className="space-y-4">
              {order?.cart_items?.map((item) => (
                <li
                  key={item.product_id}
                  className="flex items-center justify-between"
                >
                  <article>
                    <h3 className="text-base font-semibold">{item?.name}</h3>
                    <p className="text-desc text-muted">
                      <span>NGN{item?.price}</span> x <span>{item?.qty}</span>
                    </p>
                  </article>
                  <p className="font-semibold">NGN{item?.total}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Item List Total */}
          <div className="flex justify-between">
            <p>Total</p>
            <p className="font-semibold">NGN{order?.total_amount}</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Customer</h2>
            <button className="bg-input px-4 py-1 text-white rounded">
              <Link href={`/admin/customers/${order?.customer_id}`}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </button>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Name</p>
            <p className="text-desc text-muted">{order?.customer_name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Phone</p>
            <p className="text-desc text-muted">0{order?.customer_phone}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Member since</p>
            <p className="text-desc text-muted">
              {`${new Date(order?.member_since).toLocaleDateString()}`}
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}
