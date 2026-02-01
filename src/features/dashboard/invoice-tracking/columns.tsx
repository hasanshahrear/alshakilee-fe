import { EmployeeTypeEnum } from "@/features/api/common-enum";
import { EmployeeType } from "../employee-type";
import { statusMap } from "../invoices/invoices-list.component";
import { Divider } from "primereact/divider";

export const invoiceTrackingColumns: any[] = [
  {
    field: "name",
    header: "Name",
    body: (data: TInvoiceData) => data?.user?.name,
  },
  {
    field: "employeeType",
    header: "Employee Type",
    body: (data: TInvoiceData) => data?.employeeType?.name,
  },
  {
    field: "invoiceNo",
    header: "Invoice No",
    body: (data: TInvoiceData) => data?.invoice?.invoiceNumber,
  },
  {
    field: "status",
    header: "Status",
    align: "center",
    body: (data: TInvoiceData) => {
      if (data.status === "pending") {
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
            Pending
          </span>
        );
      }

      if (data.status === "done") {
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
            Done
          </span>
        );
      }

      return null;
    },
  },
  {
    field: "calculation",
    header: "Calculation",
    body: (data: TInvoiceData) => {
      switch (data.employeeType?.name) {
        case EmployeeTypeEnum.CUTTING ||
          EmployeeTypeEnum.NEAK ||
          EmployeeTypeEnum.SAID ||
          EmployeeTypeEnum.IRON: {
          const largeItems = data?.invoice?.invoiceItems?.map((i) =>
            Number(i?.length) >= 50 ? i?.quantity : 0,
          );

          const totalLargeItems = largeItems?.reduce(
            (acc, curr) => acc + curr,
            0,
          );

          const smallItems = data?.invoice?.invoiceItems?.map((i) =>
            Number(i?.length) < 50 ? i?.quantity : 0,
          );

          const totalSmallItems = smallItems?.reduce(
            (acc, curr) => acc + curr,
            0,
          );

          const findB1A = data?.invoice?.invoiceItems?.map((i) =>
            i.button?.toUpperCase()?.includes("B1A") ? i?.quantity : 0,
          );

          const totalB1A = findB1A?.reduce((acc, curr) => acc + curr, 0);

          const totalQuantity = data?.invoice?.invoiceItems?.reduce(
            (acc, curr) => acc + curr.quantity,
            0,
          );

          const darajMan = data?.invoice?.invoiceItems?.reduce(
            (acc, i) => {
              if (Number(i?.length) >= 50) {
                if (i?.design?.includes("1")) acc.oneLine += i.quantity;
                if (i?.design?.includes("2")) acc.twoLine += i.quantity;
                if (i?.design?.includes("3")) acc.threeLine += i.quantity;
                if (i?.design?.includes("4")) acc.fourLine += i.quantity;
              }
              return acc;
            },
            {
              oneLine: 0,
              twoLine: 0,
              threeLine: 0,
              fourLine: 0,
            },
          );

          return (
            <div>
              <p className="text-red-500">Large: {totalLargeItems}</p>
              <p>Small: {totalSmallItems}</p>
              <p className="border-t">
                Total: {totalLargeItems + totalSmallItems}
              </p>

              {darajMan?.oneLine > 0 && (
                <p className="text-blue-500">1 Line: {darajMan?.oneLine} pcs</p>
              )}
              {darajMan?.twoLine > 0 && (
                <p className="text-blue-500">2 Line: {darajMan?.twoLine} pcs</p>
              )}
              {darajMan?.threeLine > 0 && (
                <p className="text-blue-500">
                  3 Line: {darajMan?.threeLine} pcs
                </p>
              )}
              {darajMan?.fourLine > 0 && (
                <p className="text-blue-500">
                  4 Line: {darajMan?.fourLine} pcs
                </p>
              )}
            </div>
          );
        }

        case EmployeeTypeEnum.DARAJ:
          return "";

        case EmployeeTypeEnum.BUTTON: {
          const findB1A = data?.invoice?.invoiceItems?.map((i) =>
            // need to find if the text contain B1A
            i.button?.toUpperCase()?.includes("B1A") ? i?.quantity : 0,
          );

          console.log(findB1A);

          return "";
        }
        default:
          return "-";
      }
    },
  },
];
