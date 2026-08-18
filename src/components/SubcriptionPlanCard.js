import Card from "./card";
import { SelectActionButton } from "./select";

export default function SubcriptionPlanCard({
  currency,
  plan_name,
  plan_amount,
  plan_interval = "Monthly",
  status,
  period,
  next_payment_date,
}) {
  return (
    <Card className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b">
        <h2 className="flex flex-col">
          <span className="text-base text-muted">Current Plan</span>
          <span className="text-xl capitalize font-medium">
            {plan_name || "Trial"}
          </span>
        </h2>
        <p className="font-semibold rounded-full w-fit text-1 px-2">
          <span className="text-base text-muted">{currency || "NGN"}</span>
          <span className="text-xl font-medium">
            {plan_amount || "3000"} / {plan_interval}
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Status</p>
        <p className="text-base font-medium">{status || "Trial"}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Period</p>
        {/*Do countdown for only trial */}
        <p className="text-base font-medium">{period || "17 days left"}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Next payment due</p>
        {/*Do countdown for only trial */}
        <p className="text-base font-medium">
          {next_payment_date || "--_--_----"}
        </p>
      </div>

      {!plan_name && (
        <button
          className="flex justify-self-end bg-primary px-6 
         border-2 rounded-full cursor-pointer py-2"
        >
          Upgrade plan
        </button>
      )}

      {plan_name && (
        <SelectActionButton title="Manage">
          <button className="flex justify-self-end border-2 rounded-full px-2 py-1">
            Upgrade plan
          </button>
          <button className="flex justify-self-end border-2 rounded-full px-2 py-1">
            Cancel Subscription
          </button>
        </SelectActionButton>
      )}
    </Card>
  );
}
