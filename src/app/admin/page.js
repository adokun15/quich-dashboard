import Card from "@/components/card";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

//Access cookies for token;
const getAdminData = async () => {
  try {
    // Get User Cookies first: 30mins
    const cookie = await cookies();
    const user_token = cookie?.get("quich_login_token");

    if (!user_token) {
      redirect("/");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/merchant`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token?.value}`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!

      return { error: data?.message };
    }

    return {
      data: {
        merchant: {
          name: "from-whatsapp-instead!",
          user_id: "",
        },
        store_summary: {},
        usage_log: [],
      },
    };
  } catch (e) {
    return { error: e?.message };
  }
};

export default function AdminHome() {
  //Checkout after completing the order!
  return (
    <main className="space-y-6 mx-auto max-w-xl">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">Good Afternoon, Daniel!</h1>
        <div className="flex text-primary gap-x-4">
          {/* Outline Buttons */}
          <button>Share Store</button>
          <button>Upgrade plan</button>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex justify-between">
          <p className="text-muted font-semibold">Store Overview</p>
          <button className="text-primary underline">
            Check your store here{" "}
          </button>
        </div>

        {/* Overview of Store */}
        <Card className="flex justify-between">
          <p className="text-based">Orders</p>
          <p className="text-xl font-medium">900</p>
        </Card>

        <Card className="flex justify-between">
          <p className="text-based">Available Products</p>
          <p className="text-xl font-medium">0</p>
        </Card>

        <Card className="flex justify-between">
          <p className="text-based">Active Customers</p>
          <p className="text-xl font-medium">13</p>
        </Card>
      </section>

      <section>
        <h2 className="text-muted font-semibold">Guide to Use QuichShop!</h2>
        <article className=" text-muted text-desc">Coming soon!</article>
      </section>
      {/*
      <section>
        <h2>Activity Log!</h2>
      </section>
        */}
    </main>
  );
}

/**
 * 
      <ul>
        <li>- Query ( Product, Customers, Orders, Store&Merchant )</li>
        <li>
          - Update Detail( Product(IMAGE), Store settings(Opening hour,
          Community etc) )
        </li>
        <li>- add/Remove Customer from blacklist</li>
        <li>- Manage subscriptions </li>
        <li>- Account Deletion Account; </li>
      </ul>

      <p>
        We dont know merchant name, but we add it to the token anytime they
        create the token, we dont store the Merchant Name;
      </p>

 */
