"use client";

import { Api, EStatus, QueryKey, usePatch } from "@/features/api";
import { PageHeader } from "@/features/ui";
import { useSearchParams } from "next/navigation";
import { invoicesBreadcrumb } from "./data";
import { InvoiceDataTable } from "./invoice-data-table";
import {
  axiosErrorToast,
  axiosSuccessToast,
  dateTimeFromISO,
} from "@/features/utils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BsExclamationTriangle } from "react-icons/bs";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
  TInvoiceData,
} from "@/features/model";
import { useRouter } from "nextjs-toploader/app";
import { InvoiceTableAction } from "./invoice-data-table/invoice-table-actions";

type TPatchInvoices = {
  status: number;
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
    await mutateAsync({ status: EStatus.Cancelled });
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

  const statusMap: {
    [key: number]: {
      label: string;
      className: string;
    };
  } = {
    1: { label: "Pending", className: "bg-yellow-500 hover:bg-yellow-600" },
    2: { label: "Processing", className: "bg-blue-500 hover:bg-blue-600" },
    3: {
      label: "RTD",
      className: "bg-purple-500 hover:bg-purple-600",
    },
    4: { label: "Delivered", className: "bg-green-500 hover:bg-green-600" },
    5: { label: "Cancelled", className: "bg-red-500 hover:bg-red-600" },
  };

  return (
    <>
      <ConfirmDialog
        pt={{
          acceptButton: {
            className: `${Number(activeStatus) === 0 ? "bg-red-500 hover:bg-red-600" : "bg-red-500 hover:bg-red-600"} border-none shadow-none`,
          },
          rejectButton: {
            className: "text-gray-600 border-none shadow-none",
          },
        }}
      />
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
            {
              field: "status",
              header: "Status",
              align: "center",
              body: ({ status }) => {
                const statusInfo = statusMap[status];
                return (
                  <span
                    className={`rounded px-2 py-1 text-xs text-white disabled:opacity-50 ${statusInfo?.className ?? "bg-gray-400"}`}
                  >
                    {statusInfo?.label ?? "Unknown"}
                  </span>
                );
              },
            },
            { field: "customer.name", header: "Name" },
            { field: "customer.mobile", header: "Phone" },
            { field: "invoiceNumber", header: "Invoice No" },
            {
              field: "invoiceDate",
              header: "Invoice Date",
              body: ({ invoiceDate }) => dateTimeFromISO(invoiceDate),
            },
            {
              field: "deliveryDate",
              header: "Delivery Date",
              body: ({ deliveryDate }) => dateTimeFromISO(deliveryDate),
            },
            {
              field: "totalPrice",
              header: "Total Price",
              align: "center",
              body: ({ totalPrice }) => {
                return (
                  <div className="text-sm">
                    <p> {Number(totalPrice).toFixed(3)}</p>
                  </div>
                );
              },
            },
            {
              field: "advanceAmount",
              header: "Advance",
              align: "center",
              body: ({ advanceAmount }) => {
                return (
                  <div className="text-sm">
                    <p> {Number(advanceAmount).toFixed(3)}</p>
                  </div>
                );
              },
            },
            {
              field: "balanceAmount",
              header: "Due",
              align: "center",
              body: ({ balanceAmount }) => {
                return (
                  <div className="text-sm">
                    <p> {Number(balanceAmount).toFixed(3)}</p>
                  </div>
                );
              },
            },
            {
              field: "id",
              header: "Actions",
              align: "center",
              body: (data: TInvoiceData) => {
                return (
                  <InvoiceTableAction
                    handleEdit={() => {
                      push(`invoices/update/${data?.id}`);
                    }}
                    handleDelete={() => handleDelete(data?.id)}
                    status={data?.status}
                    id={data?.id}
                    printData={data}
                  />
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
}
