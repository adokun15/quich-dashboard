import CreditQuotas from "@/components/CreditQuotas";
import ErrorComponent from "@/components/ErrorComponent";
import SubcriptionPlanCard from "@/components/SubcriptionPlanCard";
import { cacheTag } from "next/cache";
import { cookies } from "next/headers";

//Dynamic Page;
const getBillingSubscription = async () => {
  // "use cache";
  // cacheTag("billing");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/merchant/billing`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
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
