"use client";

import { useEffect } from "react";

export default function ErrorComponent({ error, retry }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error?.message}</p>
      <button onClick={retry}>Try again</button>
    </div>
  );
}
