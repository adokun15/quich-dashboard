import Card from "./card";
import { SelectActionButton, SelectForm } from "./select";

//List Table INfo:
/*
  id invoice_code subscription_code subscription_id 
  period_start period_end paid_at,
  amount currency VARCHAR(3) NOT NULL,
  status  
  updated_at created_at 
 */
export default function InvoiceList() {
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
        <h1>INV_41314</h1>
        <p>Periodity: 23 March - 23 April</p>
        <p>Payment status: pending</p>
      </Card>

      <Card>
        <h1>INV_313123</h1>
        <p>Periodity: 23 Feb - 23 March</p>
        <p>Payment status: pending</p>
        <p>Paid @ 12pm 23 Feb</p>
      </Card>
      <Card>
        <h1>INV_313123</h1>
        <p>Periodity: 23 Feb - 23 March</p>
        <p>Payment status: pending</p>
        <p>Paid @ 12pm 23 Feb</p>
      </Card>
      <Card>
        <h1>INV_313123</h1>
        <p>Periodity: 23 Feb - 23 March</p>
        <p>Payment status: pending</p>
        <p>Paid @ 12pm 23 Feb</p>
      </Card>
      <Card>
        <h1>INV_313123</h1>
        <p>Periodity: 23 Feb - 23 March</p>
        <p>Payment status: pending</p>
        <p>Paid @ 12pm 23 Feb</p>
      </Card>
    </div>
  );
}
