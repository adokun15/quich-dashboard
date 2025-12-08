"use client";
import { useState, useEffect, useRef } from "react";

export default function Popover({
  buttonStyle,
  popoverStyle,
  buttonContent,
  popoverContent,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e?.target)) {
        setOpen(false);
      }
    }
  }, []);

  return (
    <div>
      <button className={`${buttonStyle}`} onClick={() => setOpen((p) => !p)}>
        {buttonContent}
      </button>
      {open && <div className={`${popoverStyle}`}>{popoverContent}</div>}
    </div>
  );
}
