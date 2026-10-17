"use client";
import Image from "next/image";
import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./dropdown";
import Link from "next/link";

export default function NavigateDashboard({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-controls="dashboard-sidebar"
            className="rounded-lg p-2 text-text transition-colors hover:bg-background hover:opacity-100 md:hidden"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="QuichShop"
              width={34}
              height={34}
              priority
            />
            <span className="truncate text-lg font-bold tracking-tight text-text">
              QuichShop
            </span>
          </Link>
        </div>

        <Dropdown />
      </div>
    </header>
  );
}

/*"use client";
import Image from "next/image";
import Popover from "./popover";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "./dropdown";
import SpeedDial from "./SpeedDial";

export default function NavigateDashborad() {
  const [helpOpen, setOpenModal] = useState(false);

  return (
    <main className="py-4 mb-6">
      <div className="flex pl-[1vw] px-[10vw] justify-between">
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

        <Dropdown />
      </div>

      <SpeedDial />
    </main>
  );
}
*/
