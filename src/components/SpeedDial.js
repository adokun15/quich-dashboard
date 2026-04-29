"use client";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
              href="#"
              className="inline-flex items-center w-full p-2
                 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              <span className="text-sm font-medium">Drop a feedback</span>
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
     rounded-full w-14 h-14 bg-primary
     "
      >
        <FontAwesomeIcon icon={faMessage} />
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
}
