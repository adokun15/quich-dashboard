import Link from "next/link";
import Card from "./card";

export default function SingleCustomerInfo({ customer }) {
  const getLastOrderDate = customer?.orders
    ?.sort((a, b) => a.created_at - b.created_at)
    .map((o) => o.created_at)[0];

  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">{customer?.name}</h2>
          <p className="text-desc text-muted">
            Last Order on{" "}
            {`${new Date(getLastOrderDate).toLocaleDateString()} ${new Date(getLastOrderDate).toLocaleTimeString()}`}
          </p>
        </article>

        <article>
          <button className="text-danger">Delete</button>
        </article>
      </section>

      <section className="space-y-4">
        <Card className="flex justify-between">
          <div>
            <p className="text-base">Orders Made</p>
            <p className="text-base font-semibold">{customer?.total_orders}</p>
          </div>
          <div>
            <p className="text-base">Total Spent</p>
            <p className="text-base font-semibold">
              NGN{customer.total_orders_amount}
            </p>
          </div>
        </Card>

        <Card className="p-0 space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <div>
            {customer?.orders.length === 0 && <p>This space is empty {`:(`}</p>}
            {customer?.orders.length > 0 &&
              customer?.orders?.map((order) => (
                <article
                  key={order?.id}
                  className="flex justify-between items-center px-2"
                >
                  <div className="space-y-1">
                    <p className="text-base flex gap-1">
                      <span className="font-semibold">
                        <Link
                          className="hover:underline transition hover:text-primary"
                          href={`/admin/orders/${order?.id}`}
                        >
                          #${order?.id}
                        </Link>
                      </span>{" "}
                      <span className=" text-muted text-tiny px-2 pb-1  border rounded-full ">
                        {order?.status}
                      </span>
                    </p>
                    <p className="text-muted text-tiny">
                      {`${new Date(order?.created_at).toLocaleDateString()} ${new Date(order?.created_at).toLocaleTimeString()}`}
                    </p>
                  </div>
                  <p className="text-based font-semibold">
                    NGN{order?.total_amount}
                  </p>
                </article>
              ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Customer Info</h2>
            <button className="bg-input px-4 py-1 text-white rounded">
              Edit
            </button>
          </div>

          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Name</p>
              <p className="text-desc text-muted capitalize">
                {customer?.name}
              </p>
            </article>
            <button>...</button>
          </div>

          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Phone</p>
              <p className="text-desc text-muted">0{customer?.phone}</p>
            </article>
            <button>...</button>
          </div>

          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Tag</p>
              <p className="text-desc text-muted">
                {customer?.tag ?? "No tag"}
              </p>
            </article>
            <button>...</button>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">Quick action</h2>

          <article className="flex justify-between ">
            <div>
              <p className="text-based font-semibold">Request a Testimonial</p>
              <p className="text-desc">Collect reviews from this customer</p>
            </div>
            <button className="underline">Go</button>
          </article>

          <article className="flex justify-between ">
            <div>
              <p className="text-based font-semibold">Send a message</p>
              <p className="text-desc">Contact user directly on whatsapp</p>
            </div>
            <button className="underline">Go</button>
          </article>
        </Card>
      </section>
    </main>
  );
}
