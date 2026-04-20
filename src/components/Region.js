/** Store Country and Curen */
//Store Information;
import Card from "@/components/card";
import { SelectForm } from "@/components/select";

export default function StoreRegion() {
  return (
    <div className=" space-y-2 w-full">
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Currency</h2>
        <p className="text-muted text-desc"></p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <SelectForm
            title="NGN"
            className="grow"
            items={[{ value: "NGN", name: "NGN" }]}
          />
        </div>
      </Card>
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Country</h2>
        <p className="text-muted text-desc"></p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <SelectForm
            className="grow"
            title="Nigeria"
            items={[{ value: "Nigeria", name: "Nigeria" }]}
          />
        </div>
      </Card>
    </div>
  );
}
