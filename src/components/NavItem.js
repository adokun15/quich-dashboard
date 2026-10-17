"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ href, children, className = "", onClick }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`
        flex items-center gap-3 rounded-lg px-3 py-2.5
        text-sm font-medium transition-colors duration-150
        ${
          isActive
            ? "bg-primary90 text-text"
            : "text-muted hover:bg-background hover:text-text"
        }
        ${className}
      `}
    >
      {children}
    </Link>
  );
}

/*
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ href, children, className = "" }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive && "text-white bg-primary70"}`}
    >
      {children}
    </Link>
  );
}
*/
