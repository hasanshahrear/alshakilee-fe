"use client";

import { Api, QueryKey, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { CustomerTypeCreateUpdateForm } from "./customer-type-create-update.form";
import {
  customerCreateUpdateSchema,
  initailValue,
  TCustomerCreateUpdateType,
} from "./form.config";

export function InvoicesCreateUpdate() {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TCustomerCreateUpdateType>({
    url: Api.Customer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllCustomer],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const handleSubmit = async (values: TCustomerCreateUpdateType) => {
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={initailValue}
      validationSchema={customerCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <CustomerTypeCreateUpdateForm />
    </Formik>
  );
}
