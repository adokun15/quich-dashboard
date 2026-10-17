import Card from "./card";

//Display if 'free trial has ended (14days)
export function FreeTrialExhausted() {
  return (
    <Card>
      <h2>Your free trial plan has been exhausted</h2>
      <p>Select a plan below to continue enjoying our service </p>
      <button>Select plan</button>
    </Card>
  );
}

//subscription has failed
export default function PlanEnded() {
  return (
    <Card>
      <h2>Current plan has been reached it expiring date</h2>
      <p>We cannot restart subscription automatically </p>
      <button>Restart subscription</button>
    </Card>
  );
}
