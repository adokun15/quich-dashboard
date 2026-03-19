import Card from "./card";

export default function SingleCustomerInfo() {
  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">Daniel Amos</h2>
          <p className="text-desc text-muted">
            Last Order on 23 march 2026 18:14
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
            <p className="text-base font-semibold">80</p>
          </div>
          <div>
            <p className="text-base">Total Spent</p>
            <p className="text-base font-semibold">NGN9,000</p>
          </div>
        </Card>

        <Card className="p-0 space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <article className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <p className="text-base flex gap-1">
                <span className="font-semibold">#154341</span>{" "}
                <span className="text-muted text-tiny px-2 pb-1 lowercase border rounded-full ">
                  Pending
                </span>
              </p>
              <p className="text-muted text-tiny">12 march 2025 18:04</p>
            </div>
            <p className="text-based font-semibold">NGN400</p>
          </article>
          <article className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <p className="text-base flex gap-1">
                <span className="font-semibold">#1542342</span>{" "}
                <span className="text-primary text-tiny px-2 pb-1 lowercase border rounded-full border-primary">
                  Completed
                </span>
              </p>
              <p className="text-muted text-tiny">09 march 2025 18:04</p>
            </div>
            <p className="text-based font-semibold">NGN600</p>
          </article>
          <article className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <p className="text-base flex gap-1">
                <span className="font-semibold">#154231</span>{" "}
                <span className="text-danger border-danger text-tiny px-2 pb-1 lowercase border rounded-full ">
                  Cancelled
                </span>
              </p>
              <p className="text-muted text-tiny">01 march 2025 18:04</p>
            </div>
            <p className="text-based font-semibold">NGN2000</p>
          </article>
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
              <p className="text-desc text-muted">David</p>
            </article>
            <button>...</button>
          </div>

          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Phone</p>
              <p className="text-desc text-muted">+234 705 741 3268</p>
            </article>
            <button>...</button>
          </div>

          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Tag</p>
              <p className="text-desc text-muted">Food</p>
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
