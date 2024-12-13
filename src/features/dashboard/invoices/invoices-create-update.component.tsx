"use client";

import { Api, QueryKey, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  initailValue,
  invoicesCreateUpdateSchema,
  TInvoicesCreateUpdateType,
} from "./form.config";
import { InvoicesCreateUpdateForm } from "./invoices-create-update.form";

export function InvoicesCreateUpdate() {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TInvoicesCreateUpdateType>({
    url: Api.Invoices,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllInvoice],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const handleSubmit = async (values: TInvoicesCreateUpdateType) => {
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={initailValue}
      validationSchema={invoicesCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <InvoicesCreateUpdateForm />
    </Formik>
  );
}
