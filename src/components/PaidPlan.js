import Card from "./card";

/** Show Component only When MERCHANT has paid  */
export default function PaidPlan() {
  return (
    <main className="max-w-3xl space-y-2 py-1 mx-auto min-h-screen">
      <Card className="space-y-6">
        <h2 className="text-tiny">Paid Plan</h2>
        <p className="text-xl text-cyan-950 font-semibold rounded-full w-fit text-1 px-2">
          Basic
        </p>
        <button className="flex justify-self-end border-2 rounded-full px-2 py-1">
          Manage
        </button>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Payment</h2>
        <p className="text-muted text-base">
          Your plan will automatically be renew om 04/09/2026. You will be
          charged NGN800/Month.
        </p>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Benefits</h2>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </Card>
    </main>
  );
}
