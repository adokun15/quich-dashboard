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
              Receive promotional message, We send weekly tips and we do not
              spam!
            </p>
            <section className="flex gap-2">
              <div className="space-x-1">
                <input className="w-fit" type="checkbox" />
                <span>Email</span>
              </div>

              <div className="space-x-1">
                <input className="w-fit" type="checkbox" />
                <span>WhatsApp</span>
              </div>
            </section>
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
          <h2 className="text-xl mb-4 ">Account</h2>

          <article className="">
            <p className="text-base">Email</p>
            <input
              className="bg-input w-full rounded px-4 py-2"
              placeholder="Merchant Name"
            />
          </article>
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

        <div className="**:block md:flex md:justify-between text-primary text-xl space-y-2">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms and Conditions</Link>
          <Link href="#">About us</Link>
        </div>
      </main>
    </>
  );
}
