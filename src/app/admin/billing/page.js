import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";

const getBillingInfo = async () => {
  try {
    // Get User Cookies first: 30mins
    const cookie = await cookies();
    const user_token = cookie?.get("quich_login_token");

    if (!user_token) {
      redirect("/");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/user/billing`,
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
      return { error: data?.message, status_code: data?.status_code };
    }

    return {
      data: {
        merchant: {
          subscription_plan: "",
          subscription_amount: "",
        }, //From the token; 'name, store_name, slug_id, user_id'
      },
    };
  } catch (e) {
    return { error: e?.message };
  }
};

//Billing Pricing Page
export default function Billing() {
  //Access Cookies
  return (
    <>
      <main className="max-w-3xl space-y-6 py-1 mx-auto min-h-screen">
        <div className="space-y-6">
          <article>
            <h2 className="text-7">Billing</h2>
            <p className="border-2 rounded-full w-fit text-1 px-2">
              Current Plan
            </p>
          </article>

          <p>NGN1900/Month (First Month)</p>

          <button>Manage Subscription</button>
        </div>

        <div className="space-y-4">
          <h2 className="text-7">Plans</h2>

          <Card className=" justify-between flex-wrap">
            <h1 className="text-xl">Starter Plan</h1>
            <p>NGN1900 / Month</p>

            <article className="my-5 ">
              <li>Unlimited direct orders</li>
              <li>Add your Community link</li>
              <li>30 products upload</li>
              <li>Storefront link</li>
              <li>Community & Email Support</li>
            </article>
            <button>Subcribe</button>
          </Card>

          <Card className=" justify-between flex-wrap">
            <h1 className="text-xl"> Growth Plan</h1>
            <p>NGN7500 / Month</p>
            <article className="my-5">
              <li>Unlimited direct orders</li>
              <li>Add your Community link</li>
              <li>100 products upload</li>
              <li>Shareaable StoreFront link</li>
              <li>Community & Email Support, Direct DM access</li>
              {/* <li>Review/Testimonial/About Us page (Coming soon)</li> */}
              <li>1-min video header</li>
            </article>

            <button>Subcribe</button>
          </Card>
        </div>
      </main>
    </>
  );
}
