import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";

//Billing Pricing Page
export default function Billing() {
  return (
    <>
      <NavigateDashborad />

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
