import Card from "./card";
import { SelectActionButton, SelectForm } from "./select";

//List Table INfo:
/*
    id merchant_id invoice_code reference
    amount status paid_at ,
    created_at 
        */
export default function PaymentHistory() {
  return (
    <div className="space-y-4">
      <SelectActionButton title="Filter">
        <form>
          <label htmlFor="sort_date">
            <input type="radio" />
            <span>Newest</span>
          </label>
          <label htmlFor="sort_date">
            <input type="radio" />
            <span>Oldest</span>
          </label>
          <SelectForm
            title="status"
            items={[
              {
                name: "pending",
                id: "pending",
              },
            ]}
          />
          <button>Apply Filter</button>
        </form>
      </SelectActionButton>
      <Card>
        <h1>Ref_9797979</h1>
        <p>amount: 7800</p>
        <p>Payment status: failed</p>
        <p>Paid @ 12pm 23 Feb</p>
      </Card>
    </div>
  );
}
