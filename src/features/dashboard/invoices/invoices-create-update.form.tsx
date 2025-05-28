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
import { AiOutlinePlus } from "react-icons/ai";
import { TInvoicesCreateUpdateType } from "./form.config";

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

  return (
    <Form className="flex flex-col gap-5 rounded-md bg-white p-2 xxl:p-5">
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
            <FormikTextField
              name="totalPrice"
              type="number"
              label="Total Price"
              className="p-inputtext-sm text-right"
              requiredIcon="*"
            />
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
              ).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="col-span-12 flex h-full items-center justify-end gap-4">
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
