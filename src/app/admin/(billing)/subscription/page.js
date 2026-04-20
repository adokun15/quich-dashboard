import CreditQuotas from "@/components/CreditQuotas";
import SubcriptionPlanCard from "@/components/SubcriptionPlanCard";

//Dynamic Page;
export default function SubscriptionPage() {
  return (
    <main className="space-y-4">
      <SubcriptionPlanCard />
      <CreditQuotas />
    </main>
  );
}
