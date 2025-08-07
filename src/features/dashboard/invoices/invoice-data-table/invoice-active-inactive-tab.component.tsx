"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

export function InvoiceActiveInactiveTab() {
  const { push } = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search) {
      push(`?status=${activeIndex}&search=${search}`);
    } else {
      push(`?status=${activeIndex}`);
    }
  }, [activeIndex]);

  const handleSearchClick = () => {
    if (search) {
      push(`?status=${0}&search=${search}`);
      setActiveIndex(0);
    } else {
      push(`?status=${activeIndex}`);
    }
  };

  const handleRemoveSearch = () => {
    setSearch("");
    push(`?status=${activeIndex}`);
  };

  const tabColors = [
    "bg-gray-100 text-gray-700 group-[.p-highlight]:bg-gray-500 group-[.p-highlight]:text-white hover:bg-gray-500 hover:text-white",
    "bg-yellow-100 text-yellow-700 group-[.p-highlight]:bg-yellow-500 group-[.p-highlight]:text-white hover:bg-yellow-500 hover:text-white",
    "bg-blue-100 text-blue-700 group-[.p-highlight]:bg-blue-500 group-[.p-highlight]:text-white hover:bg-blue-500 hover:text-white",
    "bg-purple-100 text-purple-700 group-[.p-highlight]:bg-purple-500 group-[.p-highlight]:text-white hover:bg-purple-500 hover:text-white",
    "bg-green-100 text-green-700 group-[.p-highlight]:bg-green-500 group-[.p-highlight]:text-white hover:bg-green-500 hover:text-white",
    "bg-red-100 text-red-700 group-[.p-highlight]:bg-red-500 group-[.p-highlight]:text-white hover:bg-red-500 hover:text-white",
  ];

  const items: MenuItem[] = [
    { label: "All" },
    { label: "Pending" },
    { label: "Processing" },
    { label: "ReadyToDeliver" },
    { label: "Delivered" },
    { label: "Cancelled" },
  ].map((item, index) => ({
    ...item,
    pt: {
      action: {
        className: [
          "px-3 py-2 rounded-full border-none font-normal",
          tabColors[index],
        ].join(" "),
      },
    },
  }));

  return (
    <div className="mt-5 flex flex-row items-center justify-between gap-2 md:mt-0 md:gap-5">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        pt={{
          menu: {
            className:
              "bg-transparent border-none flex gap-2 text-xs md:text-base custom-tabmenu",
          },
          menuitem: {
            className: "group pb-2 custom-tab",
          },
          action: {
            className: "px-3 py-2 rounded-full border-none font-normal",
          },
        }}
      />

      <div className="flex flex-row">
        <div className="relative">
          <InputText
            type="phone"
            name="phone"
            placeholder="Type to search..."
            className="p-inputtext-sm h-10 w-40 rounded-r-none border-r-0 focus:border-primary focus:ring-0 md:w-[320px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          />
          {search && (
            <Button
              icon={<AiOutlineClose />}
              rounded
              text
              severity="danger"
              aria-label="Cancel"
              onClick={handleRemoveSearch}
              className="absolute right-0 top-0 h-10 w-10"
            />
          )}
        </div>
        <Button
          icon={<AiOutlineSearch size={24} />}
          size="small"
          className="flex h-10 w-10 items-center justify-center rounded-l-none border-none bg-primary p-0"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  );
}
