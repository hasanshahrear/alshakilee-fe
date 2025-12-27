"use client";

import { Api, QueryKey, useGet, usePost, usePut } from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { EmployeeTypeCreateUpdateForm } from "./employee-type-create-update.form";
import {
  employeeTypeCreateUpdateSchema,
  initialValue,
  TEmployeeTypeCreateUpdateType,
} from "./form.config";

type TEmployeeType = {
  id: number;
  name: string;
  isActive: boolean;
};

type TProps = {
  id?: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export function EmployeeTypeCreateUpdate({ id, setVisible }: Readonly<TProps>) {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TEmployeeTypeCreateUpdateType>({
    url: Api.EmployeeType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllEmployeeType],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const { data: dataGetById } = useGet<TEmployeeType>({
    queryKey: QueryKey.GetAllEmployeeType,
    url: Api.EmployeeType + "/" + id,
    enabled: !!id,
  });

  const { mutateAsync: mutateAsyncPut } = usePut({
    url: Api.EmployeeType + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllEmployeeType],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
  });

  const handleSubmit = async (values: TEmployeeTypeCreateUpdateType) => {
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
              name: dataGetById?.name as string,
            }
          : initialValue
      }
      validationSchema={employeeTypeCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <EmployeeTypeCreateUpdateForm id={id} />
        </form>
      )}
    </Formik>
  );
}
