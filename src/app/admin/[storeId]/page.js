import StoreIntroVideo from "@/components/AboutVideo";
import Card from "@/components/card";
import {
  faArrowDown,
  faArrowUp,
  faBox,
  faExternalLink,
  faMoneyBillWave,
  faPlus,
  faShare,
  faShoppingBag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const stats = [
  {
    title: "Total Orders",
    value: "248",
    change: "+12.5%",
    icon: faShoppingBag,
    positive: true,
  },
  {
    title: "Total Revenue",
    value: "₦1,248,500",
    change: "+8.2%",
    icon: faMoneyBillWave,
    positive: true,
  },
  {
    title: "Available Products",
    value: "36",
    change: "4 low stock",
    icon: faBox,
    positive: null,
  },
  {
    title: "Customers",
    value: "184",
    change: "+18 this month",
    icon: faUsers,
    positive: true,
  },
];

const sales = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 42 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 68 },
];

const recentOrders = [
  {
    id: "#QS-1024",
    customer: "Chinedu Okafor",
    date: "Oct 17, 2026",
    amount: "₦24,500",
    status: "Completed",
  },
  {
    id: "#QS-1023",
    customer: "Amina Yusuf",
    date: "Oct 17, 2026",
    amount: "₦12,000",
    status: "Pending",
  },
  {
    id: "#QS-1022",
    customer: "David James",
    date: "Oct 16, 2026",
    amount: "₦38,000",
    status: "Processing",
  },
  {
    id: "#QS-1021",
    customer: "Grace Adeyemi",
    date: "Oct 16, 2026",
    amount: "₦8,500",
    status: "Completed",
  },
  {
    id: "#QS-1020",
    customer: "Tobi Williams",
    date: "Oct 15, 2026",
    amount: "₦16,200",
    status: "Cancelled",
  },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminHome() {
  return (
    <main className="mx-auto max-w-6xl space-y-6">
      {/* Store overview */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-muted text-xl font-semibold">Store Overview</h1>
            <p className="text-muted text-sm">
              Here&apos;s what&apos;s happening with your store.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm">
              <FontAwesomeIcon icon={faShare} />
              Share store
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm"
            >
              Live store
              <FontAwesomeIcon icon={faExternalLink} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">{stat.title}</p>
                <FontAwesomeIcon icon={stat.icon} className="text-muted" />
              </div>

              <p className="text-2xl font-semibold">{stat.value}</p>

              <p className="flex items-center gap-1 text-xs text-muted">
                {stat.positive !== null && (
                  <FontAwesomeIcon
                    icon={stat.positive ? faArrowUp : faArrowDown}
                  />
                )}
                {stat.change}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Sales chart */}
      <section>
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Sales overview</h2>
              <p className="text-sm text-muted">
                Your sales activity over the last 7 days
              </p>
            </div>

            <select
              defaultValue="7"
              aria-label="Sales date range"
              className="rounded-lg border border-border bg-transparent p-2 text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div className="flex items-end justify-between gap-2 pt-4">
            {sales.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    title={`${item.value}% QEWEWQEQrelative sales activity`}
                    className="w-full max-w-12 rounded-t-md bg-primary"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{item.day}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted">
            Illustrative data only. Values are not connected to your store.
          </p>
        </Card>
      </section>

      {/* Quick actions */}
      <section className="space-y-3">
        <h2 className="font-semibold">Quick actions</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link href="/admin/products">
            <Card className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add a product</span>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card className="flex items-center gap-3">
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>Manage orders</span>
            </Card>
          </Link>

          <Link href="/">
            <Card className="flex items-center gap-3">
              <FontAwesomeIcon icon={faExternalLink} />
              <span>Visit storefront</span>
            </Card>
          </Link>
        </div>
      </section>

      {/* Recent orders */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Recent orders</h2>
            <p className="text-sm text-muted">
              A quick look at your latest orders
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-sm underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="px-3 py-3 font-medium">Order</th>
                  <th className="px-3 py-3 font-medium">Customer</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Amount</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-3 py-4 font-medium">{order.id}</td>
                    <td className="px-3 py-4">{order.customer}</td>
                    <td className="px-3 py-4 text-muted">{order.date}</td>
                    <td className="px-3 py-4">{order.amount}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </main>
  );
}

{
  /* Existing intro video 
<section className="space-y-3">
<h2 className="font-semibold">Getting started</h2>
<StoreIntroVideo />
</section>
*/
}

{
  /*
    
    //Support
          <section className="space-y-3">
        <h2 className="text-muted font-semibold">Support</h2>

        <Card className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted font-medium">Email support</span>
          <a
            href="mailto:help@quich.shop"
            className="underline underline-offset-4"
          >
            help@quich.shop
          </a>
        </Card>

        <Card className="space-y-2">
          <p className="font-medium">Socials</p>
          <p className="text-sm text-muted">
            Engage with us on X and our WhatsApp Channel.
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="font-medium">Feature Request</p>
          <p className="text-sm text-muted">
            Want us to add a feature? Let us know.
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="font-medium">Feedback</p>
          <p className="text-sm text-muted">
            Having trouble with the app? Send us feedback.
          </p>
        </Card>
      </section>

    */
}
