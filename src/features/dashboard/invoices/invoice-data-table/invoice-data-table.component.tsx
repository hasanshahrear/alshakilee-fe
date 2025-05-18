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
import { Tag } from "primereact/tag";

type TProps = {
  columns: ColumnProps[];
  url: string;
  queryKey: string;
  statusFilter?: boolean;
};

function GridRowDark({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="col-span-2 border bg-primary/5 grid grid-cols-2 px-2 py-1.5">
      {children}
    </div>
  );
}

function GridRowLight({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="col-span-2 bg-white grid grid-cols-2 px-2 py-1.5 border-l border-r">
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

  const allowExpansion = (rowData: TInvoice) => rowData.invoiceItems?.length > 0;

  const rowExpansionTemplate = (rowData: TInvoice) => (
    <div className="p-3">
      <h5 className="font-semibold mb-2">Invoice Items</h5>
      <div className="grid grid-cols-3 gap-2">
         {rowData?.invoiceItems?.map((x, i) => (
          <div key={i} className="col-span-1 border p-3 rounded">
            <div className="flex gap-4 items-center mb-4">
              <div>
                <p className="font-semibold">S/N: {i+1}</p>
              </div>
              <div className="flex-auto">
                <Divider className="p-0 m-0" />
              </div>
              <div className="flex gap-1 items-center">
                <button className="flex gap-1 items-center bg-violet-700 text-xs px-2 py-1 rounded text-white">
                 <AiFillPrinter />
                  Print
                </button>
                
                <button className="flex gap-1 items-center bg-primary text-xs px-2 py-1 rounded text-white">
                 <AiFillEdit />
                  Edit
                </button>
                
                <button className="flex gap-1 items-center bg-red-500 text-xs px-2 py-1 rounded text-white">
                  <AiFillDelete />
                  Delete
                </button>

              </div>
            </div>
            <div key={i} className="grid grid-cols-2 text-sm">
              <GridRowDark>
                <p><span className="font-semibold">Length:</span> {x?.length}</p>
                <p><span className="font-semibold">Shoulder:</span> {x?.shoulder}</p>
              </GridRowDark>

              <GridRowLight>
                <p><span className="font-semibold">Loose:</span> {x?.loose}</p>
                <p><span className="font-semibold">Centre Loose:</span> {x?.centreLoose}</p>
              </GridRowLight>

              <GridRowDark>
                <p><span className="font-semibold">Hand:</span> {x?.hand}</p>
                <p><span className="font-semibold">Hand Loose:</span> {x?.handLoose}</p>
              </GridRowDark>

              <GridRowLight>
                <p><span className="font-semibold">Neck:</span> {x?.neck}</p>
                <p><span className="font-semibold">Loose:</span> {x?.loose}</p>
              </GridRowLight>
              
              <GridRowDark>
                <p><span className="font-semibold">Centre Loose:</span> {x?.centreLoose}</p>
                <p><span className="font-semibold">Down Loose:</span> {x?.downLoose}</p>
              </GridRowDark>

              <GridRowLight>
                <p><span className="font-semibold">Open:</span> {x?.open}</p>
                <p><span className="font-semibold">Button:</span> {x?.button}</p>
              </GridRowLight>

              <GridRowDark>
                <p><span className="font-semibold">Pocket:</span> {x?.pocket}</p>
                <p><span className="font-semibold">Sewing:</span> {x?.sewing}</p>
              </GridRowDark>

              <GridRowLight>
                <p><span className="font-semibold">SD:</span> {x?.sd}</p>
                <p><span className="font-semibold">Pan:</span> {x?.pan}</p>
              </GridRowLight>

              <GridRowDark>
                <p><span className="font-semibold">Quantity:</span> {x?.quantity}</p>
                <p><span className="font-semibold">Price:</span> {x?.price}</p>
              </GridRowDark>

              <GridRowLight>
                <p className="col-span-2"><span className="font-semibold">Design:</span> {x?.design}</p>
              </GridRowLight>

              <GridRowDark>
                <p className="col-span-2"><span className="font-semibold">Description:</span> {x?.description}</p>
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
          {columns.map(({ field, header, ...rest }) => (
            <Column key={field} field={field} header={header} {...rest} />
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
