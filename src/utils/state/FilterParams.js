//Set url param for filtering data;
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//Set search params
export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const URLsearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(p) {
    Object.entries(p).forEach(([key, value]) => {
      if (key === "search" && value === URLsearchParams.get("search")) return;

      if (value === undefined || value === null) {
        URLsearchParams.delete(key);
      } else {
        URLsearchParams.set(key, String(value));
      }
    });
    const search = URLsearchParams.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);

    //    const current = new URLSearchParams(window.location.search);
  }

  return { queryParams: searchParams, setQueryParams };
}
