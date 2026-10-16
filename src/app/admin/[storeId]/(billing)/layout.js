import NavItem from "@/components/NavItem";

export default function LayoutSubscription({ children }) {
  return (
    <main className="max-w-3xl space-y-4 mx-auto w-full">
      <nav className="flex gap-x-4 items-center">
        <NavItem
          href="/admin/subscription"
          className="bg-input py-2 px-6 font-medium rounded-full"
        >
          Subscription
        </NavItem>
        <NavItem
          href="/admin/invoices"
          className="py-2 px-6 bg-input font-medium rounded-full"
        >
          Invoices
        </NavItem>
        <NavItem
          href="/admin/payments"
          className="py-2 bg-input font-medium px-6 rounded-full"
        >
          Payment History
        </NavItem>
      </nav>
      <div>{children}</div>
    </main>
  );
}
