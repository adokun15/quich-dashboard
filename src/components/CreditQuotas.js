import Link from "next/link";
import Card from "./card";

//Fetch:  credit_balance for merchant
export default function CreditQuotas({
  credit_balance = 10,
  plan_interval = "Monthly",
  plan_quota = 500,
}) {
  return (
    <Card className="space-y-4">
      <div className="space-y-2 border-b pb-3">
        <article className="flex justify-between md:pr-5">
          <h2 className="text-base font-medium">Credit Quotas</h2>
          <Link
            className="text-primary hover:text-muted transition font-medium"
            href="usage_log"
          >
            View Usage
          </Link>
        </article>
        <p className="text-desc text-muted">
          Credits are limits we use to measure your whatsapp usage, this include
          notifications and heavy operations that are done via whatsapp
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Current quota</p>
        <p>
          <span className="text-xl font-medium">500</span> /{" "}
          <span className="text-muted">{plan_interval}</span>
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Available credit</p>
        <p>
          <span className="text-xl font-medium"> {credit_balance}</span> /{" "}
          <span className="text-muted">{plan_quota}</span>
        </p>
      </div>
    </Card>
  );
}
