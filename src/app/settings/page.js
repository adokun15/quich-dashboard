import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      <NavigateDashborad />

      <main className="max-w-3xl space-y-6 py-1 mx-auto min-h-screen dark:bg-black">
        <Card className="">
          <h2>Notification</h2>

          <div>
            <p>Join our newsletters, We send weekly tips and we do not spam!</p>
            <Link href="/newsletters">Join</Link>
          </div>

          <div>
            <p>Checkout our Whatsapp channel for new updates</p>
            <Link href="/whatsapp-channel-link">Join us</Link>
          </div>
        </Card>

        <Card className="">
          <h2>Store</h2>

          <div>
            <p>Close Shop</p>
            <button>Toggle Button</button>
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

        <Card>
          <div>
            <h2>Google (active)</h2>
            <p>Test@gmail.com</p>
          </div>

          <div>
            <h2>Email and Password (Inactive)</h2>
            <p>Test@gmail.com</p>
            <button>Change Password</button>
          </div>
        </Card>

        <Card>
          <h2>Theme</h2>

          <div>
            <select defaultValue="System">
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </div>
        </Card>

        <section>
          <p>Delete Account Permanently</p>
          <button>Delete</button>
        </section>
      </main>
    </>
  );
}
