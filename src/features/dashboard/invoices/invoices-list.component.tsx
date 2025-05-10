"use client";

import { Api, QueryKey } from "@/features/api";
import { PageHeader } from "@/features/ui";
import { useRouter } from "next/navigation";
import { invoicesBreadcrumb } from "./data";
import { InvoiceDataTable } from "./invoice-data-table";

export function Invoices() {
  const { push } = useRouter();
  
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        breadCrumbJson={invoicesBreadcrumb}
        title="Invoices"
        buttonText="Create Invoice"
        buttonClick={() => {
          push("invoices/create");
        }}
      />
      <InvoiceDataTable
        url={Api.Invoices}
        queryKey={QueryKey.GetAllInvoice}
        columns={[
          { field: "customer.mobile", header: "Customer Phone", },
          { field: "invoiceNumber", header: "Invoice No" },
          { field: "invoiceDate", header: "Invoice Date" },
          { field: "deliveryDate", header: "Delivery Date" },
          {
            field: "isActive",
            header: "Status",
          },
        ]}
      />
    </div>
  );
}
