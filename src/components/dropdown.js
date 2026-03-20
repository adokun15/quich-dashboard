//Button with Dropdown Element;
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Dropdown() {
  const [controlledDropdown, setControlledDropdown] = useState(false);

  return (
    <main className="space-y-2 group/item relative">
      <button
        onClick={() => setControlledDropdown((p) => !p)}
        className=" text-white inline-flex 
 items-center justify-center peer box-border
  border border-transparent hover:bg-slate-700 focus:ring-4 focus:ring-background/50 
shadow-xs font-medium leading-5 bg-muted  rounded-base text-sm px-4 py-1 focus:outline-none"
        type="button"
      >
        My Account
      </button>

      <div
        className={`z-10 absolute -left-50
 border-2 invisible group-hover/item:visible ${
   controlledDropdown && "visible"
 } border-border z-30 bg-white rounded-xl 
shadow-lg w-72`}
      >
        <div className="px-2.5 p-2 space-x-1.5 text-sm bg-neutral-secondary-strong rounded">
          <div className="text-sm">
            <div className="font-medium text-xl text-heading">Amos Daniel</div>
            <div className="truncate text-body text-muted">
              asdadadae@gmail.com
            </div>
          </div>
        </div>

        <ul
          className=" pb-2 space-y-1 text-sm text-body font-medium"
          aria-labelledby="dropdownInformationButton"
        >
          <p className="w-full h-[0.1px] bg-black"></p>
          <li className="mx-1 px-1 hover:bg-secondary hover:shadow rounded-xl hover:text-white">
            <Link
              href="/admin/billing"
              className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              Billing
            </Link>
          </li>

          <li className="px-1 mx-1 hover:bg-secondary hover:shadow rounded-xl hover:text-white">
            <Link
              href="/admin/settings"
              className="inline-flex items-center w-full p-2
          hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              Settings
            </Link>
          </li>

          <p className="w-full h-[0.1px] bg-black"></p>
          <li className="px-1 mx-1 my-2 hover:bg-secondary hover:shadow rounded-xl hover:text-white">
            <Link
              href="#"
              className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              Whatsapp Channel
            </Link>
          </li>

          <li className="px-1 mx-1">
            <button>Sign Out</button>
          </li>
        </ul>
      </div>
    </main>
  );
}
