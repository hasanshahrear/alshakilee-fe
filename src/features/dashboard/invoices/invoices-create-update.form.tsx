"use client";

import { Api, QueryKey, useGet, usePost } from "@/features/api";
import { CirclePlusIcon } from "@/features/icons";
import {
  TGetCustomerList,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
import { FormikDateField, FormikSubmitButton } from "@/features/ui";
import { Form } from "formik";
import { useEffect, useState } from "react";
import { InvoiceArray } from "./invoice-array.component";
import { FormikAsyncCreatableDropdown } from "@/features/ui/form/formik-async-creatable-dropdown.component";
import { OptionsOrGroups, GroupBase } from "react-select";
import { TCustomerCreateUpdateType } from "../customer/form.config";
import { useQueryClient } from "@tanstack/react-query";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { AxiosError } from "axios";
import { useDebounce } from "primereact/hooks";

export function InvoicesCreateUpdateForm() {
  const queryClient = useQueryClient();

  const [_, debouncedInputValue, setInputValue] = useDebounce("", 500);
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
    setInputValue(inputValue);

    const options = dataCustomerList?.data?.map((x) => ({
      label: x?.mobile,
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
      <InvoiceArray />

      <div className="bottom-1 w-full rounded-lg bg-[#e7f5ff] shadow-lg md:fixed md:w-[720px]">
        <div className="flex flex-col justify-center gap-4 p-4 md:flex-row md:items-end">
          <div className="flex-1">
            <FormikAsyncCreatableDropdown
              name="customerId"
              label="Customer Name"
              requiredIcon="*"
              placeholder="Select Customer"
              loadOptions={loadCustomerOptions}
              options={dataCustomerList?.data?.map((x) => ({
                label: x?.mobile,
                value: x?.id,
              }))}
              defaultOptions={dataCustomerList?.data?.map((x) => ({
                label: x?.mobile,
                value: x?.id,
              }))}
              onCreateOption={(inputValue) => {
                mutateAsync({
                  mobile: inputValue,
                });
              }}
              isClearable
              menuPlacement="top"
            />
          </div>

          <div className="flex-1">
            <FormikDateField
              name="deliveryDate"
              label="Delivery Date"
              className="p-inputtext-sm"
              requiredIcon="*"
            />
          </div>
          <FormikSubmitButton className="flex h-12 justify-center gap-2 rounded-[10px] border-none bg-primary px-6 text-base font-medium">
            <CirclePlusIcon /> Create Invoice
          </FormikSubmitButton>
        </div>
      </div>
    </Form>
  );
}
