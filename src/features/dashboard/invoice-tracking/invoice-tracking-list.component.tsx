"use client";

import { Api, QueryKey, useGet, usePost } from "@/features/api";
import { DataTable } from "primereact/datatable";
import { use, useEffect, useState } from "react";
import { invoiceTrackingColumns } from "./columns";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useSession } from "next-auth/react";
import { QrScannerModal } from "./qr-scanner-modal.component";
import { toast } from "sonner";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { FaQrcode } from "react-icons/fa";
import "./scanner.css";

export function InvoiceTrackingList() {
  const [first, setFirst] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [status, setStatus] = useState<string>("");
  const [employeeTypeId, setEmployeeTypeId] = useState<string | number>("");
  const [userId, setUserId] = useState<string | number>("");
  const [startDate, setStartDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toDateString();
  });
  const [endDate, setEndDate] = useState<string>(new Date().toDateString());
  const [scannerVisible, setScannerVisible] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

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

  const { data: user } = useGet<TUser>({
    url: Api.User + `/${session?.user?.id}`,
    queryKey: QueryKey.GetUserById,
  });

  const { mutateAsync: scanInvoice, isPending: isScanPending } = usePost<
    { invoiceId: number; userId: number; employeeTypeId: number },
    TGlobalSuccessResponse
  >({
    url: Api.InvoiceTrackingScan,
    onSuccess: (data) => {
      axiosSuccessToast(data as TGlobalSuccessResponse);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.InvoiceTrackingList],
      });
      toast.success("Invoice scanned successfully!");
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
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

  useEffect(() => {
    if (user && user?.role !== "ADMIN") {
      setEmployeeTypeId(user?.employeeTypeId ?? "");
      setUserId(user?.id ?? "");
    }
    if (user && user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setPage(event.page);
    setRows(event.rows);
  };

  const handleScan = async (invoiceIdStr: string) => {
    setIsScanning(true);

    try {
      const invoiceId = parseInt(invoiceIdStr, 10);

      if (isNaN(invoiceId)) {
        toast.error("Invalid QR code. Please scan a valid invoice QR code.");
        setIsScanning(false);
        return;
      }

      // Get current user data from session
      const currentUserId = session?.user?.id;

      if (!currentUserId) {
        toast.error("User session not found. Please log in again.");
        setIsScanning(false);
        return;
      }

      if (!user?.employeeTypeId) {
        toast.error("Employee type not found. Please contact administrator.");
        setIsScanning(false);
        return;
      }

      // Submit scan data
      await scanInvoice({
        invoiceId,
        userId: user?.id,
        employeeTypeId: user.employeeTypeId,
      });
    } catch (error) {
      console.error("Error scanning invoice:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="relative p-2 sm:p-4">
      <h2 className="mb-3 text-lg font-semibold capitalize sm:mb-4 sm:text-xl md:text-2xl">
        Invoice Tracking List
      </h2>

      <div className="rounded-[10px] bg-white p-2 pt-3 shadow-sm sm:p-3 md:p-4 md:pt-4">
        <div className="sm:mb 2xl:grid-cols-5 mb-4 grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-5">
          <div>
            <label
              htmlFor="status"
              className="mb-1.5 block text-sm font-bold sm:mb-2 sm:text-base"
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
              pt={{
                input: { className: "h-9 py-2 text-sm sm:h-10 sm:text-base" },
              }}
            />
          </div>

          {isAdmin && (
            <>
              <div>
                <label
                  htmlFor="employee-type"
                  className="mb-1.5 block text-sm font-bold sm:mb-2 sm:text-base"
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
                  pt={{
                    input: {
                      className: "h-9 py-2 text-sm sm:h-10 sm:text-base",
                    },
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="user"
                  className="mb-1.5 block text-sm font-bold sm:mb-2 sm:text-base"
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
                  pt={{
                    input: {
                      className: "h-9 py-2 text-sm sm:h-10 sm:text-base",
                    },
                  }}
                />
              </div>
            </>
          )}

          <div className="flex-auto">
            <label
              htmlFor="startDate"
              className="mb-1.5 block text-sm font-bold sm:mb-2 sm:text-base"
            >
              Start Date
            </label>

            <Calendar
              value={new Date(startDate)}
              id="startDate"
              onChange={(e) => setStartDate(e.value?.toDateString() || "")}
              showIcon
              maxDate={new Date()}
              pt={{
                root: { className: "h-9 w-full text-sm sm:h-10 sm:text-base" },
              }}
            />
          </div>
          <div className="flex-auto">
            <label
              htmlFor="endDate"
              className="mb-1.5 block text-sm font-bold sm:mb-2 sm:text-base"
            >
              End Date
            </label>

            <Calendar
              value={new Date(endDate)}
              id="endDate"
              onChange={(e) => setEndDate(e.value?.toDateString() || "")}
              showIcon
              maxDate={new Date()}
              pt={{
                root: { className: "h-9 w-full text-sm sm:h-10 sm:text-base" },
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <DataTable
            value={data?.data?.data}
            loading={isPending}
            showGridlines
            size="small"
            className="text-xs sm:text-sm"
          >
            {invoiceTrackingColumns?.map(
              ({ field, header, align, ...rest }) => (
                <Column
                  key={field}
                  field={field}
                  align={align as "center" | "left" | "right" | undefined}
                  {...rest}
                />
              ),
            )}
          </DataTable>
        </div>

        {!isPending && (
          <Paginator
            first={first}
            rows={rows}
            totalRecords={data?.data?.meta.total}
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            onPageChange={onPageChange}
            className="mt-3 flex justify-center !p-0 sm:mt-4"
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

      {/* Floating QR Scanner Button */}
      <Button
        icon={<FaQrcode className="text-xl sm:text-2xl" />}
        className="floating-scan-btn fixed bottom-4 right-4 z-50 !h-14 !w-14 !rounded-full !bg-gradient-to-r !from-blue-500 !to-blue-600 shadow-2xl transition-all duration-300 hover:!from-blue-600 hover:!to-blue-700 hover:shadow-xl active:scale-95 sm:bottom-6 sm:right-6 sm:!h-16 sm:!w-16 md:bottom-8 md:right-8"
        onClick={() => setScannerVisible(true)}
        disabled={isScanning || isScanPending}
        loading={isScanning || isScanPending}
        aria-label="Scan Invoice QR Code"
        tooltip="Scan Invoice QR Code"
        tooltipOptions={{ position: "left" }}
      />

      {/* QR Scanner Modal */}
      <QrScannerModal
        visible={scannerVisible}
        onHide={() => setScannerVisible(false)}
        onScan={handleScan}
      />
    </div>
  );
}
