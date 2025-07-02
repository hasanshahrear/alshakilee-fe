"use client";

import { FaLock, FaUnlock } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Api, EStatus, QueryKey, usePatch } from "@/features/api";
import { useQueryClient } from "@tanstack/react-query";
import {
  axiosErrorToast,
  axiosSuccessToast,
  dateFromISO,
} from "@/features/utils";
import {
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
  TInvoiceData,
} from "@/features/model";
import { AiFillPrinter } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "primereact/button";
import { GridRowDark, GridRowLight } from "./invoice-data-table.component";

type TProps = {
  handleEdit?: () => void;
  handleDelete?: () => void;
  status: number;
  id: number;
  printData?: TInvoiceData;
};

type TPatchInvoices = {
  status: number;
};

export function InvoiceTableAction({
  handleDelete,
  handleEdit,
  status,
  id,
  printData,
}: Readonly<TProps>) {
  const [visible, setVisible] = useState<boolean>(false);
  const [posVisible, setPosVisible] = useState<boolean>(false);

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

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const posContentRef = useRef<HTMLDivElement>(null);
  const posReactToPrintFn = useReactToPrint({ contentRef: posContentRef });

  const footerContent = (
    <div>
      <Button
        label="Print"
        icon={<AiFillPrinter className="mr-2" />}
        onClick={reactToPrintFn}
        autoFocus
      />
    </div>
  );
  const posFooterContent = (
    <div>
      <Button
        label="Print"
        icon={<AiFillPrinter className="mr-2" />}
        onClick={posReactToPrintFn}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Dialog
        header="Print Preview"
        visible={visible}
        // className="h-[794px] w-[600px]"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
        pt={{
          content: {
            className: "h-[794px] w-[579px]",
          },
        }}
      >
        <div
          className="break-page m-6"
          ref={contentRef}
        >
          {/* <div className="flex gap-1">
            <div className="w-4/12 text-[12px]">
              <p>C.R. No: 24875</p>
              <p>Shop: 24809393</p>
              <p>Hashem: 98714922</p>
              <p>Mohammed Ali: 99875538</p>
              <p>Shop: 313</p>
            </div>
            <div className="w-4/12 text-center text-xs">
              <h1 className="text-base font-bold uppercase">
                محلات الشكيلي للخياطة
              </h1>
              <h1 className="font-bold uppercase">Al-Shakilee Tailoring</h1>
              <h3 className="m-1 rounded border p-1 text-sm font-medium uppercase">
                Cash Memo
              </h3>
              <p>Gents Tailoring</p>
              <p>Front of Seblath, Muttrah</p>
            </div>
            <div className="w-4/12 text-right text-[12px]">
              <p>س.ت.: ٢٤٨٧٥</p>
              <p>محل: ٢٤٨٠٩٣٩٣</p>
              <p>هاشم: ٩٨٧١٤٩٢٢</p>
              <p>محمد علي: ٩٩٨٧٥٥٣٨</p>
              <p>محل رقم: ٣١٣</p>
            </div>
          </div> */}

          {/* <hr className="mb-1 mt-2" />
          <div className="flex justify-between text-xs">
            <p>
              Date:{" "}
              {printData?.invoiceDate
                ? dateFromISO(new Date(printData.invoiceDate).toISOString())
                : ""}
            </p>
            <p>
              Delivery Date:{" "}
              <span className="font-semibold">
                {printData?.deliveryDate
                  ? dateFromISO(new Date(printData.deliveryDate).toISOString())
                  : ""}
              </span>
            </p>
          </div>
          <hr className="my-1" /> */}
          {/* <div className="grid grid-cols-2 text-xs">
            <div>
              <p>
                Invoice No:{" "}
                <span className="font-semibold">
                  {printData?.invoiceNumber}
                </span>
              </p>
              <p>Name: {printData?.customer?.name}</p>
              <p>Mobile: {printData?.customer?.mobile}</p>
            </div>
            <div className="text-right">
              <p>Total Price: {printData?.totalPrice}</p>
              <p>Advance: {printData?.advanceAmount}</p>
              <p>Balance: {printData?.balanceAmount}</p>
            </div>
          </div> */}
          {/* <hr className="my-2 border-dashed" /> */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 print:grid-cols-2">
            {printData?.invoiceItems?.map((x, i) => (
              <div
                key={i}
                className={`col-span-1 max-w-[320px] md:w-auto ${
                  i !== 0 && i % 2 === 0 ? "break-page" : ""
                }`}
              >
                <div className="grid grid-cols-2 text-base">
                  <GridRowDark>
                    <div className="col-span-2">
                      <p>
                        Invoice No:{" "}
                        <span className="font-medium">
                          {printData?.invoiceNumber}
                        </span>
                      </p>
                    </div>
                  </GridRowDark>
                  <GridRowLight>
                    <div className="col-span-2">
                      <p>
                        Delivery Date:{" "}
                        <span className="font-medium">
                          {printData?.deliveryDate
                            ? dateFromISO(
                                new Date(printData.deliveryDate).toISOString(),
                              )
                            : ""}{" "}
                        </span>
                      </p>
                    </div>
                  </GridRowLight>
                  <GridRowDark>
                    <p className="font-semibold">
                      <span className="font-normal">Name:</span> {x?.name}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Qty:</span> {x?.quantity}
                    </p>
                  </GridRowDark>

                  <GridRowLight>
                    <p className="font-semibold">
                      <span className="font-normal">Length:</span> {x?.length}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Shoulder:</span>{" "}
                      {x?.shoulder}
                    </p>
                  </GridRowLight>

                  <GridRowDark>
                    <p className="font-semibold">
                      <span className="font-normal">Hand:</span> {x?.hand}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Hand L:</span>{" "}
                      {x?.handLoose}
                    </p>
                  </GridRowDark>

                  <GridRowLight>
                    <p className="font-semibold">
                      <span className="font-normal">Neck:</span> {x?.neck}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Chest L:</span>{" "}
                      {x?.chestLoose}
                    </p>
                  </GridRowLight>

                  <GridRowDark>
                    <p className="font-semibold">
                      <span className="font-normal">Centre L:</span>{" "}
                      {x?.centreLoose}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Down L:</span>{" "}
                      {x?.downLoose}
                    </p>
                  </GridRowDark>

                  <GridRowLight>
                    <p className="font-semibold">
                      <span className="font-normal">Open:</span> {x?.open}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Button:</span> {x?.button}
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
      </Dialog>
      <Dialog
        header="Print Preview"
        visible={posVisible}
        onHide={() => {
          if (!posVisible) return;
          setPosVisible(false);
        }}
        footer={posFooterContent}
        pt={{
          content: {
            className: "h-[794px] w-[400px]",
          },
        }}
      >
        <div
          className="break-page m-6"
          ref={posContentRef}
        >
          <div style={{ width: 280, fontFamily: "monospace", fontSize: 12 }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontWeight: "bold", fontSize: 14 }}>
                محلات الشكيلي للخياطة
              </div>
              <div style={{ fontWeight: "bold" }}>AL-SHAKILEE TAILORING</div>
              <div
                style={{
                  border: "1px solid #000",
                  display: "inline-block",
                  padding: "2px 6px",
                  margin: "4px 0",
                }}
              >
                CASH MEMO
              </div>
              <div>Gents Tailoring</div>
              <div>Front of Seblath, Muttrah</div>
            </div>

            <hr />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ textAlign: "left" }}>
                <p>C.R. No: 24875</p>
                <p>Shop: 24809393</p>
                <p>Hashem: 98714922</p>
                <p>Mohammed Ali: 99875538</p>
                <p>Shop: 313</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>س.ت.: ٢٤٨٧٥</p>
                <p>محل: ٢٤٨٠٩٣٩٣</p>
                <p>هاشم: ٩٨٧١٤٩٢٢</p>
                <p>محمد علي: ٩٩٨٧٥٥٣٨</p>
                <p>محل رقم: ٣١٣</p>
              </div>
            </div>

            <hr style={{ margin: "4px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 0",
              }}
            >
              <div>
                Date:{" "}
                {printData?.invoiceDate
                  ? dateFromISO(new Date(printData.invoiceDate).toISOString())
                  : ""}
              </div>
              <strong>
                Delivery:{" "}
                {printData?.deliveryDate
                  ? dateFromISO(new Date(printData.deliveryDate).toISOString())
                  : ""}{" "}
              </strong>
            </div>

            <hr style={{ margin: "4px 0" }} />

            <div>
              <p>
                Invoice No: <strong>{printData?.invoiceNumber}</strong>
              </p>
              <p>Name: {printData?.customer?.name}</p>
              <p>Mobile: {printData?.customer?.mobile}</p>
            </div>

            <div style={{ textAlign: "right", marginTop: 4 }}>
              <p>Total Price: {printData?.totalPrice}</p>
              <p>Advance: {printData?.advanceAmount}</p>
              <p>Balance: {printData?.balanceAmount}</p>
            </div>
          </div>
        </div>
      </Dialog>

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

            <MenuItem>
              <button
                className="flex items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-white disabled:opacity-50"
                onClick={() => {
                  setPosVisible(true);
                }}
              >
                <AiFillPrinter /> Customer Copy
              </button>
            </MenuItem>

            <MenuItem>
              <button
                className="flex items-center justify-center gap-2 rounded bg-gray-400 px-2 py-1 text-white disabled:opacity-50"
                onClick={() => {
                  setVisible(true);
                }}
              >
                <AiFillPrinter /> Shop Copy
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
