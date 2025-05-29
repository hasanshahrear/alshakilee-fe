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
  TInvoiceItemType,
  TInvoicesCreateUpdateType,
} from "./form.config";
import { InvoicesCreateUpdateForm } from "./invoices-create-update.form";
import { useRouter } from "nextjs-toploader/app";
import { useContext } from "react";
import { InvoiceContext } from "@/features/provider";

type TPageProps = {
  slug?: string;
};

export function InvoicesCreateUpdate({ slug }: Readonly<TPageProps>) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { selectedItems, setSelectedItems } = useContext(InvoiceContext);

  const { mutateAsync } = usePost<TInvoicesCreateUpdateType>({
    url: Api.Invoices,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllInvoice],
      });
      setSelectedItems([]);
      axiosSuccessToast(data as TGlobalSuccessResponse);
      push("/dashboard/invoices");
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const { mutateAsync: mutateAsyncUpdateInvoice } =
    usePut<TInvoicesCreateUpdateType>({
      url: Api.Invoices + "/" + slug,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QueryKey.GetAllInvoice],
        });
        axiosSuccessToast(data as TGlobalSuccessResponse);
        push("/dashboard/invoices");
      },
      onError: (error: AxiosError) => {
        axiosErrorToast(error as TGlobalErrorResponse);
      },
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
              items:
                (dataGetInvoiceById?.data
                  ?.invoiceItems as TInvoiceItemType[]) ?? [],
              id: dataGetInvoiceById?.data?.id,
              customerInfo: dataGetInvoiceById?.data?.customer,
              totalPrice: dataGetInvoiceById?.data?.totalPrice ?? 0,
              advanceAmount: dataGetInvoiceById?.data?.advanceAmount ?? 0,
              discountAmount: dataGetInvoiceById?.data?.discountAmount ?? 0,
              status: dataGetInvoiceById?.data?.status,
            }
          : selectedItems?.length > 0
            ? {
                ...initailValue,
                items: selectedItems?.map((x) => {
                  const {
                    id,
                    invoiceId,
                    createdAt,
                    updatedAt,
                    isActive,
                    ...rest
                  } = x;
                  return { ...rest };
                }),
              }
            : initailValue
      }
      validationSchema={invoicesCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <InvoicesCreateUpdateForm slug={slug} />
    </Formik>
  );
}
