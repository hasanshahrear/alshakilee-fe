"use client";

import { useGet } from "@/features/api";
import { useSearchParams } from "next/navigation";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useState } from "react";
import { ActiveInactiveTab } from "./active-inactive-tab.component";
import { TDataTableRes } from "./data-table.model";

type TProps = {
  columns: ColumnProps[];
  url: string;
  queryKey: string;
  statusFilter?: boolean;
};
export function CustomDataTable({
  columns,
  url,
  queryKey,
  statusFilter = true,
}: Readonly<TProps>) {
  const [first, setFirst] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setPage(event.page);
    setRows(event.rows);
  };

  const { data, isPending } = useGet<TDataTableRes>({
    url: url,
    queryKey: queryKey,
    queryParams: {
      page: page + 1,
      limit: rows,
      status: activeStatus === "0" ? "true" : "false",
    },
  });

  return (
    <>
      {statusFilter && <ActiveInactiveTab />}
      <div className="bg-white p-4 rounded-[10px] shadow-sm">
      <DataTable
        value={data?.data?.data}
        loading={isPending}
        showGridlines
        size="small"
      >
        {columns?.map(({ field, header, ...rest }) => (
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
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          onPageChange={onPageChange}
          className="flex justify-center mt-4"
        />
      )}
      </div>
    </>
  );
}
