"use client";

import { Api, QueryKey } from "@/features/api";
import { PageHeader } from "@/features/ui";
import { CustomDataTable } from "@/features/ui/data-table";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { ButtomTypeCreateUpdate } from "./buttom-type-create-update.component";
import { bottomTypeBreadcrumb } from "./data";

export function ButtomType() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        breadCrumbJson={bottomTypeBreadcrumb}
        title="Buttom Type"
        buttonText="Create"
        buttonClick={() => {
          if (visible) return;
          setVisible(true);
        }}
      />
      <CustomDataTable
        url={Api.BottomType}
        queryKey={QueryKey.GetAllBottomType}
        columns={[
          { field: "name", header: "Name" },
          {
            field: "isActive",
            header: "Active/Inactive",
          },
        ]}
      />
      <Dialog
        header="Buttom Type"
        visible={visible}
        maximizable
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        className="w-1/3"
      >
        <ButtomTypeCreateUpdate setVisible={setVisible} />
      </Dialog>
    </div>
  );
}
