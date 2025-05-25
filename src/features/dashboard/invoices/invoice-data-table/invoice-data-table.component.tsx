"use client";

import { useGet } from "@/features/api";
import { ActiveInactiveTab } from "@/features/ui";
import { useSearchParams } from "next/navigation";
import { Column, ColumnProps } from "primereact/column";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { TDataTableRes, TInvoice } from "./type";
import { Divider } from "primereact/divider";
import { AiFillDelete, AiFillEdit, AiFillPrinter } from "react-icons/ai";

type TProps = {
  columns: ColumnProps[];
  url: string;
  queryKey: string;
  statusFilter?: boolean;
};

function GridRowDark({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="col-span-2 grid grid-cols-2 border bg-primary/5 px-2 py-1.5">
      {children}
    </div>
  );
}

function GridRowLight({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="col-span-2 grid grid-cols-2 border-l border-r bg-white px-2 py-1.5">
      {children}
    </div>
  );
}

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

  const allowExpansion = (rowData: TInvoice) =>
    rowData.invoiceItems?.length > 0;

  const rowExpansionTemplate = (rowData: TInvoice) => (
    <div className="p-1 md:p-3">
      <h5 className="mb-2 font-semibold">Invoice Items</h5>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {rowData?.invoiceItems?.map((x, i) => (
          <div
            key={i}
            className="col-span-1 max-w-[320px] rounded border p-3 md:w-auto"
          >
            <div className="mb-4 flex items-center gap-4">
              <div>
                <p className="font-semibold">S/N: {i + 1}</p>
              </div>
              <div className="flex-auto">
                <Divider className="m-0 p-0" />
              </div>
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1 rounded bg-violet-700 px-2 py-1 text-xs text-white">
                  <AiFillPrinter />
                  Print
                </button>

                <button className="flex items-center gap-1 rounded bg-primary px-2 py-1 text-xs text-white">
                  <AiFillEdit />
                  Edit
                </button>

                <button className="flex items-center gap-1 rounded bg-red-500 px-2 py-1 text-xs text-white">
                  <AiFillDelete />
                  Delete
                </button>
              </div>
            </div>
            <div
              key={i}
              className="grid grid-cols-2 text-sm"
            >
              <GridRowDark>
                <p>
                  <span className="font-semibold">Length:</span> {x?.length}
                </p>
                <p>
                  <span className="font-semibold">Shoulder:</span> {x?.shoulder}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-semibold">Hand:</span> {x?.hand}
                </p>
                <p>
                  <span className="font-semibold">Hand Loose:</span>{" "}
                  {x?.handLoose}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-semibold">Neck:</span> {x?.neck}
                </p>
                <p>
                  <span className="font-semibold">Chest Loose:</span>{" "}
                  {x?.chestLoose}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-semibold">Centre Loose:</span>{" "}
                  {x?.centreLoose}
                </p>
                <p>
                  <span className="font-semibold">Down Loose:</span>{" "}
                  {x?.downLoose}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-semibold">Open:</span> {x?.open}
                </p>
                <p>
                  <span className="font-semibold">Button:</span> {x?.button}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-semibold">Pocket:</span> {x?.pocket}
                </p>
                <p>
                  <span className="font-semibold">Sewing:</span> {x?.sewing}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-semibold">Pan:</span> {x?.pan}
                </p>
                <p>
                  <span className="font-semibold">SD:</span> {x?.sd}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-semibold">Quantity:</span> {x?.quantity}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> {x?.price}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p className="col-span-2">
                  <span className="font-semibold">Design:</span> {x?.design}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p className="col-span-2">
                  <span className="font-semibold">Fabric:</span> {x?.fabric}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p className="col-span-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {x?.description}
                </p>
              </GridRowDark>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {statusFilter && <ActiveInactiveTab />}
      <div className="rounded-[10px] bg-white p-1 shadow-sm md:p-4">
        <DataTable
          value={data?.data?.data}
          loading={isPending}
          showGridlines
          size="small"
          rowExpansionTemplate={rowExpansionTemplate}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data as DataTableExpandedRows)}
        >
          <Column
            expander={allowExpansion}
            className="w-10"
          />
          <Column
            field="slNo"
            header="S/N"
            className="w-10"
            body={(_, options) => {
              const serialNo =
                ((data?.data?.meta?.page ?? 1) - 1) *
                  (data?.data?.meta?.limit ?? 10) +
                options.rowIndex +
                1;
              return serialNo;
            }}
          />
          {columns.map(({ field, header, ...rest }) => (
            <Column
              key={field}
              field={field}
              header={header}
              {...rest}
            />
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
            className="mt-4 flex justify-center !p-0"
            pt={{
              pageButton: {
                className: "px-1 py-1 text-xs sm:text-sm",
              },
              prevPageButton: {
                className: "px-1 py-1 text-xs sm:text-sm",
              },
              nextPageButton: {
                className: "px-1 py-1 text-xs sm:text-sm",
              },
            }}
          />
        )}
      </div>
    </>
  );
}
