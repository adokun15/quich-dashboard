"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingNewCategory() {
  return (
    <p className="text-center flex gap-x-2 justify-center items-center font-medium mt-10">
      <span className="font-muted">Getting page ready</span>
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
    </p>
  );
}
