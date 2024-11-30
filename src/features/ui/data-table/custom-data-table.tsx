"use client";

import { useGet } from "@/features/api";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useState } from "react";
import { TDataTableRes } from "./data-table.model";

type TColumnMeta = {
  field: string;
  header: string;
};

type TProps = {
  columns: ColumnProps[];
  url: string;
  queryKey: string;
};
export function CustomDataTable({ columns, url, queryKey }: Readonly<TProps>) {
  const [first, setFirst] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

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
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
          className="flex justify-center"
        />
      )}
    </>
  );
}
