"use client";
import Image from "next/image";
import Popover from "./popover";
import Link from "next/link";
import { useState } from "react";
import Dropdown from './dropdown'
import SpeedDial from './SpeedDial'

export default function NavigateDashborad() {
  const [helpOpen, setOpenModal] = useState(false);

  return (
    <main className="py-4 mb-6">
      <div className="flex px-[10vw] justify-between">
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

       <Dropdown/>
      </div>

      <nav className="max-w-3xl mx-auto space-x-4">
        <button>
          <Link href="/">Home</Link>
        </button>
        <button>
          <Link href="/products">Products</Link>
        </button>
      </nav>

      <SpeedDial/>
      {/* Contact Support | Feature Request | Report an Issue*/}
    </main>
  );
}
