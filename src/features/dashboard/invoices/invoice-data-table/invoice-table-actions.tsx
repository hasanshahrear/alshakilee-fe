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
          <div className="flex gap-1">
            <div className="w-4/12 text-[12px]">
              <p>
                Name:{" "}
                <span className="font-semibold">
                  {printData?.customer?.name}
                </span>
              </p>

              <p>
                Mobile:{" "}
                <span className="font-semibold">
                  {printData?.customer?.mobile}
                </span>
              </p>

              <p className="whitespace-nowrap">
                Invoice No:{" "}
                <span className="font-semibold">
                  {printData?.invoiceNumber}
                </span>
              </p>
            </div>
            <div className="w-4/12 text-center text-xs">
              <h1 className="font-bold uppercase">Al-Shakilee Tailoring</h1>
              <p>Shop: 313</p>
              <div className="">
                <p className="mx-auto mt-1 w-fit border-2 border-gray-200 px-3 py-1.5 font-bold uppercase">
                  Shop Copy
                </p>
              </div>
            </div>
            <div className="w-4/12 text-right text-[12px]">
              <p>
                Tel:
                <span className="font-semibold"> 24809393 </span>
              </p>
            </div>
          </div>

          <hr className="my-2 border-black" />
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
          <hr className="my-2 border-black" />

          <div className="grid grid-cols-8 gap-2 print:grid-cols-8">
            {printData?.invoiceItems?.map((x, i) => (
              <div
                key={i}
                className={`col-span-8 text-sm ${i !== 0 && i % 2 === 0 ? "break-page mt-10" : ""}`}
              >
                <table className="new mb-14 w-full border-collapse border">
                  <tbody>
                    <tr>
                      <td
                        className="new"
                        colSpan={8}
                      >
                        <p className="font-semibold">
                          <span className="font-normal">Invoice No:</span>{" "}
                          {printData?.invoiceNumber}
                        </p>
                      </td>
                    </tr>
                    <tr className="border-y">
                      <td
                        className="new"
                        colSpan={4}
                      >
                        <p className="font-semibold">
                          <span className="font-normal">Name:</span> {x?.name}
                        </p>
                      </td>
                      <td
                        className="new"
                        colSpan={4}
                      >
                        <p className="font-semibold">
                          <span className="font-normal">Qty:</span>{" "}
                          {x?.quantity}
                        </p>
                      </td>
                    </tr>
                    <tr className="border-y">
                      <td className="new">Length</td>
                      <td className="new">Shoulder</td>
                      <td className="new">Hand</td>
                      <td className="new">H-L</td>
                      <td className="new">Neck</td>
                      <td className="new">Loose</td>
                      <td className="new">C-L</td>
                      <td className="new">D-L</td>
                    </tr>
                    <tr className="font-semibold">
                      <td className="new">{x?.length}</td>
                      <td className="new">{x?.shoulder}</td>
                      <td className="new">{x?.hand}</td>
                      <td className="new">{x?.handLoose}</td>
                      <td className="new">{x?.neck}</td>
                      <td className="new">{x?.chestLoose}</td>
                      <td className="new">{x?.centreLoose}</td>
                      <td className="new">{x?.downLoose}</td>
                    </tr>
                    <tr className="border-y">
                      <td className="new">Open</td>
                      <td
                        className="new"
                        colSpan={2}
                      >
                        Button
                      </td>
                      <td className="new">Phul</td>
                      <td className="new">SD</td>
                      <td className="new">PAN</td>
                      <td className="new">Sewing</td>
                      <td className="new">Pocket</td>
                    </tr>
                    <tr className="font-semibold">
                      <td className="new">{x?.open}</td>
                      <td
                        className="new"
                        colSpan={2}
                      >
                        {x?.button}
                      </td>
                      <td className="new">{x?.phul}</td>
                      <td className="new">{x?.sd}</td>
                      <td className="new">{x?.pan}</td>
                      <td className="new">{x?.sewing}</td>
                      <td className="new">{x?.pocket}</td>
                    </tr>
                    <tr className="border-y">
                      <td className="new">Tatreez:</td>
                      <td
                        className="new"
                        colSpan={7}
                      >
                        {x?.design}
                      </td>
                    </tr>
                    <tr>
                      <td className="new">Description:</td>
                      <td
                        className="new"
                        colSpan={3}
                      >
                        {x?.description}
                      </td>
                      <td className="new">Fabric:</td>
                      <td
                        className="new"
                        colSpan={3}
                      >
                        {x?.fabric}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
          <div
            style={{ width: 280, fontFamily: "monospace", fontSize: "16px" }}
          >
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
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

            <hr style={{ margin: "12  px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ textAlign: "left", fontSize: "14px" }}>
                <p>C.R. No: 24875</p>
                <p>Shop: 24809393</p>
                <p>Hashem: 98714922</p>
                <p>Mohammed Ali: 99875538</p>
                <p>Shop: 313</p>
              </div>
              <div
                style={{
                  textAlign: "right",
                  marginRight: "4px",
                  fontSize: "14px",
                }}
              >
                <p>س.ت.: ٢٤٨٧٥</p>
                <p>محل: ٢٤٨٠٩٣٩٣</p>
                <p>هاشم: ٩٨٧١٤٩٢٢</p>
                <p>محمد علي: ٩٩٨٧٥٥٣٨</p>
                <p>محل رقم: ٣١٣</p>
              </div>
            </div>

            <hr style={{ margin: "12px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 0",
                fontSize: "12px",
              }}
            >
              <div>
                Date:{" "}
                {printData?.invoiceDate
                  ? dateFromISO(new Date(printData.invoiceDate).toISOString())
                  : ""}
              </div>
              <p style={{ border: "1px solid gray" }}></p>
              <strong>
                Delivery:{" "}
                {printData?.deliveryDate
                  ? dateFromISO(new Date(printData.deliveryDate).toISOString())
                  : ""}{" "}
              </strong>
            </div>

            <hr style={{ margin: "12px 0" }} />

            <div>
              <p>
                Invoice No: <strong>{printData?.invoiceNumber}</strong>
              </p>
              <p>Name: {printData?.customer?.name}</p>
              <p>Mobile: {printData?.customer?.mobile}</p>
            </div>

            <hr style={{ margin: "12px 0" }} />

            <div>
              {printData?.invoiceItems?.map((item, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px dotted gray",
                    }}
                  >
                    <span>{item.quantity} pics</span>
                    <span>{item?.price?.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ padding: "12px 0" }} />

            <div
              style={{ textAlign: "right", marginTop: 4, marginBottom: "16px" }}
            >
              <p>
                Total Price:{" "}
                {printData?.totalPrice != null
                  ? Number(printData.totalPrice).toFixed(2)
                  : ""}
              </p>
              <p>
                Advance:{" "}
                {printData?.advanceAmount != null
                  ? Number(printData.advanceAmount).toFixed(2)
                  : ""}
              </p>
              <p>
                Balance:{" "}
                {printData?.balanceAmount != null
                  ? Number(printData.balanceAmount).toFixed(2)
                  : ""}
              </p>
            </div>

            <hr style={{ margin: "12px 0 50px" }} />
            <div style={{ textAlign: "center", fontSize: "12px" }}>
              {/* <p style={{ fontWeight: "bold" }}>
                Note: Collect your order within 6 months. No complaints will be
                accepted after that.
              </p> */}

              <p>
                جو العلم أنه في حال عدم استلام الطلب خلال 6 أشهر، فإن المحل
                يُخلي مسؤوليته تمامًا تجاهه
              </p>
              <p>
                Please note that if the order is not collected within 6 months,
                the shop holds no responsibility for it
              </p>
              <p>For any inquiries, please contact us.</p>
              <p>Thank you for visiting our shop!</p>
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
