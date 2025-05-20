"use client";

import { Api, QueryKey, useGet, usePost } from "@/features/api";
import { CirclePlusIcon } from "@/features/icons";
import {
  TGetAllCustomer,
  TGetCustomerList,
  TGetCustomerTypeByID,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
import {
  FormikDateField,
  FormikDropdown,
  FormikSubmitButton,
} from "@/features/ui";
import { Form } from "formik";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useEffect, useMemo, useState } from "react";
import { InvoiceArray } from "./invoice-array.component";
import { FormikAsyncCreatableDropdown } from "@/features/ui/form/formik-async-creatable-dropdown.component";
import { OptionsOrGroups, GroupBase } from "react-select";
import { TCustomer } from "@/features/model/invoice/get-invoice-by-id";
import { TCustomerCreateUpdateType } from "../customer/form.config";
import { useQueryClient } from "@tanstack/react-query";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { AxiosError } from "axios";
import { useDebounce } from "primereact/hooks";

export function InvoicesCreateUpdateForm() {
  const queryClient = useQueryClient();

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
    <Form className="flex flex-col gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-2">
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
      </div>

      <InvoiceArray />

      <div className="flex w-full justify-end">
        <FormikSubmitButton className="flex h-12 justify-center gap-2 rounded-[10px] border-none bg-primary px-6 text-base font-medium">
          <CirclePlusIcon /> Create Invoice
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
