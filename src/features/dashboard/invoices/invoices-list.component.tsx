"use client";

import { Api, QueryKey, usePatch } from "@/features/api";
import { PageHeader, TableAction } from "@/features/ui";
import { useSearchParams } from "next/navigation";
import { invoicesBreadcrumb } from "./data";
import { InvoiceDataTable } from "./invoice-data-table";
import {
  axiosErrorToast,
  axiosSuccessToast,
  dateFromISO,
} from "@/features/utils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BsExclamationTriangle } from "react-icons/bs";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { useRouter } from "nextjs-toploader/app";

type TPatchInvoices = {
  isActive: boolean;
};

export function Invoices() {
  const { push } = useRouter();
  const [id, setId] = useState<number>(0);

  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");
  const queryClient = useQueryClient();

  const handleDelete = (id: number) => {
    setId(id);
    handleDeleteDialog();
  };

  const { mutateAsync } = usePatch<TPatchInvoices>({
    url: Api.Invoices + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllInvoice],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
    },
    onError: (error) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const accept = async () => {
    await mutateAsync({ isActive: Number(activeStatus) !== 0 });
  };

  const handleDeleteDialog = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: <BsExclamationTriangle />,
      defaultFocus: "accept",
      accept: () => {
        accept();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <ConfirmDialog
        pt={{
          acceptButton: {
            className: `${Number(activeStatus) === 0 ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} border-none shadow-none`,
          },
          rejectButton: {
            className: "text-gray-600 border-none shadow-none",
          },
        }}
      />
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
          { field: "customer.mobile", header: "Customer Phone" },
          { field: "invoiceNumber", header: "Invoice No" },
          {
            field: "invoiceDate",
            header: "Invoice Date",
            body: ({ invoiceDate }) => dateFromISO(invoiceDate),
          },
          {
            field: "deliveryDate",
            header: "Delivery Date",
            body: ({ deliveryDate }) => dateFromISO(deliveryDate),
          },
          {
            field: "id",
            header: "Actions",
            align: "center",
            body: ({ id }) => (
              <TableAction
                handleEdit={() => {
                  push(`invoices/update/${id}`);
                }}
                handleDelete={() => handleDelete(id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
