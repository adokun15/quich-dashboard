"use client";

import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export function SelectForm({
  hasSearch = false,
  title,
  className,
  onChangeValue,
  items,
}) {
  const [datalist, setDataList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectorIsOpened, setSelectorIsOpened] = useState(null);

  const [inputValueSearch, setInputValueSearch] = useState(null);

  useEffect(() => {
    const once = () => {
      setDataList(items);
    };
    once();
  }, []);

  return (
    <div className={`w-72 font-medium max-h-80 h-fit relative ${className}`}>
      <div
        className=" w-full p-2 flex bg-primary90  items-center justify-between border rounded"
        onClick={() => setSelectorIsOpened(!selectorIsOpened)}
      >
        <span>{selectedData ?? title}</span>
        <span>
          <FontAwesomeIcon
            className={`transition-colors ${selectorIsOpened && "rotate-180"}`}
            icon={faChevronDown}
            fontSize={20}
          />
        </span>
      </div>

      <ul
        className={`
         absolute w-full bg-primary90 mt-2 overflow-y-auto max-h-0 ${selectorIsOpened && "max-h-60"}`}
      >
        {/* Search */}
        {hasSearch && (
          <div className="flex items-center px-2 sticky top-0 bg-white">
            <span>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              className="p-2 outline-none"
              value={inputValueSearch}
              onChange={(e) =>
                setInputValueSearch(e.target.value.toLowerCase())
              }
              placeholder={hasSearch}
            />
          </div>
        )}

        {/* List Items */}
        {datalist?.length > 0 ? (
          datalist?.map((data, i) => (
            <li
              className={`p-2 text-desc hover:text-primary ${selectedData == data?.name && "text-primary"} ${/*!selectedData?.toLowerCase().startsWith(inputValueSearch) && "hidden"*/ ""}</ul>}`}
              onClick={() => {
                //select actual data;
                setSelectedData(data?.name);
                //Reset INPUT value
                setInputValueSearch("");
                //Close Modal
                setSelectorIsOpened(false);

                //Propagate Data to up;
                onChangeValue({
                  field: "category_id",
                  data: data?.id,
                });
              }}
              key={i}
            >
              {data?.name}
            </li>
          ))
        ) : (
          <p>No Data yet</p>
        )}
      </ul>
    </div>
  );
}

//Manage Global Action Button
export function SelectActionButton({
  className,
  logo,
  title,
  logo_right = false,
  logo_style = "",
  children,
}) {
  const [selectorIsOpened, setSelectorIsOpened] = useState(false);

  const toggle = () => setSelectorIsOpened((prev) => !prev);

  const handleCloseEventForChild = (e) => {
    if (e.target.closest("button")) {
      setSelectorIsOpened(false);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={toggle}
        className="flex items-center 
        justify-between hover:cursor-pointer gap-2 px-3 py-2  
        border border-gray-300 rounded-md  
        hover:bg-opacity-90 transition"
      >
        {logo && !logo_right && (
          <FontAwesomeIcon icon={logo} className={logo_style} />
        )}
        <span>{title}</span>
        {logo && logo_right && (
          <FontAwesomeIcon icon={logo} className={logo_style} />
        )}
      </button>

      <ul
        onClick={handleCloseEventForChild}
        className={`
          absolute right-0 mt-2 min-w-44 
          bg-white/80 py-2 space-y-2 w-fit origin-top-right
         border h-fit border-gray-200 rounded-md 
          [&_li]:hover:bg-gray-100 cursor-pointer [&_li]:px-2 overflow-hidden
          transition-all duration-200 ease-out
          ${
            selectorIsOpened
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {children}
      </ul>
    </div>
  );
}
