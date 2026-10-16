//Temporary alert modal
"use client";

import { ToasterModalToggle } from "@/utils/state/modal/modalSlice";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ToasterMessage() {
  //Get new updated state
  const { show, message, title, type } = useSelector(
    (state) => state.modal.toaster_modal,
  );
  const dispatch = useDispatch();
  //Close after 10seconds

  useEffect(() => {
    if (!show) return;
    setTimeout(() => {
      dispatch(
        ToasterModalToggle({
          show: false,
          message: "",
          type: "",
          title: "",
        }),
      );
    }, 5000);
  }, [dispatch, show]);

  return (
    <div className={`relative w-full h-full ${show ? "block" : "hidden"}`}>
      <div
        className="fixed top-4 bg-white shadow px-2 w-[18rem] py-2 
         rounded right-4  "
      >
        <h3 className="text-base font-medium">
          <span>
            {type === "success" && (
              <FontAwesomeIcon
                className="mx-3 text-primary"
                icon={faCheckCircle}
              />
            )}
          </span>
          {title}
        </h3>
        <p className="text-muted text-balance w-full pl-1">{message}</p>
      </div>
    </div>
  );
}
