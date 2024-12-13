"use client";

import { Api, QueryKey } from "@/features/api";
import { PageHeader } from "@/features/ui";
import { CustomDataTable } from "@/features/ui/data-table";
import { useRouter } from "next/navigation";
import { invoicesBreadcrumb } from "./data";

export function Invoices() {
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        breadCrumbJson={invoicesBreadcrumb}
        title="Invoices"
        buttonText="Create"
        buttonClick={() => {
          push("invoices/create");
        }}
      />
      <CustomDataTable
        url={Api.Invoices}
        queryKey={QueryKey.GetAllInvoice}
        columns={[
          { field: "deliveryDate", header: "D D" },
          {
            field: "isActive",
            header: "Status",
          },
        ]}
      />
    </div>
  );
}
