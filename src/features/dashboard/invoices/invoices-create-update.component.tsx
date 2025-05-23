"use client";

import { Api, QueryKey, useLazyGet, usePost, usePut } from "@/features/api";
import {
  TGetInvoiceByID,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
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

type TPageProps = {
  slug?: string;
};

export function InvoicesCreateUpdate({ slug }: Readonly<TPageProps>) {
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

  const { mutateAsync: mutateAsyncUpdateInvoice } =
    usePut<TInvoicesCreateUpdateType>({
      url: Api.Invoices + "/" + slug,
    });

  const handleSubmit = async (values: TInvoicesCreateUpdateType) => {
    if (slug) {
      mutateAsyncUpdateInvoice(values);
      return;
    }
    await mutateAsync(values);
  };

  const { data: dataGetInvoiceById } = useLazyGet<TGetInvoiceByID>({
    url: Api.Invoices + "/" + slug,
    queryKey: QueryKey.GetInvoiceById,
    trigger: !!slug,
  });

  return (
    <Formik
      initialValues={
        slug
          ? {
              deliveryDate: new Date(
                dataGetInvoiceById?.data?.deliveryDate ?? "",
              ),
              customerId: dataGetInvoiceById?.data?.customerId ?? 0,
              items: dataGetInvoiceById?.data?.invoiceItems ?? [],
              id: dataGetInvoiceById?.data?.id,
              customerInfo: dataGetInvoiceById?.data?.customer,
            }
          : initailValue
      }
      validationSchema={invoicesCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <InvoicesCreateUpdateForm />
    </Formik>
  );
}
