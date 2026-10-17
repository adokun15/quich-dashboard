import Card from "./card";
import { SelectActionButton } from "./select";

//
function SubscriberIsOnFreeTrial() {
  return true;
}

function SubscriberFreeTrialHasExpired() {
  return true;
}

function SubscriptionHasExpired() {
  return false;
}

export default function SubcriptionPlanCard({ subscription }) {
  //Checks;
  console.log(subscription);
  //1. SUBSCRIPTION IS ACTUALLY A FREE TRIAL || HasIt expired;

  //2. SUBSCRIPTION HAS ACTUALLY EXPIRED OR INACTIVE

  //3. NON_RENEW, ACTIVE, EXPIRING CARD
  return (
    <Card className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b">
        <h2 className="flex flex-col">
          <span className="text-base text-muted">Current Plan</span>
          <span className="text-xl capitalize font-medium">
            {subscription?.plan_name || "Trial"}
          </span>
        </h2>
        <p className="font-semibold rounded-full w-fit text-1 px-2">
          <span className="text-base text-muted">
            {subscription?.currency || "NGN"}
          </span>
          <span className="text-xl font-medium">
            {subscription?.amount || "3000"} / {subscription?.interval}
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Status</p>
        <p className="text-base font-medium">{subscription?.status}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Period</p>
        {/*Do countdown for only trial */}
        <p className="text-base font-medium">{"17 days left"}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base text-muted font-medium">Next payment due</p>
        {/*Do countdown for only trial */}
        <p className="text-base font-medium">
          {subscription?.next_payment_date || "--_--_----"}
        </p>
      </div>

      {!subscription?.plan_name && (
        <button
          className="flex justify-self-end bg-primary px-6 
        border-2 rounded-full cursor-pointer py-2"
        >
          Upgrade plan
        </button>
      )}

      {subscription?.plan_name && (
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
