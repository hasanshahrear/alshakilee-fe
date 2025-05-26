"use client";

import { Api, EStatus, QueryKey, usePatch } from "@/features/api";
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
  const { mutateAsync: mutateStatus } = usePatch<TPatchInvoices>({
    url: Api.InvoicesStatus + "/" + id,
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
    await mutateAsync({ status: Number(activeStatus) !== 0 });
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

  const statusColorMap: Record<EStatus, string> = {
    [EStatus.Pending]: "bg-blue-500 hover:bg-blue-600",
    [EStatus.Processing]: "bg-green-500 hover:bg-green-600",
    [EStatus.ReadyToDeliver]: "bg-orange-500 hover:bg-orange-600",
    [EStatus.Delivered]: "bg-red-500 hover:bg-red-600",
    [EStatus.Cancelled]: "bg-slate-500 hover:bg-slate-600",
  };

  const nextStatus =
    id < EStatus.Cancelled ? ((id + 1) as EStatus) : EStatus.Cancelled;
  const prevStatus =
    id > EStatus.Pending ? ((id - 1) as EStatus) : EStatus.Pending;

  const statusLabel = EStatus[id];

  const nextStatusLabel = EStatus[nextStatus];

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
          {
            field: "status",
            header: "Invoice Date",
            body: ({ status, id }) => {
              return (
                <div className="flex gap-2">
                  <button
                    className={`rounded px-2 py-1 text-white ${statusColorMap[status]}`}
                    onClick={async (e) => {
                      e.stopPropagation();
                      setId(id);
                      await mutateStatus({ status: nextStatus });
                    }}
                    disabled={status >= EStatus.Cancelled}
                  >
                    {statusLabel}
                  </button>

                  <button
                    className={`rounded px-2 py-1 text-white ${statusColorMap[prevStatus]}`}
                    onClick={async (e) => {
                      e.stopPropagation();
                      setId(id);
                      await mutateStatus({ status: prevStatus });
                    }}
                    disabled={status <= EStatus.Pending}
                  >
                    {nextStatusLabel}
                  </button>
                </div>
              );
            },
          },
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
            field: "totalPrice",
            header: "Payments",
            body: ({
              totalPrice,
              advanceAmount,
              discountAmount,
              balanceAmount,
              totalQuantity,
            }) => {
              return (
                <div className="text-sm">
                  <p> QTY: {totalQuantity}</p>
                  <p> Price: {totalPrice}</p>
                  <p> Advance: {advanceAmount}</p>
                  <p> Discount: {discountAmount}</p>
                  <p> Balance: {balanceAmount}</p>
                </div>
              );
            },
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
