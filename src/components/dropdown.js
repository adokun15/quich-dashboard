"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  faChevronDown,
  faCreditCard,
  faGear,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:opacity-100"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary90 text-text">
          <FontAwesomeIcon icon={faUser} />
        </span>

        <span className="hidden sm:inline">My Account</span>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-white shadow-lg"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="font-semibold text-text">My Account</p>
            <p className="mt-1 text-xs text-muted">Manage your store account</p>
          </div>

          <div className="p-2">
            <Link
              href="/admin/subscription"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text hover:bg-background"
            >
              <FontAwesomeIcon icon={faCreditCard} className="w-4" />
              Billing
            </Link>

            <Link
              href="/admin/settings"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text hover:bg-background"
            >
              <FontAwesomeIcon icon={faGear} className="w-4" />
              Settings
            </Link>
          </div>

          <div className="border-t border-border p-2">
            <button
              type="button"
              disabled
              title="Logout has not been implemented yet"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted opacity-60"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4" />
              Sign out (coming soon)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
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
              href="/admin/subscription"
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
*/
