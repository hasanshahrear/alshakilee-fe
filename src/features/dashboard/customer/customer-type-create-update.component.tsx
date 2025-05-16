"use client";

import { Api, QueryKey, useGet, usePost, usePut } from "@/features/api";
import {
  TGetCustomerTypeByID,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { CustomerTypeCreateUpdateForm } from "./customer-type-create-update.form";
import {
  customerCreateUpdateSchema,
  initailValue,
  TCustomerCreateUpdateType,
} from "./form.config";

type TProps = {
  id?: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export function CustomerTypeCreateUpdate({ id, setVisible }: Readonly<TProps>) {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TCustomerCreateUpdateType>({
    url: Api.Customer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllCustomer],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const { data: dataGetById } = useGet<TGetCustomerTypeByID>({
    queryKey: QueryKey.GetAllCustomer,
    url: Api.Customer + "/" + id,
    enabled: !!id,
  });

  const { mutateAsync: mutateAsyncPut } = usePut({
    url: Api.Customer + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllCustomer],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
  });

  const handleSubmit = async (values: TCustomerCreateUpdateType) => {
    if (id) {
      await mutateAsyncPut(values);
      return;
    }
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={
        id
          ? {
              mobile: dataGetById?.data?.mobile as string,
            }
          : initailValue
      }
      validationSchema={customerCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <CustomerTypeCreateUpdateForm id={id} />
    </Formik>
  );
}
