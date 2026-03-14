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
          user_id: '',

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
    <main>
      <section>
        {/* Overview of Store */}
        <div>
          <p>
            Order
          </p>
          <p>0</p>
        </div>
        <div>
          <p>Products</p>
          <p>0</p>
        </div>
        <div>
          <p>Customer</p>
          <p>0</p>
        </div>
        <div>Manage Store!</div>
      </section>

      <section>
        {/**/}
        <h2>Activity Log!</h2>
      </section>
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
