"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

export function ActiveInactiveTab() {
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

  const items: MenuItem[] = [{ label: "Active" }, { label: "Inactive" }];

  const handleSearchClick = () => {
    if (search) {
      push(`?status=${activeIndex}&search=${search}`);
    } else {
      push(`?status=${activeIndex}`);
    }
  };

  const handleRemoveSearch = () => {
    setSearch("");
    push(`?status=${activeIndex}`);
  };

  return (
    <div className="mt-5 flex items-center justify-start gap-5">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        pt={{
          menu: {
            className: "bg-transparent border-none flex gap-2",
          },
          menuitem: {
            className: "group pb-2",
          },
          action: {
            className:
              "px-3 py-2 rounded-full border-none text-primary font-normal bg-primary/10 group-[.p-highlight]:bg-primary group-[.p-highlight]:text-white group-[.p-highlight]:border-none hover:bg-primary hover:text-white hover:border-none",
          },
        }}
      />
      <div className="flex flex-row">
        <div className="relative">
          <InputText
            placeholder="Type to search..."
            className="p-inputtext-sm h-10 w-[320px] rounded-r-none border-r-0 focus:border-primary focus:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
