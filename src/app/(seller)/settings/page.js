"use client";
import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import { Select } from "@/components/select";
import { ToggleButton } from "@/components/ToggleButton";
import Link from "next/link";

/*
import { useLinkStatus } from 'next/link'
function Hint() {
  const { pending } = useLinkStatus()
  return (
    <span aria-hidden className={`link-hint ${pending ? 'is-pending' : ''}`} />
  )
}
 */

export default function SettingsPage() {
  return (
    <>
      <main className="max-w-3xl  space-y-6 py-1 pb-4 mx-auto min-h-screen dark:bg-black">
        <Card className=" space-y-4">
          <h2 className="text-2xl mb-4 ">Notification & Community</h2>

          <div>
            <p>
              Receive newsletters mail, We send weekly tips and we do not spam!
            </p>
            <input className="w-fit" type="checkbox" />
          </div>

          <div className="space-y-3">
            <p className="text-muted">Receive push Notification</p>
            <article className="flex justify-between ml-2">
              <p>New Orders</p>
              <ToggleButton />
            </article>
            <article className="flex justify-between ml-2">
              <p>New Referrals</p>
              <ToggleButton />
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

        <Card className="space-y-4">
          <h2 className="text-2xl mb-4 ">Manage Store</h2>

          <div className="divide-2">
            <article className="flex items-center  justify-between">
              <p className=" font-medium">Shop Visibilty</p>
              <ToggleButton />
            </article>

            <p className="text-muted font-normal">
              Although the link will still be active, but your store cannot take
              new orders
            </p>
          </div>

          <div className="divide-2">
            <article className="flex items-center  justify-between">
              <p className=" font-medium">Store Whatsapp Contact</p>
              <Link
                href="/settings/verify_phone"
                className="underline text-primary"
              >
                Change Number
              </Link>
            </article>

            <p className="text-muted font-normal">0812350583344 (verified)</p>
          </div>

          <div></div>

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
          <Select
            defaultValue=""
            cn={() => {}}
            items={[
              {
                name: "System",
                value: "system",
              },
              {
                name: "Light",
                value: "light",
              },
              {
                name: "Dark",
                value: "dark",
              },
            ]}
          />
        </Card>

        <Card>
          <p>Delete Account Permanently</p>
          <button className="bg-danger border-0 w-fit px-8">Delete</button>
        </Card>

        <div className="**:block text-primary text-xl space-y-2">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms and Conditions</Link>
          <Link href="#">About us</Link>
        </div>
      </main>
    </>
  );
}
