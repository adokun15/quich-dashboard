import Card from "@/components/card";

export default function ManageWhatsapp() {
  return (
    <div className=" space-y-2 w-full">
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Whatsapp</h2>
        <p className="text-muted text-desc">
          Your store active whatsapp number
        </p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <input
            type="number"
            className="bg-input px-2 border-border outline-border border py-1.5 w-full"
            placeholder="The Store Number"
          />
          <button className="grow border-border bg-primary py-1 rounded px-2 text-white">
            Save
          </button>
        </div>
      </Card>
    </div>
  );
}
