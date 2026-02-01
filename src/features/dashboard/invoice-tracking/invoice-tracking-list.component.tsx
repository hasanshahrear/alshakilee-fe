"use client";

import { Api, QueryKey, useGet } from "@/features/api";
import { DataTable } from "primereact/datatable";
import { use, useState } from "react";
import { invoiceTrackingColumns } from "./columns";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export function InvoiceTrackingList() {
  const [first, setFirst] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [status, setStatus] = useState<string>("");
  const [employeeTypeId, setEmployeeTypeId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toDateString();
  });
  const [endDate, setEndDate] = useState<string>(new Date().toDateString());

  const { data: employeeTypes } = useGet<TGetEmployeeListRes>({
    url: Api.EmployeeType,
    queryKey: QueryKey.GetAllEmployeeType,
    queryParams: { limit: 1000, status: true },
  });

  const { data: users } = useGet<TUsersRes>({
    url: Api.User,
    queryKey: QueryKey.Users,
    queryParams: { limit: 1000, status: true },
  });

  const { data, isPending } = useGet<TInvoiceTrackingRes>({
    url: Api.InvoiceTracking,
    queryKey: QueryKey.InvoiceTrackingList,
    queryParams: {
      page: page + 1,
      limit: rows,
      ...(status !== undefined && { status }),
      ...(employeeTypeId !== undefined && { employeeTypeId }),
      ...(userId !== undefined && { userId }),
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
    },
  });

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setPage(event.page);
    setRows(event.rows);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold capitalize">
        Invoice Tracking List
      </h2>

      <div className="rounded-[10px] bg-white p-1 pt-4 shadow-sm md:p-4">
        <div className="mb-8 grid grid-cols-5 gap-4">
          <div>
            <label
              htmlFor="status"
              className="mb-2 block font-bold"
            >
              Status
            </label>
            <Dropdown
              id="status"
              value={status}
              onChange={(e) => setStatus(e.value)}
              options={[
                {
                  name: "Pending",
                  value: "pending",
                },
                { name: "Done", value: "done" },
              ]}
              optionLabel="name"
              placeholder="Filter by Status"
              className="w-full"
              showClear
              pt={{ input: { className: "h-10 py-2 text-base" } }}
            />
          </div>

          <div>
            <label
              htmlFor="employee-type"
              className="mb-2 block font-bold"
            >
              Employee Type
            </label>
            <Dropdown
              id="employee-type"
              value={employeeTypeId}
              onChange={(e) => setEmployeeTypeId(e.value)}
              options={
                employeeTypes?.data?.data?.map((x) => ({
                  name: x.name,
                  value: x.id,
                })) || []
              }
              optionLabel="name"
              placeholder="Filter by Employee Type"
              className="w-full"
              showClear
              pt={{ input: { className: "h-10 py-2 text-base" } }}
            />
          </div>

          <div>
            <label
              htmlFor="user"
              className="mb-2 block font-bold"
            >
              User
            </label>
            <Dropdown
              id="user"
              value={userId}
              onChange={(e) => setUserId(e.value)}
              options={
                users?.data?.data?.map((x) => ({
                  name: x.name,
                  value: x.id,
                })) || []
              }
              optionLabel="name"
              placeholder="Filter by User"
              className="w-full"
              showClear
              pt={{ input: { className: "h-10 py-2 text-base" } }}
            />
          </div>

          <div className="flex-auto">
            <label
              htmlFor="startDate"
              className="mb-2 block font-bold"
            >
              Start Date
            </label>

            <Calendar
              value={new Date(startDate)}
              id="startDate"
              onChange={(e) => setStartDate(e.value?.toDateString() || "")}
              showIcon
              maxDate={new Date()}
              pt={{ root: { className: "h-10  text-base" } }}
            />
          </div>
          <div className="flex-auto">
            <label
              htmlFor="endDate"
              className="mb-2 block font-bold"
            >
              End Date
            </label>

            <Calendar
              value={new Date(endDate)}
              id="endDate"
              onChange={(e) => setEndDate(e.value?.toDateString() || "")}
              showIcon
              maxDate={new Date()}
              pt={{ root: { className: "h-10  text-base" } }}
            />
          </div>
        </div>

        <DataTable
          value={data?.data?.data}
          loading={isPending}
          showGridlines
          size="small"
        >
          {invoiceTrackingColumns?.map(({ field, header, align, ...rest }) => (
            <Column
              key={field}
              field={field}
              header={header}
              align={align as "center" | "left" | "right" | undefined}
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
    </div>
  );
}
