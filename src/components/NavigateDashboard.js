import Image from "next/image";
import Popover from "./popover";
import Link from "next/link";

export default function NavigateDashborad() {
  return (
    <main className=" mb-6">
      <div className="flex justify-between">
        <div className="flex w-fit gap-x-1  items-center">
          <Image
            src="/favicon.ico"
            className=""
            alt="logo"
            height={50}
            width={50}
          />
          <h1 className="font-bold">QuichShop</h1>
        </div>

        <div>
          <Popover
            buttonStyle=""
            popoverStyle=""
            buttonContent="Daniel"
            popoverContent={
              <div>
                <Link href="/billing">Billing</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/settings">Whatsapp Channel</Link>
                <Link href="/settings">Affliate (30%)</Link>
              </div>
            }
          />
        </div>
      </div>

      <nav className="max-w-3xl mx-auto space-x-4">
        <button>
          <Link href="/">Home</Link>
        </button>
        <button>
          <Link href="/products">Products</Link>
        </button>
      </nav>

      {/* Contact Support | Feature Request | Report an Issue*/}
    </main>
  );
}
