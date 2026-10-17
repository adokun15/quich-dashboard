import PricingPlan from "@/components/PricingComponent";

const getCurrentBillingSubscription = async () => {
  try {
  } catch (e) {
    return {
      error: {
        message: e?.message,
        code: 500,
      },
    };
  }
};

export default function UpgradePlanPage() {
  //Checked and verify payment: show current plan and available plan to upgrade too;

  return <PricingPlan />;
}
