import StoreIntroVideo from "@/components/AboutVideo";
import Card from "@/components/card";
import WelcomeGreetings from "@/components/WelcomeGreetings";
import { faViadeoSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faCopy,
  faMessage,
  faNoteSticky,
} from "@fortawesome/free-regular-svg-icons";
import {
  faShare,
  faExternalLink,
  faVideo,
  faMailBulk,
  faMailReply,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

//Access cookies for token;
const getAdminData = async () => {
  try {
    // Get User Cookies first: 30mins
    /*   const cookie = await cookies();
    const user_token = cookie?.get("quich_login_token");

    if (!user_token) {
      redirect("/");
    }
*/
    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/merchant`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY5NzZjZTUwLTEzYjctNGE4Yy04MjA5LTVhMDQyY2EyMTE2NSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Zjampvbml4ZW14c25rcWlyd3NqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhNDQ5MWMwOC00M2YwLTRlZGItYjQ3OC0yYmE3NWRlOTA1NDkiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc3MzkxNzM2LCJpYXQiOjE3NzczODgxMzYsImVtYWlsIjoiYW1vc2RhbmllbDIwMDVAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImFtb3NkYW5pZWwyMDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImE0NDkxYzA4LTQzZjAtNGVkYi1iNDc4LTJiYTc1ZGU5MDU0OSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTc3NzM4ODEzNn1dLCJzZXNzaW9uX2lkIjoiZTY0MGZlMWEtZjJhZi00NDg3LTg1ZWMtYmYxYTBlNTc4OGFjIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.8tvM198Q1xB6_L8-0SAnnya2SYYIIIy7L0Tn2Y7Zy6h9KgWWXy5djDYTH78PiwmXHXcKXpKkdsjCL6wcB0vn8Q`,
        },
      },
    );

    const data = await res.json();
    console.log(data);

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!

      return { error: data?.message };
    }

    console.log(data);
    return {};
  } catch (e) {
    console.log(e);
    return { error: e?.message };
  }
};

export default async function AdminHome() {
  const d = await getAdminData();

  //console.log(d);
  //Checkout after completing the order!
  return (
    <main className="space-y-6 mx-auto max-w-xl">
      {/*<WelcomeGreetings />*/}

      <section className="space-y-2">
        <div className="flex items-center my-4 justify-between">
          <p className="text-muted text-xl font-semibold">Store Overview</p>

          <div className="flex gap-x-1">
            <button className="px-1 space-x-1 rounded-full text-muted  ">
              <Link className="" href="/">
                Share store
              </Link>
              <FontAwesomeIcon className="" icon={faShare} />
            </button>
            <button className="px-1 space-x-1 rounded-full text-muted  ">
              <Link className="" href="/">
                Live store
              </Link>
              <FontAwesomeIcon icon={faExternalLink} />
            </button>
          </div>
        </div>

        {/*    <Card>
          <article className="flex justify-between items-center">
            <h2>Credit Left</h2>
            <p className="bg-secondary px-6 rounded-full text-muted py-1">
              Premium
            </p>
          </article>
          <p className="text-6xl">300</p>
        </Card>
    */}
        <StoreIntroVideo />
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

      {/*
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
      */}

      <section>
        <h2 className="text-muted font-semibold">Support</h2>
        <div className="space-y-2">
          <Card className="flex items-center justify-between">
            <p>
              <span className="text-muted font-medium">Email</span>
            </p>
            <p className="space-x-2 flex gap-x-2 items-center">
              <span className="border-b-4 p-1 border-primary border-dashed ">
                help@quich.shop
              </span>
              <span>
                <FontAwesomeIcon
                  className="bg-gray-200 rounded-2xl p-1"
                  icon={faCopy}
                />
              </span>
            </p>
          </Card>
          <Card className="space-y-3">
            <div className="border-b py-2">
              <p className="text-muted font-medium">Socials</p>
              <p className="text-xs text-muted">Engage with us on socials</p>
            </div>
            <div className="flex gap-x-4">
              <p
                className="bg-gray-200 text-[14px] px-4 py-1
              rounded-full "
              >
                x <span className="">(twitter)</span>
              </p>

              <p
                className="bg-gray-200 text-[14px] py-1 px-4
                 rounded-full "
              >
                Whatsapp Channel
              </p>
            </div>
          </Card>

          <Card className=" space-y-2">
            <p className="text-muted font-medium">Feature Request</p>
            <p className="text-[14px] text-muted">
              Want us to add a dope feature?{" "}
              <span className="underline text-medium text-text cursor-pointer hover:underline-offset-1">
                let us know
              </span>
            </p>
          </Card>
          <Card className=" space-y-2">
            <p className="text-muted font-medium">Feedback</p>
            <p className="text-[14px] text-muted">
              The app is not working the way it should?{" "}
              <span className="underline text-medium text-text cursor-pointer hover:underline-offset-1">
                send us a feedback
              </span>
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
