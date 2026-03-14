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
              Receive promotional message on whatsapp, We send weekly tips and
              we do not spam!
            </p>
            <input className="w-fit" type="checkbox" />
          </div>

          <div>
            <p>
              Checkout our Whatsapp channel to keep in touch and get updates
            </p>
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
          </div>

          {/*Allow store be display in certain region*/}
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
