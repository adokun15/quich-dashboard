"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingSingleCategory() {
  return (
    <p className="text-center flex gap-x-2 items-center font-medium mt-10">
      <span className="font-muted">Loading Category</span>
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
    </p>
  );
}
