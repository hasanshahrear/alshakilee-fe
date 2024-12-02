"use client";

import { useRouter } from "next/navigation";
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";

export function ActiveInactiveTab() {
  const { push } = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    push(`?status=${activeIndex}`);
  }, [activeIndex]);

  const items: MenuItem[] = [{ label: "Active" }, { label: "Inactive" }];

  return (
    <TabMenu
      model={items}
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    />
  );
}
