import Card from "@/components/card";
import { faViadeoSquare } from "@fortawesome/free-brands-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { faExternalLink, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="flex  gap-x-4">
          {/* Outline Buttons */}
          <button className="outline_button">Share Store</button>
          <button className="outline_button">Upgrade plan</button>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-muted  font-semibold">Store Overview</p>
          <button className="rounded-full text-muted px-6 py-2 ">
            <Link className="" href="/">
              Check your store here{" "}
            </Link>
            <FontAwesomeIcon icon={faExternalLink} />
          </button>
        </div>

        <Card>
          <article className="flex justify-between items-center">
            <h2>Credit Left</h2>
            <p className="bg-secondary px-6 rounded-full text-muted py-1">
              Premium
            </p>
          </article>
          <p className="text-6xl">300</p>
        </Card>
        <Card>
          <div>
            <p className="text-base font-medium">
              Upload a video about your business, atleast 30-seconds - 60
              seconds long
            </p>
            <p className="text-muted text-desc">paid feature</p>
          </div>
          <FontAwesomeIcon
            className="text-center text-primary w-full text-[15rem]"
            icon={faVideo}
          />
          <button className="bg-input rounded w-full">Upload</button>
        </Card>
        {/* Overview of Store 
        <Card className="flex justify-between">
          <p className="text-based">Views Today </p>
          <p className="text-xl font-medium">67</p>
        </Card>

        <Card className="flex justify-between">
          <p className="text-based">Orders(this weeks)</p>
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
          */}
      </section>

      {/*
 SlideShow; 
 <section>
        <h2 className="text-muted font-semibold">Guide to Use QuichShop!</h2>
        <article className=" text-muted text-desc">Coming soon!</article>
      </section>
*/}
      <section>
        <h2 className="text-muted font-semibold">Usage Log (Whatsapp)</h2>
        <Card className="">
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div>
                <p>Created a Product</p>
                <p className="text-muted text-desc">@ 5pm Today</p>
              </div>
              <p className="font-medium">5 credit </p>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <p>Created a Product</p>
                <p className="text-muted text-desc">@ 5pm Today</p>
              </div>
              <p className="font-medium">5 credit </p>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <p>Created a Product</p>
                <p className="text-muted text-desc">@ 5pm Today</p>
              </div>
              <p className="font-medium">5 credit </p>
            </li>
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="text-muted font-semibold">Support</h2>
        <div className="space-y-5">
          <Card className="">
            <p>Email help@quich.shop</p>
          </Card>
          <Card className="">
            <p>Engage with us on socials</p>
            <p>x(Twitter)</p>
            <p>Whatsapp Channel</p>
          </Card>

          <Card className="">
            <p>Want us to add a dope feature? let us know</p>
          </Card>

          <Card className="">
            <p>
              <FontAwesomeIcon icon={faNoteSticky} />
              Send a feedback
            </p>
          </Card>
        </div>
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
