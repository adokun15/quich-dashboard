"use client";
import { useState } from "react";
export default function SpeedDial() {
  const [controlledModal, setControlledDropDown] = useState(false);

  {
    /* Contact Support | Feature Request | Report an Issue*/
  }

  return (
    <div className="fixed bottom-4 right-4 ">
      <div
        className={`${
          controlledModal && "visible"
        } invisible bg-white flex flex-col w-44 justify-end rounded-xl mb-2 space-y-2 
    border rounded-base shadow-xs`}
      >
        <ul className="p-2 text-sm text-body font-medium">
          <li>
            <a
              href="#"
              className="inline-flex items-center w-full p-2
                 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              <span className="text-sm font-medium">Contact Support</span>
            </a>
          </li>
          <li>
            <a
              href="https://quichshop.canny.io/what-should-we-add"
              target="_blank"
              className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              <span className="text-sm font-medium">Feature Request</span>
            </a>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setControlledDropDown((p) => !p)}
        className="flex items-center justify-center ml-auto 
    text-white
     rounded-full w-14 h-14 hover:bg-primary
     focus:ring-4 bg-secondary focus:ring-secondary focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
          />
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
}
