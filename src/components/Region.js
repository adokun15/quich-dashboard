/** Store Country and Curen */
//Store Information;
import Card from "@/components/card";
import { Select } from "@/components/select";

export default function StoreRegion() {
  return (
    <div className=" space-y-2 w-full">
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Currency</h2>
        <p className="text-muted text-desc"></p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <Select
            className="grow"
            items={[
              { value: "clothing and apparel", name: "Clothes" },
              { value: "clothing and app", name: "Clothes" },
              { value: "clothing and arel", name: "Clothes" },
              { value: "clothingapparel", name: "Clothes" },
            ]}
          />
          <button className=" border-border bg-primary py-1 rounded px-2 text-white">
            Save
          </button>
        </div>
      </Card>
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Country</h2>
        <p className="text-muted text-desc"></p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <Select
            className="grow"
            items={[
              { value: "clothing and apparel", name: "Clothes" },
              { value: "clothing and app", name: "Clothes" },
              { value: "clothing and arel", name: "Clothes" },
              { value: "clothingapparel", name: "Clothes" },
            ]}
          />
          <button className=" border-border bg-primary py-1 rounded px-2 text-white">
            Save
          </button>
        </div>
      </Card>
    </div>
  );
}
