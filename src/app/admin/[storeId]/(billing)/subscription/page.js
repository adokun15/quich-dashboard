import CreditQuotas from "@/components/CreditQuotas";
import ErrorComponent from "@/components/ErrorComponent";
import SubcriptionPlanCard from "@/components/SubcriptionPlanCard";
import { cacheTag } from "next/cache";

//Dynamic Page;
const getBillingSubscription = async () => {
  "use cache";
  cacheTag("billing");

  try {
    // Get User Cookies first: 30mins
    //const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //if (!user_token) {
    // redirect("/");
    // }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/merchant/billing`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token-value`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return { error: { message: data?.message, code: data?.code } };
    }

    return data.data;
  } catch (e) {
    return { error: { message: e?.message, code: e?.code } };
  }
};

export default async function SubscriptionPage() {
  const subscription = await getBillingSubscription();

  if (subscription?.error) {
    return <ErrorComponent error={subscription?.error} />;
  }

  return (
    <main className="space-y-4">
      <CreditQuotas subscription={subscription?.credit_usage} />
      <div>
        <p>Subscription</p>
        {subscription?.map((sub) => (
          <SubcriptionPlanCard key={sub?.id} subscription={sub} />
        ))}
      </div>
    </main>
  );
}
