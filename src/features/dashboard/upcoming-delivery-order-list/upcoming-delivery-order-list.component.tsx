"use client";

import { Api, QueryKey, useGet } from "@/features/api";
import { CustomDataTable } from "@/features/ui";
import { dateTimeFromISO } from "@/features/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiFillEye } from "react-icons/ai";
import { statusMap } from "../invoices/invoices-list.component";

export function UpcomingDeliveryOrderList() {
  const { push } = useRouter();

  const handleViewDetails = (invoiceNumber: string) => {
    push(`/dashboard/invoices?status=0&search=${invoiceNumber}`);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold capitalize">
        upcoming order list
      </h2>
      <CustomDataTable
        url={Api.UpcomingDeliveryOrderList}
        queryKey={QueryKey.UpcomingDeliveryOrderList}
        statusFilter={false}
        showPagination={false}
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
          { field: "invoiceNumber", header: "Invoice NO" },
          {
            field: "deliveryDate",
            header: "Delivery Date",
            body: ({ deliveryDate }) => dateTimeFromISO(deliveryDate),
          },
          {
            field: "action",
            header: "Action",
            align: "center",
            body: ({ invoiceNumber }) => (
              <button
                onClick={() => handleViewDetails(invoiceNumber)}
                className="mx-auto flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-white"
              >
                <AiFillEye />
                View Details
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
