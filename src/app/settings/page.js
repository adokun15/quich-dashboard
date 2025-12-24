import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import { Select } from "@/components/select";
import { ToggleButton } from "@/components/ToggleButton";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      <NavigateDashborad />

      <main className="max-w-3xl  space-y-6 py-1 pb-4 mx-auto min-h-screen dark:bg-black">
        <Card className=" space-y-4">
          <h2 className="text-2xl mb-4 ">Notification & Community</h2>

          <div>
            <p>
              Receive newsletters mail, We send weekly tips and we do not spam!
            </p>
            <input className="w-fit" type="checkbox" />
          </div>

          <div>
            <p>Receive push Notification</p>

            <article className="flex gap-2 ml-2">
              <p>New Orders</p>
              <input className="w-fit" type="checkbox" />
            </article>
            <article className="flex gap-2 ml-2">
              <p>New Referrals</p>
              <input className="w-fit" type="checkbox" />
            </article>
          </div>

          <div>
            <p>Checkout our Whatsapp channel to get our updates</p>

            <Link
              href="/whatsapp-channel-link"
              className="text-primary underline"
            >
              Join us
            </Link>
          </div>
        </Card>

        <Card className="">
          <h2 className="text-2xl mb-4 ">Manage Store</h2>

          <div>
            <p>Manually disable store</p>
            <p className="text-muted">
              Although the link will still be active, but your store cannot take
              new orders
            </p>
            <article className="flex justify-between">
              <p>Shop Visibilty</p>
              <ToggleButton />
            </article>
          </div>

          <div>
            <p>Whatsapp Contact</p>
            <p>0812350583344 (verified)</p>
            <button>Change Number</button>
          </div>

          {/* <div>
            <p>Allow store be display in certain region</p>
            <p>NationWide, Lagos</p>
            <div>
            <input />
              <button>add</button>
              </div>
              </div>*/}
        </Card>

        <Card className="space-y-3">
          <h2 className="text-2xl mb-4 ">Account</h2>

          <div>
            <h2>Email and Password (Active)</h2>
            <p className="text-muted">Test@gmail.com</p>
          </div>

          <button>Change Password</button>
        </Card>

        <Card>
          <h2>Theme</h2>
          <Select />
        </Card>

        <Card>
          <p>Delete Account Permanently</p>
          <button className="bg-danger border-0 w-fit px-8">Delete</button>
        </Card>
      </main>
    </>
  );
}
