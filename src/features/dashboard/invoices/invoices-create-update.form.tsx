"use client";

import { Api, EStatus, QueryKey, useGet, usePost } from "@/features/api";
import {
  TGetCustomerList,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
import {
  FormikDateField,
  FormikDropdown,
  FormikSubmitButton,
  FormikTextField,
} from "@/features/ui";
import { Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { InvoiceArray } from "./invoice-array.component";
import { FormikAsyncCreatableDropdown } from "@/features/ui/form/formik-async-creatable-dropdown.component";
import { OptionsOrGroups, GroupBase } from "react-select";
import { TCustomerCreateUpdateType } from "../customer/form.config";
import { useQueryClient } from "@tanstack/react-query";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { AxiosError } from "axios";
import { useDebounce } from "primereact/hooks";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { TInvoicesCreateUpdateType } from "./form.config";
import { Button } from "primereact/button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { InvoicePriceDetailsArray } from "./invoice-price-details-array.component";

type TProps = {
  slug?: string;
};

export function InvoicesCreateUpdateForm({ slug }: TProps) {
  const queryClient = useQueryClient();
  const { values } = useFormikContext<TInvoicesCreateUpdateType>();

  const [inputValue, debouncedInputValue, setInputValue] = useDebounce("", 500);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (debouncedInputValue) {
      setSearchQuery(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  const { data: dataCustomerList } = useGet<TGetCustomerList>({
    url: Api.GetCustomerByMobile,
    queryKey: QueryKey.GetCustomerByMobile,
    queryParams: { mobile: searchQuery },
  });

  const loadCustomerOptions = async (
    inputValue: string,
  ): Promise<
    OptionsOrGroups<
      { label: string; value: string },
      GroupBase<{ label: string; value: string }>
    >
  > => {
    const [mobile, _] = inputValue.split(/[-/+.]/);
    setInputValue(mobile?.trim());

    const options = dataCustomerList?.data?.map((x) => ({
      label: `${x?.mobile} - ${x?.name}`,
      value: x?.id,
    })) as [];
    return options;
  };

  const { mutateAsync } = usePost<TCustomerCreateUpdateType>({
    url: Api.Customer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetCustomerByMobile],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Form className="flex flex-col gap-5 rounded-md bg-white p-2 xxl:p-5">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-closed:transform-[scale(95%)] data-closed:opacity-0 w-full max-w-md rounded-xl bg-black/80 p-6 backdrop-blur-2xl duration-300 ease-out"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Payment successful
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
              <div className="mt-4">
                <Button
                  className="focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="grid grid-cols-12 gap-2 rounded-lg bg-primary/10 p-4">
        <div className="col-span-4">
          <FormikAsyncCreatableDropdown
            name="customerId"
            label="Customer Name"
            requiredIcon="*"
            placeholder="Select Customer"
            loadOptions={loadCustomerOptions}
            options={dataCustomerList?.data?.map((x) => ({
              label: `${x?.mobile} - ${x?.name}`,
              value: x?.id,
            }))}
            defaultOptions={dataCustomerList?.data?.map((x) => ({
              label: `${x?.mobile} - ${x?.name}`,
              value: x?.id,
            }))}
            onCreateOption={(inputValue) => {
              const [mobile, name] = inputValue.split(/[-/+.]/);

              mutateAsync({
                mobile: mobile?.trim(),
                name: name?.trim() || "",
              });
            }}
            isClearable
          />
        </div>

        <div className="col-span-2">
          <FormikDateField
            name="deliveryDate"
            label="Delivery Date"
            className="p-inputtext-sm"
            requiredIcon="*"
          />
        </div>
        <div className="col-span-6 flex gap-2">
          <div className="w-1/4">
            <p className="mb-1 text-sm font-medium">Total Price:</p>
            <p className="flex h-10 items-center justify-end rounded-md border border-[#d1d5db] bg-white px-2">
              {values?.totalPrice?.toFixed(3)}
            </p>
          </div>
          <div className="w-1/4">
            <FormikTextField
              name="advanceAmount"
              type="number"
              label="Advance"
              className="p-inputtext-sm text-right"
              requiredIcon="*"
            />
          </div>
          <div className="w-1/4">
            <FormikTextField
              name="discountAmount"
              type="number"
              label="Discount"
              className="p-inputtext-sm text-right"
              requiredIcon="*"
            />
          </div>
          <div className="w-1/4">
            <p className="mb-1 text-sm font-medium">Due:</p>
            <p className="flex h-10 items-center justify-end rounded-md border border-[#d1d5db] bg-white px-2">
              {(
                (values.totalPrice ?? 0) -
                (values.advanceAmount ?? 0) -
                (values.discountAmount ?? 0)
              ).toFixed(3)}
            </p>
          </div>
        </div>

        <div className="col-span-12 flex h-full items-center justify-end gap-4">
          <Popover>
            <PopoverButton className="data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-white focus:outline-none">
              <AiFillEdit /> Edit Price Details
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="data-closed:-translate-y-1 data-closed:opacity-0 mt-2 w-96 divide-y divide-white/5 overflow-y-scroll rounded-xl border bg-white text-sm/6 shadow-xl transition duration-200 ease-in-out [--anchor-gap:--spacing(5)]"
            >
              <div className="p-3">
                <InvoicePriceDetailsArray />
              </div>
            </PopoverPanel>
          </Popover>
          <div className="flex items-center gap-2">
            <p>Status: </p>
            <FormikDropdown
              name="status"
              className="w-40"
              options={Object.entries(EStatus).map(([key, value]) => ({
                name: String(value),
                value: Number(key),
              }))}
            />
          </div>
          <FormikSubmitButton className="flex h-12 justify-center gap-2 rounded-[10px] border-none bg-primary px-4 text-base font-medium">
            <AiOutlinePlus /> {slug ? "Update" : "Create"} Invoice
          </FormikSubmitButton>
        </div>
      </div>
      <InvoiceArray />
    </Form>
  );
}
