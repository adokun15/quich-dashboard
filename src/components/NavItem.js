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
