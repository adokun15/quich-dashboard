//Store Information;
import Card from "@/components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TextAreaInput, TextInput, TimeInput } from "@/components/input";
//import { EditableAvatar } from "@/components/Avatar";
import { Select } from "@/components/select";

export default function ManageStore() {
  //const redirectToShop = () => {};
  //const updateStoreSettings = () => {};

  return (
    <div className=" space-y-2 w-full">
      <Card className="w-full">
        <h2 className="text-xl font-semibold">Store Name</h2>
        <p className="text-muted text-desc">Change your store name publicy</p>
        <div className="mt-4 max-w-full flex gap-x-3 ">
          <input
            className="bg-input px-2 border-border outline-border border py-1.5 w-full"
            placeholder="The Store Name"
          />
          <button className="grow border-border bg-primary py-1 rounded px-2 text-white">
            Save
          </button>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Business Category</h2>
        <p className="text-muted text-desc">
          Select which category your store fall into
        </p>
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

      <Card>
        <h2 className="text-xl font-semibold">Store Description</h2>
        <p className="text-muted text-desc">
          Tell us what is your store about?
        </p>
        <div className="mt-4 max-w-full flex-col gap-x-3 ">
          <textarea
            className="bg-input px-2 h-48 border-border outline-border border py-1.5 w-full"
            placeholder="The Store Name"
          />
          <button className="grow border-border bg-primary py-1 rounded px-2 text-white">
            Save
          </button>
        </div>
      </Card>
    </div>
  );
}
