"use client";

import { useGet } from "@/features/api";
import { InvoiceActiveInactiveTab } from "./invoice-active-inactive-tab.component";
import { useSearchParams } from "next/navigation";
import { Column, ColumnProps } from "primereact/column";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useContext, useState } from "react";
import { TDataTableRes, TInvoice } from "./type";
import { Divider } from "primereact/divider";
import { AiOutlineCheck } from "react-icons/ai";
import { InvoiceContext } from "@/features/provider";
import { TInvoiceItem } from "@/features/model";

type TProps = {
  columns: ColumnProps[];
  url: string;
  queryKey: string;
  statusFilter?: boolean;
};

export function GridRowDark({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="col-span-2 grid grid-cols-2 border-l border-r bg-primary/5 px-2 py-1.5 text-sm print:py-0.5">
      {children}
    </div>
  );
}

export function GridRowLight({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="col-span-2 grid grid-cols-2 border bg-white px-2 py-1.5 text-sm">
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
  const [disabledItems, setDisabledItems] = useState<string[]>([]);

  const { setSelectedItems } = useContext(InvoiceContext);

  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");
  const search = searchParams.get("search");

  const { data, isPending } = useGet<TDataTableRes>({
    url,
    queryKey,
    queryParams: {
      page: page + 1,
      limit: rows,
      status: activeStatus,
      queryString: search,
    },
  });

  const allowExpansion = (rowData: TInvoice) =>
    rowData.invoiceItems?.length > 0;

  const rowExpansionTemplate = (rowData: TInvoice) => (
    <div className="p-1 md:p-3">
      <h5 className="mb-2 font-medium">Invoice Items</h5>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {rowData?.invoiceItems?.map((x, i) => (
          <div
            key={i}
            className="col-span-1 max-w-[320px] rounded border p-3 md:w-auto"
          >
            <div className="mb-4 flex items-center gap-4">
              <div>
                <p className="font-medium">S/N: {i + 1}</p>
              </div>
              <div className="flex-auto">
                <Divider className="m-0 p-0" />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedItems((prev) => [...prev, x] as TInvoiceItem[]);
                    setDisabledItems((prev) => [
                      ...prev,
                      `${rowData?.id}-${i}`,
                    ]);
                  }}
                  disabled={disabledItems.includes(`${rowData?.id}-${i}`)}
                  className={`flex items-center gap-1 rounded px-2 py-1 text-xs text-white ${
                    disabledItems.includes(`${rowData?.id}-${i}`)
                      ? "cursor-not-allowed bg-green-500"
                      : "bg-violet-700"
                  }`}
                >
                  <AiOutlineCheck />
                  {disabledItems.includes(`${rowData?.id}-${i}`)
                    ? "Selected"
                    : "Select"}
                </button>
              </div>
            </div>
            <div
              key={i}
              className="grid grid-cols-2 text-xs"
            >
              <GridRowDark>
                <p>
                  <span className="font-medium">Name:</span> {x?.name}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span> {x?.quantity}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-medium">Length:</span> {x?.length}
                </p>
                <p>
                  <span className="font-medium">Shoulder:</span> {x?.shoulder}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-medium">Hand:</span> {x?.hand}
                </p>
                <p>
                  <span className="font-medium">Hand L:</span> {x?.handLoose}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-medium">Neck:</span> {x?.neck}
                </p>
                <p>
                  <span className="font-medium">Chest L:</span> {x?.chestLoose}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-medium">Centre L:</span>{" "}
                  {x?.centreLoose}
                </p>
                <p>
                  <span className="font-medium">Down L:</span> {x?.downLoose}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-medium">Open:</span> {x?.open}
                </p>
                <p>
                  <span className="font-medium">Button:</span> {x?.button}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-medium">Phul:</span> {x?.phul}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-medium">Design:</span> {x?.design}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p>
                  <span className="font-medium">SD:</span> {x?.sd}
                </p>
                <p>
                  <span className="font-medium">Pan:</span> {x?.pan}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p>
                  <span className="font-medium">Sewing:</span> {x?.sewing}
                </p>
                <p>
                  <span className="font-medium">Pocket:</span> {x?.pocket}
                </p>
              </GridRowLight>

              <GridRowDark>
                <p className="col-span-2">
                  <span className="font-medium">Fabric:</span> {x?.fabric}
                </p>
              </GridRowDark>

              <GridRowLight>
                <p className="col-span-2">
                  <span className="font-medium">Description:</span>{" "}
                  {x?.description}
                </p>
              </GridRowLight>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {statusFilter && <InvoiceActiveInactiveTab />}
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
