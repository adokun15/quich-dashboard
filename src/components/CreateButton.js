"use client";

import { useRouter } from "next/navigation";

export default function CreateButtonAction({ children, to = "" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(to)}
      className="bg-input flex gap-4 items-center cursor-pointer  py-2 px-6 font-medium rounded-full"
    >
      {children}
    </button>
  );
}
