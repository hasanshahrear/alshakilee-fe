"use client";

import { useGet } from "@/features/api";
import { ActiveInactiveTab } from "@/features/ui";
import { useSearchParams } from "next/navigation";
import { Column, ColumnProps } from "primereact/column";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { TDataTableRes, TInvoice } from "./type";

type TProps = {
  columns: ColumnProps[];
  url: string;
  queryKey: string;
  statusFilter?: boolean;
};

export function InvoiceDataTable({
  columns,
  url,
  queryKey,
  statusFilter = true,
}: Readonly<TProps>) {
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>();

  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  const { data, isPending } = useGet<TDataTableRes>({
    url,
    queryKey,
    queryParams: {
      page: page + 1,
      limit: rows,
      status: activeStatus === "0" ? "true" : "false",
    },
  });

  const allowExpansion = (rowData: TInvoice) => rowData.invoiceItems?.length > 0;

  const rowExpansionTemplate = (rowData: TInvoice) => (
    <div className="p-3 bg-primary/5">
      <h5 className="font-semibold mb-2">Invoice Items</h5>
      <DataTable value={rowData.invoiceItems} showGridlines size="small">
        <Column field="length" header="Length" />
        <Column field="shoulder" header="Shoulder" />
        <Column field="hand" header="Hand" />
        <Column field="handLoose" header="Hand Loose" />
        <Column field="neck" header="Neck" />
        <Column field="loose" header="Loose" />
        <Column field="centreLoose" header="Centre Loose" />
        <Column field="bottom" header="Bottom" />
        <Column field="open" header="Open" />
        <Column field="button" header="Button" />
        <Column field="design" header="Design" />
        <Column field="pocket" header="Pocket" />
        <Column field="sewing" header="Sewing" />
        <Column field="sd" header="SD" />
        <Column field="pan" header="Pan" />
        <Column field="description" header="Description" />
        <Column field="quantity" header="Quantity" />
        <Column field="price" header="Price" />
      </DataTable>
    </div>
  );

  return (
    <>
      {statusFilter && <ActiveInactiveTab />}
      <div className="bg-white p-4 rounded-[10px] shadow-sm">
        <DataTable
          value={data?.data?.data}
          loading={isPending}
          showGridlines
          size="small"
          rowExpansionTemplate={rowExpansionTemplate}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data as DataTableExpandedRows)}
        >
          <Column expander={allowExpansion} className="w-10" />
          <Column
            field="slNo"
            header="S/N"
            className="w-10"
            body={(_, options) => {
                const serialNo = ((data?.data?.meta?.page ?? 1) - 1) * (data?.data?.meta?.limit ?? 10) + options.rowIndex + 1;
                return serialNo;
            }}
            />
          {columns.map(({ field, header }) => (
            <Column key={field} field={field} header={header} />
          ))}
        </DataTable>

        {!isPending && (
          <Paginator
            first={first}
            rows={rows}
            totalRecords={data?.data?.meta.total}
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={(e) => {
              setFirst(e.first);
              setPage(e.page);
              setRows(e.rows);
            }}
            className="flex justify-center mt-4"
          />
        )}
      </div>
    </>
  );
}
