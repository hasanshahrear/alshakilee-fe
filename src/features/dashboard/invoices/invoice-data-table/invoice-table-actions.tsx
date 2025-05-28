"use client";

import { FaLock, FaUnlock } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Api, EStatus, QueryKey, usePatch } from "@/features/api";
import { useQueryClient } from "@tanstack/react-query";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";

type TProps = {
  handleEdit?: () => void;
  handleDelete?: () => void;
  status: number;
  id: number;
};

type TPatchInvoices = {
  status: number;
};

export function InvoiceTableAction({
  handleDelete,
  handleEdit,
  status,
  id,
}: Readonly<TProps>) {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateStatus } = usePatch<TPatchInvoices>({
    url: Api.InvoicesStatus + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllInvoice],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
    },
    onError: (error) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const statusMap: {
    [key: number]: {
      label: string;
      className: string;
    };
  } = {
    1: { label: "Pending", className: "bg-yellow-500 hover:bg-yellow-600" },
    2: { label: "Processing", className: "bg-blue-500 hover:bg-blue-600" },
    3: {
      label: "Ready to Deliver",
      className: "bg-purple-500 hover:bg-purple-600",
    },
    4: { label: "Delivered", className: "bg-green-500 hover:bg-green-600" },
    5: { label: "Cancelled", className: "bg-red-500 hover:bg-red-600" },
  };

  const prevStatusInfo = statusMap[status - 1];
  const nextStatusInfo = statusMap[status + 1];

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={handleEdit}
        className="flex h-10 w-10 items-center justify-center rounded-md bg-green-500/10 transition-colors hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiEdit
          className="edit text-green-500"
          size={16}
        />
      </button>

      {status === EStatus.Cancelled ? (
        <button
          onClick={() => mutateStatus({ status: EStatus.Pending })}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-500/10 transition-colors hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaUnlock
            className="lock text-yellow-500"
            size={16}
          />
        </button>
      ) : null}

      {status === EStatus.Pending ? (
        <button
          onClick={handleDelete}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-red-500/10 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaLock
            className="lock text-red-500"
            size={16}
          />
        </button>
      ) : null}

      <Menu>
        <MenuButton className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-50">
          <SlOptionsVertical
            className="text-primary"
            size={16}
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="right end"
          className="data-closed:scale-95 data-closed:opacity-0 flex min-w-32 origin-top-right flex-col gap-2 rounded-lg bg-[#f8f8f8] p-2 text-sm/6 shadow-lg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none"
        >
          {status < EStatus.Cancelled && status > EStatus.Pending ? (
            <MenuItem>
              <button
                className={`rounded px-2 py-1 text-white disabled:opacity-50 ${prevStatusInfo?.className ?? "bg-gray-400"}`}
                onClick={async (e) => {
                  e.stopPropagation();
                  await mutateStatus({ status: status - 1 });
                }}
              >
                {prevStatusInfo?.label ?? "Unknown"}
              </button>
            </MenuItem>
          ) : null}

          {status < EStatus.Delivered ? (
            <MenuItem>
              <button
                className={`rounded px-2 py-1 text-white disabled:opacity-50 ${nextStatusInfo?.className ?? "bg-gray-400"}`}
                onClick={async (e) => {
                  e.stopPropagation();
                  await mutateStatus({ status: status + 1 });
                }}
              >
                {nextStatusInfo?.label ?? "Unknown"}
              </button>
            </MenuItem>
          ) : null}
        </MenuItems>
      </Menu>
    </div>
  );
}
